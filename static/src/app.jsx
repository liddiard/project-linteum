var request = require('superagent');
import React from 'react'
import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

require('./app.scss');

var SheetList = require('./components/SheetList.jsx');
var Editor = require('./components/Editor.jsx');

let history = createBrowserHistory();

var App = React.createClass({

  componentDidMount: function() {
    // get information about this user
    request
    .get('/user')
    .end(function(err, res){
      this.setState({user: res.body});
    }.bind(this));
  },

  render: function() {
    return (
      <div id="app">
        <header>
          Header stuff goes here
        </header>
        {/* shareConfig goes here */}
        {this.props.children}
      </div>
    );
  }

});

React.render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="/edit" component={SheetList} />
      <Route path="/edit/:sheetId" component={Table} />
    </Route>
  </Router>
), document.body);
