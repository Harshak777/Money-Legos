import React, { Component } from 'react';
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

  async componentDidMount() {
    var id = this.props.match.params.id
    var ipfsPath = "QmUJ2ummnWoJLHWX6qoavDthzc5nitgPCcAJoHMB45mDE9"
    const result1 = await ipfs.files.cat(ipfsPath)
    const o1 = await JSON.parse(result1.toString('utf8'))[id]
    ipfsPath = o1
    const result = await ipfs.files.cat(ipfsPath)
    const o = await JSON.parse(result.toString('utf8'))
    console.log(o);
    this.setState({projectname:o.projectname,description:o.description,deadline:o.deadline,fund:o.fund})
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

    /*const project = {
        projectname: this.state.projectname,
        description: this.state.description,
        deadline: this.state.deadline,
        fund: this.state.fund
      };
      ipfs.files.add(buf, (error, result) => {
      if(error) {
        console.error(error)
        return
      }
      this.setState({ ipfsHash: result[0].hash })
      console.log('ifpsHash', this.state.ipfsHash)
    })*/
    
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
          <input type="submit" value="Update" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}