import React, { Component } from 'react';
import axios from 'axios';
import ipfs from '../ipfs'; 

export default class Update extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeFund = this.onChangeFund.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      ipfsHash : "",
      projectname: '',
      description: '',
      deadline: 0,
      fund:0
    }
  }

  componentDidMount() {
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

  

  onSubmit(event) {
    event.preventDefault()

    const project = {
      _id : this.props.match.params.id,
      projectname: this.state.projectname,
      description: this.state.description,
      deadline: this.state.deadline,
      fund: this.state.fund
    };
    let manage = 'manage'
    axios.post('http://localhost:5000/project/update', project)
    .then(res => console.log(res.data));

    window.location = manage

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
          <input type="submit" value="Update" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}