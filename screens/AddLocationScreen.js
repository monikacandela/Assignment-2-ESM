//screens
//AddLocationScreen.js

import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'

import styles from '../style'


const AddLocationScreen = props => {
	return(
		<View style = {styles.container}>
			<TouchableOpacity
				style = {styles.button}
				onPress = {() => props.navigation.navigate("AddLocationCoordinates")}
			>
				<Text style = {styles.buttonText}>Add Location from Coordinates</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style = {styles.button}
				onPress = {() => props.navigation.navigate("AddLocationAddress")}
			>
				<Text style = {styles.buttonText}>Add Location from Address</Text>
			</TouchableOpacity>
		</View>
	)
}

AddLocationScreen.navigationOptions = ({navigation}) => ({
	title: "Add Location",
	headerStyle: {
      backgroundColor: 'darkblue',
    },
	headerTintColor: 'darkorange',
})

export default AddLocationScreen