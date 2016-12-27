import React, { Component } from 'react';

import OrganizationList from './organizationList';
import AddButton from '../components/addButton';

export default class OrganizationComponent extends Component {
    render() {
        return(
            <div>
                <OrganizationList />
                <AddButton />
            </div>
        );
    }
}
