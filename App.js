import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/navigation/Routes'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './src/redux/reducers';



const Xpay = () => {
  return (
    <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))} >
      <NavigationContainer>
  <Routes />
      </NavigationContainer>
    </Provider>
  )
}

export default Xpay;