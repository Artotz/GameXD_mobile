import { StatusBar } from "expo-status-bar";
import React from 'react';
import { Text, View, StyleSheet, Image } from "react-native";

const home = require('../../../assets/Vector (4).svg');
const review = require('../../../assets/Vector (5).svg');
const message = require('../../../assets/ph_chat-bold.svg');
const profile = require('../../../assets/iconamoon_profile.png');

export default function TabBar() {
    return (
        <View style={styles.container}>
            <Image source={home} style={styles.icon} />
            <Image source={review} style={styles.icon} />
            <Text style={styles.plusIcon}> + </Text>
            <Image source={message} style={styles.icon} />
            <Image source={profile} style={styles.icon} />
            <StatusBar style="auto" />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',        // Alinha os itens em uma linha
        backgroundColor: '#373545',  
        padding: 10,                 
        justifyContent: 'space-around',  // Distribui os ícones uniformemente
        width: 412,
        height: 78,
        alignItems: 'center',
    },
    icon: {
        width: 24,     
        height: 24,    
        tintColor: 'white', 
    },
    plusIcon: {
        fontSize: 24,    
        color: 'white',  
        textAlign: 'center', 
    }
});


