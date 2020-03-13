import React from "react";
import "../assets/components.scss";

export default class ProjectPage extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <>
        {this.props.project ? (
          <div className="page">
            <h1>Project name: {this.props.project.name} </h1>
            <h2>Author: {this.props.project.author} </h2>
            <h3>Link: {this.props.project.link} </h3>
          </div>
        ) : (
          <div className="page">NO INFO</div>
        )}
      </>
    );
  }
}
