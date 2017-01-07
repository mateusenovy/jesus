import React, { Component } from 'react';

import OrganizationList from './organizationList';
import OrganizationForm from './organizationForm';
import C from '../constants';
import * as OrganizationActions from './organizationActions';
// import OrganizationStore from './organizationStore';

export default class OrganizationComponent extends Component {

    constructor() {
        super();
        this.state = {
            showForm: false
        }
    }

    componentDidMount() {
        OrganizationActions.findOrgOnce();
    }

    handleClick(eventName) {
        var showForm = (eventName === C.ORG_ACTION_BUTTON_NEW);
        this.setState({'showForm': showForm});
    }

    render() {
        let component = <OrganizationList handleOnClickNew={this.handleClick.bind(this)} />;

        if (this.state.showForm) {
            component = <OrganizationForm handleOnClickNew={this.handleClick.bind(this)} />
        }

        return(
            <div>
                {component}
            </div>
        );
    }
}
