import React from "react";
import SideBarButton from "./ui/SideBarButton";
import Login from "./utils/Login";
import Error from "./ui/Error";
import "../assets/components.scss";

let buttonList = [
  { name: "PROJECT", path: "/" },
  { name: "DIFF", path: "/diff" },
  { name: "SETTINGS", path: "/settings" }
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
        <div className="errorsContainer">
          {!this.props.loginError ? <Error error="You are not logged in" /> : null}
          {!this.props.noCloningFolder ? <Error error="You have to setup a cloning folder first" /> : null}
        </div>
      </div>
    );
  }
}
