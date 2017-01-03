import React, { Component } from 'react';

import OrganizationList from './organizationList';
import OrganizationFloatButton from './organizationFloatButton';

export default class OrganizationComponent extends Component {

    constructor() {
        super();
        this.state = {
            showForm: false
        }
    }

    handleClick() {
        console.debug('changed');
        this.setState({showForm: true});
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
