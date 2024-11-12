import React, {useEffect} from 'react';
import {AppNavigator, store} from '@FoodMamaApplication';
import {Provider} from 'react-redux';
import BootSplash from 'react-native-bootsplash';

const App = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
