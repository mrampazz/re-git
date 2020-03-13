import React from 'react';
import '../../assets/ui.scss';

export default class SideBarButton extends React.Component {
    render() {
        return (
            <div className="sidebarButton" onClick={this.props.func}>
                {this.props.name}
            </div>
        );
    }
}
