import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Overview extends Component
{

componentDidMount(){
  
}

render(){
  return (
    <div>
        <h1>Welcome</h1>
        <h3>Manage it here</h3>
        <Link to ={"/"+this.props.match.params.id+"/manage"}>manage</Link>
    </div>
  )
}
    

}

export default Overview;
