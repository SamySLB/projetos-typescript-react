import {useState, useEffect} from "react";
import TimerControls from "./TimerControls";
import TimerDisplay from "./TimerDisplay";
import LapList from "./LapList";
import './Timer.css'
const Timer = ()=>{

  const[milliseconds, setMilliseconds] = useState(0)
  const [timerOn, SetTimerOn] = useState(false)
  const [laps, setLaps] = useState([])

  const formatTime = () =>{
    const minutes = ("0"+ Math.floor((milliseconds/60000 )%60)).slice(-2);
    const seconds = ("0"+ Math.floor((milliseconds/1000)%60)).slice(-2);
    const centiseconds = ("0"+ Math.floor((milliseconds/10)%100)).slice(-2);
    console.log(minutes, seconds, centiseconds);

    return `${minutes}: ${seconds} : ${centiseconds}`;
  }
const stopTimer = (interval)=>{
  clearInterval(interval);
  return interval;
}

const starTimer = (interval) => {
 return setInterval(()=>{
  setMilliseconds((prevMilliseconds)=> prevMilliseconds+10);
 },10)
}

const resetTimer = () => {
  setMilliseconds(0)
  SetTimerOn(false)
  setLaps([])
}

const addLap =()=>{
  setLaps([...laps,formatTime()])
}

useEffect(()=>{
  let interval = null

  if(timerOn){
    interval = starTimer(interval)
  }else{
    interval = stopTimer(interval);
  }
   return()=>stopTimer(interval);
},[timerOn])


    return <>
    <div className="timer-container">
    <TimerDisplay time={formatTime()}/>
  <TimerControls
  timerOn={timerOn}
  onStart ={()=> SetTimerOn(true)}
  onStop={()=> SetTimerOn(false)}
  onReset={resetTimer}
  onLap={addLap}
  />
   <LapList laps={laps}/>
   
  
    </div>
    </>
}
export default Timer