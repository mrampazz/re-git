import React from "react";
import DiffViewer from "./components/DiffViewer";
import ClonePage from "./components/ClonePage";
import RepoVisualiser from "./components/RepoVisualiser";
import SideBar from "./components/utils/SideBar";
import ProjectPage from "./components/ProjectPage";
import "./App.css";
import * as axios from "axios";
import blankUser from "./assets/images/blank_user.png";
const { ipcRenderer } = window.require("electron");

const CLIENT_ID = "d58d36302139b6a46fef";
const REDIRECT_URI = "http://localhost:3000/";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "clone",
      currentRepoLink: "",
      currentFolderPath: "",
      isUserLogged: false,
      username: "",
      token: "",
      userRepos: [],
      loginError: true,
      currentUserPic: blankUser
    };
  }

  componentDidMount() {
    let app = this;
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];

    if (code) {
      console.log(code);
      axios
        .get("http://mramp.me/regit/server.php?code=" + code)
        .then(function(response) {
          app.setState({
            token: response.data
          });
          console.log(app.state);
          app.setState({
            loginError: false
          });
          app.getUserInfo();
          app.getUserRepos();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  handleClone = e => {
    ipcRenderer.send("clone", {
      link: this.state.currentRepoLink,
      path: this.state.currentFolderPath
    });
    // ipcRenderer.on('cloned', () => {
    //   this.setState({
    //     projectInfo: {
    //       name: 'name1',
    //       link: this.state.currentRepoLink,
    //       path: this.state.currentFolderPath,
    //       author: 'author1'
    //     },
    //     currentPage: 'project'
    //   })
    // });
  };

  handleChangePage = page => {
    this.setState({
      currentPage: page
    });
  };

  handleChangeRepoLink = e => {
    this.setState({
      currentRepoLink: e.target.value
    });
  };

  handleChangeDirectory = e => {
    e.preventDefault();
    ipcRenderer.send("change-directory");
    ipcRenderer.on("folder-selected", (event, arg) => {
      this.setState({
        currentFolderPath: arg[0]
      });
      console.log(this.state);
    });
  };

  refreshToken = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}&scope=repo`;
  };

  isUserLogged = () => {
    if (this.state.token === "token doesn't exist") {
      this.refreshToken();
    }
  };

  getUserRepos = () => {
    if (this.state.token === "token doesn't exist") {
      this.setState({
        loginError: true
      });
    } else {
      axios
        .get(
          `https://api.github.com/user/repos?access_token=${this.state.token}`
        )
        .then(res => {
          this.setState({
            userRepos: res.data
          });
        });
    }
  };

  getUserInfo = () => {
    if (this.state.token === "token doesn't exist") {
      this.setState({
        loginError: true
      });
    } else {
      axios
        .get(`https://api.github.com/user?access_token=${this.state.token}`)
        .then(res => {
          this.setState({
            currentUserPic: res.data.avatar_url
          });
        });
    }
  };

  render() {
    let page = null;
    switch (this.state.currentPage) {
      case "clone":
        page = (
          <ClonePage
            isUserLogged={this.isUserLogged}
            onClone={this.handleClone}
            getUserRepos={this.getUserRepos}
            repos={this.state.userRepos}
          />
        );
        break;
      case "diff":
        page = <DiffViewer isUserLogged={this.isUserLogged} />;
        break;
      case "visualiser":
        page = <RepoVisualiser isUserLogged={this.isUserLogged} />;
        break;
      case "project":
        page = <ProjectPage isUserLogged={this.isUserLogged} />;
        break;
      default:
        page = <div> The page you are looking for is not here. </div>;
        break;
    }
    return (
      <div className="appContainer">
        <SideBar
          func={this.handleChangePage}
          login={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}&scope=repo`}
          pic={this.state.currentUserPic}
          currentPage={this.state.currentPage}
          error={this.state.loginError}
        />
        {page}
      </div>
    );
  }
}
