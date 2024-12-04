import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Switch } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { signOut } from "firebase/auth";
import auth from '../firebaseConfig';
import { router } from 'expo-router';

const Settings = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [userName, setUserName] = useState('NOME DE USUÁRIO');

  // Handlers
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);

  const handlerLogoff = () => {
    signOut(auth).then(() => {
      router.replace('/main'); // Redireciona para a tela principal após deslogar
      console.log('Deslogado com sucesso');
    }).catch((error) => {
      // Lidar com erros de logout
      console.error(error);
    });
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.darkBackground]}>

      {/* Perfil de Usuário */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perfil de Usuário</Text>
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
            placeholderTextColor={isDarkTheme ? '#FFF' : '#000'}
          />
        </View>
      </View>

      <Divider style={styles.divider} />

      {/* Notificações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificações</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
        />
        <Text style={styles.switchLabel}>Ativar Notificações</Text>
      </View>

      <Divider style={styles.divider} />

      {/* Aparência */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aparência</Text>
        <View style={styles.row}>
          <Text style={styles.text}>Tema Escuro</Text>
          <Switch
            value={isDarkTheme}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkTheme ? '#f5dd4b' : '#f4f3f4'}
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
    backgroundColor: '#FFF',
  },
  darkBackground: {
    backgroundColor: '#2D2D29',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
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
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#333',
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
