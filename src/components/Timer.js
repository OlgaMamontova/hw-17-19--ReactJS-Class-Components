import React, { Component } from "react";

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            minutes: props.time,
            autostart: props.autostart,
            step: props.step,
            seconds: 0,
            isStarted: false,            
            widthLine: 500,
            widthFromTime: 500/(props.time*60)*(props.step/1000),
            onTick: props.onTick,
            onTimeStart: props.onTimeStart,
            onTimePause: props.onTimePause,
            onTimeEnd: props.onTimeEnd,
          };          
    };

    componentDidMount() {       
        this.setState(() => ({
            minutes: this.props.time,
            seconds: 0,
            widthLine: 500,
        }))
        const {autostart} = this.state;      
            if(autostart == true){
           this.startTimer();           
        }          
    }

    componentDidUpdate(){
        this.state.onTick(this.state.minutes, this.state.seconds);
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
        const {autostart} = this.state;      
        if(autostart == true){
            this.isStarted = !this.isStarted; 
        }
    }

    startTimer = () => {
        this.isStarted = !this.isStarted;

        if(this.isStarted){
            this.state.onTimeStart();       
            this.myInterval = setInterval(() => {
                const { seconds, minutes, step, widthLine, widthFromTime, id } = this.state
            
                this.setState(({ widthLine }) => ({
                    widthLine: (widthLine - widthFromTime)                
                }))
                 document.querySelector(`#${id} .line`).style.width = widthLine - widthFromTime + "px";
           
                if (seconds > 0) {
                    this.setState(({ seconds }) => ({
                        seconds: step < 1000 ? (seconds - (step / 1000)).toFixed(1) : (seconds - (step / 1000))
                    }))                    
                }

                if (seconds == 0) {
                    if (minutes == 0) {
                        clearInterval(this.myInterval);  
                        this.state.onTimeEnd();  
                        this.isStarted = !this.isStarted;                    
                    } else {
                        this.setState(({minutes}) => ({
                            minutes: minutes - 1,
                            seconds: 60 - (step / 1000)
                        }))
                    }
                }          
            }, this.state.step)
        } else {
            clearInterval(this.myInterval)
            this.state.onTimePause(); 
        }         
    }

    render(){        
        const { minutes, seconds, id } = this.state;
        return (
            <div className="timer" id={id}>
                <h1>{minutes} : {seconds < 10 ? `0${seconds}` : seconds}</h1>
                <div className="wrapper_line"><div className="line"></div></div>
                <button onClick={this.startTimer}>Start / pause</button>
            </div>
        )
    }
};

export default Timer;