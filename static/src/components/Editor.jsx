var request = require('superagent');
var socket = require('socket.io-client');
import React from 'react'

import Table from './Table.jsx'
import ColumnConfig from './ColumnConfig.jsx'


// http://stackoverflow.com/a/7180095/2487925
Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};


const Editor = React.createClass({

  getInitialState() {
    return {
      sheet: {
        columns: [],
        rows: []
      }
    }
  },

  componentDidMount() {
    const sheetId = this.props.params.sheetId;
    // get sheet with id in URL
    request
    .get('/sheet/'+sheetId)
    .end(function(err, res){
      this.setState({sheet: res.body}, this.joinRoom);
    }.bind(this));
  },

  joinRoom() {
    // join socket for this room
    const socket = io();
    socket.emit('join', this.state.sheet._id);
    socket.on('joined', room => {
      this.bindSockets();
    });
  },

  bindSockets() {
    // bind events to update local view on external changes
    // socket.on('column create');
  },

  columnCreate(index, column) {
    let sheet = this.state.sheet;
    sheet.columns.splice(index, 0, column);
    this.setState({sheet: sheet});
    socket.emit('column create', {index: index, column: column});
  },

  columnUpdate(index, column) {
    let sheet = this.state.sheet;
    sheet.columns[index] = column;
    this.setState({sheet: sheet});
    socket.emit('column update', {index: index, column: column});
  },

  columnMove(oldIndex, newIndex) {
    let sheet = this.state.sheet;
    // uses application-added Array.prototype.move function
    sheet.column.move(oldIndex, newIndex);
    this.setState({sheet: sheet});
    socket.emit('column move', {oldIndex: oldIndex, newIndex: newIndex});
  },

  columnDelete(index) {
    let sheet = this.state.sheet;
    // remove column from sheet
    sheet.columns.splice(index, 1);
    this.setState({sheet: sheet});
    socket.emit('column delete', {index: index});
  },

  rowCreate(index) {
    let sheet = this.state.sheet;
    let row = {};
    // populate row with column keys
    sheet.columns.forEach(column => {
      row[column.key] = '';
    });
    // insert row into sheet
    sheet.rows.splice(index, 0, row);
    this.setState({sheet: sheet});
    socket.emit('row create', {index: index, row: row});
  },

  rowUpdate(index, row) {
    let sheet = this.state.sheet;
    sheet.rows[index] = row;
    this.setState({sheet: sheet});
    socket.emit('row update', {index: index, row: row});
  },

  rowMove(oldIndex, newIndex) {
    let sheet = this.state.sheet;
    // uses application-added Array.prototype.move function
    sheet.row.move(oldIndex, newIndex);
    this.setState({sheet: sheet});
    socket.emit('row move', {oldIndex: oldIndex, newIndex: newIndex});
  },

  rowDelete(index) {
    let sheet = this.state.sheet;
    // remove row from sheet
    sheet.rows.splice(index, 1);
    this.setState({sheet: sheet});
    socket.emit('row delete', {index: index});
  },

  collaboratorCreate() {

  },

  collaboratorUpdate() {

  },

  collaboratorDelete() {

  },

  publicUpdate(isPublic) {

  },

  ownerUpdate() {

  },

  render() {
    let sheet = this.state.sheet;
    return (
      <div id="editor">
        <Table columns={sheet.columns} rows={sheet.rows}
               columnCreate={this.columnCreate} columnUpdate={this.columnUpdate}
               columnDelete={this.columnDelete} rowCreate={this.rowCreate}
               rowUpdate={this.rowUpdate} rowDelete={this.rowDelete} />
        <button onClick={this.rowCreate.bind(this, 0)}>Add row</button>
        <ColumnConfig  />
      </div>
    )
  }

});


module.exports = Editor;
