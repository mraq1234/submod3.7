"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        return _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));
    }

    _createClass(Stopwatch, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "stopwatch" },
                this.props.actualTime
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

var Middletimes = function (_React$Component2) {
    _inherits(Middletimes, _React$Component2);

    function Middletimes(props) {
        _classCallCheck(this, Middletimes);

        return _possibleConstructorReturn(this, (Middletimes.__proto__ || Object.getPrototypeOf(Middletimes)).call(this, props));
    }

    _createClass(Middletimes, [{
        key: "render",
        value: function render() {
            this.listTimes = this.props.listTime.map(function (time) {
                return React.createElement(
                    "li",
                    null,
                    time
                );
            });
            return React.createElement(
                "div",
                { className: "middletimes" },
                React.createElement(
                    "ul",
                    null,
                    this.listTimes
                )
            );
        }
    }]);

    return Middletimes;
}(React.Component);

var App = function (_React$Component3) {
    _inherits(App, _React$Component3);

    function App(props) {
        _classCallCheck(this, App);

        var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this3.state = {
            running: false,
            actualTime: ""
        };
        _this3.listTime = [];
        _this3.reset();
        _this3.print(_this3.times);
        _this3.start = _this3.start.bind(_this3);
        _this3.stop = _this3.stop.bind(_this3);
        _this3.middleTime = _this3.middleTime.bind(_this3);
        _this3.reset = _this3.reset.bind(_this3);
        _this3.clearList = _this3.clearList.bind(_this3);
        document.getElementById('start').addEventListener('click', _this3.start);
        document.getElementById('stop').addEventListener('click', _this3.stop);
        document.getElementById('middle').addEventListener('click', _this3.middleTime);
        document.getElementById('reset').addEventListener('click', _this3.reset);
        document.getElementById('clearList').addEventListener('click', _this3.clearList);
        return _this3;
    }

    _createClass(App, [{
        key: "start",
        value: function start() {
            var _this4 = this;

            if (!this.state.running) {
                this.state.running = true;
                this.watch = setInterval(function () {
                    return _this4.step();
                }, 10);
            }
        }
    }, {
        key: "step",
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: "stop",
        value: function stop() {
            this.state.running = false;
            clearInterval(this.watch);
        }
    }, {
        key: "reset",
        value: function reset() {
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
            this.print();
        }
    }, {
        key: "print",
        value: function print() {
            this.state.actualTime = this.format(this.times);
            this.forceUpdate();
        }
    }, {
        key: "middleTime",
        value: function middleTime() {
            if (!this.state.running) return;
            this.listTime.push(this.format(this.times));
            this.forceUpdate();
        }
    }, {
        key: "clearList",
        value: function clearList() {
            this.listTime = [];
            this.forceUpdate();
        }
    }, {
        key: "format",
        value: function format(times) {
            return this.pad0(times.minutes) + ":" + this.pad0(times.seconds) + ":" + this.pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: "calculate",
        value: function calculate() {
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
    }, {
        key: "pad0",
        value: function pad0(value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(Stopwatch, { className: "stopwatch", actualTime: this.state.actualTime }),
                React.createElement(Middletimes, { className: "middletimes", listTime: this.listTime })
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));

//# sourceMappingURL=script-compiled.js.map