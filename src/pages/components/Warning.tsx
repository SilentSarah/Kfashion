import { useContext, useEffect, useRef } from "react";
import { XmbContext } from "../MainPage"
import { motion } from "framer-motion";

export default function Warning() {
    const context = useContext(XmbContext);
    if (!context) return null;

    const { setAccepted_warning, accepted_warning } = context;
    const audioref = useRef<HTMLAudioElement>(new Audio('/info_snd.wav'));
    const accept_snd = useRef<HTMLAudioElement>(new Audio('/accept_snd.wav'));

    useEffect(() => {
        audioref.current?.play();
        if (document.onkeydown || document.ontouchstart) return;

        document.onkeydown = () => {
            accept_snd.current?.play();
            setAccepted_warning(true);
        }

        window.ontouchend = () => {
            accept_snd.current?.play();
            setAccepted_warning(true);
        }


        return () => {
            document.onkeydown = null;
            window.ontouchstart = null;
        }
    }, [accepted_warning])

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.5 } }}
            className='absolute backdrop-blur-lg h-full w-full flex flex-col items-center justify-center z-10'>
            <div className="h-full flex flex-col justify-center">
                <h1 className='text-white text-center md:self-start mt-auto'>WARNING</h1>
                <p className='text-white mb-auto text-center md:text-start'>
                    THIS IS A PORTFOLIO BASED ON PLAYSTATION'S 3 XMB USER INTERFACE THEREFORE THIS WEBSITE IS MERELY A CONCEPT AND NOT A REAL PRODUCT.
                    <br />
                    SONY INTERACTIVE ENTERTAINMENT OWNS THE RIGHTS TO THE XMB UI, PLAYSTATION AND ALL RELATED TRADEMARKS.
                    <br />
                
                    THIS WEBSITE IS NOT AFFILIATED WITH SONY INTERACTIVE ENTERTAINMENT IN ANY WAY.
                </p>
                <p className='text-white p-2 rounded-md mb-12 text-center'>
                    Press any key / Tap Screen to Continue
                </p>
            </div>
        </motion.div>
    )
}