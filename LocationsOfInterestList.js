//LocationsOfInterestList.js
import React from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'

import styles from './style'

const Location = props => (
	<View style = {styles.article}>
		<TouchableOpacity
			onPress = {() => props.onDelete(props.location)} 
		>
			<View style = {styles.articleSaveButton}>
				<Icon name='delete' />
				<Text>delete</Text>
			</View>
		</TouchableOpacity>
		<View style = {styles.articletitle}>
			<TouchableOpacity
				onPress = {() => {
					props.selectLocation(props.location)
				}}
			>
				<Text>
					{props.location.address}
				</Text>
			</TouchableOpacity>
		</View>
	</View>
)



const LocationsOfInterestList = props => {
	const locations = props.locations
	
	return(
		<ScrollView>
		{
			locations.map(location =>
			(
				<Location
					key = {"" + location.lat + "," + location.lon}
					location = {location}
					onDelete = {location => props.onDelete(location)}
					selectLocation = {location => {props.selectLocation(location)}}
				/>
			))
		}
		</ScrollView>
	)
}

export default LocationsOfInterestList