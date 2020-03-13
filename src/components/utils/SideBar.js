import React from "react";
import SideBarButton from "../ui/SideBarButton";
import Login from "./Login";
import Error from "../ui/Error";
import "../../assets/components.scss";

let buttonList = [
  { name: "Clone a repo", value: "clone" },
  { name: "View diff", value: "diff" },
  { name: "Repo visualiser", value: "visualiser" },
  { name: "Project page", value: "project" }
];

export default class SideBar extends React.Component {
  render() {
    const buttons = buttonList.map(item => (
      <SideBarButton
        key={item.value}
        name={item.name}
        func={() => this.props.func(item.value)}
        value={item.value}
        currentPage={this.props.currentPage}
      />
    ));

    return (
      <div className="sidebarContainer">
        <Login src={this.props.pic} href={this.props.login} username="Marco" />
        <div className="buttonsContainer">{buttons}</div>
        {this.props.error ? <Error error="You are not logged in" /> : null}
      </div>
    );
  }
}
