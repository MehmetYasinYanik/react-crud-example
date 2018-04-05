import React, {Component} from 'react';

export default class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: 50
        }
    }

    render() {

        return (
            <h4>{this.state.time}</h4>
        );
    }

    __startTimer = () => {
        let counter = setInterval(() => {
            //this.setState({time: this.state.time - 1});
            this.setState((state,props) => {
                return ({time: state.time - 1});
            });
            if (this.state.time === 0) {
                this.props.timeUp();
                clearInterval(counter);
            }
        }, 1000);
    };

    componentDidMount() {
        this.__startTimer()
    }

}