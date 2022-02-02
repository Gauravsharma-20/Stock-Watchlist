import { X_MESSARI_API_KEY } from '@env';
import React, { useState, useEffect } from 'react';
import {
	ActivityIndicator,
	SafeAreaView,
	StyleSheet,
	View
} from 'react-native';
import Constants from 'expo-constants';
import Header from '../components/header/headerLoginPage';
import SearchBar from '../components/search';
import List from '../components/search/suggestion';

const SearchScreen = (props) => {
	const [searchPhrase, setSearchPhrase] = useState('');
	const [clicked, setClicked] = useState(props.route.params.clicked | false);
	const [cryptoData, setCrytpoData] = useState({ data: [] });
	const a = 10;

	useEffect(() => {
		fetch(
			'https://data.messari.io/api/v2/assets?fields=id,symbol,name,metrics/market_data',
			{
				method: 'GET',
				headers: { 'x-messari-api-key': X_MESSARI_API_KEY },
			}
		)
			.then((response) => response.json())
			.then((jsonResponse) => setCrytpoData(jsonResponse))
			.catch((error) => console.log(error))
			.finally(() => console.log(cryptoData));
	}, [a]);

	return (
		<SafeAreaView style={styles.root}>
			<Header />
			<View style={styles.searchBox}>
				<SearchBar
					searchPhrase={searchPhrase}
					setSearchPhrase={setSearchPhrase}
					clicked={clicked}
					setClicked={setClicked}
				/>
				{!cryptoData.data.length ? (
					<ActivityIndicator
						size='large'
						color={'#0000ff'}
						style={{ flex: 1 }}
					/>
				) : (
					<List
						searchPhrase={searchPhrase}
						data={cryptoData.data}
						setClicked={setClicked}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	root: {
		marginTop: Constants.statusBarHeight,
		backgroundColor: '#f0f8ff',
	}, 
	searchBox: {
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export default SearchScreen;