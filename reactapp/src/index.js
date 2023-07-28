import React from 'react';
import ReactDOM from 'react-dom/client';
import './font.css';
import App from './App';
import {MantineProvider} from '@mantine/core';
import {persistor, store} from "./store";
import {Provider} from 'react-redux';
import {Notifications} from "@mantine/notifications";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                    <MantineProvider theme={{
                        fontFamily: 'Poppins, sans-serif',
                        fontFamilyMonospace: 'Monaco, Courier, monospace',
                        headings: { fontFamily: 'Poppins, sans-serif' },
                    }} withGlobalStyles withNormalizeCSS>
                        <Notifications/>
                        <App/>
                    </MantineProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
