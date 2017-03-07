import React from 'react'


const ColumnConfig = React.createClass({

  propTypes: {
    column: React.PropTypes.object.isRequired
  },

  handleColumnCreate() {
    this.props.columnCreate(0, {name: 'col', key: 'col', type: 'text', required: false, unique: false, multiple: false, customValidation: {}});
  },

  render() {
    return (
      <aside>
        <h2>ColumnConfig</h2>
        <button onClick={this.handleColumnCreate}>Add column</button>
      </aside>
    );
  }

});


module.exports = ColumnConfig;
