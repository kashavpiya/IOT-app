import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView  } from 'react-native';
import { PaperProvider, Snackbar } from 'react-native-paper';
import { height, width } from 'react-native-dimension';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../states/auth/AuthContext';
import { ELECTRIC_BLUE } from '../shared/Constant';

const ResetPass = ({ navigation, route }) => {
    const [username, setUsername] = useState(route.params.username || '');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [cfPassword, setCfPassword] = useState('');
    const [visible, setVisible] = useState(true);
    const [msg, setMessage] = useState('');
    const { resetPassword } = useContext(AuthContext);

    useEffect(() => {
        setMessage('');
      }, [navigation]);

    const reset = async () =>  {
        if (newPassword != cfPassword) {
            setVisible(true);
            setMessage('Password does not match!');
        } else {
            resetPassword(username, code, newPassword);
            navigation.navigate('SignIn');
        }
        
    };

    return (
        <PaperProvider>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
            <ScrollView style={styles.container}>
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
                        placeholder="Verification Code"
                        value={code}
                        onChangeText={(text) => setCode(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        value={newPassword}
                        secureTextEntry
                        onChangeText={(text) => setNewPassword(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        value={cfPassword}
                        secureTextEntry
                        onChangeText={(text) => setCfPassword(text)}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={reset} style={styles.button}>
                        <Text style={styles.buttonText}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>

            {msg &&
                <Snackbar
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    duration={5000}
                    >
                    {msg}
                </Snackbar>
            }
            </KeyboardAvoidingView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
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
        marginBottom: height(22),
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
  
  export default ResetPass;