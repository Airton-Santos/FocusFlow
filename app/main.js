import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router'; // Importando useRouter

const Main = () => {
  const fadeAnim = new Animated.Value(0); // Valor inicial para animação de fade
  const router = useRouter(); // Inicializando o roteador

  React.useEffect(() => {
    // Animação de fade in para os elementos da tela
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Funções para navegação
  const handleCadastro = () => {
    router.navigate('/cadastrar'); // Navega para a tela de cadastro
  };

  const handleEntrar = () => {
    router.navigate('/entrar'); // Navega para a tela de entrar
  };

  const handleRecuperarSenha = () => {
    router.navigate('/recuperarSenha') //Navegar para tela de recuperar senha
  };

  return (
    // Envolvendo toda a tela com Animated.View
    <Animated.View style={[styles.main, { opacity: fadeAnim }]}>
      {/* Conteúdo da tela */}
      <Text style={styles.title}>
        Bem-vindo ao Focus Flow
      </Text>
      <Text style={styles.text}>
        Organize seu tempo e conquiste seus objetivos!
      </Text>

      {/* Botões com navegação programática */}
      <Button
        mode="contained"
        style={styles.btn}
        labelStyle={styles.btnText}  // Garantindo que o texto está centralizado
        contentStyle={styles.btnTamanho}  // Estilo da largura do conteúdo
        onPress={handleCadastro} // Chamando a função ao pressionar o botão
      >
        Cadastrar
      </Button>

      <Button
        mode="contained"
        style={styles.btn}
        labelStyle={styles.btnText}  // Garantindo que o texto está centralizado
        contentStyle={styles.btnTamanho}  // Estilo da largura do conteúdo
        onPress={handleEntrar} // Chamando a função ao pressionar o botão
      >
        Entrar
      </Button>

      <Button
        mode="contained"
        style={styles.btn}
        labelStyle={styles.btnText}  // Garantindo que o texto está centralizado
        contentStyle={styles.btnTamanho}  // Estilo da largura do conteúdo
        onPress={handleRecuperarSenha} // Chamando a função ao pressionar o botão
      >
        Recuperar Senha
      </Button>
      
    </Animated.View>
  );
};

export default Main;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#0F0F0F', // Cor de fundo mais escura para um efeito mais moderno
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 28, // Aumentando o tamanho da fonte
    fontWeight: 'bold', // Deixando o título mais marcante
    color: '#fff', // Cor branca para contraste
    marginBottom: 20,
    textAlign: 'center',
  },

  text: {
    fontSize: 16,
    color: '#B0B0B0', // Cor cinza mais suave para o texto
    textAlign: 'center',
    marginBottom: 20,
  },

  btn: {
    borderRadius: 8,
    backgroundColor: '#3CA2A2',
    margin: 10,
    width: '70%', // Ajustando a largura do botão
  },

  btnTamanho: {
    justifyContent: 'center', // Garantir que o conteúdo do botão seja centralizado
    alignItems: 'center', // Garantir que o conteúdo do botão esteja centralizado
    height: 50, // Ajuste da altura do botão
  },

  btnText: {
    textAlign: 'center', // Garantir que o texto fique centralizado
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 15, // Ajustando o tamanho da fonte
  },
});
