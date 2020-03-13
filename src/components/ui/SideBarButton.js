import React from "react";
import "../../assets/ui.scss";

export default class SideBarButton extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.value === this.props.currentPage
            ? "sidebarButtonActive"
            : "sidebarButton"
        }
        onClick={this.props.func}
      >
        <span>{this.props.name}</span>
      </div>
    );
  }
}
