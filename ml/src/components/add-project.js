import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import ipfs from '../ipfs'; 

export default class AddProject extends Component {
  constructor(props) {
    super(props);

    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeFund = this.onChangeFund.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      ipfsHash : "1",
      projectname: '',
      description: '',
      deadline: 0,
      fund:0
    }
  }

  componentDidMount() {

  }

  onChangeProjectName(e){
      this.setState(
        {
            projectname: e.target.value
        }
      )
  }

  onChangeDescription(e){
    this.setState(
      {
          description: e.target.value
      }
    )
  }
  onChangeFund(e){
    this.setState(
      {
          fund: e.target.value
      }
    )
  }


  onChangeDeadline(e){
    this.setState({
        deadline: e.target.value
      })
  }

  

  async onSubmit(event) {
    event.preventDefault()

    const project = {
        _id : this.props.match.params.id,
        projectname: this.state.projectname,
        description: this.state.description,
        deadline: this.state.deadline,
        fund: this.state.fund
      };

      axios.post('http://localhost:5000/project/add', project)
      .then(res => console.log(res.data));


  }

  render() {
    return (
    <div>
      <h3>Create a new project</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
        <label>Project Name: </label>
        <input  type="text"
              required
              className="form-control"
              value={this.state.projectname}
              onChange={this.onChangeProjectName}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>DeadLine (in days): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.deadline}
              onChange={this.onChangeDeadline}
              />
        </div>
        <div className="form-group">
          <label>Fund to be raised (in ETH): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.fund}
              onChange={this.onChangeFund}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Create this Project" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}