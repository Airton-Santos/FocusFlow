import { StyleSheet, Text, View, Image, ImageBackground, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Button, IconButton } from 'react-native-paper';
import { signOut } from "firebase/auth";
import auth from '../firebaseConfig';
import { router } from 'expo-router';



const handlerlogoff = () => {

    signOut(auth).then(() => {  
      router.replace('/main')
      console.log('Deslogado Com Sucesso')
    }).catch((error) => {
    // An error happened.
});

}

const Home = () => {
  // Estado das tarefas
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Tarefa 1' },
    { id: '2', title: 'Tarefa 2' },
    { id: '3', title: 'Tarefa 3' },
  ]);
  // Função para remover uma tarefa
  const removeTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

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
          <Text style={styles.userName}>NOME</Text>
        </View>
      </ImageBackground>
      {/* Seção de Tarefas */}
      <View style={styles.taskSection}>
        <ImageBackground
          style={styles.backgroundTarefas}
          source={require('../assets/Elements/backgroundtarefas.png')}
        >
          <Text style={styles.taskTitle}>Minhas Tarefas</Text>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>{item.title}</Text>
                <IconButton
                  icon="trash-can"
                  size={20}
                  onPress={() => removeTask(item.id)} // Remove tarefa ao clicar
                />
              </View>
            )}
          />
        </ImageBackground>
      </View>

      {/* Navegação */}
      <View style={styles.navigation}>
        <Button>
          <Image
            style={styles.medalhaPNG}
            source={require('../assets/Elements/medalha.png')}
          />
        </Button>
        <Button>
          <Image
            style={styles.maisPNG}
            source={require('../assets/Elements/mais.png')}
          />
        </Button>
        <Button onPress={handlerlogoff}>
          <Image
            style={styles.configPNG}
            source={require('../assets/Elements/configuracao.png')}
          />
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
    justifyContent: 'center',
  },

  backgroundUser: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
  },

  user: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  userName: {
    marginTop: 10,
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Silkscreen-Bold', // Fonte personalizada
  },

  taskSection: {
    flex: 1,
    width: '90%',
    marginTop: 20,
  },

  backgroundTarefas: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    padding: 15,
    margin: 15,
    marginBottom: 100,
    borderColor: '#92C7A3',
    borderWidth: 1,
  },

  taskTitle: {
    fontSize: 20,
    fontFamily: 'Silkscreen-Bold', // Fonte personalizada para o título
    color: '#FFF',
    marginBottom: 10,
  },
  taskItem: {
    backgroundColor: '#3CA2A2',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },

  taskText: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Silkscreen-Regular', // Fonte personalizada para o texto da tarefa
  },

  navigation: {
    height: 90,
    width: '90%',
    backgroundColor: '#215A6D',
    bottom: 0,
    borderRadius: 50,
    borderColor: '#92C7A3',
    borderWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  maisPNG: {
    width: 65,
    height: 65,
    backgroundColor: '#3CA2A2',
    borderRadius: 50,
    borderColor: '#92C7A3',
    borderWidth: 1,
  },
  configPNG: {
    width: 65,
    height: 65,
    backgroundColor: '#3CA2A2',
    borderRadius: 50,
    borderColor: '#92C7A3',
    borderWidth: 1,
  },
  medalhaPNG: {
    width: 65,
    height: 65,
    backgroundColor: '#3CA2A2',
    borderRadius: 50,
    borderColor: '#92C7A3',
    borderWidth: 1,
  },
});