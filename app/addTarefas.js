import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-paper'; // Importa o botão do react-native-paper
import { router } from 'expo-router';

const AddTask = () => {
  // Definindo os estados para título e descrição
  const [taskTitle, setTaskTitle] = useState(''); // Estado para o título
  const [taskDescription, setTaskDescription] = useState(''); // Estado para a descrição

  // Função que lida com o botão OK
  const handleAddTask = () => {
    if (taskTitle.trim() && taskDescription.trim()) {
      router.replace('/home'); // Redireciona para a tela Home
    } else {
      alert("Por favor, insira o título e a descrição da tarefa.");
    }
  };

  // Função para voltar para a página inicial
  const handleGoBack = () => {
    router.replace('/home'); // Botão para voltar à tela principal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Tarefa</Text>
      
      {/* Campo para o Título da Tarefa */}
      <TextInput
        style={styles.input}
        placeholder="Título da Tarefa"
        placeholderTextColor="#FFF"  // Placeholder branco
        value={taskTitle}
        onChangeText={setTaskTitle} // Atualiza o título
      />
      
      {/* Campo para a Descrição da Tarefa */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição da Tarefa"
        placeholderTextColor="#FFF"  // Placeholder branco
        multiline
        value={taskDescription}
        onChangeText={setTaskDescription} // Atualiza a descrição
      />
      
      {/* Botão OK (do React Native Paper) */}
      <View style={styles.buttonContainer}>
        <Button 
          contentStyle={styles.btncontent}
          mode="contained" 
          onPress={handleAddTask} 
          style={styles.button}
        >
          OK
        </Button>
      </View>
      
      {/* Botão Voltar (do React Native Paper) */}
      <View style={styles.buttonContainer}>
        <Button 
          contentStyle={styles.btncontent}
          mode="contained" 
          onPress={handleGoBack} 
          style={styles.button}>
          Voltar
        </Button>
      </View>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2D29',  // Cor de fundo escura
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',  // Cor do título branco
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    color: '#FFF',  // Cor do texto branco
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',  // Garante que o texto começa no topo
    color: '#FFF',  // Cor do texto branco
  },
  buttonContainer: {
    width: '80%',  // Aumenta a largura do botão
    marginBottom: 15,  // Adiciona o espaçamento entre os botões
  },
  button: {
    backgroundColor: '#3CA2A2',
    height: 50,  // Aumenta a altura do botão
    borderRadius: 25,  // Bordas arredondadas
  },
  btncontent: {
    height: 50,
  },
});
