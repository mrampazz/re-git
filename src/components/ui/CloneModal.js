import React, { useState, useEffect } from "react";
import "../../assets/ui.scss";
// import Button from "./Button";
import { Button, FolderInput } from "./Ui";

export const CloneModal = ({ clone, repos }) => {
  const [repoName, changeRepoName] = useState("");
  const [repoLink, changeRepoLink] = useState("");
  const [canClone, setCanClone] = useState(false);
  const selectRepo = (name, link) => {
    changeRepoLink(link);
    changeRepoName(name);
    setCanClone(false);
  };

  useEffect(() => {
    repoName && repoLink ? setCanClone(true) : null;
  }, [canClone]);

  render(
    <div className="modalContainer">
      <div className="cloneModalContainer">
        <h3>Your repositories:</h3>
        <div className="modalRepoContainer">
          {repos.map((item) => (
            <div
              key={item.id}
              className={repoName === item.name ? "selectedRepo repoItem" : "repoItem"}
              onClick={() => selectRepo(item.name, item.cloneUrl)}
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        <Button
          disabled={canClone}
          name="Clone"
          func={() =>
            clone({
              cloneUrl: this.state.selectedRepoLink,
              name: this.state.selectedRepoName,
            })
          }
        >
          Clone
        </Button>
        <FolderInput />
      </div>
      <div className="modalBG" onClick={this.props.close} />
    </div>
  );
};

export default class CloneModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "repos",
      link: "",
      selectedRepoName: "",
      selectedRepoLink: "",
      repos: [],
      canClone: false,
    };
  }

  handleChangePage = () => {
    if (this.state.tab === "repos") {
      this.setState({
        tab: "manual",
      });
    } else {
      this.setState({
        tab: "repos",
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      link: e.target.value,
    });
  };

  selectRepo = (name, link) => {
    this.setState(
      {
        selectedRepoName: name,
        selectedRepoLink: link,
        canClone: false,
      },
      () => {
        this.setState({
          canClone: true,
        });
        console.log(this.state);
      }
    );
  };

  componentDidMount() {
    this.setState({
      repos: this.props.repos,
    });
  }

  render() {
    let array = null;
    console.log(this.props.repos);
    if (this.props.repos) {
      array = this.props.repos.map((item) => (
        <div
          key={item.id}
          className={
            this.state.selectedRepoName === item.name ? "selectedRepo repoItem" : "repoItem"
          }
          onClick={() => this.selectRepo(item.name, item.cloneUrl)}
        >
          <span>{item.name}</span>
        </div>
      ));
    }
    return (
      <div className="modalContainer">
        <div className="cloneModalContainer">
          {this.state.tab === "repos" ? (
            <>
              <h3>Your repositories:</h3>
              <div className="modalRepoContainer">{array}</div>
              <Button
                state={this.state.canClone ? "enabled" : "disabled"}
                name="Clone"
                func={() =>
                  this.props.clone({
                    cloneUrl: this.state.selectedRepoLink,
                    name: this.state.selectedRepoName,
                  })
                }
              />
            </>
          ) : (
            <div>
              <input value={this.state.link} onChange={this.handleChange} />
              <Button
                state="enabled"
                name="Clone"
                func={() =>
                  this.props.clone({
                    cloneUrl: this.state.selectedRepoLink,
                    name: this.state.selectedRepoName,
                  })
                }
              />
            </div>
          )}
        </div>
        <div className="modalBG" onClick={this.props.close} />
      </div>
    );
  }
}
