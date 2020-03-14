import React from "react";
import "../assets/components.scss";
import Header from "./ui/Header";
export default class DiffViewer extends React.Component {
  componentDidMount() {
  }
  render() {
    return <div className="page"><Header text="Diffs"/></div>;
  }
}
