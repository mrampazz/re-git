import React from "react";
import Header from "./ui/Header";
import Repo from "./ui/Repo";
import "../assets/components.scss";
import SearchBar from "./ui/SearchBar";
export default class ClonePage extends React.Component {

  render() {
    let array = null;
    console.log(this.props.repos);
    if (this.props.repos.length !== 0) {
      array = this.props.repos.map(item => (
        <Repo key={item.id} id={item.id} name={item.name} clone={() => this.props.clone(item.name)}/>
      ));
    }

    return (
      <div className="page">
        <Header text="Clone a repo" />
        <div className="reposContainer"> {array} </div>
      </div>
    );
  }
}
