import React from 'react';
import '../../assets/ui.scss';

export default class Frame extends React.Component {
    render() {
        return(
            <div className="frameContainer">
                <div className="frameMenus">
                    <div>Clone</div>
                    <div>Open</div>
                    <div>Branch</div>
                </div>
                <div className="frameButtons">
                    <div>-</div>
                    <div>o</div>
                    <div>x</div>
                </div>
            </div>
        )
    }
}