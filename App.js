import { StyleSheet, Text, View, Button } from 'react-native'
import Loading from './Loading'
import * as Location from 'expo-location'
import React, { useState, useEffect } from 'react'
import Weather from './Weather'
import axios from 'axios'

export default function App() {
	const API_KEY = 'd84388f36914b88159296c2e0054a3be'
	//const [location, setLocation] = useState(null)
	//const [errorMsg, setErrorMsg] = useState(null)
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState(null)

	const getWeather = async (latitude, longitude) => {
		const {
			data: {
				main: { temp, feels_like },
			},
		} = await axios.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
		)
		setLoading(false)
		setData({ temp, feels_like })
	}

	useEffect(() => {
		;(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				//setErrorMsg('Permission to access location was denied')
				return
			}

			let {
				coords: { latitude, longitude },
			} = await Location.getCurrentPositionAsync()
			getWeather(latitude, longitude)
		})()
		//setLocation(location)
	}, [])

	// let text = 'Waiting..'
	// if (errorMsg) {
	// 	text = errorMsg
	// } else if (location) {
	// 	text = JSON.stringify(location)
	// }

	return (
		// <View style={styles.container}></View>
		loading ? <Loading /> : <Weather data={data} />
	)
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// })
