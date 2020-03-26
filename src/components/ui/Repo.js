import React from "react";
import "../../assets/ui.scss";
import Button from "./Button";

export default class Repo extends React.Component {
  render() {
    return (
      <div className="repoContainer">
        <div id="repoName">{this.props.name}</div>
        <Button name="clone" state="enabled" func={this.props.clone} />
      </div>
    );
  }
}
