import { motion } from "framer-motion"

export default function StartupLogo() {
    const headerInitial = {
        opacity: 0,
        filter: 'blur(2px), brightness(0.3)'
    }

    const headerParams = {
        opacity: 1,
        filter: 'blur(0px), brightness(1)',
        transition: { duration: 2, delay: 1.5 },
    }

    return (
    <motion.h1
        initial={headerInitial}
        animate={headerParams}
        className='w-full text-white flex relative z-10'>
        <div className="flex gap-3 items-center md:ms-auto md:me-10 mx-auto">
            <img src='/grey_logo.svg' className="w-[96px] h-[96px] glow_img" />
            <div className="flex flex-col items-center justify-center gap-3">
                <img className='glow_img w-full' src='/logo.png' />
                <h1 className='glow_img'>Sarah's XMB Simulator</h1>
            </div>
        </div>
    </motion.h1>
    )
}