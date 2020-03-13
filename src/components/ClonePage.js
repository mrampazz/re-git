import React from "react";
import Button from "./ui/Button";
import Info from "./ui/Info";
import Header from "./ui/Header";
import Error from "./ui/Error";
import Repo from "./ui/Repo";
import "../assets/components.scss";
export default class ClonePage extends React.Component {
  render() {
    let array = this.props.repos.map(item => (
      <Repo id={item.id} name={item.name} />
    ));
    return (
      <div className="page">
        <Header text="Clone a repo" />

        <Info />

        <Button
          name="Show my repos"
          state="enabled"
          func={this.props.showUser}
        />
        {this.props.error ? <Error error="You are not logged in" /> : null}

        <div className="reposContainer"> {array} </div>
      </div>
    );
  }
}
