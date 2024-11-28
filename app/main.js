import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Link } from 'expo-router';

const main = () => {

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Bem-vindo ao Focus Flow</Text>
      <Text style={styles.text}>Organize seu tempo e conquiste seus objetivos!</Text>
      <Link asChild href="/cadastrar">
        <Button
          textColor="#fff"
          mode="outlined"
          style={styles.btn}
          labelStyle={styles.btnText}
        >
          Cadastrar
        </Button>
      </Link>

      <Link asChild href="/entrar">
        <Button
          textColor="#fff"
          mode="outlined"
          style={styles.btn}
          labelStyle={styles.btnText}
        >
          Entrar
        </Button>
      </Link>
      
      <Link asChild href="/home">
        <Button
          textColor="#fff"
          mode="outlined"
          style={styles.btn}
          labelStyle={styles.btnText}
        >
          Home
        </Button>
      </Link>
    </View>
  );
};

export default main;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#2D2D29',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  title: {
    fontSize: 20,
    fontFamily: 'Silkscreen-Bold',
    color: '#FFFFFF', // Texto branco para contraste
    marginBottom: 10,
  },

  text: {
    margin: 10,
    fontSize: 15,
    fontFamily: 'Silkscreen-Regular',
    color: '#D1D1D1', // Cinza claro para contraste suave
    textAlign: 'center',
  },

  btn: {
    margin: 10,
    backgroundColor: '#3CA2A2',
    width: 265,
    height: 42,
    justifyContent: 'center',
    borderRadius: 8,
  },

  btnText: {
    fontFamily: 'Silkscreen-Regular', // Fonte personalizada aplicada no texto do botão
    fontSize: 14,
  },
});
