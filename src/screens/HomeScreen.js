import React, {Component, createRef} from 'react';
import { Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import headerImage from './../assets/images/home-background.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PRIMARY } from '../assets/colors';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import helpIcon from './../assets/images/help.png';
import notificationIcon from './../assets/images/notification.png';
import peopleIcon from './../assets/images/people.png';

export default class HomeScreen extends Component{

    constructor(){
        super();
        this.bottomSheetRef = createRef();
    }

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar 
                    translucent 
                    backgroundColor="transparent" 
                    barStyle="dark-content"
                />
                <View style={styles.profileContainer}>

                </View>
                <Image style={styles.headerImage} source={headerImage}/>
                <View style={styles.searchContainer}>
                    <Ionicons 
                        name="search" 
                        color={PRIMARY}
                        size={22}/>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Find people who are vouched."
                        placeholderTextColor="lightgrey"/>
                </View>
                <BottomSheet
                    ref={this.bottomSheetRef}
                    index={1}
                    snapPoints={['60%', '60%']}
                    // onChange={handleSheetChanges}
                    >
                    <BottomSheetScrollView style={styles.bottomSheetContainer}>
                        <Text style={styles.title}>Recent</Text>
                        <View style={styles.row}>
                            <TouchableOpacity style={styles.option}>
                                <View style={styles.iconContainer}>
                                    <Image source={notificationIcon} style={styles.icon}/>
                                </View>
                                <Text style={styles.optionLabel}>All Notifications</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.option}>
                                <View style={styles.iconContainer}>
                                    <Image source={peopleIcon} style={styles.icon}/>
                                </View>
                                <Text style={styles.optionLabel}>Who is using</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.option}>
                                <View style={styles.iconContainer}>
                                    <Image source={helpIcon} style={styles.icon}/>
                                </View>
                                <Text style={styles.optionLabel}>Help Bot</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.paymentButton}>
                            <Ionicons 
                                name="add" 
                                color="white" 
                                size={20}
                            />
                            <Text style={styles.paymentLabel}>New Payments</Text>
                        </TouchableOpacity>
                    </BottomSheetScrollView>
                </BottomSheet>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerImage: {
        height: Dimensions.get('screen').height * .3,
        resizeMode: 'cover',
        width: '100%'
    },
    searchContainer: {
        height: 50,
        borderWidth: .7,
        borderColor: 'lightgrey',
        borderRadius: 25,
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    input: {
        paddingHorizontal: 10,
        paddingLeft: 15,
        color: PRIMARY,
        fontSize: 13
    },
    profileContainer: {
        height: 44,
        width: 44,
        borderRadius: 22,
        backgroundColor: 'lightgrey',
        position:'absolute',
        top: 40,
        right: 20
    },
    bottomSheetContainer: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30
    },
    option: {
        flex: 1,
        alignItems: 'center'
    },
    optionLabel: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '400'
    },
    iconContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    paymentButton: {
        height: 46,
        backgroundColor: PRIMARY,
        width: '60%',
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 50
    },
    paymentLabel: {
        color: 'white',
        fontSize: 14,
        marginLeft: 15
    },
    icon: {
        height: 18,
        width: 18
    }
})