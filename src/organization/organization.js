import React, { Component } from 'react';

import OrganizationList from './organizationList';
import OrganizationFloatButton from './organizationFloatButton';
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
        let component = <OrganizationList />;

        if (this.state.showForm) {
            component = <h1>Show form</h1>
        }

        return(
            <div>
                {component}
                <OrganizationFloatButton handleClick={this.handleClick.bind(this)} />
            </div>
        );
    }
}
