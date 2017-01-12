import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, FlatButton } from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/clear';
import OrganizationStore from './organizationStore';
import * as OrganizationActions from './organizationActions';
import OrganizationFloatButton from './organizationFloatButton';
import AlertRemove from '../components/alertRemove';
import C from '../constants';

export default class OrganizationComponent extends Component {

    constructor() {
        super();

        this.state = {
            organizations: OrganizationStore.findOrg(),
            currentOrganization: null,
            showAlertRemove: false
        };

        this.findOrganizations = this.findOrganizations.bind(this);
    }

    findOrganizations() {
        this.setState({
            organizations: OrganizationStore.findOrg()
        });
    }

    componentWillMount() {
        OrganizationStore.on(C.ORG_CHANGE_LIST, this.findOrganizations);
    }

    componentWillUnmount() {
        OrganizationStore.removeListener(C.ORG_CHANGE_LIST, this.findOrganizations);
    }

    getUserByIndex(index) {
        return this.state.organizations[index];
    }

    handleOnClickRemove() {
        OrganizationActions.deleteOrg(this.state.currentOrganization.id);
        this.closeAlertRemove();
    }

    onCellClick(rowSelected) {
        this.setState({
            'currentOrganization': this.getUserByIndex(rowSelected)
        });
    }

    openAlertRemove() {
        this.setState({
            showAlertRemove: true
        });
    }

    closeAlertRemove() {
        this.setState({
            showAlertRemove: false
        });
    }

    render() {
        let table,
            tableBody  = <TableBody></TableBody>,
            removeIcon = <ContentRemove color={'#9F0000'} />,
            flatButtonRemove =
                <FlatButton icon={removeIcon}
                    onClick={this.openAlertRemove.bind(this)}
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
            <div>
                <Table onCellClick={this.onCellClick.bind(this)}>
                    {TABLE_HEADER}
                    {tableBody}
                </Table>
            </div>
        ;

        return (
            <div>
                {table}
                <OrganizationFloatButton handleOnClick={this.props.handleOnClickNew}/>
                <AlertRemove
                    showAlertRemove={this.state.showAlertRemove}
                    onClickCancel={this.closeAlertRemove.bind(this)}
                    onClickRemove={this.handleOnClickRemove.bind(this)}
                />
            </div>
        )
    }
}
