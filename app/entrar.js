import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';

const Entrar = () => {
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
          cursorColor='#fff'
          placeholder="E-mail"
          textColor='#fff'
          placeholderTextColor="#A3B4B4" // Placeholder destacado
          underlineColor="transparent"
          activeOutlineColor="transparent" 
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          cursorColor='#fff'
          textColor='#fff'
          placeholder="Senha"
          placeholderTextColor="#A3B4B4" // Placeholder destacado
          secureTextEntry
          underlineColor="transparent"
          activeOutlineColor="transparent" 
        />

        <Link asChild href="/entrar">
          <Button
            mode="outlined"
            style={styles.btnEntrar}
            labelStyle={styles.btnText} // Fonte personalizada para o botão
          >
            Entrar
          </Button>
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

export default Entrar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D29',
  },

  // Elemento superior
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  ElementWaterTop: {
    width: 210,
    height: 210,
    transform: [{ rotate: '-180deg' }],
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
    margin: 10,
    fontSize: 30,
    fontFamily: 'Silkscreen-Bold', // Fonte personalizada
    color: '#FFFFFF', // Texto branco para contraste
  },

  input: {
    backgroundColor: 'transparent',
    margin: 10,
    width: 325,
    fontFamily: 'Silkscreen-Regular', // Fonte personalizada
    borderColor: '#92C7A3', // Cor da borda
    borderWidth: 1,
    color: '#FFFFFF', // Texto digitado em branco
    paddingHorizontal: 10,
  },

  btnEntrar: {
    margin: 10,
    width: 150,
    height: 50,
    backgroundColor: '#3CA2A2',
    justifyContent: 'center',
  },

  btnText: {
    fontFamily: 'Silkscreen-Regular', // Fonte personalizada aplicada ao botão
    fontSize: 14,
    color: '#FFFFFF', // Texto branco para contraste
  },

  // Elemento inferior
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  ElementWaterBottom: {
    width: 210,
    height: 215,
    transform: [{ rotate: '0deg' }], // Orientação original
  },
});
