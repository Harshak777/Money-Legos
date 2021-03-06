import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ipfs from "../ipfs";
import axios from 'axios';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      projectname: '',
      description: '',
      deadline: 0,
      fund:0,
      contribute:100
    }
    
  }


 


  componentDidMount(){
    axios.get('http://localhost:5000/project/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          projectname: response.data.projectname,
          description: response.data.description,
          deadline: response.data.deadline,
          fund: response.data.fund
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    const {projectname,description,deadline,fund,contribute} = this.state;
    return (
    <div>
            <div class = "nav">
        <a href={'/'+this.props.match.params.id}><button class="btn"><i class="fa fa-home"></i> Home</button></a>
    </div>
      <h3>No Project Available</h3>
      <h1>{"ProjectName:"+projectname}</h1>
      <h1>{"Description:"+description}</h1>
      <h1>{"deadline:"+deadline}</h1>
      <h1>{"fund:"+fund}</h1>
      <Link to={"/"+this.props.match.params.id+"/add-project" }>Add Project</Link>
      <Link to={"/"+this.props.match.params.id+"/edit" }>Edit Project</Link>
    </div>
    )
  }
}