var request = require('superagent');
var socket = require('socket.io-client');
import React from 'react'
import { Router, Route, Link } from 'react-router'

require('./app.scss');

var Header = require('./components/Header.jsx');
var Table = require('./components/Table.jsx');
var ColumnConfig = require('./components/ColumnConfig.jsx');


var App = React.createClass({

  componentDidMount: function() {
    // get information about the user
    request
    .get('/user')
    .end(function(err, res){
      this.setState({user: res.body});
    }.bind(this));

    // get a list of the user's sheets
    request
    .get('/sheets')
    .end(function(err, res){
      this.setState({sheets: res.body});
    }.bind(this));

    // bind sockets
    // socket.on('column create');
  },

  render: function() {
    return (
      <div id="app">
        <Header />
        <SheetList />
        <Table />
        <ColumnConfig />
      </div>
    );
  }

});


React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="/edit" component={SheetList}>
        <Route path=":sheetId" component={Editor} />
      </Route>
    </Route>
  </Router>
), document.body);
