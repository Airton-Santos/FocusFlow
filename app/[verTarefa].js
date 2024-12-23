import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const VerTarefa = () => {

  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [tarefa, setTarefa] = useState({});

  const getTarefas = async () =>  {
    try{
      const docRef = doc(db, "Tarefa", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTarefa(docSnap.data())
      }
      else{
        console.log("documento não foi encontrado");
      }
    }
    catch{
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getTarefas();
  }, []);  

  return (
    <View>
      {loading ? (
        <ActivityIndicator/>
        ): (
          <>
                    <Text>Título: {tarefa.titulo}</Text>
                    <Text>Descrição: {tarefa.descricao}</Text>
                    <Text>Concluída: {tarefa.concluida.toString()}</Text>
          </>
        )}  

    </View>
  );
};

export default VerTarefa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2D2D29',
  },
  title: {
    fontSize: 28,
    color: '#FFF',
    fontFamily: 'Silkscreen-Bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#A5A5A5',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
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
  },
});
