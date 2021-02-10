import React, {Component} from 'react';
import InputSection from "../inputSection";
import './inputContainer.scss';
import ExchangeService from "../../services/exchangeService";

export default class InputContainer extends Component {
    constructor() {
        super();

        this.exchangeService = new ExchangeService();
        this.quantity = 7;

        this.state = {
            mainId: 1,
            changingId: null,
            currency: 'USD',
            amount: 100,
            currencyList: [],
            sections: []
        }
        this.onChangeCurrency = this.onChangeCurrency.bind(this);
    }

    componentDidMount() {
        this.exchangeService.getResource(this.state.currency, '')
            .then((data) => {
                this.setState((prevState) => {
                    let sections = [];
                    for (let i = 1; i <= this.quantity; i++) {
                        sections.push({
                            id: i,
                            order: i
                        })
                    }
                    return {
                        ...prevState,
                        currencyList: data,
                        sections: sections
                    }
                })
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

    processChangingAmount = (id) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                changingId: id
            }
        })
    }

    onChangeAmount = (amount, id, currency) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                amount: amount,
                mainId: id,
                currency: currency,
                changingId: null
            }
        })
    }

    sortItems = (mainId) => {
        let {sections} = this.state;

        let newItems = sections.map((item, index) => {
            if (item.id == mainId) {
                return {
                    id: item.id,
                    order: 0
                }
            }
            return {
                id: item.id,
                order: index + 1
            }
        })
        this.setState((prevState) => {
            return {
                ...prevState,
                sections: newItems
            }
        })
    }

    render () {
        const {currencyList} = this.state;

        return (
            <div className='input-container'>
                {this.state.sections.sort((a, b) => a.order - b.order).map((sectionItem) => {
                    let className = "input-container__column";
                    if (sectionItem.id == this.state.mainId) {
                        className = "input-container__column--main";
                    }
                    if (sectionItem.id == this.state.changingId) {
                        className = "input-container__column--changing";
                    }

                    return (
                        <div key={sectionItem.id} className={className}>
                            <InputSection
                                currencyList={currencyList}
                                onChangeCurrency={this.onChangeCurrency}
                                onChangeAmount={this.onChangeAmount}
                                processChangingAmount={this.processChangingAmount}
                                sortSections={this.sortItems}
                                currency={this.state.currency}
                                amount={this.state.amount}
                                id={sectionItem.id}
                                mainId={this.state.mainId}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}