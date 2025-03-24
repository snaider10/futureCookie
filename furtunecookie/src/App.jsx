import { useEffect, useState } from 'react'
import './style.css'
import { SiStagetimer } from "react-icons/si";
import { SiCookiecutter } from "react-icons/si";
import Confetti from "react-confetti";
import ReactHowler from "react-howler";

function App() {
  //define state variables
  const [consulting, setConsulting] = useState(false)
  const [response, setResponse] = useState('')
  const handleClick = () => {
    setConsulting(true)
  }

  const Button = ({ click }) => {
    return(
      <button onClick={click} className='bg-red-400 p-2 rounded-lg text-amber-50 font-semibold text-2xl flex gap-2 justify-center items-centern cursor-pointer'>
        <p>See fortune</p><SiCookiecutter/>
      </button>
    )
  }

  const ResponseOk = () =>{

    return(
      <div className='flex flex-col justify-center gap-2 items-baseline'>
        <h2 className='font-bold text-4xl'>{response}</h2>
        <Confetti recycle ={false} />
        <Button click = {handleClick} />
      </div>
    )
  } 

  const WaitReponse = () => {
    return(
      <div className='flex justify-center font-bold text-9xl text-red-400'>
        <SiStagetimer/>
      </div>
    )
  }

  const Intro = () => {
    return(
      <div>
        <h2 className='font-bold text-6xl'>Try your luck!!!</h2>
         <p className='mb-1 text-2xl mb-2'>Dare to discover what destiny has in store for you today</p>
         <Button  click = {handleClick}/> 
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
      <ReactHowler
                src="india.mp3"
                playing={false}
                loop={true} // Repite la música
                volume={0.1}
            />
        <div className='w-96 h-96 bg-yellow-200 rounded-full'>
          <img src='cookie.jpg' alt='cookie' className='rounded-full h-full w-full' />
        </div>
        <article className='flex flex-col justify-center basis-2xl h-96 p-2'>
          {
            
            consulting? <WaitReponse /> : (response? <ResponseOk /> : <Intro />)
          }
        </article>
      </section>
    </main>
  )
}

export default App
