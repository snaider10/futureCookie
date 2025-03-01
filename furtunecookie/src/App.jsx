import { useEffect, useState } from 'react'
import './style.css'

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
    <main className='container h-screen flex justify-center items-center'>
      <section className='container flex gap-4 p-6 rounded-2xl justify-center items-center shadow-2xl'>
        <div className='w-96 h-96 bg-yellow-200 rounded-full'>
          <img src='cookie.jpg' alt='cookie' className='rounded-full h-full w-full' />
        </div>
        <article className='flex flex-col gap-2'>
          <h1 className='font-bold text-2xl'>Prueba tu fortuna !!!</h1>
          <h3>Animate a saber lo que te prepara el destino</h3>
          <h2>{fortune}</h2>
          <button onClick={handleClick}
            className='bg-red-400 text-white font-bold py-2 px-4 rounded'
          >Consultar</button>
        </article>
      </section>
    </main>
  )
}

export default App
