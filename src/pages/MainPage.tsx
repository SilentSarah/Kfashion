import '../css/style.css'
import { useEffect, useState, useRef, createContext } from 'react'
import Startup from './components/Startup'
import InitScreen from './components/InitScreen';
import XMB from './components/XMB';

interface XmbContextProps {
    warning: boolean,
    accepted_warning: boolean,
    setAccepted_warning: React.Dispatch<React.SetStateAction<boolean>>;
}

export const XmbContext = createContext<XmbContextProps | undefined>(undefined);

function MainPage() {
    const [turnedON, setTurnedON] = useState<boolean>(false);
    const [warning, setWarning] = useState<boolean>(false);
    const [accepted_warning, setAccepted_warning] = useState<boolean>(false);
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
        <XmbContext.Provider value={{warning, accepted_warning, setAccepted_warning}}>
            <div className='select-none overflow-hidden h-screen'>
                {/* { turnedON ? <InitScreen/> : <Startup setTurnedON={setTurnedON} turnedON={turnedON}/>} */}
                <XMB/>
            </div>
        </XmbContext.Provider>
    )
}

export default MainPage
