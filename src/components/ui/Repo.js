import React from "react";
import "../../assets/ui.scss";
import Button from "./Button";

export default class Repo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      cloned: false
    }
  }
  render() {
    return (
      <div className={"repoContainer " + this.props.cssClass }>
        <div id="repoName">{this.props.name}</div>
        <Button name={this.props.cssClass === "cloning" ? "cloning.." : "clone"} state="enabled" func={this.props.clone} />
      </div>
    );
  }
}
