import React, { useState, useEffect } from "react";
import "./App.css";
import * as axios from "axios";
import blankUser from "./assets/images/blank_user.png";
const { ipcRenderer } = window.require("electron");

const CLIENT_ID = "d58d36302139b6a46fef";
const REDIRECT_URI = "http://localhost:3000/";

export default () => {
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState(blankUser);
  const [token, setToken] = useState("");
  const [userRepos, setUserRepos] = useState([]);
  const [currentRepo, setCurrentRepo] = useState(null);
  const [isCloneModalOpen, openCloneModal] = useState(false);
  const [currentFolder, setCurrentFolder] = useState('');
  const [page, setPage] = useState();
  const loginLink = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}&scope=repo`;
  // const [isOpenModalOpen, openOpenModal] = useState(false);
  // const [isBranchModalOpen, openBranchModal] = useState(false);

  const getUserInfo = () => {
    if (token === "token doesn't exist") {
      console.error("Token doesn't exist");
    } else {
      axios.get(`https://api.github.com/user?access_token=${token}`).then((res) => {
        setUserName(res.data.login);
        setUserImg(res.data.avatar_url);
      });
    }
  };

  const getUserRepos = () => {
    if (token === "token doesn't exist") {
      console.error("Token doesn't exist");
    } else {
      axios.get(`https://api.github.com/user/repos?access_token=${token}`).then((res) => {
        let data = [];
        res.data.forEach((item) => {
          data.push({
            id: item.id,
            name: item.name,
            cloneUrl: item.clone_url,
            isPrivate: item.private,
            isCloned: false,
            isCloning: false,
          });
        });
        setUserRepos(data);
      });
    }
  };

  useEffect(() => {
    const code =
      window.location.href.match(/\?code=(.*)/) && window.location.href.match(/\?code=(.*)/)[1];
    if (code) {
      axios
        .get(`http://mramp.me/regit/server.php?code=${code}`)
        .then(function (response) {
          setToken(response.data);
          getUserInfo();
          getUserRepos();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });

  return (
    <div className="appContainer">
      <div>
        UserName:
        {userName}
      </div>
      <div>
        <a href={loginLink}>Login with GitHub</a>
      </div>
        <input value={currentFolder} />
      <div>where do you want to clone</div>
      <div>start cloning</div>
    </div>
  );
};

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentUsername: "",
//       currentUserPic: blankUser,
//       isUserLogged: false, // to implement
//       token: "",
//       userRepos: [],
//       config: settings, // useless
//       currentRepo: null,
//       isCloningModalOpen: false,
//       isOpenModalOpen: false,
//       isBranchModalOpen: false,
//       cloneFolder: "",
//     };
//   }

//   componentDidMount() {
//     let app = this;
//     const code =
//       window.location.href.match(/\?code=(.*)/) && window.location.href.match(/\?code=(.*)/)[1];

//     if (code) {
//       axios
//         .get("http://mramp.me/regit/server.php?code=" + code)
//         .then(function (response) {
//           app.setState({
//             token: response.data,
//             isUserLogged: true,
//           });

//           app.getUserInfo();
//           app.getUserRepos();
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//     } else {
//       this.setState({
//         isUserLogged: false,
//       });
//     }
//   }

//   getUserRepos = () => {
//     if (this.state.token === "token doesn't exist") {
//       this.setState({
//         isUserLogged: false,
//       });
//     } else {
//       axios
//         .get(`https://api.github.com/user/repos?access_token=${this.state.token}`)
//         .then((res) => {
//           let data = [];
//           res.data.forEach((item) => {
//             data.push({
//               id: item.id,
//               name: item.name,
//               cloneUrl: item.clone_url,
//               isPrivate: item.private,
//               isCloned: false,
//               isCloning: false,
//             });
//           });

//           this.setState({
//             userRepos: data,
//           });

//           console.log(data);
//         });
//     }
//   };

//   getUserInfo = () => {
//     if (this.state.token === "token doesn't exist") {
//       this.setState({
//         isUserLogged: false,
//       });
//     } else {
//       axios.get(`https://api.github.com/user?access_token=${this.state.token}`).then((res) => {
//         this.setState({
//           currentUserPic: res.data.avatar_url,
//           currentUsername: res.data.login,
//         });
//       });
//     }
//   };

//   handleClone = (obj) => {
//     console.log(obj);
//     let app = this;
//     let repos = this.state.userRepos;
//     let item = repos.find((item) => item.name === obj.name);
//     item.isCloning = true;
//     item.isCloned = false;
//     this.setState({
//       userRepos: repos,
//     });
//     ipcRenderer.send("clone", obj);
//     ipcRenderer.on("cloned", () => {
//       let repos = this.state.userRepos;
//       let item = repos.find((item) => item.name === obj.name);
//       item.isCloning = false;
//       item.isCloned = true;
//       console.log(repos);
//       app.setState({
//         userRepos: repos,
//       });
//     });
//   };

//   handleChangePage = (page) => {
//     this.setState({
//       currentPage: page,
//     });
//   };

//   handleChangeRepoLink = (e) => {
//     this.setState({
//       currentRepoLink: e.target.value,
//     });
//   };

//   handleChangeDirectory = (e) => {
//     e.preventDefault();
//     ipcRenderer.send("change-directory");
//     ipcRenderer.on("folder-selected", (event, arg) => {
//       this.setState({
//         currentFolderPath: arg[0],
//       });
//       console.log(this.state);
//     });
//   };

//   isRepoClone = (name) => {
//     ipcRenderer.send("is-repo-cloned", name);
//     ipcRenderer.on("is-cloned-reply", () => {
//       // returns a boolean
//     });
//   };

//   openCloningModal = () => {
//     this.setState({
//       isCloningModalOpen: true,
//       isOpenModalOpen: false,
//       isBranchModalOpen: false,
//     });
//   };

//   closeCloningModal = () => {
//     this.setState({
//       isCloningModalOpen: false,
//     });
//   };

//   render() {
//     return (
//       <div className="appContainer">
//         <HashRouter>
//           <SideBar
//             func={this.handleChangePage}
//             login={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}&scope=repo`}
//             pic={this.state.currentUserPic}
//             username={this.state.currentUsername}
//             loginError={this.state.isUserLogged}
//             noCloningFolder={this.state.config.cloningFolder === "" ? false : true}
//           />
//           <Switch>
//             <Route path="/diff">
//               <DiffViewer />
//             </Route>
//             <Route path="/settings">
//               <SettingsPage />
//             </Route>
//             <Route path="/" exact>
//               <ProjectPage
//                 token={this.state.token}
//                 currentRepo={this.state.currentRepo}
//                 openCloningModal={this.openCloningModal}
//                 closeCloningModal={this.closeCloningModal}
//                 repos={this.state.userRepos}
//               />
//               {this.state.isCloningModalOpen ? (
//                 <CloneModal
//                   clone={this.handleClone}
//                   repos={this.state.userRepos}
//                   close={this.closeCloningModal}
//                   selectFolder={this.handleChangeDirectory}
//                   folder={this.state.cloneFolder}
//                 />
//               ) : null}
//             </Route>
//           </Switch>
//         </HashRouter>
//       </div>
//     );
//   }
// }
//
