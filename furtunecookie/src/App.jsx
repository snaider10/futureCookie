import { useEffect, useState } from 'react'
import './App.css'

function App() {
  //define state variables
  const [fortune, setFortune] = useState('')
  const [active, setActive] = useState(false)
  const handleClick = () => {
    setActive(true)
  }

  //fetch data from API
  useEffect(() => {
    if (active) {
      try {
        const getFortune = async () => {
          const response = await fetch('https://api.adviceslip.com/advice')
          const data = await response.json()
          setFortune(data.slip.advice)
          setActive(false)
        }
        getFortune()
      } catch (error) {
        console.log(error.message)
      }
    }
  },[active])
  return (
    <main>
      <section>
        <div>
        </div>
        <article>
          <h1>This is your fortune!</h1>
          <h2>{fortune}</h2>
          <button onClick={handleClick}>Get Fortune</button>
        </article>
      </section>
    </main>
  )
}

export default App
