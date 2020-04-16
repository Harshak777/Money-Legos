import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Project = props => (
  <tr>
    <td>{props.project.projectname}</td>
    <td>{props.project.description}</td>
    <td>{props.project.deadline}</td>
    <td>{props.project.fund}</td>
    <td>
      <Link to={props.project._id+"/contribute"}>contribute</Link>
    </td>
  </tr>
)

class Overview extends Component
{
  constructor(props) {
    super(props);

    this.state = {projects: []};
  }

componentDidMount(){
  axios.get('http://localhost:5000/project/')
  .then(response => {
    this.setState({ projects: response.data })
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error);
  })
}

projectList() {
  return this.state.projects.map(currentproject => {
    return <Project project={currentproject} />;
  })
}

render(){
  return (
    <div>
        <h1>Welcome</h1>
        <h3>Manage it here</h3>
        <Link to ={"/"+this.props.match.params.id+"/manage"}>manage</Link>
        <div>
        <h3>Ongoing projects to be funded</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Projectname</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Fund</th>
              <th>Contribute</th>
            </tr>
          </thead>
          <tbody>
            { this.projectList() }
          </tbody>
        </table>
      </div>
    </div>
  )
}
    

}

export default Overview;
