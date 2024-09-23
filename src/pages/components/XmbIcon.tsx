import { motion } from "framer-motion";
import { YMenu } from "./XMB";
import MenuOption from "./MenuOption";
import { XmbContext } from "./XMB";
import { useContext } from "react";

export default function XmbIcon(props: any) {
    const { icon, text, active } = props;
    const { active_Y, selected_Y, setSelected_Y } = useContext(XmbContext);
    return (
        <div className="flex flex-col items-center justify-around size-max relative"> 
            <img className={"brightness-75 transition-all duration-500 " + (active && "scale-110")} src={icon}/>
            <motion.p
                initial={{opacity: 0}}
                animate={{opacity: active ? 1 : 0, transition: {duration: 0.2, delay: 0.1}}}
                className="text-white mb-2 text-md absolute top-[85%]">
                    {text}
            </motion.p>
            <motion.div 
                initial={{opacity: 0}}
                animate={{opacity: active ? 1 : 0, transition: {duration: 0.2, delay: 0.1}}}
                style={{ opacity: active ? 1 : 0 }} className="absolute w-48 top-[100%]">
                <MenuOption icon={"/xmb_icons/DefaultUser.png"}/>
            </motion.div>
        </div>
    )
}