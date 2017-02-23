class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="stopwatch">{this.props.actualTime}</div>
        )
    }
}

class Middletimes extends React.Component {
    constructor(props) {
        super(props);   
    }
    
    render () {
        this.listTimes = this.props.listTime.map((time) => {
            return (
                <li>{time}</li>
            );
        })
        return (
            <div className='middletimes'><ul>{this.listTimes}</ul></div>
        );
    }
}

class App extends React.Component {
        constructor(props) {
        super(props);
        this.state = {
            running: false,
            actualTime: "",
        };
        this.listTime = [];
        this.reset();
        this.print(this.times);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.middleTime = this.middleTime.bind(this);
        this.reset = this.reset.bind(this);
        this.clearList = this.clearList.bind(this);
        document.getElementById('start').addEventListener('click', this.start);
        document.getElementById('stop').addEventListener('click', this.stop);
        document.getElementById('middle').addEventListener('click', this.middleTime);
        document.getElementById('reset').addEventListener('click', this.reset);
        document.getElementById('clearList').addEventListener('click', this.clearList);
    }

    start()  {
        if (!this.state.running) {
            this.state.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
        this.print();
    }

    stop()  {
        this.state.running = false;
        clearInterval(this.watch);
    }
    
    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.print();
    }

    print() {
        this.state.actualTime = this.format(this.times);
        this.forceUpdate();
    }

    middleTime() {
        if (!this.state.running) return;
        this.listTime.push(this.format(this.times));
        this.forceUpdate();
    }

    clearList() {
        this.listTime = [];
        this.forceUpdate();
    }

    format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }

    render() {
        return (
            <div>
                <Stopwatch className="stopwatch" actualTime={this.state.actualTime}/>
                <Middletimes className="middletimes" listTime={this.listTime}/>
            </div>
        );
    }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
