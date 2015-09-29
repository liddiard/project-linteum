var React = require('react');


var ColumnConfig = React.createClass({

  propTypes: {
    column: React.PropTypes.object.isRequired
  },

  render: function(){
    return (
      <h2>ColumnConfig</h2>
    );
  }

});


module.exports = ColumnConfig;
