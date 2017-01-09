import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, FlatButton } from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/clear';
// import * as OrganizationActions from './organizationActions';
import OrganizationStore from './organizationStore';
import OrganizationFloatButton from './organizationFloatButton';

export default class OrganizationComponent extends Component {

    constructor() {
        super();

        this.state = {
            organizations: OrganizationStore.findOrg()
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

    handleOnClickRemove() {
        console.log('removed');
    }

    render() {
        let table,
            tableBody  = <TableBody></TableBody>,
            removeIcon = <ContentRemove color={'#9F0000'} />,
            flatButtonRemove =
                <FlatButton icon={removeIcon}
                    onClick={this.handleOnClickRemove.bind(this)}
                />;

        const TABLE_HEADER =
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                <TableRow>
                    <TableHeaderColumn>Nome</TableHeaderColumn>
                    <TableHeaderColumn>Descição</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
            </TableHeader>
        ;

        tableBody =
            <TableBody displayRowCheckbox={false} adjustForCheckbox={false} >
                {this.state.organizations.map( (row, index) =>
                    <TableRow key={index}>
                        <TableRowColumn>{row.name}</TableRowColumn>
                        <TableRowColumn>{row.description}</TableRowColumn>
                        <TableRowColumn>{flatButtonRemove}</TableRowColumn>
                    </TableRow>
                )}
            </TableBody>
        ;

        table =
            <Table>
                {TABLE_HEADER}
                {tableBody}
            </Table>
        ;

        return (
            <div>
                {table}
                <OrganizationFloatButton handleOnClick={this.props.handleOnClickNew}/>
            </div>
        )
    }
}
