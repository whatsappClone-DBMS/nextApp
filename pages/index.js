import Header from '../Components/Header/Header'
import LogIn from '../Components/LogIn/LogIn'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header/>
      <LogIn/>
    </div>
  )
}
