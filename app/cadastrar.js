import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';

const cadastrar = () => {
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
        <Text style={styles.text}>Cadastre-se</Text>

        <TextInput 
          style={styles.inputNome} 
          mode="outlined"
          placeholder="Nome"
          underlineColor="transparent"
          activeOutlineColor="transparent"
          outlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <TextInput 
          style={styles.inputEmail} 
          mode="outlined"
          placeholder="E-mail"
          underlineColor="transparent"
          activeOutlineColor="transparent"
          outlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <TextInput 
          style={styles.inputSenha} 
          mode="flat"
          placeholder="Senha"
          secureTextEntry
          underlineColor="transparent"
          activeOutlineColor="transparent"
          outlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <Link asChild href="/entrar">
          <Button mode="outlined" style={styles.btnCadastrarSe}>Cadastrar</Button>
        </Link>
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

export default cadastrar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D29',
  },

  // Estilo para o elemento superior (canto superior direito)
  headerContainer: {
    justifyContent: 'flex-end',
  },

  ElementWaterTop: {
    width: 210,
    height: 210,
    transform: [{ rotate: '90deg' }],
  },

  // Estilo para o conteúdo central
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
    color: '#FFFFFF',
  },

  inputNome: {
    backgroundColor: 'transparent',
    margin: 5,
    width: 325,
    borderColor: '#92C7A3',
    borderWidth: 1,
  },

  inputEmail: {
    backgroundColor: 'transparent',
    margin: 5,
    width: 325,
    borderColor: '#92C7A3',
    borderWidth: 1,
  },

  inputSenha: {
    backgroundColor: 'transparent',
    margin: 5,
    width: 325,
    borderColor: '#92C7A3',
    borderWidth: 1,
  },

  btnCadastrarSe: {
    margin: 5,
    width: 127,
    height: 42,
    backgroundColor: '#3CA2A2',
  },

  // Estilo para o elemento inferior (canto inferior direito)
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    
  },

  ElementWaterBottom: {
    width: 210,
    height: 210,
    transform: [{ rotate: '-90deg' }],
  },
});
