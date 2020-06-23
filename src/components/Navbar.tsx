import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ProductType } from '../types/types';
import { AppStateType } from '../store/redux-store';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
  }),
);


type MapStatePropsType = {
  products: Array<ProductType>
}
type MapDispatchPropsType = {}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


export const NavbarContainer: React.FC<PropsType> = ({products}) => {
  const classes = useStyles();
  let productsShopCount = products.filter(item => item.isInShop === true).length

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              <NavLink to="/">ТЗ для Secreate</NavLink>
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            <NavLink to="/shop">
              <IconButton color="inherit">
                <Badge badgeContent={productsShopCount} color="secondary">
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </NavLink>              
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    products: state.app.products,
  }
}
let mapDispatchToProps: MapDispatchPropsType = {}


const Navbar = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)
)(NavbarContainer)


export default Navbar;

