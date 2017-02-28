const pad0 = value => {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const format = ({minutes, seconds, miliseconds}) =>
        `${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(miliseconds))}`;

const StoperDisplay = ({actualTime}) => <div className="stopwatch">{format(actualTime)}</div>;

const StoperMiddletimes = ({listTime}) => {
    const timesList = listTime.map(time => <li>{format(time)}</li>);

    return (    
        <ul className='middletimes'>{timesList}</ul>
    );
}

const StoperButtons = props => {
    const {
        handleStart,
        handleMiddleTime,
        handleStop,
        handleReset,
        handleClearList
    } = props;
    return (
        <nav className="controls">
            <button className="button" onClick={handleStart}>Start</button>&nbsp;
            <button className="button" onClick={handleMiddleTime}>Middle</button>&nbsp;
            <button className="button" onClick={handleStop}>Stop</button>&nbsp;
            <button className="button" onClick={handleReset}>Reset</button>&nbsp;
            <button className="button" onClick={handleClearList}>Clear</button>
        </nav>
    );
}

class Stoper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            listTime: []
        };
        
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.middleTime = this.middleTime.bind(this);
        this.reset = this.reset.bind(this);
        this.clearList = this.clearList.bind(this);
    }

    start()  {
        if (!this.state.running) {
            this.setState({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    stop()  {
        this.setState({
            running: false
        });
        clearInterval(this.watch);
    }
    
    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }

    middleTime() {
        if (!this.state.running) return;
        this.setState({
            listTime: [...this.state.listTime, this.state.times]
        });
    }

    clearList() {
        this.setState({
            listTime: []
        });
    }

    calculate() {
        this.state.times.miliseconds += 1;
        if (this.state.times.miliseconds >= 100) {
            this.state.times.seconds += 1;
            this.state.times.miliseconds = 0;
        }
        if (this.state.times.seconds >= 60) {
            this.state.times.minutes += 1;
            this.state.times.seconds = 0;
        }
    }

    render() {
        return (
            <div>
                <StoperDisplay actualTime={this.state.times}/>                
                <StoperButtons 
                    handleStart={this.start}
                    handleStop={this.stop}
                    handleReset={this.reset}
                    handleMiddleTime={this.middleTime}
                    handleClearList={this.clearList}
                />
                <StoperMiddletimes listTime={this.state.listTime}/>
            </div>
        );
    }
}

const App = () => {
    return (
        <div className="container">
            <Stoper />
            <Stoper />
            <Stoper />
        </div>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
