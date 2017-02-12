import React, { Component } from 'react';

import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import OrganizationFloatButton from './organizationFloatButton';
import * as OrganizationActions from './organizationActions';
import C from '../constants';

export default class OrganizationComponent extends Component {

    constructor() {
        super();

        this.state = {
            validForm: false,
            currentOrganization: {
                id: null,
                name: null,
                description: null,
                isNew: true
            }
        }
    }

    componentDidMount() {
        this.setState({
            currentOrganization: {
                id: this.props.currentOrganization.id || null,
                name: this.props.currentOrganization.name || null,
                description: this.props.currentOrganization.description || null,
                isNew: !this.props.currentOrganization.id
            }
        });
    }

    handleOnClick(eventName) {
        let isValidOrCancel = (this.state.validForm || eventName === C.ORG_ACTION_BUTTON_CANCEL);
        isValidOrCancel && this.props.handleOnClick();
    }

    clickConfirmButton() {
        this.refs.organizationForm.submit();
    }

    setFormValid(isValid) {
        this.setState({
            validForm: isValid
        });
    }

    setValidForm() {
        this.setFormValid(true);
    }

    setInvalidForm() {
        this.setFormValid(false);
    }

    submitOrganization(form) {
        let name = form.name,
            description = form.description,
            isNew = this.state.currentOrganization.isNew;

        if (this.state.validForm) {
            isNew ? 
                OrganizationActions.createOrg(name, description) :
                OrganizationActions.editOrg(this.state.currentOrganization.id, name, description);
        }

    }

    render() {
        return(
            <div>
                    <Formsy.Form
                        ref="organizationForm"
                        onSubmit={this.submitOrganization.bind(this)}
                        onValid={this.setValidForm.bind(this)}
                        onInvalid={this.setInvalidForm.bind(this)}
                    >
                        <FormsyText
                            name="name"
                            hintText="Nome"
                            floatingLabelText="Nome"
                            required
                            validations={{"isWords": true, "isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentOrganization.name}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="description"
                            hintText="Descrição"
                            floatingLabelText="Descrição"
                            required
                            validations={{"isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentOrganization.description}
                            style={{width: '100%'}}
                        />
                        <OrganizationFloatButton
                            showSaveAndCancel={true}
                            handleOnClick={this.handleOnClick.bind(this)}
                            handleOnClickConfirm={this.clickConfirmButton.bind(this)}
                        />
                    </Formsy.Form>
            </div>
        );
    }
}
