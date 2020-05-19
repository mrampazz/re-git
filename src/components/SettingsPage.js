import React from "react";
import "../assets/components.scss";
import Header from "./ui/Header";
import Input from "./ui/Ui";
import InputFolder from "./ui/InputFolder";
import SubHeader from "./ui/SubHeader";
import Button from "./ui/Button";
import Frame from "./ui/Frame";
export default class SettingsPage extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div className="page">
        <Frame />
        <Header text="Settings" />
        <SubHeader text="Manual cloning" />
        <Input />
        <InputFolder placeHolder="Select folder" />
        <Button name="clone" state="enabled" />
        <SubHeader text="General Settings" />
        <InputFolder placeHolder="Select where reGit should clone your projects" />
      </div>
    );
  }
}
