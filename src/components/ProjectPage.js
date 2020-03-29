import React from "react";
import "../assets/components.scss";
import Frame from "./ui/Frame";

export default class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedProj: null
        }
    }

    render() {
        return (
            <>
                {this.state.selectedProj ? (
                    <div className="page">
                        <Frame
                            openCloningModal={this.props.openCloningModal}
                            closeCloningModal={this.props.closeCloningModal}
                        />
                        <h1>Project name: {this.state.selectedProj.name} </h1>
                    </div>
                ) : (
                    <div className="page">
                        <Frame
                            openCloningModal={this.props.openCloningModal}
                            closeCloningModal={this.props.closeCloningModal}
                        />
                        NO INFO
                    </div>
                )}
            </>
        );
    }
}
