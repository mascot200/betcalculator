import React, {useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'



const  SetupScreen = () => {
  const router = useRouter()


    const [odd, setOdd] = useState('');
    const [dailyTarget, setDailyTarget] = useState(0)
    const [gameTarget, setGameTarget] = useState(0)
    const [totalWinnings, setTotalWinnings] = useState('');
    const [totalLost, setTotalLost] = useState('');

    const saveSetup = async (e) => {
        const betData = localStorage.getItem('hahaBet');
        let stake = Math.round(gameTarget / (odd - 1));
        if(betData) {
          const formData = JSON.stringify({
            targetAmount: 0,
            dailyTarget: dailyTarget,
            odd: odd,
            totalWinnings: 0,
            totalLost: 0,
            stake: stake,
            gameTarget: gameTarget,
            isConfigured: true
          });
          await localStorage.setItem('hahaBet', formData);
          router.reload(window.location)
        }
    }

    return (
        <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
        Welcome to  <a href="https://nextjs.org">HahaBet</a> <br />
        </h1>

        <p className={styles.description}>
            Setup your calculator and start winning!
        </p>

        <div className={styles.grid}>
        <div className="mb-3">                
             <input
                  name="daily_target"
                  type="text"
                  value={dailyTarget}
                  placeholder="Enter daily target"
                  style={{ height: 30}}
                  onChange={(e) => setDailyTarget(e.target.value)}
                    />
                </div>

                <div className="mb-3" style={{ marginLeft: 5}}>
                    <input
                    name="gameTarget"
                    type="text"
                    placeholder="Enter game target"
                    style={{ height: 30}}
                    value={gameTarget}
                    onChange={(e) => setGameTarget(e.target.value)}
                    />
                    
                </div>

                <div className="mb-3" style={{ marginLeft: 5}}>
                    <input
                    name="odd"
                    type="text"
                    placeholder="Enter game odd"
                    style={{ height: 30}}
                    value={odd}
                    onChange={(e) => setOdd(e.target.value)}
                    />
                    
                </div>
        </div>
        <button onClick={(e) => saveSetup(e)} style={{ marginTop: 20, backgroundColor: 'blue', height: 30, borderRadius: 5, borderBlockColor: 'blue'}}>Save Now</button>



                    
 
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

export default  SetupScreen
 
