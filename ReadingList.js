//ReadingList.js

import React from 'react';
import {Icon} from 'react-native-elements'
import {StyleSheet, Text, View, ScrollView, Button, FlatList, TouchableOpacity, Linking} from 'react-native'

import styles from './style'

const Article = props => (
	<View style = {styles.article}>
		<TouchableOpacity
			onPress = {() => props.onDelete(props.article)} 
		>
			<View style = {styles.articleSaveButton}>
				<Icon name='check-circle' />
				<Text>saved</Text>
			</View>
		</TouchableOpacity>
		
		<View style = {styles.articletitle}>
			<TouchableOpacity
				onPress = {() => {Linking.openURL(props.weblink)}}
			>
				<Text>{props.title}</Text>
				<Text>Distance : {props.distance} m</Text>
			</TouchableOpacity>
		</View>
	</View>
)

const ReadingList = props => {
	const articles = props.articles

	return(
		<ScrollView>
			{
				articles.map(article =>
				(
					<Article
						key = {article.title}
						title = {article.title}
						distance = {article.distance}
						article = {article}
						onDelete = {(article) => props.onDelete(article)}
						weblink = {"https://en.wikipedia.org/wiki/" + article.title.replace(" ", "_")} 
					/>
				)
			)
			}
		</ScrollView>
	)
}

export default ReadingList