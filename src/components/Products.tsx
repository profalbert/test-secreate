import React from 'react';
import CardProduct from './CardProduct';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../store/redux-store';
import { RateType, ProductType } from '../types/types';
import { appActions } from '../store/app-reducer';
import { Grid } from '@material-ui/core';


type MapStatePropsType = {
  products: Array<ProductType>
  exchangeRates: Array<RateType>
  ourNameCoins: Array<string>
}
type MapDispatchPropsType = {
  changeCardData: (product: ProductType) => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


const ProductsContainer: React.FC<PropsType> = ({products, exchangeRates, ourNameCoins, changeCardData}) => {
  return (
    <div>
      <h1>Товары</h1>

      <Grid container spacing={3}>
        {products.map(product => (
          <Grid key={product.id} item xs={4}>
            <CardProduct changeCardData={changeCardData} product={product} exchangeRates={exchangeRates} ourNameCoins={ourNameCoins} />
          </Grid>
        ))}        
      </Grid>
    </div>
  );
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    products: state.app.products,
    exchangeRates: state.app.exchangeRates,
    ourNameCoins: state.app.ourNameCoins,
  }
}
let mapDispatchToProps: MapDispatchPropsType = {
  changeCardData: appActions.changeCardData,
}


const Products = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)
)(ProductsContainer)


export default Products;
