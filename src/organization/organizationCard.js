import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardActions, GridList, FlatButton } from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentEdit from 'material-ui/svg-icons/image/edit';
import OrganizationStore from './organizationStore';
import * as OrganizationActions from './organizationActions';
import OrganizationFloatButton from './organizationFloatButton';
import AlertRemove from '../components/alertRemove';
import C from '../constants';

export default class OrganizationList extends Component {

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

    getOrgByIndex(index) {
        return this.state.organizations[index];
    }

    handleOnClickRemove() {
        OrganizationActions.deleteOrg(this.state.currentOrganization.id);
        this.closeAlertRemove();
    }

    onCellClick(rowSelected, columnClicked) {

        this.setState(function addCurrentOrgOnState(prevState) {
            let currentOrganization = this.getOrgByIndex(rowSelected);

            if (prevState.handleTableFlatButtonOnClick && columnClicked === 3 ) {
                prevState.handleTableFlatButtonOnClick('new', currentOrganization);
            }

            return {'currentOrganization': currentOrganization}
        });
    }

    openAlertRemove(event) {
        debugger;
        this.setState({
            showAlertRemove: true
        });
    }

    closeAlertRemove(event) {
        this.setState({
            showAlertRemove: false
        });
    }

    editRegister() {
        this.setState({
            handleTableFlatButtonOnClick: this.props.handleOnClickNew
        });
    }

    render() {
        let table,
            removeIcon = <ContentRemove color={'#740000'} />,
            editIcon = <ContentEdit />;

        table =
            <GridList cols={2} >
                {this.state.organizations.map( (row, index) =>
                    <Card key={index}>
                        <CardHeader
                            title={row.name} />
                        <CardText>
                            {<div><b>Nome:</b> {row.name}</div>}
                            {<div><b>Descrição:</b> {row.description}</div>}
                        </CardText>
                        <CardActions style={{'text-align': 'center'}}>
                            <FlatButton id={index} icon={editIcon}
                                onClick={this.editRegister.bind(this)}
                            />
                            <FlatButton id={index} icon={removeIcon}
                                onClick={this.openAlertRemove.bind(this)}
                            />
                        </CardActions>
                    </Card>
                )}
            </GridList>
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
