import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import * as Notification from "expo-notifications"

const Entrar = () => {
  const [email, setEmail] = useState(''); // Estado para o e-mail
  const [senha, setSenha] = useState(''); // Estado para a senha
  const [erro, setErro] = useState(''); // Estado para armazenar mensagens de erro
  const [sucesso, setSucesso] = useState(''); // Estado para armazenar mensagem de sucesso
  const [loginIcon, setLoginIcon] = useState(false); // Estado para o carregamento do botão
  const router = useRouter(); // Hook para navegação

  //Notification Handler setup
  Notification.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false
    })
  })

  useEffect(() => {
    regiseterApp()
  }, []);

  async function regiseterApp() {
    const { status } = await Notification.requestPermissionsAsync();
    if (status !== 'granted') {
      alert("Failed to get notification permission");
      return;
    }

    const token = (await Notification.getExpoPushTokenAsync({
      projectId: "21002beb-9c2b-44f8-ace8-bc0d9d52abb1"
    })).data;

    console.log(token);
  }

  async function sendNotification() {
    await Notification.scheduleNotificationAsync({
      content: {
        title: "Login Bem-Sucedido",
        body: "Você fez login com sucesso!"
      },
      trigger: { seconds: 1 }
    });
  }

  // Função para fazer o login com email e senha
  const handlerlogin = async () => {
    setErro(''); // Limpa o erro anterior
    setSucesso(''); // Limpa a mensagem de sucesso anterior
    setLoginIcon(true); // Ativa o carregamento no botão

    try {
      // Tenta realizar o login
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      console.log(user.emailVerified)

      // Verifica se o e-mail do usuário foi verificado
      if (!user.emailVerified) {
        // Se não foi verificado, exibe um alerta e retorna
        setErro('Por favor, verifique seu e-mail antes de tentar fazer o login.');
        setLoginIcon(false);
        return;
      }

      const userName = user.displayName;
      console.log('Logado com sucesso', user.uid, userName);

      // Enviar notificação ao fazer login
      await sendNotification();  // Envia a notificação

      // Após o login bem-sucedido, redireciona para a página home
      router.dismissTo('/main');
      router.replace('/home');

    } catch (error) {
      // Caso ocorra algum erro, exibe a mensagem de erro
      setErro('Ocorreu um erro ao tentar fazer o login. Tente novamente.');
    } finally {
      // Desativa o carregamento no botão, independentemente do sucesso ou falha
      setLoginIcon(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Elemento Superior */}
      <View style={styles.headerContainer}>
        <Image
          style={styles.ElementWaterTop}
          source={require('../assets/Elements/ElementWater.png')}
        />
      </View>

      {/* Conteúdo Central */}
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require('../assets/Elements/Logo.png')}
        />
        <Text style={styles.text}>Entrar</Text>

        <TextInput
          style={styles.input}
          mode="outlined"
          cursorColor="#fff"
          placeholder="E-mail"
          textColor="#fff"
          placeholderTextColor="#A3B4B4"
          underlineColor="transparent"
          activeOutlineColor="transparent"
          value={email} // Ligando o valor do input com o estado
          onChangeText={setEmail} // Atualizando o estado quando o texto mudar
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          cursorColor="#fff"
          textColor="#fff"
          placeholder="Senha"
          placeholderTextColor="#A3B4B4"
          secureTextEntry
          underlineColor="transparent"
          activeOutlineColor="transparent"
          value={senha} // Ligando o valor do input com o estado
          onChangeText={setSenha} // Atualizando o estado quando o texto mudar
        />

        {/* Exibindo o erro se houver */}
        {erro !== '' && (
          <Text style={styles.errorText}>{erro}</Text>
        )}

        {/* Exibindo a mensagem de sucesso se houver */}
        {sucesso !== '' && (
          <Text style={styles.successText}>{sucesso}</Text>
        )}

        {/* Botão de Login */}
        <Button
          mode="outlined"
          style={styles.btnEntrar}
          labelStyle={styles.btnText}
          onPress={() => handlerlogin()}
          loading={loginIcon} // Controle de carregamento no botão
          contentStyle={styles.btnTamanho}
        >
          Entrar
        </Button>
      </View>

      {/* Elemento Inferior */}
      <View style={styles.footerContainer}>
        <Image
          style={styles.ElementWaterBottom}
          source={require('../assets/Elements/ElementWater.png')}
        />
      </View>
    </View>
  );
};

export default Entrar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D29',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  ElementWaterTop: {
    width: 210,
    height: 210,
    transform: [{ rotate: '-180deg' }],
  },

  content: {
    alignItems: 'center',
  },

  logo: {
    width: 150,
    height: 150,
  },

  text: {
    margin: 10,
    fontSize: 30,
    fontFamily: 'Silkscreen-Bold',
    color: '#FFFFFF',
  },

  input: {
    backgroundColor: 'transparent',
    margin: 10,
    width: 325,
    fontFamily: 'Silkscreen-Regular',
    borderColor: '#92C7A3',
    borderWidth: 1,
    color: '#FFFFFF',
    paddingHorizontal: 10,
  },

  btnEntrar: {
    margin: 10,
    width: 150,
    height: 50,
    backgroundColor: '#3CA2A2',
    justifyContent: 'center',
  },

  btnTamanho: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },

  btnText: {
    fontFamily: 'Silkscreen-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },

  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  ElementWaterBottom: {
    width: 210,
    height: 215,
    transform: [{ rotate: '0deg' }],
  },

  // Estilo para o texto de erro
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },

  // Estilo para o texto de sucesso
  successText: {
    color: 'green',
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
  },
});
