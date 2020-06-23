import axios from 'axios'


export enum ResultStandartCodes {
  Success = 200
}


type exchangeRatesAPITypes = {
  requestExchangeRates: any
}
export const exchangeRatesAPI = {
  async requestExchangeRates() {
    return axios.get<exchangeRatesAPITypes["requestExchangeRates"]>(
      `https://www.cbr-xml-daily.ru/daily_json.js`
    ).then(res => res)
  }
}


