import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AuthenticationStack from './AuthenticationStack';

const Stack = createNativeStackNavigator();

export default function AppStack(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth" 
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Auth" component={AuthenticationStack}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}