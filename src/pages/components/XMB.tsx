import { createContext, useEffect, useRef, useState } from "react";
import XmbIcon from "./XmbIcon";
import { motion } from "framer-motion";

export const YMenu = {
    0: [
        {
            name: 'Hicham',
            icon: '/xmb_icons/DefaultUser.png',
            active: true,
        },
        {
            name: 'Hicham',
            icon: '/xmb_icons/DefaultUser.png',
            active: false,
        },
        {
            name: 'Hicham',
            icon: '/xmb_icons/DefaultUser.png',
            active: false,
        },
        {
            name: 'Hicham',
            icon: '/xmb_icons/DefaultUser.png',
            active: false,
        },
    ]
}

export const XmbContext = createContext({} as any);

export default function XMB() {
    const [data, setData] = useState([
        {
            icon: '/xmb_icons/Users.png',
            text: 'Users',
            active: true,
            push: 0,
        },
        {
            icon: '/xmb_icons/System.png',
            text: 'Settings',
            active: false,
            push: 50,
        },
        {
            icon: '/xmb_icons/Music.png',
            text: 'Music',
            active: false,
            push: 100,
        },
        {
            icon: '/xmb_icons/Games.png',
            text: 'Games',
            active: false,
            push: 150,
        },
        {
            icon: '/xmb_icons/Network.png',
            text: 'Links',
            active: false,
            push: 200,
        },
    ])

    const [calculatedPush, setCalculatedPush] = useState<number>(0);
    const [delay, setDelay] = useState<number>(0);
    const [selected, setSelected] = useState<number>(0);
    const [selected_Y, setSelected_Y] = useState<number>(0);
    const overlay_bg_ref = useRef<HTMLDivElement>(null);
    const category_rooster = useRef<HTMLDivElement>(null);
    const option_snd = useRef<HTMLAudioElement>(new Audio('/option_snd.wav'));

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (delay > Date.now()) return;
            if (e.key === 'ArrowRight') {
                if (selected < data.length - 1)
                    setSelected((prev) => prev + 1);
            } else if (e.key === 'ArrowLeft') {
                if (selected > 0)
                    setSelected((prev) => prev - 1);
            }
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                if (selected === data.length - 1 && e.key === 'ArrowRight'
                    || selected === 0 && e.key === 'ArrowLeft') return;

                const sound = option_snd.current.cloneNode() as HTMLAudioElement;
                sound.play();
                setDelay(Date.now() + 165);
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [data, delay, selected]);

    useEffect(() => {
        const setDataActive = (index: number) => {
            setData(data.map((item, i) => ({ ...item, active: i === index })));
            const first_item = category_rooster.current?.children[0] as HTMLElement;
            if (!first_item) return;
            const next_or_prev = category_rooster.current?.children[selected] as HTMLElement;
            const fitem_pos = first_item.getBoundingClientRect();
            const next_width = next_or_prev.getBoundingClientRect();
            const difference = Math.abs(next_width.left - fitem_pos.left);
            setCalculatedPush(difference);
        }
        setDataActive(selected);
    }, [selected]);

    return (
        <XmbContext.Provider value={{
            data, setData, calculatedPush, setCalculatedPush, delay, setDelay, selected, setSelected, selected_Y, setSelected_Y, overlay_bg_ref, category_rooster,
        }}>
            <motion.div
                initial={{ opacity: 0, transform: 'translate3d(-25px, 0px, 50px) scale3d(1.1, 1.1, 1.1)' }}
                animate={{
                    opacity: 1,
                    transform: `rotateX(0deg) translate3d(0px, 0px, 0px)`,
                    transition: { duration: 0.5, delay: 1 },
                    animationTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
                }}
                ref={overlay_bg_ref} className={"flex pt-52 justify-center z-10 w-full h-full"}>
                <motion.div
                    ref={category_rooster}
                    animate={{ transform: `translateX(${-calculatedPush}px)`, transition: { duration: 0.5 } }}
                    className="flex gap-12 h-max">
                    {
                        data.map((item, index) => (
                            <XmbIcon key={index} icon={item.icon} text={item.text} active={data[index].active} />
                        ))
                    }
                </motion.div>
            </motion.div>
        </XmbContext.Provider>
    )
}