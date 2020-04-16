import React, { Component } from 'react';

export default class Nav extends Component {
    constructor(props) {
        super(props);
        
      }
  render() {
    return (
    <div class = "nav">
        {console.log(this.props)}
    </div>
    )
  }
}