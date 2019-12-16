//style.js

import {StyleSheet} from 'react-native'
import Constants from 'expo-constants'


const styles = StyleSheet.create({
	container: {
		padding: 10,
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	articleSaveButton: {
		margin: 5,
	},
	articletitle: {
		color: 'darkblue',
		width: '85%', 
	},
	article: {
		margin: 10,
		flex : 1,
		backgroundColor: 'darkorange',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		display: 'flex',
		borderRadius: 4,
		elevation: 6,
	},
	textInput:{
		borderColor: 'black',
		borderWidth:1,
		height:100,
		width: 300,
		margin: 20,
	},
	selectedLocation: {
		alignSelf: 'center',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
	},
	text: {
		fontSize: 16,
		textAlign: 'center',
	},
	button: {
		backgroundColor: 'darkblue',
		borderRadius: 5,
		alignItems: 'center',
		margin: 10
	},
	buttonText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: 'darkorange',
		margin: 8,
	},
	buttonInverted: {
		backgroundColor: 'darkorange',
		borderRadius: 5,
	},
	buttonTextInverted: {
		fontSize: 15,
		fontWeight: 'bold',
		color: 'darkblue',
		margin: 8,
	},
}); 

export default styles