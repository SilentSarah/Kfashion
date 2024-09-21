import { motion } from 'framer-motion'
import '../css/style.css'
import { useEffect, useState, useRef } from 'react'
import Startup from './components/Startup'

function MainPage() {
    const initialBgParams = {
        opacity: 0,
        filter: 'blur(2px), brightness(0.5)'
    }

    const animateBgParams = {
        opacity: 1,
        filter: 'blur(0px), brightness(1)',
        transition: { duration: 3.5 },
        animationTimingFunction: 'cubic-bezier(0.15, 0.85, 0.35, 1.2)'
    }

    const headerInitial = {
        opacity: 0,
        filter: 'blur(2px), brightness(0.3)'
    }

    const headerParams = {
        opacity: 1,
        filter: 'blur(0px), brightness(1)',
        transition: { duration: 2, delay: 1.5 },
    }

    const videoInitial = {
        opacity: 0,
        filter: 'blur(2px), brightness(0.1)'
    }

    const videoParams = {
        opacity: 1,
        filter: 'blur(0px), brightness(1)',
        transition: { duration: 2, delay: 2.25 },
    }
    const [turnedON, setTurnedON] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(new Audio('/startup.mp3'));

    useEffect(() => {
        if (turnedON) {
            audioRef.current?.play();
            console.log('playing audio');
        } else {
            console.log('pausing audio');
        }
    }, [turnedON])


  return (
    <div>
    { turnedON ? (<motion.div
      initial={initialBgParams}
      animate={animateBgParams}
      className='h-screen w-screen flex items-center overflow-hidden relative'>
      <motion.h1 
            initial={headerInitial}
            animate={headerParams}
            className='w-full text-white flex items-center relative z-10 '>
            <img className='md:ms-auto md:me-10 mx-auto glow_img' src='/logo.png'/>
      </motion.h1>
      <motion.video
            initial={videoInitial}
            animate={videoParams}
            loop autoPlay muted className='absolute -z-1 object-none w-full h-full'>
            <source src='/ps3-wave.mp4' type='video/mp4'/>
      </motion.video>
      <audio src='/ps3-wave.mp3' className='hidden'></audio>
    </motion.div>) : (
        <Startup setTurnedON={setTurnedON} turnedON={turnedON}/>
    )}
    </div>
  )
}

export default MainPage
