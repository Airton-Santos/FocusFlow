import { StyleSheet, Text, View, Image, ImageBackground, FlatList } from 'react-native';
import React from 'react';

const home = () => {
  const tasks = [
    { id: '1', title: 'Tarefa 1' },
    { id: '2', title: 'Tarefa 2' },
    { id: '3', title: 'Tarefa 3' },
  ];

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

        <ImageBackground style={styles.backgroundTarefas} source={require('../assets/Elements/backgroundtarefas.png')}>
          <Text style={styles.taskTitle}>Minhas Tarefas</Text>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>{item.title}</Text>
              </View>
            )}
          />
        </ImageBackground>
        
      </View>

      {/* Navegação */}
      <View style={styles.navigation}></View>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D29',
    alignItems: 'center',
  },

  backgroundUser: {
    width: '100%', 
    height: 200, 
    justifyContent: 'center', 
    alignItems: 'center', 
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
    marginBottom: 100
  },

  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },

  taskItem: {
    backgroundColor: '#3CA2A2',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },

  taskText: {
    fontSize: 16,
    color: '#FFF',
  },

  navigation: {
    height: 60,
    width: '100%',
    backgroundColor: '#215A6D',
    bottom: 0,
  },
});
