import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import PhotoStore from "./store/PhotoStore";

export const Context = createContext(null)
ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        photos: new PhotoStore()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);