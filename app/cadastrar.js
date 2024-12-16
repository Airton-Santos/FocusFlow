import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import auth from '../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';

const Cadastrar = () => {
  const [email, setEmail] = useState(''); // Estado para o e-mail
  const [senha, setSenha] = useState(''); // Estado para a senha
  const [erro, setErro] = useState(''); // Estado para armazenar mensagens de erro  
  const [loginIcon, setLoginIcon] = useState(false); // Estado para o carregamento do botão
  const [nome, setNome] = useState(''); // Estado para o nome

  const router = useRouter(); // Inicializando o roteador

  // Função para registrar o usuário
  const handlerEntrar = async () => {
    setErro(''); // Limpa mensagens de erro anteriores
    setLoginIcon(true); // Ativa o carregamento no botão

    try {
      // Cria o usuário com o e-mail e senha fornecidos
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      
      // Atualiza o nome do usuário após a criação
      await updateProfile(userCredential.user, { displayName: nome });

      const user = userCredential.user;
      console.log('Usuário cadastrado com sucesso:', user.uid, userCredential.user.displayName);

      // Envia o e-mail de verificação
      await sendEmailVerification(user); // Envia o e-mail de verificação para o usuário
      Alert.alert('Verificação', 'E-mail de verificação enviado. Por favor, verifique sua caixa de entrada.');

      // Navega para a tela de home após o cadastro
      router.replace('/main');
      setLoginIcon(false); // Desativa o carregamento no botão

    } catch (error) { 
      // Tratamento detalhado de erros
      if (error.code === 'auth/email-already-in-use') {
        setErro('Este e-mail já está cadastrado. Tente usar outro e-mail.');
      } else if (error.code === 'auth/invalid-email') {
        setErro('O e-mail fornecido é inválido. Por favor, insira um e-mail válido.');
      } else if (error.code === 'auth/weak-password') {
        setErro('A senha fornecida é muito fraca. Escolha uma senha mais forte.');
      } else {
        setErro('Erro ao cadastrar o usuário. Tente novamente.');
      }
      setLoginIcon(false); // Desativa o carregamento no botão
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
        <Image style={styles.logo} source={require('../assets/Elements/Logo.png')} />
        <Text style={styles.text}>Cadastre-se</Text>

        <TextInput
          style={styles.input}
          mode="outlined"
          cursorColor="#fff"
          textColor="#fff"
          placeholder="Nome"
          placeholderTextColor="#A3B4B4" // Placeholder destacado
          underlineColor="transparent"
          activeOutlineColor="transparent"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          textColor="#fff"
          cursorColor="#fff"
          placeholder="E-mail"
          placeholderTextColor="#A3B4B4" // Placeholder destacado
          underlineColor="transparent"
          activeOutlineColor="transparent"
          value={email} // Ligando o valor do input com o estado
          onChangeText={setEmail} // Atualizando o estado quando o texto mudar
        />

        <TextInput
          style={styles.input}
          textColor="#fff"
          mode="outlined"
          cursorColor="#fff"
          placeholder="Senha"
          placeholderTextColor="#A3B4B4" // Placeholder destacado
          secureTextEntry
          underlineColor="transparent"
          activeOutlineColor="transparent"
          value={senha} // Ligando o valor do input com o estado
          onChangeText={setSenha} // Atualizando o estado quando o texto mudar
        />

        {/* Exibe a mensagem de erro, se houver */}
        {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

        <Button
          mode="outlined"
          contentStyle={styles.btnTamanho}
          style={styles.btnCadastrarSe}
          labelStyle={styles.btnText}
          onPress={handlerEntrar}
          loading={loginIcon} // Controle de carregamento no botão
        >
          Cadastrar
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

export default Cadastrar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D29',
  },

  // Elemento superior
  headerContainer: {
    justifyContent: 'flex-end',
  },

  ElementWaterTop: {
    width: 210,
    height: 210,
    transform: [{ rotate: '90deg' }],
    opacity: 0.5,
  },

  // Conteúdo central
  content: {
    alignItems: 'center',
  },

  logo: {
    width: 150,
    height: 150,
  },

  text: {
    margin: 5,
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF',
  },

  input: {
    backgroundColor: 'transparent',
    color: '#FFFFF',
    margin: 5,
    width: 325,
    fontFamily: 'Roboto-Regular',
    borderColor: '#92C7A3',
    borderWidth: 1,
    paddingHorizontal: 10,
  },

  btnCadastrarSe: {
    margin: 5,
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
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },

  // Elemento inferior
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  ElementWaterBottom: {
    width: 210,
    height: 210,
    transform: [{ rotate: '-90deg' }],
    opacity: 0.5,
  },

  // Estilo para o texto de erro
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
});
