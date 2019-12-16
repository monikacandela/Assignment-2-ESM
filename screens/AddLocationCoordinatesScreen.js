//screens
//AddLocationCoordinatesScreen.js

import React from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import {Subscribe} from 'unstated'

import StateContainer from '../StateContainer'
import styles from '../style'


const AddLocationCoordinatesScreen = props => {
	return(
		<Subscribe to = {[StateContainer]}>
			{
				container =>
				(
					<View style = {styles.container}>
						<Text style = {styles.text}>Insert latitude</Text>
						<TextInput
							style = {styles.textInput}
							onChangeText = {(latitude) => container.setTempLat(latitude)}
							keyboardType={'numeric'}
						>
						</TextInput>
						<Text style = {styles.text}>Insert longitude</Text>
						<TextInput
							style = {styles.textInput}
							onChangeText = {(longitude) => container.setTempLon(longitude)} 
							keyboardType={'numeric'}
						>
						</TextInput>
						<TouchableOpacity
							style = {styles.button}
							onPress = {() => 
								{
									container.addLocationCoordinates()
									props.navigation.navigate("Locations")
								}
							}
						>
							<Text style = {styles.buttonText}>Add</Text>
						</TouchableOpacity>
					</View>
				)
			}
		</Subscribe>
	)
}

AddLocationCoordinatesScreen.navigationOptions = ({navigation}) => ({
	title: "Add Location",
	headerStyle: {
      backgroundColor: 'darkblue',
    },
	headerTintColor: 'darkorange',
})

export default AddLocationCoordinatesScreen