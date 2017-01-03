import React, { Component } from 'react';

import OrganizationList from './organizationList';
import FloatButton from '../components/floatButton';

export default class OrganizationComponent extends Component {

    constructor() {
        super();
        this.state = {
            showForm: false
        }
    }

    eventClick() {
        this.setState({showForm: true, iconOnFloat: 'confirm'});
    }

    handleOnClickSave() {
        console.debug('save');
    }

    handleOnClickCancel() {
        console.debug('cancel');
    }

    render() {
        let component = <OrganizationList />;

        if (this.state.showForm) {
            component = <h1>Show form</h1>
        }

        return(
            <div>
                {component}
                <FloatButton
                    icon={this.state.iconOnFloat}
                    handleOnClickNew={this.eventClick.bind(this)}
                    handleOnClickSave={this.handleOnClickSave.bind(this)}
                    handleOnClickCancel={this.handleOnClickCancel.bind(this)}
                />
            </div>
        );
    }
}
