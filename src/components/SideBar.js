import React from "react";
import SideBarButton from "./ui/SideBarButton";
import Login from "./utils/Login";
import Error from "./ui/Error";
import "../assets/components.scss";

let buttonList = [
  { name: "Clone a repo", path: "/" },
  { name: "View diff", path: "/diff" },
  { name: "Project page", path: "/project" },
  { name: "Settings", path: "/settings" }
];

export default class SideBar extends React.Component {
  render() {
    const buttons = buttonList.map((item, index) => (
      <SideBarButton
        key={index}
        name={item.name}
        path={item.path}
      />
    ));

    return (
      <div className="sidebarContainer">
        <Login src={this.props.pic} href={this.props.login} username={this.props.username} />
        <div className="buttonsContainer">{buttons}</div>
        {!this.props.error ? <Error error="You are not logged in" /> : null}
      </div>
    );
  }
}
