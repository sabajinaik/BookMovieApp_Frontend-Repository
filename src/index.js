import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import registerServiceWorker from './registerServiceWorker';
import Controller from './screens/Controller';
import {Provider} from 'react-redux';
import store from '../src/common/bookMovieAppReduxStore'

ReactDOM.render(<Provider store={store}><Controller/></Provider>, document.getElementById('root'));
registerServiceWorker();
