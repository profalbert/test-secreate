import { ResultStandartCodes } from './../api/api';
import { exchangeRatesAPI } from '../api/api';
import { InferActionsTypes } from './redux-store';
import { ThunkType, RateType, ProductType } from './../types/types';



const randomPrice = () => {return Math.ceil(Math.random() * 1000 + 1)}

let initialState = {
  initialized: false as boolean,
  products: [
    {id: 1, title: 'Мяч', price: randomPrice(), quantity: 1, isInShop: false},
    {id: 2, title: 'Кукла', price: randomPrice(), quantity: 1, isInShop: false},
    {id: 3, title: 'Тетрадь', price: randomPrice(), quantity: 1, isInShop: false},
    {id: 4, title: 'Книга', price: randomPrice(), quantity: 1, isInShop: false},
    {id: 5, title: 'Фильм', price: randomPrice(), quantity: 1, isInShop: false},
    {id: 6, title: 'Хлеб', price: randomPrice(), quantity: 1, isInShop: false},
  ] as Array<ProductType>,
  exchangeRates: [] as Array<RateType>,
  ourNameCoins: ["RUB", "USD", "EUR"] as Array<string>,
  allPrice: 0 as number
}

export const appReducer = (state = initialState, action: AppActionsTypes): typeof initialState => {
 switch(action.type) {
 	case 'app/INITIALIZED_SUCCESS': {
	  return {
	  	...state,
      initialized: true,
      allPrice: state.products.filter(item => item.isInShop === true).map(product => product.price * product.quantity).reduce((sum, current) => sum + current, 0),
	  };
   }
   case 'app/EXCHANGE_RATES_SUCCESS': {
	  return {
	  	...state,
			exchangeRates: action.payload.exchangeRates,
	  };
   }
   case 'app/CHANGE_CARD_DATA': {
    let newProducts = state.products.map(product => {
      if (product.id === action.payload.product.id) {
        return action.payload.product
      }
      return product
    })

	  return {
	  	...state,
      products: [...newProducts],
      allPrice: newProducts.filter(item => item.isInShop === true).map(product => product.price * product.quantity).reduce((sum, current) => sum + current, 0),
	  };
   }
	 default: 
	  return state;
 }
}


export type AppActionsTypes = InferActionsTypes<typeof appActions>

export const appActions = {
	initializedSuccess: () => ({
		type: 'app/INITIALIZED_SUCCESS'
  } as const),
  exchangeRatesSuccess: (exchangeRates: Array<RateType>) => ({
		type: 'app/EXCHANGE_RATES_SUCCESS', payload: {exchangeRates}
  } as const),
  changeCardData: (product: ProductType) => ({
		type: 'app/CHANGE_CARD_DATA', payload: {product}
  } as const),
}


export const initializeApp = (): ThunkType => async (dispatch) => {
  try {
    let exchangeRates = await dispatch(getExchangeRates())
    await Promise.all([exchangeRates])
    dispatch(appActions.initializedSuccess())
  } catch(error) {
    console.log(error)
  }
}


export const getExchangeRates = (): ThunkType => async (dispatch, getState) => {
  try {
    let exchangeRates = await exchangeRatesAPI.requestExchangeRates()
    let ourNameCoins = getState().app.ourNameCoins
    if (exchangeRates.status === ResultStandartCodes.Success) {
      const newExchangeRates = [...[...Object.values(exchangeRates.data["Valute"])]
      .filter((item: any) => ourNameCoins.includes(item["CharCode"]))
      .map((item: any) => ({
        "charCode": item["CharCode"],
        "value": item["Value"]
      } as RateType)), {
        "charCode": "RUB",
        "value": 1
      }]

      dispatch(appActions.exchangeRatesSuccess(newExchangeRates))
    }
  } catch(error) {
    console.log(error)
  }
}

