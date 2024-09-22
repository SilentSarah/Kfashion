import '../css/style.css'
import { useEffect, useState, useRef, createContext } from 'react'
import Startup from './components/Startup'
import InitScreen from './components/InitScreen';

interface XmbContextProps {
    warning: boolean,
    setWarning: React.Dispatch<React.SetStateAction<boolean>>;
}

export const XmbContext = createContext<XmbContextProps | undefined>(undefined);

function MainPage() {
    const [turnedON, setTurnedON] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(new Audio('/startup.mp3'));

    useEffect(() => {
        if (turnedON) {
            audioRef.current?.play();
            audioRef.current?.addEventListener('ended', () => {
                setWarning(true);
            })
        }
    }, [turnedON])


    return (
        <XmbContext.Provider value={{warning, setWarning}}>
            <div className='select-none'>
                { turnedON ? <InitScreen/> : <Startup setTurnedON={setTurnedON} turnedON={turnedON}/>}
            </div>
        </XmbContext.Provider>
    )
}

export default MainPage
