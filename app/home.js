import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React from 'react'

const home = () => {
  return (
    <View style={styles.container}>

        <ImageBackground source={require('../assets/Elements/BackgroundUser.png')} style={styles.background}>

        <View style={styles.user}>

            <Image source={require('../assets/Elements/avatar-do-usuario.png')} style={styles.userImage}/>
            <Text>Nome</Text>

        </View>

        </ImageBackground>
        
        
        <View style={styles.tarefas}>

        </View>

        <View style={styles.navgation}>

        </View>

    </View>
  )
}

export default home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D29'
    },

    user: {
        display: 'flex',
        alignContent: 'center',
        textAlign: 'center'

    },

    userImage: {
        width: 100,
        height: 100
    }

})