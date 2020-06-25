import React from 'react';
import { Router } from 'react-router-dom';
import history from './services/history';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
function App() {
    return (
        <Router history={history}>
            <Routes />
        </Router>
    );
}
export default App;
