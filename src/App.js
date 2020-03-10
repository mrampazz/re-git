import React from 'react';
import DiffViewer from './components/DiffViewer';
import ClonePage from './components/ClonePage';
import RepoVisualiser from './components/RepoVisualiser';
import SideBar from './components/utils/SideBar';
import './App.css';
import ProjectPage from './components/ProjectPage';
const { ipcRenderer } = window.require('electron');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'clone',
      currentRepoLink: '',
      currentFolderPath: '',
      isProjectLoaded: false,
      projectInfo: {
        name: '',
        link: '',
        path: '',
        author: ''
      }
    };
  }

  handleClone = (e) => {
    ipcRenderer.send('clone', {
      link: this.state.currentRepoLink,
      path: this.state.currentFolderPath
    });
    ipcRenderer.on('cloned', () => {
      this.setState({
        projectInfo: {
          name: 'name1',
          link: this.state.currentRepoLink,
          path: this.state.currentFolderPath,
          author: 'author1'
        },
        currentPage: 'project'
      })
    }); 
  }

  handleChangePage = (page) => {
    this.setState({
      currentPage: page
    });
  }

  handleChangeRepoLink = (e) => {
    this.setState({
      currentRepoLink: e.target.value
    });
  }

  handleChangeDirectory = (e) => {
    e.preventDefault();
    ipcRenderer.send('change-directory');
    ipcRenderer.on('folder-selected', (event, arg) => {
      this.setState({
        currentFolderPath: arg[0]
      });
      console.log(this.state);
    });
  }

  render() {
    let page = null;
    switch(this.state.currentPage) {
      case 'clone':
        page = 
          <ClonePage 
            currentRepoLink={this.state.currentRepoLink}
            currentFolderPath={this.state.currentFolderPath}
            onChange={this.handleChangeRepoLink} 
            buttonState={this.state.currentRepoLink && this.state.currentFolderPath ? 'enabled':'disabled'}
            changeDirectory={this.handleChangeDirectory}
            onClone={this.handleClone}
          />
        ;
        break;
      case 'diff':
        page = <DiffViewer />;
        break;
      case 'visualiser':
        page = <RepoVisualiser />;
        break;
      case 'project':
        page = 
          <ProjectPage 
            project={this.state.isProjectLoaded ? this.state.projectInfo : null}
          />;
        break;
      default:
        page = <div> The page you are looking for is not here. </div>;
        break;
    }
    return (
      <div className="appContainer">
        <SideBar func={this.handleChangePage} />
        { page }
      </div>
    );
  }
}