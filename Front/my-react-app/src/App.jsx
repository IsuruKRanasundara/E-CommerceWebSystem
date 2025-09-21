import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './store/store';
import AppRoutes from './routes/AppRoutes.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <AppRoutes />
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                            },
                            success: {
                                duration: 3000,
                                theme: {
                                    primary: 'green',
                                    secondary: 'black',
                                },
                            },
                        }}
                    />
                </div>
            </Router>
        </Provider>
    );
}

export default App;