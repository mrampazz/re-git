import React from "react";
import "../assets/components.scss";
import Header from "./ui/Header";
import Frame from "./ui/Frame";
export default class DiffViewer extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="page">
        <Frame />
        <Header text="Diffs"/>
      </div>
    );
  }
}
