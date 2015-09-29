import React from 'react'
import Link from 'react-router'


const SheetList = React.createClass({

  propTypes: {
    sheets: React.PropTypes.array.isRequired
  },

  render(){
    let sheets = this.props.sheets.map(sheet => {
      <Link to="/edit/{sheet._id}" class="sheet">
        <h2>{sheet.name}</h2>
      </Link>
    });
    return (
      <section class="sheets">
        {sheets}
      </section>
    );
  }

});


module.exports = SheetList;
