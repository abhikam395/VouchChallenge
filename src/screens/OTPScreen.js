import React, {Component, createRef} from 'react';
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PRIMARY } from '../assets/colors';
import SignupHeader from '../components/SignupHeader';
import OTPTextInput from 'react-native-otp-textinput';
import OTPTextView from 'react-native-otp-textinput';

export default class OTPScreen extends Component{

    constructor(props){
        super(props);
        let {params} = props.route;
        let {number, confirmation} = JSON.parse(params);
        this.state = {
            phone: number || null,
            confirm: confirmation || null,
            otp: null
        };
        this.otpInput = createRef();
        this.confirmCode = this.confirmCode.bind(this);
        this.handleOTP = this.handleOTP.bind(this);
    }

    handleOTP(value){
        this.setState({otp: value});
    }

    async confirmCode() {
        let {otp, confirm} = this.state;
        console.log(otp);
        console.log(confirm)
        try {
          const response = await confirm(otp);
          console.log(response)
        } catch (error) {
          console.log('Invalid code.');
        }
      }

    render(){
        let {phone} = this.state;
        let {navigation} = this.props;
        return (
            <SafeAreaView style={styles.container}>
                 <StatusBar 
                    translucent={false} 
                    backgroundColor="white"
                    barStyle="dark-content"/>
                <SignupHeader 
                    title="OTP Verification"
                    navigation={navigation}/>
                <View style={styles.content}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Enter the OTP send to</Text>
                        <Text style={styles.phoneLabel}>{phone}</Text>
                    </View>
                    <OTPTextInput
                        ref={e => (this.otpInput = e)} 
                        handleTextChange={this.handleOTP}
                        inputCount={6}
                        containerStyle={styles.optContainer}
                        textInputStyle={styles.otpBox} 
                    />
                    <View style={styles.row}>
                        <Text style={styles.label}>Don't receive the OTP?</Text>
                        <TouchableOpacity style={styles.resendOtpButton}>
                            <Text style={styles.resendOtpLabel}>RESEND OTP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity 
                    style={styles.verifyButton}
                    onPress={this.confirmCode}>
                    <Text style={styles.verifyButtonLabel}>Verify & Proceed</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        padding: 20,
        paddingHorizontal: 30
    },
    row: {
        marginTop: 40,
        alignItems: 'center',
        flexDirection: 'row'
    },
    label: {
        fontSize: 14,
        color: '#bdbdbd',
        fontWeight: '500'
    },
    phoneLabel: {
        marginLeft: 5,
        fontSize: 15,
        fontWeight: 'bold'
    },
    resendOtpButton: {
        marginLeft: 5
    },
    resendOtpLabel: {
        color: 'red',
        fontWeight: '500',
        fontSize: 14
    },
    verifyButtonLabel: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    verifyButton: {
        height: 50,
        backgroundColor: PRIMARY,
        marginVertical: 20,
        position: 'absolute',
        width: Dimensions.get('screen').width - 40,
        alignSelf: 'center',
        bottom: 40,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    otpBox: {
        width: 30,
        fontSize: 16
    },
    optContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 10
    }
})