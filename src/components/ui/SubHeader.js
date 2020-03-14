import React from 'react';
import '../../assets/ui.scss';

export default class SubHeader extends React.Component {
    render() {
        return (
            <div className="customHeader">
                <h2>{this.props.text}</h2>
            </div>
        );
    }
}