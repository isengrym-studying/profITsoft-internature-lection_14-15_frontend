import React from 'react';
import { Provider } from 'react-redux';
import withAuthorities from 'decorators/withAuthorities';
import NewBook from './containers/NewBook';
import {store} from "../../app";

export default withAuthorities(props => (
    <Provider store={store}>
        <NewBook {...props} />
    </Provider>
));
