import '../css/style.css'
import { useEffect, useState, useRef } from 'react'
import Startup from './components/Startup'
import InitScreen from './components/InitScreen';

function MainPage() {
    const [turnedON, setTurnedON] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(new Audio('/startup.mp3'));

    useEffect(() => {
        if (turnedON) {
            audioRef.current?.play();
        }
    }, [turnedON])


    return (
        <div className='select-none'>
            { turnedON ? <InitScreen/> : <Startup setTurnedON={setTurnedON} turnedON={turnedON}/>}
        </div>
    )
}

export default MainPage
