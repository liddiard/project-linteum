var React = require('react');

var Row = require('./Row.jsx');


var Table = React.createClass({

  propTypes: {
    columns: React.PropTypes.array.isRequired,
    rows: React.PropTypes.array.isRequired
  },

  render: function(){
    var columns = this.props.columns.map(function(column){
      return (
        <th>{column.name}</th>
      );
    });
    var rows = this.props.rows.map(function(row){
      return (
        <Row columns={this.props.columns} cells={row} />
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
