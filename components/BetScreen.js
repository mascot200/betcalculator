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
    setTotalWinnings(parsedBetData.totalWinnings)
   }, [])

    const [odd, setOdd] = useState(0);
    const [won, setWon] = useState('');
    const [lost, setLost] = useState(0);
    const [stake, setStake] = useState(0);
    const [totalLost, setTotalLost] = useState(0)
    const [gameTarget, setGameTarget] = useState(0)
    const [totalWinnings, setTotalWinnings] = useState(0)

    const wonFunc = async() => {
        setWon("Won")
        const data = localStorage.getItem('hahaBet');
        const parsedBetData = JSON.parse(data);
        let totalWinnings = Math.round(parseInt(parsedBetData.totalWinnings)  + parseInt(parsedBetData.gameTarget));
        setTotalLost(0)
        setTotalWinnings(totalWinnings)
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
      let totalLost = Math.round(parseInt(parsedBetData.totalLost) + parseInt(parsedBetData.stake));
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

    const calculateBet = async () => {
      if(won == "Won"){
        const data = localStorage.getItem('hahaBet');
        const parsedBetData = JSON.parse(data);
        let newStake = Math.round(parseInt(parsedBetData.gameTarget) / (parseFloat(odd) - 1));
        setTotalLost(totalLost)
        if(data) {
          const formData = JSON.stringify({
            totalLost: 0,
            totalWinnings: Math.round(parseInt(parsedBetData.totalWinnings) + parseInt(parsedBetData.gameTarget)), 
            targetAmount: parsedBetData.targetAmount,
            dailyTarget: parsedBetData.dailyTarget,
            gameTarget: parsedBetData.gameTarget,
            isConfigured: parsedBetData.isConfigured,
            odds: odd,
            stake: newStake
          });
          await localStorage.setItem('hahaBet', formData);
        }
        setStake(newStake)
        setLost("")
        setWon("")
          
      }else if(lost == "Lost"){
        const data = localStorage.getItem('hahaBet');
        const parsedBetData = JSON.parse(data);
        let newStake = Math.round((parseInt(parsedBetData.gameTarget) + parseInt(parsedBetData.totalLost)) / (parseFloat(odd) - 1));
        setTotalLost(totalLost)
        if(data) {
          const formData = JSON.stringify({
            totalLost: parseInt(parsedBetData.totalLost),
            totalWinnings: parsedBetData.totalWinnings, 
            targetAmount: parsedBetData.targetAmount,
            dailyTarget: parsedBetData.dailyTarget,
            gameTarget: parsedBetData.gameTarget,
            isConfigured: parsedBetData.isConfigured,
            odds: odd,
            stake: newStake
          });
          await localStorage.setItem('hahaBet', formData);
        }
        setStake(newStake)
        setLost("")
        setWon("")
      }
    }


    return (
        <div className={styles.container}>
      <main className={styles.main}>
      <Head>
          <title>HahaBet | Bet calculator screen</title>
        </Head>
        <h1 className={styles.title}>
        Amount to stake <br />
          <span>&#8358;{Intl.NumberFormat().format(stake)}</span>
        </h1>

        <p className={styles.description}>
            Total winning for today!
            <span style={{ color: 'green', fontWeight: 'bold', fontSize: 30}}>(&#8358;{Intl.NumberFormat().format(totalWinnings)})</span>
        </p>

        <div className={styles.grid}>
           {won == "" && lost == "" ? (
           <>
            <div onClick={(e) => wonFunc()} style={{ backgroundColor: 'green', width: 100, height: 30, textAlign: 'center', paddingTop: '2%', borderRadius: 5}}>Won</div>
            <button onClick={(e) => lostFunc()} style={{ backgroundColor: 'red', width: 100, height: 30, textAlign: 'center', marginLeft: 10, paddingTop: '2%', borderRadius: 5}}>Lost</button>
           </>) : (
           <>
            <div className="mb-3" style={{ marginLeft: 5}}>
                    <input
                    name="odd"
                    type="text"
                    placeholder="Enter odd"
                    style={{ height: 30}}
                    value={odd}
                    onChange={(e) => setOdd(e.target.value)}
                    />
                </div>
                <div style={{ backgroundColor: 'green', width: 150, height: 30, textAlign: 'center', marginLeft: 10, paddingTop: '2%', borderRadius: 5}} onClick={() => calculateBet()}>Calculate now</div>
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
 
