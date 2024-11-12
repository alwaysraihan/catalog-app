import React from 'react';
import {AppNavigator, store} from '@FoodMamaApplication';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
