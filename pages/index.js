import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react"
import {BetScreen, SetupScreen} from '../components'

const Home = () => {


  const [isConfigured, setIsConfigured] = useState(false)

  const storeBetData = async () => {
    const betData = await localStorage.getItem('hahaBet');
    if(!betData){
      const formData = JSON.stringify({
        targetAmount: 0,
        dailyTarget: 0,
        odd: 0,
        totalWinnings: 0,
        totalLost: 0,
        gameTarget: 0,
        stake: 0,
        isConfigured: false
      });
      await localStorage.setItem('hahaBet', formData);
    }else{
      const data = await localStorage.getItem('hahaBet');
      if (data) {
        const parsedBetData = JSON.parse(data);
        setIsConfigured(parsedBetData.isConfigured);
    }
  }
  }

  useEffect(() => {
    storeBetData()
  }, [])


  if(isConfigured){
    return (
         <BetScreen />
    )
  }else{
    return (
      <SetupScreen />
    )
  }
}

export default Home
