import React from 'react';
import '../assets/ui.scss';

export default class Info extends React.Component {
    render() {
        return (
            <div className="infoContainer">
                <p>
                Go to your repository of choice copy the clone link, paste it into this input text, choose the folder you want to copy it to and then press the button 'clone'
                </p>
            </div>
        );
    }
}
