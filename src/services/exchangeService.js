export default class ExchangeService {
    constructor() {
        this._apiBase = "https://api.exchangeratesapi.io/latest/?base=";
    }

    getResource = async (baseCurrency, to) => {
        const res = await fetch(`${this._apiBase}${baseCurrency}${to}`);

        const currency = await res.json().then((e) => {
            return this._transformCurrency(e['rates']);
        });

        return currency;
    }

    _transformCurrency = (currencies) => {
        let keys = [];
        for (let key in currencies) {
            keys.push({name: key, currency: currencies[key]});
        }
        return keys;
    }
}