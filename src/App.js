import './App.css';
import Timer from './components/Timer'

function App() {
  return (
    <div className="App">
      <Timer 
      id = {'timer_1'}
      time={1} 
      autostart = {false} 
      step = {1000} 
      onTick={(min, sec) => console.log(`Залишилось часу: ${min} : ${sec}`)}
      onTimeStart={() => console.log("Таймер запущено!")}
      onTimePause={() => console.log("Таймер на паузі!")}
      onTimeEnd={() => console.log("Час вийшов!")}/> 

       <Timer 
      id = {'timer_2'}
      time={2} 
      autostart = {true} 
      step = {2000} 
      onTick={(min, sec) => console.log(`Залишилось часу: ${min} : ${sec}`)}
      onTimeStart={() => console.log("Таймер запущено!")}
      onTimePause={() => console.log("Таймер на паузі!")}
      onTimeEnd={() => console.log("Час вийшов!")}/>     
    </div>
  );
}

export default App;
