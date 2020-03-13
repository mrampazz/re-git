import React from 'react';
import '../../assets/ui.scss';

export default class Header extends React.Component {
    render() {
        return (
            <div className="customHeader">
                <h1>{this.props.text}</h1>
            </div>
        );
    }
}
