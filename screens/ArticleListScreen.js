//screens
//ArticleListScreen.js

import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {Subscribe} from 'unstated'

import styles from '../style'
import StateContainer from '../StateContainer'
import ArticleList from '../ArticleList'

const ArticleListScreen = props => {
	return(
		<Subscribe to = {[StateContainer]}>
		{
			container =>
			(
				(container.isLoading()?
					(
					<Text style = {styles.text}>
						Loading...
					</Text>
					):
				(container.isEmpty(container.getCurrentLocation())?
					(
					<View style = {styles.container}>
						<Text style = {styles.text}>
							No Location selected, please select a Location
						</Text>
						<TouchableOpacity
							style = {styles.button}
							onPress = {() => props.navigation.navigate("Locations")}
						>
							<Text style = {styles.buttonText}>Select a Location</Text>
						</TouchableOpacity>
					</View>
					):
				(container.isEmpty(container.getArticlesNearMe())?
					(
					<View style = {styles.container}>
						<View style = {styles.selectedLocation}>
							<Text style = {styles.text}>Selected location: {container.getCurrentLocation().address}</Text>
						</View>
						<Text style = {styles.text}>
							No articles in the selected Location, please select a different Location
						</Text>
						<TouchableOpacity
							style = {styles.button}
							onPress = {() => props.navigation.navigate("Locations")}
						>
							<Text style = {styles.buttonText}>Select another Location</Text>
						</TouchableOpacity>
					</View>
					):
					(
					<View style = {styles.container}>
						<View style = {styles.selectedLocation}>
							<Text style = {styles.text}>Selected location: {container.getCurrentLocation().address}</Text>
							<TouchableOpacity
								style = {styles.button}
								onPress = {async () => 
									{
										await container.setTempLat(container.getCurrentLocation().lat)
										await container.setTempLon(container.getCurrentLocation().lon)
										container.addLocationCoordinates()
									}
								}
							>
								<Text style = {styles.buttonText}>Save this Location</Text>
							</TouchableOpacity>
						</View>
						<ArticleList
							articles = {container.getArticlesNearMe()}
							onSave = {(article) => container.addToReadArticle(article)}
							onDelete = {(article) => container.deleteToReadArticle(article)}
							isInReadingList = {(article) => container.isInReadingList(article)}
						/>
					</View>
					)
				)))
			)
		}
		</Subscribe>
	)
}

ArticleListScreen.navigationOptions = ({navigation}) => ({
	title: "Articles near me",
	headerStyle: {
      backgroundColor: 'darkblue',
    },
	headerTintColor: 'darkorange',
})

export default ArticleListScreen