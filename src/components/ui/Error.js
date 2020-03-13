import React from 'react';
import '../../assets/ui.scss';

export default class Error extends React.Component {
    render() {
        return (
            <div className="errorContainer">
                {this.props.error}
            </div>
        );
    }
}