import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBikes } from '../actions';

import Template from './Template';
import BikeNew from './BikeNew';
import Dashboard from './Dashboard';

const Help = () => <div>Help</div>;
const NotFound = () => <div>NotFound</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.fetchBikes();
  }
  render() {
    return (
      <BrowserRouter>
        <Template>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/bikes/new" component={BikeNew} />
            <Route exact path="/help" component={Help} />
            <Route component={NotFound} />
          </Switch>
        </Template>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchBikes })(App);
