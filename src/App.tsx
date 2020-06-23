import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom'
import Container from '@material-ui/core/Container';
import Products from './components/Products';
import Navbar from './components/Navbar';
import './App.css';
import { AppStateType } from './store/redux-store';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeApp } from './store/app-reducer';
import BasketProducts from './components/BasketProducts';


type MapStatePropsType = {
  initialized: boolean
}
type MapDispatchPropsType = {
  initializeApp: () => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


const AppPresentation: React.FC<PropsType> = ({initialized, initializeApp}) => {
  useEffect(() => {
    initializeApp()
  }, [initializeApp]);

  if(!initialized) {
    return (
      <div className={"Preloader"}>
        <h1>Loading...</h1> 
      </div>
    )
  }

  return (
    <div className="App">
      <Navbar />
      <div className="AppContent">
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/shop" render={() => <BasketProducts />}/>
            <Route exact path="/" render={() => <Products />}/>
            <Route path="*" render={() =>(<div className={"error404"}>404: NOT FOUND</div>)}/> 
          </Switch>
        </Container>
      </div>
    </div>
  );
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    initialized: state.app.initialized,
  }
}

let mapDispatchToProps: MapDispatchPropsType = {
  initializeApp,
}


const App = compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)
)(AppPresentation)


export default App;
