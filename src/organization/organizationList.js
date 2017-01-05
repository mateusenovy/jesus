import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';
// import * as OrganizationActions from './organizationActions';
import OrganizationStore from './organizationStore';

export default class OrganizationComponent extends Component {

    constructor() {
        super();

        this.state = {
            organizations: []
        };

        this.findOrganizations = this.findOrganizations.bind(this);
    }

    findOrganizations() {
        this.setState({
            organizations: OrganizationStore.findOrg()
        });
    }

    componentWillMount() {
        OrganizationStore.on('change', this.findOrganizations);
    }

    componentWillUnmount() {
        OrganizationStore.removeListener('change', this.findOrganizations);
    }

    render() {
        let table, tableBody = <TableBody></TableBody>;

        const TABLE_HEADER =
            <TableHeader displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>Descição</TableHeaderColumn>
                </TableRow>
            </TableHeader>
        ;

        if (true) {
            tableBody =
                <TableBody displayRowCheckbox={false} >
                    {this.state.organizations.map( (row, index) =>
                        <TableRow key={index}>
                            <TableRowColumn>{row.description}</TableRowColumn>
                        </TableRow>
                    )}
                </TableBody>
            ;
        }

        table =
            <Table>
                {TABLE_HEADER}
                {tableBody}
            </Table>
        ;

        return (
            <div>
                {table}
            </div>
        )
    }
}
