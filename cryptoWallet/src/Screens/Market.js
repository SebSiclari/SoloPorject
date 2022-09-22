import React, {useEffect, useState} from 'react'
import MyTabs from '../Navigation/Tabs';
import { StyleSheet,
  Text,
  View,
  FlatList,
RefreshControl,
Pressable} from 'react-native'
  import { getMarketData } from '../Stores/requests';
  import CoinItem from '../Components/CoinItem';
  import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import {connect} from 'react-redux'
// import {getCoinMarket} from '../stores/market/marketActions'

const Market = () => {

  const [coins, setCoins]= useState([])
  const [loading, setloading]= useState(false);

  const fetchCoins= async(pageNumber) =>{
    if(loading) return;
    setloading(true);
    const coinsData= await getMarketData(pageNumber)
    setCoins((existingCoins)=>([...existingCoins, ...coinsData]));
    setloading(false);

  }

  const refetchCoins= async() =>{
    if(loading) return;
    setloading(true);
    const coinsData= await getMarketData()
    setCoins(coinsData);
    setloading(false)

  }


  useEffect(()=>{
    fetchCoins()
  },[])


  const navigation= useNavigation();

  const handleNavigation=()=>{
    return navigation.navigate('CoinDetails')
  }

  return (
    <View style={styles.container}>
    <FlatList
    data={coins}
    keyExtractor={item=> item.id}
    renderItem = {({item})=> <Pressable onPress={handleNavigation}><CoinItem key={item.id} marketCoin={item} /></Pressable>}
    refreshControl={
      <RefreshControl
      refreshing={loading}
      tintColor='white'
      onRefresh={refetchCoins}
      />
    } />
      <Text style={styles.text}></Text>
    </View>
  )
}

export default Market;

// function mapStateToProps(state){
//   return {
//     coins: state.marketReducer.coins
//   }
// }

// function mapDispatchToProps(dispatch){
//   return{
//     // @ts-ignore
//     getCoinMarket:(currency, coinList, orderBy, sparkline, priceChangePerc, perPage, page)
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Market);

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#121212',
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    color:'white'
  }
})