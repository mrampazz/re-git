import React from "react";
import "../assets/components.scss";
import Frame from "./ui/Frame";

export default class ProjectPage extends React.Component {
  render() {
      console.log(this.props.repos);
    return (
      <>
        {this.props.project ? (
          <div className="page">
            <Frame
              openCloningModal={this.props.openCloningModal}
              closeCloningModal={this.props.closeCloningModal}
            />
            <h1>Project name: {this.props.project.name} </h1>
            <h2>Author: {this.props.project.author} </h2>
            <h3>Link: {this.props.project.link} </h3>
          </div>
        ) : (
          
          <div className="page">
            <Frame
              openCloningModal={this.props.openCloningModal}
              closeCloningModal={this.props.closeCloningModal}
            />
            NO INFO</div>
        )}
      </>
    );
  }
}
