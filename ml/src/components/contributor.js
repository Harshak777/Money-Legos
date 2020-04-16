import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ipfs from "../ipfs";
import axios from 'axios';

export default class Contributor extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onChangeContribute = this.onChangeContribute.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      projectname: '',
      description: '',
      deadline: 0,
      fund:0,
      contribute:100
    }
    
  }


  onChangeContribute(e){
    this.setState(
      {
          contribute: e.target.value
      }
    )
  }

  onSubmit(e){
    e.preventDefault()
    const project = {
      _id : this.props.match.params.id,
      projectname: this.state.projectname,
      description: this.state.description,
      deadline: this.state.deadline,
      fund: this.state.fund - this.state.contribute
    };

    axios.post('http://localhost:5000/project/update', project)
    .then(res => console.log(res.data));
    window.location = ''
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
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Contribute (in ETH): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.contribute}
              onChange={this.onChangeContribute}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="contribute" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}