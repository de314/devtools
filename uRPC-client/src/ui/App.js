import React from 'react';

import Header from './layout/Header';
import Content from './layout/Content';

const App = () => (
  <div className="App bg-info" style={{ minHeight: '100vh' }}>
    <div className="container">
      <Header />
      <div className="my-3 p-4 bg-white rounded" style={{ minHeight: '50vh' }}>
        <Content />
      </div>
    </div>
  </div>
);

export default App;
