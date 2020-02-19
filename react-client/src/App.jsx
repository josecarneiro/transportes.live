import React from 'react';

import TransportationMap from './components/TransportationMap';

const KEY = 'AIzaSyDGD7_VrYPlO5F-qYuZSo_KSNAjHWev2Tg';

const App = () => {
  return (
    <div className="App">
      <TransportationMap options={{ key: KEY }} />
    </div>
  );
};

export default App;
