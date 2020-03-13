import React from 'react';
import SideBarButton from '../ui/SideBarButton';
import '../../assets/components.scss';

export default class Login extends React.Component {
    render() {
        return (
            <div className="loginContainer">
                <img className="avatarContainer" src={this.props.src} />
                <a href={this.props.href}>
                    Login with GitHub
                </a>
            </div>
        );
    }
}