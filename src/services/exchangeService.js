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
        let result = [];
        for (let key in currencies) {
            result.push({name: key, currency: currencies[key]});
        }

        result.sort(function(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1
            }
        })
        return result;
    }
}