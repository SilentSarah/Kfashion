import { useContext } from "react";
import { XmbContext } from "../MainPage"
import { motion } from "framer-motion";

export default function     Warning() {
    const context = useContext(XmbContext);
    if (!context) return null;

    const { setWarning } = context;
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.5 } }}
            className='absolute backdrop-blur-lg h-full w-full flex flex-col items-center justify-center z-10'>
            <div className="h-full flex flex-col justify-center">
                <h1 className='text-white self-start mt-auto'>WARNING</h1>
                <p className='text-white mb-auto'>
                    THIS IS A PORTFOLIO BASED ON PLAYSTATION'S 3 XMB USER INTERFACE THEREFORE THIS WEBSITE IS MERELY A CONCEPT AND NOT A REAL PRODUCT.
                    <br />
                    SONY INTERACTIVE ENTERTAINMENT OWNS THE RIGHTS TO THE XMB UI, PLAYSTATION AND ALL RELATED TRADEMARKS.
                    <br />
                
                    THIS WEBSITE IS NOT AFFILIATED WITH SONY INTERACTIVE ENTERTAINMENT IN ANY WAY.
                </p>
                <button onClick={() => setWarning(false)} className='text-white p-2 rounded-md mb-12'>Press any key to Continue</button>
            </div>
        </motion.div>
    )
}