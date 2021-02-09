import React, {Component} from 'react';
import InputSection from "../inputSection";
import './inputContainer.scss';
import ExchangeService from "../../services/exchangeService";

export default class InputContainer extends Component {
    constructor() {
        super();

        this.exchangeService = new ExchangeService();

        this.state = {
            mainId: 1,
            currency: 'USD',
            amount: 100,
            currencyList: []
        }
        this.onChangeCurrency = this.onChangeCurrency.bind(this);
    }

    componentDidMount() {
        this.exchangeService.getResource(this.state.currency, '')
            .then((data) => {
                this.setState({currencyList: data})
            })
    }

    onChangeCurrency = (currency, id) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                currency: currency,
                mainId: id
            }
        })
    }

    onChangeAmount = (amount, id, currency) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                amount: amount,
                mainId: id,
                currency: currency
            }
        })
    }

    createSectionsList = (quantity) => {
        const {currencyList} = this.state;
        let sectionsArray = [];
        for (let i = 1; i <= quantity; i++) {
            sectionsArray.push(
                <div className="input-container__column">
                    <InputSection
                        currencyList={currencyList}
                        onChangeCurrency={this.onChangeCurrency}
                        onChangeAmount={this.onChangeAmount}
                        currency={this.state.currency}
                        amount={this.state.amount}
                        id={i}
                        mainId={this.state.mainId}
                    />
                </div>
            )

        }
        return sectionsArray;
    }

    render () {
        const sectionList = this.createSectionsList(10);

        return (
            <div className='input-container'>
                {sectionList}
            </div>
        )
    }
}