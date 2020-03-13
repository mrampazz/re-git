import React from 'react';
import '../../assets/ui.scss';
import Button from './Button';

export default class Repo extends React.Component {
    render() {
        return (
            <div className="repoContainer" key={this.props.id}>
                {this.props.name}
                <Button 
                    name="clone"
                    state="enabled"
                />
            </div>
        );
    }
}