import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ipfs from "../ipfs";
import axios from 'axios';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onChangeContibute = this.onChangeContibute.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      ipfsHash: "",
      ipfsPath: "Qmeg4LY9fJQrz8Mjxp3LW3RjAfjMgu2EmrqUiXU6KSNmnN",
      projectname: '',
      description: '',
      deadline: 0,
      fund:0,
      contribute:10
    }
    
  }


  onChangeContibute(e){
    this.setState(
      {
          contribute: e.target.value
      }
    )
  }

  onSubmit(e){
    e.preventDefault()
    console.log(Number(this.state.fund)-Number(this.state.contribute))
    this.setState({fund:Number(this.state.fund)-Number(this.state.contribute)})
  }

  async componentDidMount(){
    axios.post('http://localhost:5000/hash')
      .then(res => {console.log(res.data)
      this.setState({ipfsPath:res.data})});

    if(this.state.ipfsPath!=="")
    {
    var id = this.props.match.params.id
    var {ipfsPath} = this.state
    /*const result1 = await ipfs.files.cat(ipfsPath)
    const o1 = await JSON.parse(result1.toString('utf8'))[id]*/
    ipfsPath = this.state.ipfsPath
    const result = await ipfs.files.cat(ipfsPath)
    const o = await JSON.parse(result.toString('utf8'))
    console.log(o);
    this.setState({projectname:o.projectname,description:o.description,deadline:o.deadline,fund:o.fund})
    }
  }

  render() {
    const {projectname,description,deadline,fund,contribute} = this.state;
    return (
    <div>
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