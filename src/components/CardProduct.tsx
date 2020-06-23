import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import '../App.css';
import { ProductType, RateType } from '../types/types';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      maxWidth: 345,
      margin: "0 auto",
    },
    media: {
      height: 140,
    },
    shoppingCartOutlined : {
      backgroundColor: "#f50057",
    },
    buttonQuantityRemove: {
      backgroundColor: "#0063cc",
      marginRight: "10px",
    },
    buttonQuantityAdd: {
      backgroundColor: "#f50057",
    },
  }),
);


type PropsType = {
  product: ProductType
  exchangeRates: Array<RateType>
  ourNameCoins: Array<string>
  changeCardData: (product: ProductType) => void
}


export const CardProduct: React.FC<PropsType> = ({product, exchangeRates, ourNameCoins, changeCardData}) => {
  const classes = useStyles();

  const [age, setAge] = React.useState(ourNameCoins[0]);
  const [isInShop, setIsInShop] = React.useState(product.isInShop);
  const [quantity, setQuantity] = React.useState(product.quantity);
  const [conversionPriceValue, setConversionPriceValue] = React.useState<number | string>(product.price);


  useEffect(() => {
    let newConPrice = conversionPrice()
    setConversionPriceValue(newConPrice)
    // eslint-disable-next-line
  }, [age]);

  useEffect(() => {
    if ((isInShop !== product.isInShop) || (quantity !== product.quantity)) {
      changeCardData({...product, quantity: quantity, isInShop: isInShop})
    }
    // eslint-disable-next-line
  }, [isInShop, quantity]);


  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  }

  const changeQuantity = (quan: number) => {
    setQuantity(prev => prev + quan)
  }

  const conversionPrice = (): string | number => {
    const rate = exchangeRates.find(item => item["charCode"] === age)
    if (rate) return (product.price / rate.value).toFixed(2)
    return ''
  }

  const sendInShop = () => {
    setIsInShop(prev => !prev)
    changeCardData({...product, quantity: quantity, isInShop: isInShop})
  }


  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://secreate.io/upload/iblock/cd3/cd37d24a6e41fbe7483171a35d809a94.jpg"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.title}
        </Typography>

        <div className="CardSelectWrap">
          <Typography gutterBottom variant="h6" component="h2">
            Цена: {conversionPriceValue}
          </Typography>
          <FormControl className={classes.formControl}>
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
          </FormControl>
        </div>

        <div className="CardQuantityWrap">
          <Typography gutterBottom variant="h6" component="h2">
            Количество: {quantity}
          </Typography>
          <div>
            <IconButton className={classes.buttonQuantityRemove} disabled={quantity <= 1} onClick={() => changeQuantity(-1)}>
              <RemoveIcon />
            </IconButton>
            <IconButton className={classes.buttonQuantityAdd} disabled={quantity >= 10} onClick={() => changeQuantity(1)}>
              <AddIcon />
            </IconButton>
          </div>            
        </div>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => sendInShop()} className={isInShop ? classes.shoppingCartOutlined : ''} color="inherit">
          <ShoppingCartOutlined />
        </IconButton>
      </CardActions>
    </Card>
  );
}


export default CardProduct;