import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para outra tela após 5s
    const timer = setTimeout(() => {
      router.push('/main');
    }, 5000); // 5000 equivale a 5 segundos

    return () => clearTimeout(timer);  // Corrigido: "return" escrito corretamente
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Outros elementos sobre a animação */}
      <Image
        source={require('../assets/Elements/Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.NameApp}>Focus Flow</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2D29',  // Cor de fundo padrão
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',  // Para garantir que os elementos fiquem no centro
  },
  logo: {
    width: 150,
    height: 150,
    zIndex: 1,  // Garante que o logo fique no topo
  },
  NameApp: {
    fontSize: 25,
    marginTop: 20,
    color: '#FFF',  // Texto branco para contraste
    zIndex: 1,  // Garante que o texto fique no topo
  },
});
