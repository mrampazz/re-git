import React from "react";
import '../../assets/ui.scss';

export default class InputFolder extends React.Component {
  render() {
    return (
      <input
        className="customInputFolder"
        placeholder={this.props.placeHolder}
        value={this.props.value}
        onClick={this.props.onClick}
      />
    );
  }
}
