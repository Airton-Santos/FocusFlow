import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';




const cadastrar = () => {

  const router = useRouter(); // Inicializando o roteador

    // Funções para navegação
    const handlerEntrar = () => {
      router.push('/entrar'); // Navega para a tela de cadastro
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
        <Image 
          style={styles.logo} 
          source={require('../assets/Elements/Logo.png')} 
        />
        <Text style={styles.text}>Cadastre-se</Text>

        <TextInput 
          style={styles.input}
          mode="outlined"
          cursorColor='#fff'
          textColor='#fff'
          placeholder="Nome"
          placeholderTextColor="#A3B4B4" // Placeholder destacado
          underlineColor="transparent"
          activeOutlineColor="transparent"
        />

        <TextInput 
          style={styles.input}
          mode="outlined"
          textColor='#fff'
          cursorColor='#fff'
          placeholder="E-mail"
          placeholderTextColor="#A3B4B4" // Placeholder destacado
          underlineColor="transparent"
          activeOutlineColor="transparent" 
        />

        <TextInput 
          style={styles.input}
          textColor='#fff'
          mode="outlined"
          cursorColor='#fff'
          placeholder="Senha"
          placeholderTextColor="#A3B4B4" // Placeholder destacado
          secureTextEntry
          underlineColor="transparent"
          activeOutlineColor="transparent"
        />

          <Button 
            mode="outlined"
            contentStyle={styles.btnTamanho}
            style={styles.btnCadastrarSe} 
            labelStyle={styles.btnText}
            onPress={handlerEntrar}
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

export default cadastrar;

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
    color: '#FFFFFF', // Texto branco para contraste
  },

  input: {
    backgroundColor: 'transparent',
    color: '#FFFFF' ,
    margin: 5,
    width: 325,
    fontFamily: 'Roboto-Regular', // Fonte personalizada
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
    justifyContent: 'center', // Garantir que o conteúdo do botão seja centralizado
    alignItems: 'center', // Garantir que o conteúdo do botão esteja centralizado
    height: 50, // Ajuste da altura do botão
  },

  btnText: {
    fontFamily: 'Roboto-Regular', // Fonte personalizada aplicada ao botão
    fontSize: 14,
    color: '#FFFFFF', // Texto branco para contraste
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
});
