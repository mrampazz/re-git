import React from "react";
import "../../assets/ui.scss";
import iconDownArrow from "../../assets/icons/iconDownArrow.svg";
import iconMaximize from "../../assets/icons/iconMaximize.svg";
import iconMinimize from "../../assets/icons/iconMinimize.svg";
import iconClose from "../../assets/icons/iconClose.svg";
const { remote } = window.require("electron");
const { BrowserWindow } = window.require("electron").remote;

export default class Frame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnyMenuOpen: false,
            cloneMenuOpen: false,
            openMenuOpen: false,
            branchMenuOpen: false
        };
    }

    handleClickOnBg = () => {
        this.handleCloseBranchMenu();
        this.handleCloseOpenMenu();
        this.handleCloseCloneMenu();
    };

    handleOpenCloneMenu = () => {
        this.handleCloseBranchMenu();
        this.handleCloseOpenMenu();
        this.setState({
            cloneMenuOpen: true,
            isAnyMenuOpen: true
        });
    };

    handleOpenOpenMenu = () => {
        this.handleCloseBranchMenu();
        this.handleCloseCloneMenu();
        this.setState({
            openMenuOpen: true,
            isAnyMenuOpen: true
        });
    };

    handleOpenBranchMenu = () => {
        this.handleCloseOpenMenu();
        this.handleCloseCloneMenu();
        this.setState({
            branchMenuOpen: true,
            isAnyMenuOpen: true
        });
    };

    handleCloseCloneMenu = () => {
        this.setState({
            cloneMenuOpen: false,
            isAnyMenuOpen: false
        });
    };

    handleCloseOpenMenu = () => {
        this.setState({
            openMenuOpen: false,
            isAnyMenuOpen: false
        });
    };

    handleCloseBranchMenu = () => {
        this.setState({
            branchMenuOpen: false,
            isAnyMenuOpen: false
        });
    };

    handleCloseWindow = () => {
        let window = BrowserWindow.getFocusedWindow();
        window.close();
    };
    handleMaximizeWindow = () => {
        let window = BrowserWindow.getFocusedWindow();
        window.maximize();
    };
    handleMinimizeWindow = () => {
        let window = BrowserWindow.getFocusedWindow();
        window.minimize();
    };
    render() {
        return (
            <>
                <div className="frameContainer">
                    <div className="frameMenus">
                        <div
                            onClick={this.state.cloneMenuOpen ? this.handleCloseCloneMenu : this.handleOpenCloneMenu}
                            onMouseEnter={
                                this.state.isAnyMenuOpen
                                    ? this.handleOpenCloneMenu
                                    : null
                            }
                        >
                            <span>Clone</span>
                            <img src={iconDownArrow} width={10} height={10} />
                            {this.state.cloneMenuOpen ? (
                                <div id="menuClone">
                                    <div><span>Clone from GitHub</span></div>
                                    <div><span>Clone from link</span></div>
                                </div>
                            ) : null}
                        </div>
                        <div
                            onClick={this.handleOpenOpenMenu}
                            onMouseEnter={
                                this.state.isAnyMenuOpen
                                    ? this.handleOpenOpenMenu
                                    : null
                            }
                        >
                            <span>Open</span>
                            <img src={iconDownArrow} width={10} height={10} />
                            {this.state.openMenuOpen ? (
                                <div id="menuOpen">
                                    <div><span>Open folder</span></div>
                                    <div><span>Open with terminal</span></div>
                                    <div><span>Open with your editor</span></div>
                                    <div><span>Open on GitHub</span></div>
                                </div>
                            ) : null}
                        </div>
                        <div
                            onClick={this.handleOpenBranchMenu}
                            onMouseEnter={
                                this.state.isAnyMenuOpen
                                    ? this.handleOpenBranchMenu
                                    : null
                            }
                        >
                            <span>Branch</span>
                            <img src={iconDownArrow} width={10} height={10} />
                            {this.state.branchMenuOpen ? (
                                <div id="menuBranch">
                                    <div><span>Switch branch</span></div>
                                    <div><span>Merge current into...</span></div>
                                    <div><span>Rebase</span></div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="frameButtons">
                        <div onClick={this.handleMinimizeWindow}>
                            <img src={iconMinimize} width={10} height={10} />
                        </div>
                        <div onClick={this.handleMaximizeWindow}>
                            <img src={iconMaximize} width={10} height={10} />
                        </div>
                        <div onClick={this.handleCloseWindow}>
                            <img src={iconClose} width={10} height={10} />
                        </div>
                    </div>
                </div>
                {this.state.isAnyMenuOpen ? (
                    <div
                        className="modalBG"
                        onClick={this.handleClickOnBg}
                    ></div>
                ) : null}
            </>
        );
    }
}
