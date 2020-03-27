import React from "react";
import "../../assets/ui.scss";
import Button from "./Button";

export default class Repo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={"repoContainer " + this.props.cssClass + this.props.cssClassCloned}>
        <div id="repoName">{this.props.name}</div>
        <Button name={this.props.cssClassCloning === "cloning" ? "cloning.." : "clone"} state={this.props.cssClassCloned === "cloned" ? "disabled" : "enabled"} func={this.props.clone} />
      </div>
    );
  }
}
