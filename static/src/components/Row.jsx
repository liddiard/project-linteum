var React = require('react');


var Row = React.createClass({

  propTypes: {
    columns: React.PropTypes.array.isRequired,
    cells: React.PropTypes.array.isRequired
  },

  render: function(){
    // create an array of cells ordered according to the column order
    var cells = this.props.columns.map(function(column){
      return (
        <Cell type={column.type} constraints={column.constraints}
              value={this.props.cells[column.key]} />
      );
    }.bind(this));
    return (
      <tr>
        {cells}
      </tr>
    );
  }

});


module.exports = Row;
