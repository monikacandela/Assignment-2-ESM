//screens
//ReadingListScreen.js

import React from 'react'
import {View, Text} from 'react-native'
import {Subscribe} from 'unstated'

import styles from '../style'
import StateContainer from '../StateContainer'
import ReadingList from '../ReadingList'

const ReadingListScreen = props => {
	return(
		<Subscribe to = {[StateContainer]}>
		{ 
			container =>
			(
			<View style = {styles.container}>
				{container.isLoading()?
					(
					<Text style = {styles.text}>
						Loading...
					</Text>
					):
					(container.isEmpty(container.getReadingList())?
						(
						<View style = {styles.container}>
							<Text style = {styles.text}>
								No Article saved in the Rading List.
							</Text>
						</View>
						):
						(
						<ReadingList
							articles = {container.getReadingList()}
							onDelete = {(article) => container.deleteToReadArticle(article)}
						/>
						)
					)
				}
			</View>
			)
		}
		</Subscribe>
	)
}

ReadingListScreen.navigationOptions = ({navigation}) => ({
	title: "Articles to read",
	headerStyle: {
      backgroundColor: 'darkblue',
    },
	headerTintColor: 'darkorange',
})

export default ReadingListScreen