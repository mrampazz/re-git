import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/ui.scss";

export default class SideBarButton extends React.Component {
  render() {
    return (
      <NavLink
        exact
        className="sidebarButton"
        activeClassName="sidebarButtonActive"
        to={this.props.path}
      >
        {this.props.name}
      </NavLink>
    );
  }
}
