import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

const VerTarefa = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [tarefa, setTarefa] = useState({});

  const handleGoBack = () => {
    router.replace('/home');
  };

  // Função para obter os dados da tarefa
  const getTarefas = async () => {
    try {
      const docRef = doc(db, 'Tarefas', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTarefa(docSnap.data());
      } else {
        console.log('Documento não foi encontrado');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTarefas();
  }, []);  

  // Função para concluir a tarefa com alerta de confirmação
  const concluirTarefa = () => {
    Alert.alert(
      'Confirmar Conclusão',
      'Você tem certeza que deseja concluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Concluir',
          onPress: async () => {
            try {
              const docRef = doc(db, 'Tarefas', id);
              await updateDoc(docRef, {
                conclusaoDaTarefa: true, // Marca a tarefa como concluída
              });
              // Atualiza a tarefa localmente após salvar no Firestore
              setTarefa(prevState => ({
                ...prevState,
                conclusaoDaTarefa: true,
              }));
            } catch (error) {
              console.error('Erro ao concluir a tarefa: ', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Função para excluir a tarefa com alerta de confirmação
  const excluirTarefa = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              const docRef = doc(db, 'Tarefas', id);
              await deleteDoc(docRef); // Deleta a tarefa do Firestore
              handleGoBack(); // Volta para a tela inicial
              Alert.alert('Sucesso', 'Tarefa excluída com sucesso!');
            } catch (error) {
              console.error('Erro ao excluir tarefa: ', error);
              Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : (
        <View style={styles.taskInfo}>
          <Text style={styles.title}>Título: {tarefa.titulo}</Text>
          <Text style={styles.taskInfoText}>Descrição: {tarefa.description}</Text>
          <Text style={styles.taskInfoText}>
            Concluída: {tarefa.conclusaoDaTarefa ? 'Concluída' : 'Não Concluída'}
          </Text>
        </View>
      )}

      {/* Botão para concluir a tarefa, caso não esteja concluída */}
      {!tarefa.conclusaoDaTarefa && (
        <Button style={styles.button} onPress={concluirTarefa}>
          <Text style={styles.buttonText}>Concluir Tarefa</Text>
        </Button>
      )}

      {/* Botão para excluir a tarefa, caso já esteja concluída */}
      {tarefa.conclusaoDaTarefa && (
        <Button style={styles.button} onPress={excluirTarefa}>
          <Text style={styles.buttonText}>Apagar Tarefa</Text>
        </Button>
      )}

      {/* Botão para voltar */}
      <Button style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Voltar</Text>
      </Button>
    </View>
  );
};

export default VerTarefa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2D2D29',
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    fontFamily: 'Silkscreen-Bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  status: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3CA2A2',
    width: 200,
    height: 35,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2D29',
  },
  loadingText: {
    color: '#FFF',
    fontSize: 18,
    marginTop: 10,
  },
  taskInfo: {
    width: '100%',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#3C3C3C',
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  taskInfoText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 5,
  },
});
