import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/ui.scss";

export default class SideBarButton extends React.Component {
  render() {
    return (
      <div className="sidebarButtonContainer">
        <NavLink
          exact
          className="sidebarButton"
          activeClassName="sidebarButtonActive"
          to={this.props.path}
        >
          <div className="selector" />
          <span>{this.props.name}</span>
        </NavLink>
      </div>
    );
  }
}
