import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import ipfs from "./ipfs";
import Nav from "./components/nav";
import Home from "./components/home";
import Manage from "./components/manage";
import Contributor from "./components/contributor";
import Overview from "./components/overview";
import AddProject from "./components/add-project";
import Update from "./components/update"

export default class App extends Component{

  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      id:"123",
      abc: false,
      ipfsHash: "",
      ipfsPath: "",
      ipfsMain: ""
    }
    
  }
 

  componentDidMount(){
    
  }

  render(){
    var { id, abc, ipfsHash} = this.state;
    if(id!=="")
    {
      abc = true;
    }
    return (
      <Router>
        <div className="app">
          <Nav />
          {!abc && <Route path="/" exact component={ Home } />}
          {/*abc && <Redirect to = {"/"+id}/>*/}
          <Route path="/:id" exact component={ Overview } />
          <Route path="/:id/manage" exact component={ Manage }/>
          <Route path="/:id/contribute" exact component={ Contributor }/>
          <Route path="/:id/add-project" exact component={ AddProject }/>
          <Route path="/:id/edit" component={ Update } />
        </div>
      </Router>
    );
  }

}


