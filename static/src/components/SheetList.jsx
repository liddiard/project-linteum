import request from 'superagent'
import React from 'react'
import {Link, History} from 'react-router'


const SheetList = React.createClass({

  mixins: [History],

  getInitialState() {
    return {
      sheets: []
    }
  },

  componentDidMount() {
    // get a list of the user's sheets
    request
    .get('/sheets')
    .end(function(err, res){
      this.setState({sheets: res.body});
    }.bind(this));
  },

  createSheet() {
    request
    .post('/sheets')
    .end(function(err, res){
      let sheets = this.state.sheets;
      const newSheet = res.body;
      sheets.push(newSheet);
      this.setState({sheets: sheets}, () => {
        this.history.pushState(null, '/edit/'+newSheet._id);
      });
    }.bind(this));
  },

  render() {
    let sheets = this.state.sheets.map(sheet => {
      return (
        <Link to={'/edit/'+sheet._id} className="sheet" key={sheet._id}>
          <h2>{sheet._id}</h2>
        </Link>
      );
    });
    return (
      <section className="sheets">
        <button onClick={this.createSheet}>Create sheet</button>
        {sheets}
      </section>
    );
  }

});


module.exports = SheetList;
