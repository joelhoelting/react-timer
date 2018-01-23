import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import WebFont from 'webfontloader';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

WebFont.load({
  google: {
    families: ['Anonymous Pro:700', 'sans-serif']
  }
});


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
