import React from "react";
import DiffViewer from "./components/DiffViewer";
import ClonePage from "./components/ClonePage";
import SideBar from "./components/SideBar";
import ProjectPage from "./components/ProjectPage";
import "./App.css";
import * as axios from "axios";
import { HashRouter, Route, Switch } from "react-router-dom";
import blankUser from "./assets/images/blank_user.png";
import SettingsPage from "./components/SettingsPage";
import settings from './config/config';
const { ipcRenderer } = window.require("electron");


const CLIENT_ID = "d58d36302139b6a46fef";
const REDIRECT_URI = "http://localhost:3000/";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsername: "",
      currentUserPic: blankUser,
      isUserLogged: false,
      token: "",
      userRepos: [],
      config: settings
    };
  }

  componentDidMount() {
    // insert function to check if user is authenticated
    let app = this;
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];

    if (code) {
      axios
        .get("http://mramp.me/regit/server.php?code=" + code)
        .then(function(response) {
          app.setState({
            token: response.data,
            isUserLogged: true
          });

          app.getUserInfo();
          app.getUserRepos();
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      this.setState({
        isUserLogged: false
      })
    }
  }

    getUserRepos = () => {
    if (this.state.token === "token doesn't exist") {
      this.setState({
        isUserLogged: false
      });
    } else {
      axios
        .get(`https://api.github.com/user/repos?access_token=${this.state.token}`)
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
        isUserLogged: false
      });
    } else {
      axios
        .get(`https://api.github.com/user?access_token=${this.state.token}`)
        .then(res => {
          this.setState({
            currentUserPic: res.data.avatar_url,
            currentUsername: res.data.login
          });
        });
    }
  };

  handleClone = link => {
    ipcRenderer.send("clone", link);
    ipcRenderer.on("cloned", () => {
      console.log("cloned")
    })
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

  render() {
    return (
      <div className="appContainer">
        <HashRouter>
          <SideBar
            func={this.handleChangePage}
            login={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}&scope=repo`}
            pic={this.state.currentUserPic}
            username={this.state.currentUsername}
            error={this.state.isUserLogged}
          />
          <Switch>
            <Route path="/diff" component={DiffViewer} />
            <Route path="/project" component={ProjectPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/" exact component={ClonePage}>
              <ClonePage
                onClone={this.handleClone}
                getUserRepos={this.getUserRepos}
                repos={this.state.userRepos}
                clone={this.handleClone}
              />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
