import React from 'react';
import '../assets/ui.scss';

export default class InputFolder extends React.Component {
    render() {
        return (
            <input 
                className="customInputFolder" 
                placeholder="Click here to select the file path" 
                value={this.props.value} 
                onClick={this.props.onClick}
            />
        );
    }
}
