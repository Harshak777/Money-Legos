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
        projectname: this.state.projectname,
        description: this.state.description,
        deadline: this.state.deadline,
        fund: this.state.fund
      };

    var ip ={hash:100}
    var buf = new Buffer(JSON.stringify(project ))
    const result = await ipfs.files.add(buf)
    ip.hash = await result[0].hash
    console.log('ifpsHash', ip)

    axios.post('http://localhost:5000/', ip)
      .then(res => console.log(res.data));
    window.location = "/"+this.props.match.params.id+"/manage"
    //console.log(this.props.match.params.id)

    /*const ipfsPath = "QmUEQeuA7yXs7fYg4ZkFKdxSNGtwUyZQXhQRystW3ntj7o"
    ipfs.files.cat(ipfsPath, function(err,filestream){
        if(err) {
            console.error(err)
            return
        }
        console.log(JSON.parse(filestream.toString('utf8')))
    })*/

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