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
            showForm: false,
            currentOrganization: {}
        }
    }

    componentDidMount() {
        OrganizationActions.findOrgOnce();
    }

    handleClick(eventName, currentOrganization) {
        let showForm = (eventName === C.ORG_ACTION_BUTTON_NEW);
        this.setState({
            'showForm': showForm,
            'currentOrganization': currentOrganization || {}
        });
    }

    render() {
        let component = <OrganizationList handleOnClickNew={this.handleClick.bind(this)} />;

        if (this.state.showForm) {
            component = <OrganizationForm
                currentOrganization={this.state.currentOrganization}
                handleOnClick={this.handleClick.bind(this)}
            />
        }

        return(
            <div>
                {component}
            </div>
        );
    }
}
