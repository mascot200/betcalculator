import React, {useEffect, useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'



const  BetScreen = () => {


   useEffect(() => {
    const data = localStorage.getItem('hahaBet');
    const parsedBetData = JSON.parse(data);
    setStake(parsedBetData.stake)
    setGameTarget(parsedBetData.gameTarget)
   }, [])

    const [odd, setOdd] = useState('');
    const [won, setWon] = useState('');
    const [lost, setLost] = useState('');
    const [stake, setStake] = useState(0);
    const [totalLost, setTotalLost] = useState(0)
    const [gameTarget, setGameTarget] = useState(0)

    const wonFunc = async() => {
        setWon("Won")
        const data = localStorage.getItem('hahaBet');
        const parsedBetData = JSON.parse(data);
        let totalWinnings = parsedBetData.totalWinnings + stake;
        setTotalLost(0)
        if(data) {
          const formData = JSON.stringify({
            totalWinnings: totalWinnings,
            totalLost: 0,
            targetAmount: parsedBetData.targetAmount,
            dailyTarget: parsedBetData.dailyTarget,
            gameTarget: parsedBetData.gameTarget,
            isConfigured: parsedBetData.isConfigured
          });
          await localStorage.setItem('hahaBet', formData);
        }

    }

    const lostFunc = async() => {
      setLost("Lost")
      const data = localStorage.getItem('hahaBet');
      const parsedBetData = JSON.parse(data);
      let totalLost = parsedBetData.totalLost + parsedBetData.stake;
      setTotalLost(totalLost)
      if(data) {
        const formData = JSON.stringify({
          totalLost: totalLost,
          totalWinnings: parsedBetData.totalWinnings, 
          targetAmount: parsedBetData.targetAmount,
          dailyTarget: parsedBetData.dailyTarget,
          gameTarget: parsedBetData.gameTarget,
          isConfigured: parsedBetData.isConfigured,
          odds: parsedBetData.odd,
          stake: parsedBetData.stake
        });
        await localStorage.setItem('hahaBet', formData);
      }

    }

    const calculateBet = () => {
      if(won == "Won"){
        // formula 
        // gameTarget / 1 - odd
        let stake = gameTarget / (odd - 1);
         setStake(stake)
          
      }else if(lost == "Lost"){
         // formula 
        // gameTarget + totalLost / 1 - odd
        let stake = (gameTarget + totalLost) / (odd - 1);
        setStake(stake)
      }
    }


    return (
        <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
        Amount to stake <br />
          <span>&#8358;{stake}</span>
        </h1>

        <p className={styles.description}>
            Total winning for today!
            <span>{stake}</span>
        </p>

        <div className={styles.grid}>
           {won == "" && lost == "" ? (
           <>
            <button onClick={(e) => wonFunc()} style={{ backgroundColor: 'green', width: 100, borderRadius: 2}}>Won</button>
            <button onClick={(e) => lostFunc()} style={{ backgroundColor: 'red', width: 100, borderRadius: 2}}>Lost</button>
           </>) : (
           <>
            <div className="mb-3" style={{ marginLeft: 5}}>
                    <input
                    name="odd"
                    type="text"
                    placeholder="Enter odd"
                    style={{ height: 30}}
                    value={odd}
                    onChange={(e) => calculateBet()}
                    />
                </div>
           </>)}
          
           <br />

          
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
    )
}

export default  BetScreen
 
