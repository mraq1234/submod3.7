'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pad0 = function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
};

var format = function format(_ref) {
    var minutes = _ref.minutes,
        seconds = _ref.seconds,
        miliseconds = _ref.miliseconds;
    return pad0(minutes) + ':' + pad0(seconds) + ':' + pad0(Math.floor(miliseconds));
};

var StoperDisplay = function StoperDisplay(_ref2) {
    var actualTime = _ref2.actualTime;
    return React.createElement(
        'div',
        { className: 'stopwatch' },
        format(actualTime)
    );
};

var StoperMiddletimes = function StoperMiddletimes(_ref3) {
    var listTime = _ref3.listTime;

    var timesList = listTime.map(function (time) {
        return React.createElement(
            'li',
            null,
            format(time)
        );
    });

    return React.createElement(
        'ul',
        { className: 'middletimes' },
        timesList
    );
};

var StoperButtons = function StoperButtons(props) {
    var handleStart = props.handleStart,
        handleMiddleTime = props.handleMiddleTime,
        handleStop = props.handleStop,
        handleReset = props.handleReset,
        handleClearList = props.handleClearList;

    return React.createElement(
        'nav',
        { className: 'controls' },
        React.createElement(
            'button',
            { className: 'button', onClick: handleStart },
            'Start'
        ),
        '\xA0',
        React.createElement(
            'button',
            { className: 'button', onClick: handleMiddleTime },
            'Middle'
        ),
        '\xA0',
        React.createElement(
            'button',
            { className: 'button', onClick: handleStop },
            'Stop'
        ),
        '\xA0',
        React.createElement(
            'button',
            { className: 'button', onClick: handleReset },
            'Reset'
        ),
        '\xA0',
        React.createElement(
            'button',
            { className: 'button', onClick: handleClearList },
            'Clear'
        )
    );
};

var Stoper = function (_React$Component) {
    _inherits(Stoper, _React$Component);

    function Stoper(props) {
        _classCallCheck(this, Stoper);

        var _this = _possibleConstructorReturn(this, (Stoper.__proto__ || Object.getPrototypeOf(Stoper)).call(this, props));

        _this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            listTime: []
        };

        _this.start = _this.start.bind(_this);
        _this.stop = _this.stop.bind(_this);
        _this.middleTime = _this.middleTime.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.clearList = _this.clearList.bind(_this);
        return _this;
    }

    _createClass(Stoper, [{
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.setState({
                    running: true
                });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.setState({
                running: false
            });
            clearInterval(this.watch);
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.setActualTimeState({});
        }
    }, {
        key: 'middleTime',
        value: function middleTime() {
            if (!this.state.running) return;
            this.setState({
                listTime: [].concat(_toConsumableArray(this.state.listTime), [this.state.times])
            });
        }
    }, {
        key: 'clearList',
        value: function clearList() {
            this.setState({
                listTime: []
            });
        }
    }, {
        key: 'setActualTimeState',
        value: function setActualTimeState(_ref4) {
            var _ref4$minutes = _ref4.minutes,
                minutes = _ref4$minutes === undefined ? 0 : _ref4$minutes,
                _ref4$seconds = _ref4.seconds,
                seconds = _ref4$seconds === undefined ? 0 : _ref4$seconds,
                _ref4$miliseconds = _ref4.miliseconds,
                miliseconds = _ref4$miliseconds === undefined ? 0 : _ref4$miliseconds;

            this.setState({
                times: {
                    minutes: minutes,
                    seconds: seconds,
                    miliseconds: miliseconds
                }
            });
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var temporaryTime = this.state.times;

            temporaryTime.miliseconds += 1;
            if (temporaryTime.miliseconds >= 100) {
                temporaryTime.seconds += 1;
                temporaryTime.miliseconds = 0;
            }

            if (temporaryTime.seconds >= 60) {
                temporaryTime.minutes += 1;
                temporaryTime.seconds = 0;
            }
            this.setActualTimeState(temporaryTime);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(StoperDisplay, { actualTime: this.state.times }),
                React.createElement(StoperButtons, {
                    handleStart: this.start,
                    handleStop: this.stop,
                    handleReset: this.reset,
                    handleMiddleTime: this.middleTime,
                    handleClearList: this.clearList
                }),
                React.createElement(StoperMiddletimes, { listTime: this.state.listTime })
            );
        }
    }]);

    return Stoper;
}(React.Component);

var App = function App() {
    return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(Stoper, null),
        React.createElement(Stoper, null),
        React.createElement(Stoper, null)
    );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));

//# sourceMappingURL=script-compiled.js.map