import React, {Component} from 'react';
import 'reset-css';
import './app.css';
import InputContainer from "../inputContainer";
import ExchangeService from "../../services/exchangeService";

export default class App extends Component {
    constructor() {
        super();
        this.exchangeService = new ExchangeService();
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    Header
                </header>
                <InputContainer />
            </div>
        );
    }
}
