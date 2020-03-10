import React from 'react';
import SideBarButton from '../../ui/SideBarButton';
import '../../assets/components.scss';
export default class SideBar extends React.Component {
    render() {
        let buttonList = [
            {name: 'Clone a repo', value: 'clone'},
            {name: 'View diff', value: 'diff'},
            {name: 'Repo visualiser', value: 'visualiser'},
            {name: 'Project page', value: 'project'}
        ];

        const buttons = buttonList.map(item => (
            <SideBarButton key={item.value} name={item.name} func={() => this.props.func(item.value)} />
        ));

        return (
            <div className="sidebarContainer">
                {buttons}
            </div>
        );
    }
}
