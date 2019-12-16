//ArticleList.js
import React from 'react';
import {Icon} from 'react-native-elements'
import {Text, View, ScrollView, TouchableOpacity, Linking} from 'react-native'

import styles from './style'

const Article = props => (
	<View style = {styles.article}>
		{props.isInReadingList(props.article)?
			<TouchableOpacity
				onPress = {() => props.onDelete(props.article)} 
			>
				<View style = {styles.articleSaveButton}>
					<Icon name='check-circle' />
					<Text>saved</Text>
				</View>
			</TouchableOpacity>:
			<TouchableOpacity
				onPress = {() => props.onSave(props.article)} 
			>
				<View style = {styles.articleSaveButton}>
					<Icon name='bookmark' />
					<Text>save</Text>
				</View>
			</TouchableOpacity> 
		}
		
			<View style = {styles.articletitle}>
				<TouchableOpacity
					onPress = {() => {Linking.openURL(props.weblink)}}
				>
					<Text>{props.title}</Text>
					<Text>Distance: {props.distance}</Text>
				</TouchableOpacity>
			</View>
	</View>
)

const ArticleList = props => {
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
						isInReadingList = {(article) => props.isInReadingList(article)}
						onSave = {(article) => props.onSave(article)}
						onDelete = {(article) => props.onDelete(article)}
						weblink = {"https://en.wikipedia.org/wiki/" + article.title.replace(" ", "_")} 
					/>
				)
			)
			}
		</ScrollView>
	)
}

export default ArticleList