import React, { Component } from 'react';

export default class Welcome extends Component {
  render() {
    return (
    <div>
       <h1>Welcome {console.log(this.props)}</h1>
    </div>
    )
  }
}