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
import settings from "./config/config";
import CloneModal from "./components/ui/CloneModal";
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
            config: settings,
            currentRepo: null,
            isCloningModalOpen: false,
            isOpenModalOpen: false,
            isBranchModalOpen: false,
        };
    }

    componentDidMount() {
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
            });
        }
    }

    getUserRepos = () => {
        if (this.state.token === "token doesn't exist") {
            this.setState({
                isUserLogged: false
            });
        } else {
            axios
                .get(
                    `https://api.github.com/user/repos?access_token=${this.state.token}`
                )
                .then(res => {
                    let data = [];
                    res.data.forEach(item => {
                        data.push({
                            id: item.id,
                            name: item.name,
                            cloneUrl: item.clone_url,
                            isPrivate: item.private,
                            isCloned: false,
                            isCloning: false
                        });
                    });

                    this.setState({
                        userRepos: data
                    });

                    console.log(data);
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
                .get(
                    `https://api.github.com/user?access_token=${this.state.token}`
                )
                .then(res => {
                    this.setState({
                        currentUserPic: res.data.avatar_url,
                        currentUsername: res.data.login
                    });
                });
        }
    };

    handleClone = obj => {
      console.log(obj);
        let app = this;
        let repos = this.state.userRepos;
        let item = repos.find(item => item.name === obj.name);
        item.isCloning = true;
        item.isCloned = false;
        this.setState({
            userRepos: repos
        });
        ipcRenderer.send("clone", obj);
        ipcRenderer.on("cloned", () => {
            let repos = this.state.userRepos;
            let item = repos.find(item => item.name === obj.name);
            item.isCloning = false;
            item.isCloned = true;
            console.log(repos);
            app.setState({
                userRepos: repos
            });
        });
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

    isRepoClone = name => {
        ipcRenderer.send("is-repo-cloned", name);
        ipcRenderer.on("is-cloned-reply", () => {
            // returns a boolean
        });
    };

    openCloningModal = () => {
        this.setState({
            isCloningModalOpen: true,
            isOpenModalOpen: false,
            isBranchModalOpen: false
        })
    }

    closeCloningModal = () => {
        this.setState({
            isCloningModalOpen: false
        })
    }

    render() {
        return (
            <div className="appContainer">
                <HashRouter>
                    <SideBar
                        func={this.handleChangePage}
                        login={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}&scope=repo`}
                        pic={this.state.currentUserPic}
                        username={this.state.currentUsername}
                        loginError={this.state.isUserLogged}
                        noCloningFolder={this.state.config.cloningFolder === '' ? false : true}
                    />
                    <Switch>
                        <Route path="/diff">
                            <DiffViewer />
                        </Route>
                        <Route path="/settings">
                            <SettingsPage />
                        </Route>
                        <Route path="/" exact>
                            <ProjectPage 
                                token={this.state.token}
                                currentRepo={this.state.currentRepo}
                                openCloningModal={this.openCloningModal}
                                closeCloningModal={this.closeCloningModal}
                                repos={this.state.userRepos}
                            />
                            {this.state.isCloningModalOpen ? <CloneModal clone={this.handleClone} repos={this.state.userRepos} close={this.closeCloningModal} /> : null}
                        </Route>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}
