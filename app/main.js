import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { Link} from 'expo-router';


const main = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Bem vindo ao Focus Flow</Text>
      <Text style={styles.text}>Organize seu tempo e conquiste seus objetivos!</Text>
      <Link asChild href='/cadastrar'><Button mode='outlined' style={styles.btnCadastrar}>Cadastrar</Button></Link>
      <Link asChild href='/entrar'><Button mode='outlined' style={styles.btnEntrar}>Entrar</Button></Link>
    </View>
  )
}

export default main

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#2D2D29',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  title: {
    fontSize: 30,
  },

  text: {
    margin: 10,
    fontSize: 15,
  },

  btnCadastrar: {
    margin: 10,
    backgroundColor: '#3CA2A2',
    width: 265,
    height: 42,
    color: '#DFECE6'
  },

  btnEntrar: {
    margin: 10,
    backgroundColor: '#3CA2A2',
    width: 265,
    height: 42,
    color: '#DFECE6'
  },

})