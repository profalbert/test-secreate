import { AppStateType } from './../store/redux-store';
import { AppActionsTypes } from './../store/app-reducer';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react';


export type RateType = {
  "charCode": string,
  "value": number
}

export type ProductType = {
  id: number
  title: string
  price: number
  quantity: number
  isInShop: boolean
}


export type ActionsTypes = AppActionsTypes

export type GetStateType = () => AppStateType
export type DispatchType = Dispatch<ActionsTypes>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>



