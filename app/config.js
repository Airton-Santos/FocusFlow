import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { signOut, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import auth from '../firebaseConfig';
import { router } from 'expo-router';

const Settings = () => {
  const [userName, setUserName] = useState(auth.currentUser.displayName);
  const [email, setEmail] = useState(auth.currentUser.email);
  const [password, setPassword] = useState('');

  // Função para salvar as configurações
  const saveSettings = async () => {
    let errors = [];

    // Atualizando o nome do usuário no Firebase
    try {
      if (userName !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, { displayName: userName });
      }
    } catch (error) {
      errors.push("O nome não pôde ser atualizado. Tente novamente.");
    }

    // Atualizando o email
    try {
      if (email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, email);
      }
    } catch (error) {
      console.error(error)
      errors.push("O email não pôde ser atualizado. Tente novamente.");
    }

    // Atualizando a senha
    try {
      if (password) {
        await updatePassword(auth.currentUser, password);
      }
    } catch (error) {
      errors.push("A senha não pôde ser atualizada. Tente novamente.");
    }

    // Se não houver erros, avisa sucesso
    if (errors.length === 0) {
      Alert.alert("Sucesso", "O nome, email e senha foram atualizados com sucesso.");
      router.navigate('/home'); // Navega para a tela principal
    } else {
      // Exibe os erros específicos de cada campo que falhou
      Alert.alert("Erro", errors.join('\n'));
    }
  };

  const handlerLogoff = () => {
    signOut(auth).then(() => {
      router.replace('/main'); // Redireciona para a tela principal após deslogar
      console.log('Deslogado com sucesso');
    }).catch((error) => {
      Alert.alert("Erro", "Ocorreu um erro ao tentar sair.");
    });
  };

  return (
    <View style={styles.container}>

      {/* Perfil de Usuário */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações</Text>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={require('../assets/Elements/avatar-do-usuario.png')}
          />
        </View>
      </View>

      <Divider style={styles.divider} />
      <Text style={styles.Title}>Perfil do Usuário</Text>

      {/* Nome */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nome</Text>
        <TextInput
          style={styles.input}
          value={userName}
          placeholderTextColor='#FFF'
          onChangeText={(text) => setUserName(text)}
          placeholder="Nome"
        />
      </View>

      {/* Email */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholderTextColor='#FFF'
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>

      {/* Senha */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Senha</Text>
        <TextInput
          style={styles.input}
          value={password}
          placeholderTextColor='#FFF'
          onChangeText={(text) => setPassword(text)}
          placeholder="Nova Senha"
          secureTextEntry
        />
      </View>

      <Divider style={styles.divider} />

      {/* Botão de salvar configurações */}
      <Button mode="contained" style={styles.saveButton} onPress={saveSettings}>
        Salvar Configurações
      </Button>

      {/* Botão de Logoff */}
      <Button
        mode="contained"
        style={styles.logoffButton}
        onPress={handlerLogoff}
      >
        Sair
      </Button>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2D2D29',
  },
  section: {
    marginBottom: 20,
  },

  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FFF',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#FFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    color: '#FFF',
  },
  divider: {
    marginVertical: 10,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#3CA2A2',
  },
  logoffButton: {
    marginTop: 20,
    backgroundColor: '#FF6347', // Cor de fundo para o botão de logoff (vermelho)
  },
});
