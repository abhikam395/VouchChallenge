import React, {Component} from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { PRIMARY } from '../assets/colors';
import SignupHeader from '../components/SignupHeader';
import auth from '@react-native-firebase/auth';

export default class SignupScreen extends Component{

    constructor(){
        super();
        this.state = {
            firstname: null,
            lastname: null,
            username: null,
            email: null,
            number: null,
            referralCode: null,
            loading: false,
            confirmation: null
        }
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.handleReferralCode = this.handleReferralCode.bind(this);
        this.navigateToOtpScreen = this.navigateToOtpScreen.bind(this);
        this.getOTP = this.getOTP.bind(this);
    }

    async signInWithPhoneNumber(phoneNumber, countryCode = '+91') {
        const confirmation = await auth().signInWithPhoneNumber(`${countryCode}${phoneNumber}`);
        this.setState({confirmation: confirmation?.confirm, loading: false});
        ToastAndroid.show('OTP sent', ToastAndroid.SHORT);
    }

    async getOTP(){
        let {number} = this.state;
        this.setState({loading: true});
        try {
            await this.signInWithPhoneNumber(number);
            this.navigateToOtpScreen();
        } catch (error) {
            console.log(error)
            this.setState({loading: false});
        }
    }

    navigateToOtpScreen(){
        let {confirmation, number} = this.state;
        console.log(confirmation)
        let {navigation} = this.props;
        let data = {
            number,
            confirmation
        }
        navigation.navigate('OTP', JSON.stringify(data));
    }

    handleFirstName(value){
        this.setState({firstname: value});
    }   

    handleLastName(value){
        this.setState({lastname: value});
    }

    handleUsername(value){
        this.setState({username: value});
    }
    
    handleEmail(value){
        this.setState({email: value});
    }

    handlePhoneNumber(value){
        this.setState({number: value});
    }

    handleReferralCode(){
        this.setState({referralCode: value});
    }

    render(){
        let {navigation} = this.props;
        let {loading} = this.state;

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <StatusBar 
                    translucent={false} 
                    backgroundColor="white"
                    barStyle="dark-content"/>
                <SignupHeader 
                    title="Sign Up!"
                    navigation={navigation}/>
                <View style={styles.content}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            onChangeText={this.handleFirstName} 
                            style={styles.input}
                            placeholder="Enter your first name"
                            placeholderTextColor="lightgrey"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput 
                            onChangeText={this.handleLastName} 
                            style={styles.input}
                            placeholder="Enter your last name"
                            placeholderTextColor="lightgrey"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={this.handleUsername} 
                            placeholder="Enter a unique username(max 20 char)"
                            placeholderTextColor="lightgrey"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={this.handleEmail} 
                            keyboardType="email-address"
                            placeholder="Enter your email id"
                            placeholderTextColor="lightgrey"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={this.handlePhoneNumber} 
                            placeholder="For ex: 9898989898"
                            maxLength={10}
                            keyboardType="number-pad"
                            placeholderTextColor="lightgrey"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Referral Code</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={this.handleReferralCode} 
                            placeholder="For ex: NEWUSER"
                            placeholderTextColor="lightgrey"
                        />
                    </View>
                </View>
                <TouchableOpacity 
                    style={styles.otpButton}
                    onPress={this.getOTP}>
                    {loading && <ActivityIndicator size="small" color="white"/>}
                    {!loading && <Text style={styles.otpButtonLabel}>Get OTP</Text>}
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').height,
        backgroundColor: "white",
    },
    inputContainer: {
        marginTop: 20
    },
    content: {
        paddingHorizontal: 30,
    },
    label: {
        fontSize: 14,
        fontWeight: '500'
    },
    input: {
        borderWidth: .5,
        borderRadius: 10,
        borderColor: 'lightgrey',
        height: 40,
        marginTop: 10,
        paddingHorizontal: 10,
        color: 'grey'
    },
    otpButton: {
        height: 50,
        backgroundColor: PRIMARY,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: Dimensions.get('screen').width - 40,
        alignSelf: 'center',
        bottom: 60
    },
    otpButtonLabel: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16
    }
})