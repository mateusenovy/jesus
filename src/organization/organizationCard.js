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

    stopPropagation(event) {
        event.stopPropagation();
    }

    getOrgByIndex(index) {
        if (isNaN(Number(index))) {
            throw new Error('Invalid number of index');
        }
        return this.state.organizations[index];
    }

    handleOnClickRemove() {
        OrganizationActions.deleteOrg(this.state.currentOrganization.id);
        this.closeAlertRemove();
    }

    openAlertRemove(event) {
        let id = event.currentTarget.id,
            currentOrganization = this.getOrgByIndex(id);

        this.setState({
            'showAlertRemove': true,
            'currentOrganization': currentOrganization 
        });

        this.stopPropagation(event);
    }

    closeAlertRemove(event) {
        this.setState({
            showAlertRemove: false
        });
    }

    editRegister(event) {
        let id = event.currentTarget.id,
            currentOrganization = this.getOrgByIndex(id);
        
        this.props.handleOnClickNew('new', currentOrganization);
        this.stopPropagation(event);
    }

    render() {
        let cards,
            removeIcon = <ContentRemove color={'#740000'} />,
            editIcon = <ContentEdit />;

        cards =
            <GridList cols={1} padding={10} cellHeight={'auto'} >
                {this.state.organizations.map( (row, index) =>
                    <Card key={index} >
                        <CardHeader
                            title={row.name} />
                        <CardText>
                            {<div><b>Nome:</b> {row.name}</div>}
                            {<div><b>Descrição:</b> {row.description}</div>}
                        </CardText>
                        <CardActions style={{'text-align': 'center'}}>
                            <FlatButton name="edit" id={index} icon={editIcon}
                                onClick={this.editRegister.bind(this)}
                            />
                            <FlatButton name="remove" id={index} icon={removeIcon}
                                onClick={this.openAlertRemove.bind(this)}
                            />
                        </CardActions>
                    </Card>
                )}
            </GridList>
        ;
        return (
            <div>
                {cards}
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
