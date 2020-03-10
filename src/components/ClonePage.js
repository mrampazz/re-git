import React from 'react';
import Button from '../ui/Button';
import Info from '../ui/Info';
import '../assets/components.scss';
import Input from '../ui/Input';
import Header from '../ui/Header';
export default class ClonePage extends React.Component {
    render() {
        return (
            <div className="page">
                <Header text="Clone a repo" />
                <Info />
                <Input 
                    value={this.props.value} 
                    onChange={this.props.onChange} 
                />
                <button onClick={this.props.changeDirectory}> Choose a directory </button>
                <Button name="Clone" state={this.props.buttonState} />
            </div>
        );
    }
}
