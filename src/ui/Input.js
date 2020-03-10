import React from 'react';
import '../assets/ui.scss';

export default class Input extends React.Component {
    render() {
        return (
            <input 
                className="customInput" 
                placeholder="Copy your clone link here!" 
                value={this.props.value} 
                onChange={this.props.onChange}
            />
        );
    }
}
