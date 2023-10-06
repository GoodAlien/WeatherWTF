import React from 'react'
import axios from 'axios'
import { StyleSheet, Text, View, Button } from 'react-native'

export default function Weather({ data }) {
	const lamp = () => {
		axios.get('http://192.168.0.100/Power?Power=1", true')
	}

	const light = () => {
		fetch('https://mywebsite.com/endpoint/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				firstParam: 'yourValue',
				secondParam: 'yourOtherValue',
			}),
		})
	}

	return (
		<View style={styles.container}>
			<Text>Температура {Math.round(data.temp)} °C</Text>
			<Text>Ощущается как {Math.round(data.feels_like)} °C</Text>
			<Button title='button' onPress={lamp} />
			<Button title='button' onPress={light} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
