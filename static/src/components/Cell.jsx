var React = require('react');


var Cell = React.createClass({

  propTypes: {
    column: React.PropTypes.object.isRequired,
    row: React.PropTypes.object.isRequired
  },

  render() {
    // create an HTML-formatted string of constraint key/value pairs
    var constraints = '';
    for (var key in this.props.constraints) {
      if (this.props.constraints.hasOwnProperty(key)) {
        constraints += (key+'='+'"'+this.props.constraints[key]+'" ');
      }
    }
    // TODO: we will have to manually account for checked vs value vs selected props here,
    // as well as textarea for text type and possibly datetime-local for datetime
    const column = this.props.column;
    const value = row[column.key];
    return (
      <td>
        <input type={column.type} value={value} name={column.key} {constraints}
               onChange={this.props.handleCellChange} />
      </td>
    );
  }

});


module.exports = Cell;
