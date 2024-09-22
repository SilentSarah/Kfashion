import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Startup(props: any) {
    const { setTurnedON, turnedON } = props;
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

    const [left_prog, setprogl] = useState(0);
    const [right_prog, setprogr] = useState(0);
    const progTimer = useRef(0);
    const btnref = useRef<HTMLImageElement>(null);
    const p_on_snd = useRef<HTMLAudioElement>(new Audio('/poweron.mp3'));

    useEffect(() => {

        if (left_prog === 100 && right_prog === 100) {
            if (progTimer.current) {
                clearInterval(progTimer.current);
            }
            setTurnedON(true);
        }
    }, [left_prog, right_prog]);

    const startProgress = () => {
        p_on_snd.current?.play();
        if (progTimer.current) {
            clearInterval(progTimer.current);
        }
        progTimer.current = setInterval(() => {
            setprogl((prev) => Math.min(prev + 1, 100));
            setprogr((prev) => Math.min(prev + 1, 100));
        }, 12);
    };

    return (
        <motion.div
            initial={initialBgParams}
            animate={animateBgParams}
            className='h-screen w-screen flex flex-col relative overflow-hidden text-white'>
            <div className='flex items-center justify-center h-screen w-screen'>
                <motion.progress
                    initial={{ width: '0%' }}
                    animate={{ width: '50%', transition: { duration: 1, delay: 1.25, ease: 'easeInOut' } }}
                    className='h-1 text-white rotate-180' value={left_prog} max='100'></motion.progress>
                <img
                    ref={btnref}
                    onClick={() => {
                        btnref.current?.classList.add('glow_img');
                        startProgress();
                    }}
                    src='/power-off.png' width={64} height={64} className='cursor-pointer'></img>
                <motion.progress
                    initial={{ width: '0%' }}
                    animate={{ width: '50%', transition: { duration: 1, delay: 1.25, ease: 'easeInOut' } }}
                    className='w-1/2 h-1 text-white' value={right_prog} max='100'></motion.progress>
            </div>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1, delay: 2.5 } }}
                className='absolute w-full flex flex-col items-center gap-3 text-center h-full -z-10'>
                <img className="mt-12 mb-auto" src="/favicon.svg" width={128}/>
                <h1 className='text-white'>Best experienced with Full Screen Mode ON</h1>
                <img className="mb-12" src="/scalability.png" width={42} height={42}/>
            </motion.div>
        </motion.div>
    )
}