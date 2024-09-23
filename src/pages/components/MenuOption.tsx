import { motion } from "framer-motion";

export default function MenuOption(props: any) {
    const { icon, active, title, subtext } = props;
    return (
        <motion.div 
            animate={{scale: active ? 1.1 : 1, transition: {duration: 0.2, delay: 0.1}}}
            className="flex relative items-center justify-center w-full">
            <img className="opacity-70" src={icon}/>
            <div className="flex flex-col absolute left-[85%]">
                <p className="text-white glow_img text-2xl">{title}</p>
                <p className="text-white glow_img text-xs">{subtext}</p>
            </div>
        </motion.div>
    )
}