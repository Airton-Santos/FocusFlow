import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, FlatList } from 'react-native';
import { Button, List } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

// Configuração da notificação
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Função para agendar a notificação
const sendNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Tarefas Pendentes',
      body: 'Você tem tarefas pendentes no seu gerenciador de tarefas.',
    },
    trigger: {
      seconds: 60, // Enviar notificação a cada 60 segundos
      repeats: true, // Repetir a notificação
    },
  });
};

// Registrar tarefa em segundo plano
TaskManager.defineTask('background-fetch', async () => {
  try {
    // Verifica se há tarefas pendentes e envia a notificação
    const tarefasExistem = tarefas.length > 0;
    if (tarefasExistem) {
      await sendNotification();
    }
    return BackgroundFetch.Result.NewData; // Retorna sucesso
  } catch (error) {
    console.error('Erro ao buscar em segundo plano:', error);
    return BackgroundFetch.Result.Failed; // Em caso de erro
  }
});

const Home = () => {
  const [tarefas, setTarefas] = useState([]);
  const user = auth.currentUser;
  const router = useRouter(); 

  // Função para navegar para a página de configurações
  const goToConfig = () => {
    router.replace('/config');
  };

  // Função para navegar para a página de adicionar tarefas
  const goToAddTask = () => {
    router.replace('/addTarefas');
  };

  const verTarefa = (id) => {
    router.replace({ pathname: '/[id]', params: { id: id } });
  };

  const getAllTarefas = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'Tarefas'), where('idUser', '==', user.uid)));
      let array = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTarefas(array);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTarefas();
  }, []);

  useEffect(() => {
    if (tarefas.length > 0) {
      const sendNotification = async () => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Tarefas Pendentes',
            body: 'Você tem tarefas pendentes no seu gerenciador de tarefas.',
          },
          trigger: {
            seconds: 1, // A cada 60 segundos
            repeats: true, // Repetir a notificação
          },
        });
      };
      sendNotification();
    }
  }, [tarefas]);

  useEffect(() => {
    // Registrar o fetch em segundo plano
    const registerBackgroundFetch = async () => {
      await BackgroundFetch.registerTaskAsync('background-fetch', {
        minimumInterval: 60, // Mínimo intervalo de 60 segundos
        stopOnTerminate: false, // Não parar ao encerrar o app
        startOnBoot: true, // Iniciar quando o dispositivo for reiniciado
      });
    };
    registerBackgroundFetch();
  }, []);

  const renderTask = ({ item }) => (
    <List.Item
      title={item.titulo}
      right={() => (
        <View style={styles.taskActions}>
          <List.Icon icon={item.conclusaoDaTarefa ? 'check-circle-outline' : 'circle-outline'} />
        </View>
      )}
      style={styles.taskItem}
      titleStyle={{ color: '#FFF' }}
      onPress={() => verTarefa(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      {/* Seção do Usuário */}
      <ImageBackground
        source={require('../assets/Elements/BackgroundUser.png')}
        style={styles.backgroundUser}
        resizeMode="cover"
      >
        <View style={styles.user}>
          <Image source={require('../assets/Elements/avatar-do-usuario.png')} style={styles.userImage} />
          <Text style={styles.userName}>{auth.currentUser?.displayName || 'Usuário'}</Text>
        </View>
      </ImageBackground>

      {/* Lista de Tarefas */}
      <View style={styles.taskSection}>
        <ImageBackground
          style={styles.backgroundTarefas}
          source={require('../assets/Elements/backgroundtarefas.png')}
        >
          <Text style={styles.taskTitle}>Minhas Tarefas</Text>
          <FlatList
            data={tarefas}
            keyExtractor={(item) => item.id}
            renderItem={renderTask}
            ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhuma tarefa encontrada.</Text>}
          />
        </ImageBackground>
      </View>

      {/* Navegação */}
      <View style={styles.navigation}>
        <Button onPress={goToConfig} style={styles.navButton}>
          <Image style={styles.icon} source={require('../assets/Elements/configuracao.png')} />
        </Button>
        <Button onPress={goToAddTask} style={styles.navButton}>
          <Image style={styles.icon} source={require('../assets/Elements/mais.png')} />
        </Button>
        <Button style={styles.navButton}>
          <Image style={styles.icon} source={require('../assets/Elements/alarme.png')} />
        </Button>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D29',
    alignItems: 'center',
  },

  backgroundUser: {
    width: '100%',
    height: 220,
    justifyContent: 'center',
  },

  user: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  userImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#FFF',
  },

  userName: {
    marginTop: 10,
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Silkscreen-Bold',
  },

  taskSection: {
    flex: 1,
    width: '90%',
    marginTop: 20,
  },

  backgroundTarefas: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 15,
    margin: 15,
    marginBottom: 100,
    backgroundColor: '#3CA2A2',
    borderColor: '#92C7A3',
    borderWidth: 2,
  },

  taskTitle: {
    fontSize: 22,
    fontFamily: 'Silkscreen-Bold',
    color: '#FFF',
    marginBottom: 10,
    letterSpacing: 1,
  },

  taskItem: {
    backgroundColor: '#308282',
    borderRadius: 15,
    elevation: 3,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },

  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  emptyMessage: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
  },

  navigation: {
    height: 90,
    width: '100%',
    backgroundColor: '#215A6D',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  navButton: {
    width: 100,
    height: 100,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 60,
    height: 60,
  },
});
