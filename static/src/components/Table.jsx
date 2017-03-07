var React = require('react');

var Row = require('./Row.jsx');


var Table = React.createClass({

  propTypes: {
    columns: React.PropTypes.array.isRequired,
    rows: React.PropTypes.array.isRequired,
  },

  render: function(){
    var columns = this.props.columns.map(function(column){
      return (
        <th>{column.name}</th>
      );
    });
    var rows = this.props.rows.map((row, index) => {
      return (
        <Row columns={this.props.columns} row={row} index={index}
             rowCreate={this.props.rowCreate} rowUpdate={this.props.rowUpdate}
             rowDelete={this.props.rowDelete} />
      );
    }.bind(this));
    return (
      <table>
        <tr>
          {columns}
        </tr>
        {rows}
      </table>
    );
  }

});


module.exports = Table;
