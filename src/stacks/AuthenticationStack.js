import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OTPScreen from '../screens/OTPScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createNativeStackNavigator();

export default function AuthenticationStack(){
    return (
        <Stack.Navigator 
            screenOptions={{headerShown:false}} 
            initialRouteName="Signup">
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
        </Stack.Navigator>
    )
}