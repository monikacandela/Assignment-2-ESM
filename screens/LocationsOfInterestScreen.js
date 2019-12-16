//screens
//LocationsOfInterestScreen.js

import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {Subscribe} from 'unstated'

import styles from '../style'
import StateContainer from '../StateContainer'
import LocationsOfInterestList from '../LocationsOfInterestList'



const LocationsOfInterestScreen = props => {
	return(
		<Subscribe to = {[StateContainer]}>
		{
			container =>
			(
				<View style = {styles.container}>
					<TouchableOpacity
						style = {styles.button}
						onPress = {async () => {
							await container.setCurrentLocation(await container.useMyLocation())
							props.navigation.navigate("Articles")
						}}
					>
						<Text style = {styles.buttonText}>Use my Location</Text> 
					</TouchableOpacity>
					<LocationsOfInterestList
						locations = {container.getSavedLocations()}
						onDelete = {location => container.deleteLocation(location)}
						selectLocation = {location => {
							container.setCurrentLocation(location)
							props.navigation.navigate("Articles")
						}}
					/>
				</View>
			)
		}
		</Subscribe>
	)
}

LocationsOfInterestScreen.navigationOptions = ({navigation}) => ({
	title: "Locations of interest",
	headerStyle: {
      backgroundColor: 'darkblue',
    },
	headerTintColor: 'darkorange',
	headerRight: 
		<TouchableOpacity
			style = {styles.buttonInverted}
			onPress= {() => navigation.navigate("AddLocation")}
		>
			<Text style = {styles.buttonTextInverted}>Add Location</Text>
		</TouchableOpacity>
})

export default LocationsOfInterestScreen