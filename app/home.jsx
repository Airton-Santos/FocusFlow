import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, FlatList } from 'react-native';
import { Button, List } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Home = () => {

  const [tarefas, setTarefas] = useState([]);
  const user = auth.currentUser;
  const router = useRouter(); // Inicializando o roteador

  // Função para navegar para a página de configurações
  const goToConfig = () => {
    router.replace('/config');
  };
  
  // Função para navegar para a página de adicionar tarefas
  const goToAddTask = () => {
    router.replace('/addTarefas');
  };

  const verTarefa = (id) => {
    router.replace({pathname: '/[id]', params: {id: id}});
  };

  const getAllTarefas = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, "Tarefas"), where("idUser", "==", user.uid)));
      let array = querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
      setTarefas(array);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTarefas();
  }, []);

  // Função para renderizar cada tarefa na FlatList
  const renderTask = ({ item }) => (
    <List.Item
      title={item.titulo} // Título da tarefa
      right={() => (
        <View style={styles.taskActions}>
          <List.Icon icon={item.conclusaoDaTarefa ? "check-circle-outline" : "circle-outline"} /> 
        </View>
      )}
      style={styles.taskItem}
      titleStyle={{ color: '#FFF' }} // Define a cor do texto como branco
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
            keyExtractor={(item) => item.id} // Chave única para cada item
            renderItem={renderTask} // Função que renderiza cada item
            ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhuma tarefa encontrada.</Text>} // Mensagem para lista vazia
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

// Estilos do componente
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
    paddingVertical: 10, // Adicionando padding vertical para controle de altura
  },

  taskActions: {
    flexDirection: 'row',
    alignItems: 'center', // Alinha os ícones na mesma linha
    justifyContent: 'flex-end', // Coloca os ícones na extremidade direita
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
