import React from 'react';

export default class Button extends React.Component {
    render() {
        return (
            <>
                {
                    this.props.state === "enabled" ?
                    <div className="simpleButton" onClick={this.props.func}>
                        {this.props.name}
                    </div>
                    :
                    <div className="simpleButtonDisabled">
                        {this.props.name}
                    </div>
                }
            </>
        );
    }
}
