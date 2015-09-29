var React = require('react');


var Cell = React.createClass({

  propTypes: {
    type: React.PropTypes.string.isRequired,
    constraints: React.PropTypes.object.isRequired
    // value can be one of many types
  },

  render: function(){
    // create an HTML-formatted string of constraint key/value pairs
    var constraints = "";
    for (var key in this.props.constraints) {
      if (this.props.constraints.hasOwnProperty(key)) {
        constraints += (key+'='+'"'+this.props.constraints[key]+'" ');
      }
    }
    return (
      <td>
        <input type={this.props.type} value={this.props.value} {constraints} />
      </td>
    );
  }

});


module.exports = Cell;
