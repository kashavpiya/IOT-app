import { React, useState, useContext } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  TextInput,
  PaperProvider,
  MD3DarkTheme,
  Portal,
  Modal,
} from 'react-native-paper';
import { Snackbar } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';
import { width, height } from 'react-native-dimension';
import axios from 'axios';
import Checkbox from 'expo-checkbox';
import { ELECTRIC_BLUE } from '../shared/Constant';
import logo from '../assets/logo.png';
import RadialGradientBackground from '../components/GradientBackground';
import { AuthContext } from '../states/auth/AuthContext';
import { RFValue } from 'react-native-responsive-fontsize';

const SignUp = ({ navigation }) => {
  const linkTo = useLinkTo();
  const { register } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cfPassword, setCfPassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [checkOne, setCheckOne] = useState(false);
  const [checkTwo, setCheckTwo] = useState(false);
  const [disclaimerModal, setDisclaimerModal] = useState(false);
  const [policyModal, setPolicyModal] = useState(false);

  const signUp = async () => {
    if (password != cfPassword) {
      setVisible(true);
      setMessage('Password does not match!');
    } else if (userName === '' || password === '') {
      setVisible(true);
      setMessage('Username and/or Password is required');
    } else if (cfPassword === '') {
      setVisible(true);
      setMessage('Please confirm your password');
    } else if (!(checkOne && checkTwo)) {
      setMessage('Please indicate your consent');
    } else {
      // try {
      //   const response = await axios.post(
      //     "https://api.powershower.net/api/auth/signup",
      //     { "username": userName,"password": password, "role": ["user"], "email": email }
      //   );
      //   navigation.navigate('SignIn', { message: 'Register Successfully! Please sign in now.' });
      // } catch (error) {
      //   console.log(error.response.data);
      //   setMessage(error.response.data.message);
      // }
      const errorMessage = await register(userName, password, email);
      // navigation.navigate('SignIn', { message: 'Register Successfully! Please sign in now.' });
        if (errorMessage) {
          if (errorMessage === 'Error: Email is already in use!') {
            setMessage("Email is already in use");
            
          } else if (errorMessage === 'Error: Username is already taken!') {
            setMessage("Username is already in use");
            
          }
          setVisible(true);
        } else {
          setMessage("Account created. Please verify your email and login.")
          setVisible(true);
          
          setUserName('');
          setEmail('');
          setPassword('');
          setCfPassword('');
          setCheckOne(false);
          setCheckTwo(false);
          
        }
      // navigation.navigate('SignIn', { message: 'Register Successfully! Please sign in now.' });
    }
  }

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        
        <View style={styles.container}>
          {/* <RadialGradientBackground /> */}
          <View style={styles.content}>
            <View style={{ alignItems: 'center' }}>
              <Image source={logo} style={styles.logo} />
            </View>
            <Text variant='titleMedium' style={styles.title}>
              Create Account
            </Text>
            <View style={{ alignItems: 'center' }}>
              <TextInput
                label="User Name (*)"
                value={userName}
                autoCapitalize="none"
                underlineColor='transparent'
                activeUnderlineColor='white'
                style={styles.input}
                onChangeText={text => setUserName(text)}
                theme={{ roundness: 10 }}
              />
              <TextInput
                label="Email"
                value={email}
                autoCapitalize="none"
                underlineColor='transparent'
                activeUnderlineColor='white'
                style={styles.input}
                onChangeText={text => setEmail(text)}
                theme={{ roundness: 10 }}
              />
              <TextInput
                label="Password (*)"
                value={password}
                secureTextEntry
                underlineColor='transparent'
                activeUnderlineColor='white'
                style={styles.input}
                onChangeText={text => setPassword(text)}
                theme={{ roundness: 10 }}
              />
              <TextInput
                label="Confirm Password (*)"
                value={cfPassword}
                secureTextEntry
                underlineColor='transparent'
                activeUnderlineColor='white'
                style={styles.input}
                onChangeText={text => setCfPassword(text)}
                theme={{ roundness: 10 }}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={checkOne}
                onValueChange={setCheckOne}
                style={{ borderColor: 'white' }}
              />
              <Text style={styles.text}>I hereby consent to the Power Shower{' '}
                <Text
                  style={{ textDecorationLine: 'underline' }}
                  onPress={() => setDisclaimerModal(true)}
                >
                  Disclaimer
                </Text>
              </Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={checkTwo}
                onValueChange={setCheckTwo}
                style={{ borderColor: 'white' }}
              />
              <Text style={styles.text}>I hereby consent to the Power Shower{' '}
                <Text
                  style={{ textDecorationLine: 'underline' }}
                  onPress={() => setPolicyModal(true)}
                >
                  Private Policy
                </Text>
              </Text>
            </View>
            <TouchableOpacity onPress={signUp}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>REGISTER</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => linkTo('/SignIn')}
              style={{ alignItems: 'center' }}
            >
                <Text style={[styles.buttonText, { textDecorationLine: 'underline', fontSize: RFValue(14) }]}>Log In</Text>
            </TouchableOpacity>
            <Text style={styles.copyright}>
              Copyright Dry Water Inc. 2024 All Rights Reserved
            </Text>
          </View>
          
        </View>
      </TouchableWithoutFeedback>
      {message &&
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={5000}
        >
          {message}
        </Snackbar>
      }

      <Portal>
        <Modal
          visible={disclaimerModal}
          onDismiss={() => setDisclaimerModal(false)}
          style={styles.modalContainer}
          swipeDirection={['down']}
        >
          <ScrollView>
            <Text style={styles.modalTitle}>
              Disclaimer for Dry Water Inc
            </Text>
            <Text style={styles.modalBody}>
              We are doing our best to prepare the content of this app. However, Dry Water Inc.
              cannot warranty the expressions and suggestions of the contents, as well as its
              accuracy. In addition, to the extent permitted by the law, Dry Water Inc. shall not be
              responsible for any losses and/or damages due to using the information on our app. Our
              Disclaimer was generated with the help of the App Disclaimer Generator from App-
              Privacy-Policy.com.
            </Text>
            <Text
              style={{
                fontWeight: 'bold'
              }}
            >
              By using our app, you hereby consent to our disclaimer and agree to its terms.
            </Text>
            <Text>
              Any links contained in our app may lead to external sites are provided for convenience
              only. Any information or statements that appeared in these sites or apps are not
              sponsored, endorsed, or otherwise approved by Dry Water Inc. For these external sites,
              Dry Water Inc. cannot be held liable for the availability of or the content located on or
              through it. Plus, any losses or damages occurred from using these contents or the
              internet generally.
            </Text>
          </ScrollView>
        </Modal>

        <Modal
          visible={policyModal}
          onDismiss={() => setPolicyModal(false)}
          style={styles.modalContainer}
          swipeDirection={['down']}
        >
          <ScrollView>
            <Text style={styles.modalHeading}>Privacy Policy for Dry Water, Inc.</Text>
            <Text style={styles.modalBody}>
              At Dry Water, Inc., one of our main priorities is the privacy of our visitors. This Privacy
              Policy document contains types of information that are collected and recorded by Dry
              Water, Inc. and how we use it.
              If you have additional questions or require more information about our Privacy Policy,
              please get in touch with us.
            </Text>
            <Text style={styles.modalTitle}>Log Files</Text>
            <Text style={styles.modalBody}>
              Dry Water, Inc. follows a standard procedure of using log files. These files log visitors
              when they use the app. The information collected by log files includes internet protocol
              (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp,
              referring/exit pages, and possibly the number of clicks. These are not linked to any
              information that is personally identifiable. The information aims to analyze trends,
              administer the app, track users' movement on the app, and gather demographic
              information.
            </Text>
            <Text style={styles.modalTitle}>Email</Text>
            <Text style={styles.modalBody}>
              Dry Water collects users email address for account set up and user verification. We
              adhere to CAN-SPAM Federal Communications Act and do not share or sell your email
              address to any third party vendors.
            </Text>
            <Text style={styles.modalTitle}>Our Advertising Partners</Text>
            <Text style={styles.modalBody}>
              Some of the advertisers in our app may use cookies and web beacons. Our advertising
              partners are listed below. Each of our advertising partners has its own Privacy Policy
              for their policies on user data. For easier access, we hyperlinked to their Privacy
              Policies below.
            </Text>
            <Text style={styles.modalTitle}>Google</Text>
            <Text style={styles.modalBody}>
              https://policies.google.com/technologies/ads
            </Text>
            <Text style={styles.modalTitle}>Privacy Policies</Text>
            <Text style={styles.modalBody}>
              You may consult this list to find the Privacy Policy for each of the advertising partners of Dry Water, Inc.

              Third-party ad servers or ad networks use technologies like cookies, JavaScript, or
              Beacons used in their respective advertisements and links appearing on Dry Water,
              Inc.. They automatically receive your IP address when this occurs. These technologies
              are used to measure the effectiveness of their advertising campaigns and/or to
              personalize the advertising content that you see on this app or other apps or websites.

              Note that Dry Water, Inc. has no access to or control over these cookies that third-
              party advertisers use.
            </Text>
            <Text style={styles.modalTitle}>Third Party Privacy Policies</Text>
            <Text style={styles.modalBody}>
              Dry Water, Inc.'s Privacy Policy does not apply to other advertisers or websites. Thus,
              we are advising you to consult the respective Privacy Policies of these third-party ad
              servers for more detailed information. It may include their practices and instructions
              about opting out of certain options.
            </Text>
            <Text style={styles.modalTitle}>Children's Information</Text>
            <Text style={styles.modalBody}>
              Another part of our priority is adding protection for children while using the internet. We
              encourage parents and guardians to observe, participate in, and/or monitor and guide
              their online activity.
              Dry Water, Inc. does not knowingly collect any Personal Identifiable Information from
              children under the age of 13. If you think that your child provided this kind of
              information on our App, we strongly encourage you to contact us immediately, and we
              will do our best efforts to remove such information from our records promptly.
            </Text>
            <Text style={styles.modalTitle}>Online Privacy Policy Only</Text>
            <Text style={styles.modalBody}>
              This Privacy Policy applies only to our online activities and is valid for visitors to our
              App regarding the information that they share and/or collect in Dry Water, Inc.. This
              policy is not applicable to any information collected offline or via channels other than
              this app. Our Privacy Policy was created with the help of the "https://www.app-
              privacy-policy.com/app-privacy-policy-generator/". App Privacy Policy Generator from
              App-Privacy-policy.com.
            </Text>
            <Text style={styles.modalTitle}>Consent</Text>
            <Text style={styles.modalBody}>
              By using our app, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
            </Text>
          </ScrollView>
        </Modal>
      </Portal>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
  },
  content: {
    position: 'absolute',
  },
  logo: {
    resizeMode: 'contain',
    width: width(65),
    height: height(10),
    marginTop: height(8),
   },
  title: {
    marginTop: height(5),
    color: 'white',
    textAlign: 'center',
    marginBottom: height(2),
    fontSize: RFValue(16),
    fontFamily: 'NunitoSans_400Regular'
  },
  input: {
    backgroundColor: '#363636',
    width: width(80),
    marginBottom: height(2),
    borderRadius: 10,
    fontSize: RFValue(14),
    fontFamily: 'NunitoSans_400Regular'
  },
  button: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: 10,
    width: width(80),
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: height(3),
    marginBottom: height(5)
  },
  text: {
    color: 'white',
    fontStyle: 'italic',
    marginTop: height(5),
  },
  buttonText: {
    color: 'white',
    fontSize: RFValue(14),
    fontFamily: 'NunitoSans_400Regular'
  },
  text: {
    fontSize: RFValue(12),
    color: 'white',
    marginLeft: width(2),
    fontFamily: 'NunitoSans_400Regular'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    marginTop: height(1)
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: RFValue(16),
    marginBottom: 10,
  },
  modalBody: {
    marginBottom: 10,
  },
  modalHeading: {
    fontWeight: 'bold',
    fontSize: RFValue(16),
    marginBottom: 10,
    textAlign: 'center'
  },
  copyright: {
    marginTop: height(1),
    fontSize: RFValue(9),
    textAlign: 'center',
    color: '#C9C9C9',
    fontFamily: 'NunitoSans_400Regular'
  }
})

export default SignUp;