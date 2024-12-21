import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, FlatList } from 'react-native';
import { Button, List } from 'react-native-paper';
import { router } from 'expo-router';
import { auth, db } from '../firebaseConfig'; // Certifique-se de que `db` está corretamente importado
import { collection, getDocs, query, where } from 'firebase/firestore';

// Função para navegar para a página de configurações
const goToConfig = () => {
  router.replace('/config');
};

// Função para navegar para a página de adicionar tarefas
const goToAddTask = () => {
  router.replace('/addTarefas');
};

const Home = () => {
  const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas carregadas do Firestore

  useEffect(() => {
    // Função para buscar as tarefas da coleção no Firestore
    const fetchTasks = async () => {
      try {
        // Referência à coleção de tarefas
        const tasksRef = collection(db, "tarefas");
        // Consulta para pegar as tarefas do usuário logado
        const q = query(tasksRef, where("idUser", "==", auth.currentUser.uid));

        // Obtém os documentos da coleção filtrados pelo idUser
        const querySnapshot = await getDocs(q);

        // Mapeia os documentos retornados para um array de objetos
        const allTasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Atualiza o estado com as tarefas carregadas
        setTasks(allTasks);
      } catch (error) {
        console.error("Erro ao buscar tarefas: ", error); // Log de erro, caso ocorra
      }
    };

    fetchTasks(); // Chama a função de busca ao carregar o componente
  }, []);

  // Função para renderizar cada tarefa na FlatList
  const renderTask = ({ item }) => (
    <List.Item
      title={item.titulo} // Título da tarefa
      description={item.descricao} // Descrição da tarefa
      right={() => (
        <List.Icon icon={item.conclusaoDaTarefa ? "check-circle-outline" : "circle-outline"} /> // Ícone com base no status de conclusão
      )}
      style={styles.taskItem}
      titleStyle={{ color: '#FFF' }} // Define a cor do texto como branco
      descriptionStyle={{ color: '#FFF' }} // Define a cor da descrição como branco
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
            data={tasks} // Dados das tarefas
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
    backgroundColor: '#2D736D',
    borderRadius: 15,
    elevation: 3,
    marginBottom: 10,
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
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 45,
    height: 45,
  },
});
