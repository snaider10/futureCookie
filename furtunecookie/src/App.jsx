import { useEffect, useState } from 'react'
import './style.css'
import { SiStagetimer } from "react-icons/si";

function App() {
  //define state variables
  const [consulting, setConsulting] = useState(false)
  const [response, setResponse] = useState('')
  const handleClick = () => {
    setConsulting(true)
  }

  const ResponseOk = () =>{

    return(
      <div className='flex flex-col justify-center gap-2 items-baseline'>
        <h2 className='font-bold text-4xl'>{response}</h2>
        <button onClick={handleClick} className='bg-red-400 p-2 rounded-lg text-amber-50 font-semibold text-2xl'>Obtener fortuna</button> 
      </div>
    )
  } 

  const WaitReponse = () => {
    return(
      <SiStagetimer/>
    )
  }

  const Intro = () => {
    return(
      <div>
        <h2 className='font-bold text-3xl'>Prueba tu fortuna!!!</h2>
         <p className='mb-1'>Animate en descrubir que te prepara el destino el dia de hoy</p>
          <button onClick={handleClick} className='bg-red-400 p-2 rounded-lg text-amber-50 font-semibold'>Obtener fortuna</button> 
      </div>
    )
  }
  
  //fetch data from API
  useEffect(() => {
    if (consulting) {
      const getFortune = async () => {
        try {
          const response = await fetch('https://api.adviceslip.com/advice')
          const data = await response.json()
          setResponse(data.slip.advice)
        } catch (error) {
          console.log(error.message)
        } finally {
          setConsulting(false)
        }
      }
      getFortune()
    }
  },[consulting])
  return (
    <main className='h-screen w-full flex justify-center items-center'>
      <section className='flex gap-8 p-6 rounded-2xl justify-center shadow-2xl w-2/4'>
        <div className='w-96 h-96 bg-yellow-200 rounded-full'>
          <img src='cookie.jpg' alt='cookie' className='rounded-full h-full w-full' />
        </div>
        <article className='flex flex-col justify-center basis-2xl h-96 p-2'>
          {
            //response? <ResponseOk /> : <Intro />
            consulting? <WaitReponse /> : (response? <ResponseOk /> : <Intro />)
          }
        </article>
      </section>
    </main>
  )
}

export default App
