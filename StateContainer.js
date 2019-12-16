import {PersistContainer} from './PersistContainer'
import {AsyncStorage} from 'react-native'
import {getNearPages} from './getGeosearch'

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'

export default class StateContainer extends PersistContainer{
	constructor(props){
		super(props)
		this.state = {
			readingList: [],
			savedLocations: [],
			articlesNearMe: [],
			currentLocation: null,
			templat: -91,
			templon: -181,
			tempAddress: -1,
		}
	} 
	
	isEmpty = (thing) => {
		if(thing==null || thing.length==0)
		{
			return true
		}
		else
		{
			return false
		}
	}
	
	isLoading = () => {
		if (this.state.readingList == null && this.state.savedLocations == null && this.state.articlesNearMe == null && this.state.currentLocation == null)
		{
			return true
		}
		else
		{
			return false
		}
	}
	
	setTempLat = lat => {
		if(isNaN(lat))
		{
			this.setState({templat: parseFloat(lat.replace(",", "."))}) 
		}
		else
		{
			this.setState({templat: parseFloat(lat)})
		}
	}
	
	getTempLat = () => {
		return this.state.templat
	}
	
	setTempLon = lon => {
		if(isNaN(lon))
		{
			this.setState({templon: parseFloat(lon.replace(",", "."))})
		}
		else
		{
			this.setState({templon: parseFloat(lon)})
		}
	}
	
	getTempLon = () => {
		return this.state.templon
	}
	
	setTempAddress = async add => {
		await this.setState({tempAddress: add})
	}
	
	getTempAddress = () => {
		return this.state.tempAddress
	}
	
	setCurrentLocation = async loc => {
		await this.setState({currentLocation: loc})
		this.fetchArticlesNearMe()
	}
	
	getCurrentLocation = () => 
	{
		return (this.state.currentLocation)
	}
	
	fetchArticlesNearMe = async () => {
		const articles = await getNearPages(this.state.currentLocation)
		this.setState({articlesNearMe: articles})
	}
	
	getArticlesNearMe = () => {
		return this.state.articlesNearMe
	}
	
	isInReadingList = article => {
		for(i=0; i<this.state.readingList.length; i++)
		{
			if(this.state.readingList[i].title == article.title)
			{
				return true
			}
		}
		return false
	}
	
	addToReadArticle = article => {
		for(i=0; i<this.state.readingList.length; i++)
		{
			if(this.state.readingList[i] == article)
			{
				return
			}
		}
		const newReadingList = [...this.state.readingList, article]
		this.setState({readingList: newReadingList})
	}
	
	deleteToReadArticle = article => {
		const newReadingList = this.state.readingList.filter(c => c.title !== article.title)
		this.setState({readingList: newReadingList})
	}
	
	getReadingList = () => 
	{ 
		return this.state.readingList
	}
	
	addLocationCoordinates = async () => {
		if(this.state.templat == -91 || this.state.templon == -181)
		{
			alert("Please insert latitude and longitude")
			return
		}
		if(this.state.templat < -90 || this.state.templat > 90 || this.state.templon < -180 || this.state.templon > 180)
		{
			alert("Latitude must be between -90 and 90 degrees and Longitude between -180 and 180")
			return
		}
		for(i=0; i<this.state.savedLocations.length; i++)
		{
			if(this.state.savedLocations[i].lat == this.state.templat && this.state.savedLocations[i].lon == this.state.templon)
			{
				alert("Location already exists")
				return
			}
		}
		const address = await this.transformCoordinatesInLocation({latitude: this.state.templat, longitude: this.state.templon})
		const newSavedLocations = [...this.state.savedLocations, {lat: this.state.templat, lon: this.state.templon, address: address}]
		this.setState({savedLocations: newSavedLocations})
		alert("Saved")
		this.setTempLat(-91)
		this.setTempLon(-181)
	}
	
	addLocationAddress = async () => {
		if(this.state.tempAddress == -1)
		{
			alert("Please insert an address")
			return
		}
		const coordinates = await this.transformfromAddressInCoordinates(this.state.tempAddress)
		if(coordinates.length != 0)
		{
			for(i=0; i<this.state.savedLocations.length; i++)
			{			
				if(this.state.savedLocations[i].lat == coordinates[0].latitude && this.state.savedLocations[i].lon == coordinates[0].longitude)
				{
					alert("Location already exists")
					return
				}
			}
			const newSavedLocations = [...this.state.savedLocations, {lat: coordinates[0].latitude, lon: coordinates[0].longitude, address:this.state.tempAddress}]
			this.setState({savedLocations: newSavedLocations})
			this.setTempAddress(-1)
			alert("Saved")
		}
		else
		{
			alert("No location found, try to insert a new address")
			this.setTempAddress(-1)
			return
		}
		
	}
	
	deleteLocation = coordinates => {
		const newSavedLocations = this.state.savedLocations.filter(c => (c.lat !== coordinates.lat && c.lon !== coordinates.lon) )
		this.setState({savedLocations: newSavedLocations})
	}
	
	getSavedLocations = () => 
	{
		return this.state.savedLocations
	}
	
	useMyLocation = async () => {
		let {status} = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			alert("Permission to access location was denied")
			return
		}
		
		const location  = await Location.getCurrentPositionAsync({})
		
		var address = await this.transformCoordinatesInLocation({latitude: location.coords.latitude, longitude: location.coords.longitude})
		
		
		return {lat: location.coords.latitude, lon: location.coords.longitude, address: address}
	}
	
	
	transformCoordinatesInLocation = async coordinates => {
		const address = await Location.reverseGeocodeAsync(coordinates)
		var addressToText = ""
		if(address.length != 0)
		{
			if(address[0].country != null)
			{addressToText = address[0].country}
			if(address[0].region != null)
			{addressToText = addressToText + " " + address[0].region}
			if(address[0].city != null)
			{addressToText = addressToText + " " + address[0].city}
			if(address[0].street != null)
			{addressToText = addressToText + " " + address[0].street}
			if(address[0].name != null)
			{addressToText = addressToText + " " + address[0].name}
		}
		else
		{
			addressToText = coordinates.latitude + "," + coordinates.longitude
		}
		return addressToText
	}
	
	transformfromAddressInCoordinates = async address => {
		const coordinates = await Location.geocodeAsync(address)
		return coordinates
	}
	
	persist = {			
		key: 'articlesNearMe',
		version: 1,
		storage: AsyncStorage,
	}
}