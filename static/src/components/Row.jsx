var React = require('react');


var Row = React.createClass({

  propTypes: {
    columns: React.PropTypes.array.isRequired,
    row: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired
  },

  handleCellChange() {
    let row = this.props.row;
    row[event.target.name] = event.target.value;
    this.props.rowUpdate(this.props.index, row);
  },

  render() {
    // create an array of cells ordered according to the column order
    var cells = this.props.columns.map(function(column){
      return (
        <Cell column={column} row={row}
              handleCellChange={this.handleCellChange} />
      );
    }.bind(this));
    return (
      <tr>
        {cells}
      </tr>
    );
  },

});


module.exports = Row;
