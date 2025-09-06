import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {store} from './store/store.js';
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import {Provider} from "react-redux";
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BrowserRouter>
        </StrictMode>
    </Provider>
    ,
)