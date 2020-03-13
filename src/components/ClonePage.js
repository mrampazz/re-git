import React from "react";
import Button from "./ui/Button";
import Info from "./ui/Info";
import Header from "./ui/Header";
import Repo from "./ui/Repo";
import "../assets/components.scss";
export default class ClonePage extends React.Component {
  componentDidMount() {
  }
  render() {
    let array = null;
    if (this.props.repos) {
      array = this.props.repos.map(item => (
        <Repo id={item.id} name={item.name} />
      ));
    } else {
      array = <span>No repositories</span>
    }
    return (
      <div className="page">
        <Header text="Clone a repo" />
        

        <div className="reposContainer"> {array} </div>
      </div>
    );
  }
}
