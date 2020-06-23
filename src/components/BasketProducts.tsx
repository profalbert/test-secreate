import React, {useEffect} from 'react';
import CardProduct from './CardProduct';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../store/redux-store';
import { RateType, ProductType } from '../types/types';
import { Grid } from '@material-ui/core';
import { appActions } from '../store/app-reducer';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);


type MapStatePropsType = {
  products: Array<ProductType>
  exchangeRates: Array<RateType>
  ourNameCoins: Array<string>
  allPrice: number
}
type MapDispatchPropsType = {
  changeCardData: (product: ProductType) => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


const BasketProductsContainer: React.FC<PropsType> = ({products, exchangeRates, ourNameCoins, changeCardData, allPrice}) => {
  const classes = useStyles();

  const [age, setAge] = React.useState(ourNameCoins[0]);
  const [conversionPriceValue, setConversionPriceValue] = React.useState<number | string>(0);


  useEffect(() => {
    let newConPrice = conversionPrice()
    setConversionPriceValue(newConPrice)
    // eslint-disable-next-line
  }, [age, allPrice]);


  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  }

  const conversionPrice = (): string | number => {
    const rate = exchangeRates.find(item => item["charCode"] === age)
    if (rate) return (allPrice / rate.value).toFixed(2)
    return ''
  }


  return (
    <div>
      <h1>Корзина товаров</h1>

      <div className="CardSelectWrapBasket">
        <h2>Узнать цену всех товраов в: </h2>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          defaultValue={age}
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {ourNameCoins.map(item => (
            <MenuItem key={item} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </div>

      <div className={"CardPriceWrapBasket"}>
        <h2>Цена всех товаров в корзине составляет (в {age}): {conversionPriceValue}</h2>
      </div>

      <Grid container spacing={3}>
        {products.filter(item => item.isInShop === true).map(product => (
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
    allPrice: state.app.allPrice
  }
}
let mapDispatchToProps: MapDispatchPropsType = {
  changeCardData: appActions.changeCardData,
}


const BasketProducts = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)
)(BasketProductsContainer)


export default BasketProducts;