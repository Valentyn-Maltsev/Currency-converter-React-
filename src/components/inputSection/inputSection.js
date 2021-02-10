import React, {Component} from 'react';
import './inputSection.scss';
import Spinner from "../spinner/spinner";
import PropTypes from 'prop-types';
import ExchangeService from "../../services/exchangeService";

export default class InputSection extends Component {

    constructor(props) {
        super(props);
        this.exchangeService = new ExchangeService();

        this.state = {
            currency: this.props.currency,
            amount: 0
        }
    }

    renderSelectOptions(currencyList, selectedValue) {
        return currencyList.map(currency => {
            const {name} = currency

            return (
                <option key={name} selected={name === selectedValue}>
                    {name}
                </option>
            )
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const isComponentMain = this.props.mainId === this.props.id;

        if (
            !isComponentMain
            && (this.props.currency !== prevProps.currency
            || this.props.amount !== prevProps.amount)
            || this.state.currency !== prevState.currency
        ) {
            this.calculateAmount();
        }
    }


    inputChange = (e) => {
        this.props.processChangingAmount(this.props.id);

        this.setState((prev) => {
            return {
                ...prev,
                amount: e.target.value
            }
        })
    }


    inputBlur = (e) => {
        this.setState((prev) => {
            this.props.onChangeAmount(e.target.value, this.props.id, this.state.currency);
            this.props.sortSections(this.props.id);

            return {
                ...prev,
                amount: e.target.value
            }
        })
    }

    selectChange = (e) => {
        this.setState((prewProps) => {
            if(this.props.id === this.props.mainId) {
                this.props.onChangeCurrency(e.target.value, this.props.id);
            }

            return {
                ...prewProps,
                currency: e.target.value
            }
        })
    }


    calculateAmount = () => {
        const baseCurrency = this.props.currency
        const baseAmount = this.props.amount
        const currentCurrency = this.state.currency

        this.exchangeService.getResource(baseCurrency, `&symbols=${currentCurrency}`)
            .then((res) => {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        amount: res[0].currency * baseAmount
                    }
                })
            });
    }


    render() {
        const {currencyList} = this.props;

        if (!currencyList || !currencyList.length) {
            return <Spinner />
        }

        const options = this.renderSelectOptions(currencyList, this.state.currency);

        return (
            <div className="input-section">
                <label className="input-section__label">
                    <span className="input-section__span">Enter a value:</span>

                    <div className="input-currency">
                        <select
                            className="input-currency__select"
                            onChange={this.selectChange}
                        >
                            {options}
                        </select>
                        <input
                            type="text"
                            name="amount"
                            className="input-currency__amount"
                            onBlur={this.inputBlur}
                            onChange={this.inputChange}
                            value={this.state.amount}
                        />
                    </div>
                </label>
            </div>
        )
    }
}

InputSection.propTypes = { // проверка onChangeCurrencyValue, переданного в props на функцию с помощью библиотеки prop-types
    onChangeCurrency: PropTypes.func,
    onChangeAmount: PropTypes.func,
    currency: PropTypes.string,
    id: PropTypes.number,
    currencyList: PropTypes.array,
    mainId: PropTypes.number,
    amount: PropTypes.string,
    sortSections: PropTypes.func,
    processChangingAmount: PropTypes.func
}