import React from "react";
import "../../assets/ui.scss";

export default class Button extends React.Component {
  render() {
    return (
      <div id="containerButton">
        {this.props.state === "enabled" ? (
          <div id="enabledButton" className="simpleButton" onClick={this.props.func}>
            {this.props.name}
          </div>
        ) : (
          <div id="disabledButton" className="simpleButtonDisabled">{this.props.name}</div>
        )}
      </div>
    );
  }
}
