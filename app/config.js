import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Switch } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { signOut } from "firebase/auth";
import auth from '../firebaseConfig';
import { router } from 'expo-router';

const Settings = () => {
  const [userName, setUserName] = useState('NOME DE USUÁRIO');
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Tema Escuro
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Notificações

  const handlerLogoff = () => {
    signOut(auth).then(() => {
      router.replace('/main'); // Redireciona para a tela principal após deslogar
      console.log('Deslogado com sucesso');
    }).catch((error) => {
      console.error(error);
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
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={(text) => setUserName(text)}
            placeholder="Nome"
          />
        </View>
      </View>

      <Divider style={styles.divider} />

      {/* Tema Escuro */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.text}>Tema Escuro</Text>
          <Switch
            value={isDarkTheme}
            onValueChange={() => setIsDarkTheme(!isDarkTheme)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkTheme ? '#92C7A3' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Notificações */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.text}>Notificações</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationsEnabled ? '#92C7A3' : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Botão de salvar configurações */}
      <Button mode="contained" style={styles.saveButton} onPress={() => router.back()}>
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
    alignItems: 'center', // Ajustado para garantir que o switch fique alinhado com o texto
    justifyContent: 'space-between'
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
