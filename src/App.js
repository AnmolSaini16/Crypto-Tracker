import axios from "axios";
import React, { useEffect, useState } from "react";
import Coins from "./components/Coins";
import Navbar from "./components/Navbar";
import {BsSearch} from 'react-icons/bs'
import './App.css'

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1&sparkline=false')
    .then((response) => {
      setCoins(response.data)
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  const handleChange = e => {
    // console.log(e.target.value)
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter((coin) => (
    coin.name.toLowerCase().includes(search.toLowerCase())
  ))


  return (
    <div>
      <Navbar />
      <div className="search-bar">
        <form >
          <BsSearch className="logo" />
          <input 
            type='text' 
            placeholder="Search" 
            className="coin_input" 
            onChange={handleChange} />
        </form>
      </div>
      <Coins coins={filteredCoins} /> 
    </div>
  );
}

export default App;
