import React, { Component } from 'react';

import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import OrganizationFloatButton from './organizationFloatButton';
import * as OrganizationActions from './organizationActions';

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

    clickConfirmButton() {
        if (this.state.validForm)
            this.refs.organizationForm.submit();
    }

    setValidForm() {
        this.setState({
            validForm: true
        });
    }

    submitOrganization(form) {
        let name = form.name,
            description = form.description;

        if (this.state.currentOrganization.isNew)
            return OrganizationActions.createOrg(name, description);

        return OrganizationActions.editOrg(this.state.currentOrganization.id, name, description);
    }

    render() {
        return(
            <div>
                    <Formsy.Form
                        ref="organizationForm"
                        onSubmit={this.submitOrganization.bind(this)}
                        onValid={this.setValidForm.bind(this)}
                    >
                        <FormsyText
                            name="name"
                            hintText="Nome"
                            floatingLabelText="Nome"
                            required
                            validations="isWords"
                            validationError="error"
                            value={this.state.currentOrganization.name}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="description"
                            hintText="Descrição"
                            floatingLabelText="Descrição"
                            required
                            validations="isWords"
                            validationError="error"
                            value={this.state.currentOrganization.description}
                            style={{width: '100%'}}
                        />
                        <OrganizationFloatButton
                            showSaveAndCancel={true}
                            handleOnClick={this.props.handleOnClick}
                            handleOnClickConfirm={this.clickConfirmButton.bind(this)}
                        />
                    </Formsy.Form>
            </div>
        );
    }
}
