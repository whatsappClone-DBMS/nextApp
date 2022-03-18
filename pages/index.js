import Head from 'next/head'
import Image from 'next/image'
import LogIn from '../Components/LogIn/LogIn'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <LogIn/>
    </div>
  )
}
