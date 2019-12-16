import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import {Provider} from 'unstated'

import ArticleListScreen from './screens/ArticleListScreen'
import LocationsOfInterestScreen from './screens/LocationsOfInterestScreen'
import ReadingListScreen from './screens/ReadingListScreen'
import AddLocationCoordinatesScreen from './screens/AddLocationCoordinatesScreen'
import AddLocationScreen from './screens/AddLocationScreen'
import AddLocationAddressScreen from './screens/AddLocationAddressScreen'

const getIcon = (name, focused, tint) => {
	const color = focused?tint:"darkblue"
	return <Ionicons name={name} size={25} color={color} />
}

const stackRoutesLoc = {
	Locations: LocationsOfInterestScreen,
	AddLocation: AddLocationScreen,
	AddLocationCoordinates: AddLocationCoordinatesScreen,
	AddLocationAddress: AddLocationAddressScreen
}
const stackOptionsLoc = {
	initialRouteName: 'Locations'
}
const StackNavigatorLocations = createStackNavigator(stackRoutesLoc, stackOptionsLoc)

const stackRoutesArt = {
	Articles: ArticleListScreen,
}
const stackOptionsArt = {
}
const StackNavigatorArticles = createStackNavigator(stackRoutesArt, stackOptionsArt)

const stackRoutesRead = {
	Reading_List: ReadingListScreen,
}
const stackOptionsRead = {
}
const StackNavigatorReadingList = createStackNavigator(stackRoutesRead, stackOptionsRead)

const tabRoutes = {
	Articles: StackNavigatorArticles,
	Locations: StackNavigatorLocations,
	Reading_List: StackNavigatorReadingList,
}
StackNavigatorArticles.navigationOptions = {
	tabBarIcon: ({focused, tint}) => getIcon("md-paper", focused, tint),
}
StackNavigatorLocations.navigationOptions = {
	tabBarIcon: ({focused, tint}) => getIcon("md-pin", focused, tint),
}
StackNavigatorReadingList.navigationOptions = {
	tabBarIcon: ({focused, tint}) => getIcon("md-bookmark", focused, tint),
}
const tabOptions = {
	tabBarOptions: {
		activeTintColor : 'darkorange',
		inactiveTintColor: 'darkblue',
		inactiveBackgroundColor : 'darkorange'
	}
}
const TabNavigator = createBottomTabNavigator(tabRoutes, tabOptions)

const AppContainer = createAppContainer(TabNavigator)

const App = props => (
	<Provider>
		<AppContainer/>
	</Provider>
)

export default App