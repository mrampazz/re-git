import React from 'react';
import './App.css';
import DiffViewer from './components/DiffViewer';
import ClonePage from './components/ClonePage';
import RepoVisualiser from './components/RepoVisualiser';
import SideBar from './components/utils/SideBar';
import './App.css';
const { ipcRenderer } = window.require('electron');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'clone',
      currentRepoLink: '',
      isFolderChosen: false
    };
  }

  handleClone = (e) => {
    // send signal

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
    ipcRenderer.send('change-directory', () => {
      ipcRenderer.on('folder-selected', (arg) => {
        console.log('bubba');
        console.log(arg);
      });
    }); 
  }

  render() {
    let page = null;
    switch(this.state.currentPage) {
      case 'clone':
        page = 
          <ClonePage 
            value={this.state.currentRepoLink} 
            onChange={this.handleChangeRepoLink} 
            buttonState={this.state.currentRepoLink && this.state.isFolderChosen ? 'enabled':'disabled'}
            changeDirectory={this.handleChangeDirectory}
          />
        ;
        break;
      case 'diff':
        page = <DiffViewer />;
        break;
      case 'visualiser':
        page = <RepoVisualiser />;
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