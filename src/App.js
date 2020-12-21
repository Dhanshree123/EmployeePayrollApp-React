import React from 'react';
import './App.css';
import Home from './components/home/home';

import PayrollForm from "./components/payroll-form/payroll-form";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/add-employee/:id" component={PayrollForm}>
            <PayrollForm />
          </Route>
          <Route path = "/home" component = {Home}>
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
