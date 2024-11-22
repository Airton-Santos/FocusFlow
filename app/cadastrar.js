import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';


const cadastrar = () => {


  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/Elements/Logo.png')} />
      <Text style={styles.text}>Cadastre-se</Text>

      <TextInput 
        style={styles.inputNome} 
        mode='flat'
        label='Nome'
        underlineColor='transparent'
        activeUnderlineColor='transparent'
      />

      <TextInput 
        style={styles.inputEmail} 
        mode='flat'
        label='E-mail'
        underlineColor='transparent'
        activeUnderlineColor='transparent'
      />

        <TextInput 
        style={styles.inputEmail} 
        mode='flat'
        label='Senha'
        secureTextEntry
        underlineColor='transparent'
        activeUnderlineColor='transparent'
      />

      <Link asChild href='/entrar'><Button style={styles.btnCadastrarSe} mode='outlined'>Cadastrar</Button></Link>
    </View>
  );
};

export default cadastrar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D29',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 150,
    height: 150,
  },

  text: {
    margin: 10,
    fontSize: 20,
    color: '#FFFFFF',  // Cor do texto para garantir contraste com o fundo
  },

  inputNome: {
    backgroundColor: 'transparent', // Remover fundo
    margin: 10,
    width: 325,
    borderColor: '#92C7A3',  // Cor da borda
    borderWidth: 1,  // A largura da borda
  },

  inputEmail: {
    backgroundColor: 'transparent', // Remover fundo
    margin: 10,
    width: 325,
    borderColor: '#92C7A3',  // Cor da borda
    borderWidth: 1,  // A largura da borda
  },

  btnCadastrarSe: {
    margin: 10,
    width: 127,
    height: 42,
    backgroundColor: '#3CA2A2'
  }
});
