import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, getDatabase, ref, set } from '../firebaseConfig'; // Adicionado Realtime Database
import * as Notification from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Entrar = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loginIcon, setLoginIcon] = useState(false);
  const router = useRouter();

  // Estados de foco para os campos de entrada
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isSenhaFocused, setIsSenhaFocused] = useState(false);

  // Notification Handler setup
  Notification.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // Função para armazenar o token no Realtime Database
  const storeToken = async (token, userId) => {
    try {
      const db = getDatabase();
      const tokenRef = ref(db, `Tokens/${token}`);
      await set(tokenRef, {
        userId: userId,
        createdAt: new Date().toISOString(),
      });
      console.log('Token armazenado no Realtime Database com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar token no Realtime Database:', error);
    }
  };

  async function registerApp() {
    const { status } = await Notification.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Falha ao obter permissão de notificação');
      return;
    }
  
    const token = (await Notification.getExpoPushTokenAsync()).data;
    console.log('Token de notificação gerado:', token);
  
    // Salvando o token diretamente no Firestore
    await storeToken(token);
  }

  // Função para enviar uma notificação de login bem-sucedido
  async function sendNotification() {
    await Notification.scheduleNotificationAsync({
      content: {
        title: 'Login Bem-Sucedido',
        body: 'Você fez login com sucesso!',
      },
      trigger: { seconds: 1 },
    });
  }

  // Função para realizar o login
  const handlerlogin = async () => {
    setErro('');
    setLoginIcon(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setErro('Por favor, verifique seu e-mail antes de tentar fazer o login.');
        setLoginIcon(false);
        return;
      }

      console.log('Logado com sucesso', user.uid);

      // Registrar o token e armazená-lo no banco
      await registerApp(user.uid);

      // Enviar a notificação de login bem-sucedido
      await sendNotification();

      // Após o login bem-sucedido, redireciona para a página home
      router.replace('/home');
    } catch (error) {
      setErro('Ocorreu um erro ao tentar fazer o login. Tente novamente.');
    } finally {
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
          style={[
            styles.input,
            isEmailFocused && { borderColor: '#308282' },
          ]}
          outlineColor="transparent"
          mode="outlined"
          cursorColor="#fff"
          placeholder="E-mail"
          textColor="#fff"
          placeholderTextColor="#A3B4B4"
          underlineColor="transparent"
          activeOutlineColor="transparent"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />

        <TextInput
          style={[
            styles.input,
            isSenhaFocused && { borderColor: '#308282' },
          ]}
          outlineColor="transparent"
          mode="outlined"
          cursorColor="#fff"
          textColor="#fff"
          placeholder="Senha"
          placeholderTextColor="#A3B4B4"
          secureTextEntry
          underlineColor="transparent"
          activeOutlineColor="transparent"
          value={senha}
          onChangeText={setSenha}
          onFocus={() => setIsSenhaFocused(true)}
          onBlur={() => setIsSenhaFocused(false)}
        />

        {/* Exibindo o erro se houver */}
        {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

        {/* Botão de Login */}
        <Button
          mode="outlined"
          style={styles.btnEntrar}
          labelStyle={styles.btnText}
          onPress={handlerlogin}
          loading={loginIcon}
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
    backgroundColor: '#215A6D',
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
});
