import { StyleSheet, Text, View, Image, ImageBackground, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

const goToConfig = () => {
  router.navigate('/config'); // Navega para a tela de configurações
};

const goToAddTask = () => {
  router.navigate('/addTarefas'); // Navega para a tela de adicionar tarefa
};

const Home = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Tarefa 1' },
    { id: '2', title: 'Tarefa 2' },
    { id: '3', title: 'Tarefa 3' },
  ]);

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
              </View>
            )}
          />
        </ImageBackground>
      </View>

      {/* Navegação */}
      <View style={styles.navigation}>
<<<<<<< HEAD
        <Button>
          <Image
            style={styles.medalhaPNG}
            source={require('../assets/Elements/Lembretes.png')}
          />
        </Button>
        <Button>
          <Image
            style={styles.maisPNG}
            source={require('../assets/Elements/Mais.png')}
          />
        </Button>
        <Button>
          <Image
            style={styles.configPNG}
            source={require('../assets/Elements/Configuracao.png')}
          />
=======
        <Button style={styles.navButton}>
          <Image style={styles.icon} source={require('../assets/Elements/alarme.png')} />
        </Button>
        <Button style={styles.navButton} onPress={goToAddTask}>
          <Image style={styles.icon} source={require('../assets/Elements/mais.png')} />
        </Button>
        {/* Botão de Configurações */}
        <Button style={styles.navButton} onPress={goToConfig}>
          <Image style={styles.icon} source={require('../assets/Elements/configuracao.png')} />
>>>>>>> 7cf7031fcbc1127e1d97b56da2c8c2f4133b4718
        </Button>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D29', // Cor de fundo mais suave
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
    fontFamily: 'Silkscreen-Bold', // Fonte mais moderna
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
    borderRadius: 15,
    flexDirection: 'row',
    elevation: 3, // Sombra suave para profundidade
  },

  taskText: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'Silkscreen-Regular', 
  },

  navigation: {
<<<<<<< HEAD
    height: 90,
    width: '100%',
    backgroundColor: '#215A6D',
    bottom: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  maisPNG: {
    width: 65,
    height: 65,
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderColor: '#92C7A3',
    borderWidth: 1,
  },

  configPNG: {
    width: 65,
    height: 65,
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderColor: '#92C7A3',
    borderWidth: 1,
  },

  medalhaPNG: {
    width: 65,
    height: 65,
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderColor: '#92C7A3',
    borderWidth: 1,
=======
    height: 80, // Ajuste a altura da barra de navegação para algo mais confortável
    width: '100%',
    backgroundColor: '#215A6D',
    borderColor: '#92C7A3',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Distribui os botões igualmente com espaço entre eles
    alignItems: 'center', // Centraliza os botões verticalmente
  },

  navButton: {
    width: 70, // Tamanho fixo para o botão
    height: 70, // Tamanho fixo para o botão
    borderRadius: 30, // Tornar os botões redondos
    justifyContent: 'center', // Centraliza o conteúdo dentro do botão
    alignItems: 'center', // Centraliza o conteúdo dentro do botão
    flexDirection: 'row',
  },

  icon: {
    width: 45, // Ajuste o tamanho dos ícones
    height: 45, // Ajuste o tamanho dos ícones
>>>>>>> 7cf7031fcbc1127e1d97b56da2c8c2f4133b4718
  },
});
