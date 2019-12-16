//screens
//AddLocationAddressScreen.js

import React from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import {Subscribe} from 'unstated'

import StateContainer from '../StateContainer'
import styles from '../style'


const AddLocationAddressScreen = props => {
	return(
		<Subscribe to = {[StateContainer]}>
			{
				container =>
				(
					<View style = {styles.container}>
						<Text style = {styles.text}>Insert address</Text>
						<TextInput
							style = {styles.textInput}
							onChangeText = {(address) => container.setTempAddress(address)}
						>
						</TextInput>
						<TouchableOpacity
							style = {styles.button}
							onPress = {() => 
								{
									container.addLocationAddress()
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

AddLocationAddressScreen.navigationOptions = ({navigation}) => ({
	title: "Add Location",
	headerStyle: {
      backgroundColor: 'darkblue',
    },
	headerTintColor: 'darkorange',
})

export default AddLocationAddressScreen