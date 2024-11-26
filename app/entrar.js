import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import React from 'react';

const entrar = () => {
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
          placeholder="E-mail"
          underlineColor="transparent"
          activeOutlineColor="transparent"
          outlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          placeholder="Senha"
          secureTextEntry
          underlineColor="transparent"
          activeOutlineColor="transparent"
          outlineColor="transparent"
          activeUnderlineColor="transparent"
        />

        <Link asChild href="/entrar">
          <Button mode="outlined" style={styles.btnEntrar}>
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

export default entrar;

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
    color: '#FFFFFF',
  },

  input: {
    backgroundColor: 'transparent', // Remover fundo
    margin: 10,
    width: 325,
    borderColor: '#92C7A3', // Cor da borda
    borderWidth: 1, // A largura da borda
  },

  btnEntrar: {
    margin: 10,
    width: 127,
    height: 42,
    backgroundColor: '#3CA2A2',
  },

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
