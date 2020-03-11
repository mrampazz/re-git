import React from 'react';
import Button from '../ui/Button';
import Info from '../ui/Info';
import Input from '../ui/Input';
import Header from '../ui/Header';
import InputFolder from '../ui/InputFolder';
import '../assets/components.scss';
export default class ClonePage extends React.Component {
    render() {
        return (
            <div className="page">
                <Header text="Clone a repo" />
                <Info />
                <Input 
                    value={this.props.currentRepoLink} 
                    onChange={this.props.onChange} 
                />
                <InputFolder 
                    value={this.props.currentFolderPath}
                    onClick={this.props.changeDirectory} 
                />
                <Button 
                    name="Clone" 
                    state={this.props.buttonState} 
                    func={this.props.onClone}
                />

                {/* <input placeholder="insert username here!!"></input> */}
                <button onClick={this.props.showUser}>console.log stuff about user</button>
                {
                    this.props.isUserLogged ?
                    <button onClick={this.props.show}>Click me to console.log projects</button>
                    : 
                    <p>He's not logget bruv</p>
                }

            </div>
        );
    }
}
