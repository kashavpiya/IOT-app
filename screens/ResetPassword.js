import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { PaperProvider, Snackbar } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../states/auth/AuthContext';
import { ELECTRIC_BLUE } from '../shared/Constant';

const ResetPassword = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [visible, setVisible] = useState(true);
    const { sendVerification } = useContext(AuthContext);

    const resetPassword = async () => {
        sendVerification(username);
        navigation.navigate('ResetPass', { username: username });
    };

    return (
        <PaperProvider>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.container}>
                        <View style={styles.navContainer}>
                            <MaterialCommunityIcons
                                name='chevron-left'
                                size={24}
                                color={'white'}
                                onPress={() => navigation.goBack()}
                            />
                        </View>

                        <View style={styles.bottomContainer}>
                            <Text style={styles.title}>Reset Password</Text>
                            <Text style={styles.normalText}>If the username exists, you will receive a verification code in the email the username is linked to.</Text>
                            <TextInput
                                placeholder="Enter your username"
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                                style={styles.input}
                            />
                            <TouchableOpacity onPress={resetPassword} style={styles.button}>
                                <Text style={styles.buttonText}>Send Verification Code</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#212121',
    },
    navContainer: {
        backgroundColor: '#212121',
        paddingTop: height(8),
        paddingLeft: width(4),
    },
    bottomContainer: {
        flex: 1,
        alignItems: 'center', // Center horizontally
        paddingHorizontal: width(10), // Add horizontal padding
    },
    title: {
        fontSize: 20,
        marginBottom: height(28),
        marginTop: height(3),
        color: 'white',
        fontFamily: 'SofiaSans_400Regular',
    },
    normalText: {
        fontSize: 14,
        marginBottom: height(3),
        color: 'white',
        fontFamily: 'SofiaSans_400Regular',
        lineHeight: 20,
        textAlign: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        backgroundColor: 'white',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        marginBottom: height(3),
    },
    button: {
        backgroundColor: ELECTRIC_BLUE,
        padding: 10,
        borderRadius: 25,
        width: width(80),
    },
    buttonText: {
        color: 'white',
        fontFamily: 'SofiaSans_400Regular',
        textAlign: 'center',
    },
});

export default ResetPassword;