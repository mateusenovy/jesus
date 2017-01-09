import React, { Component } from 'react';

import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import OrganizationFloatButton from './organizationFloatButton';
// import C from '../constants';
import * as OrganizationActions from './organizationActions';
// import OrganizationStore from './organizationStore';

export default class OrganizationComponent extends Component {

    constructor() {
        super();

        this.state = {
            validForm: false
        }
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
        OrganizationActions.createOrg(form.name, form.description);
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
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="description"
                            hintText="Descrição"
                            floatingLabelText="Descrição"
                            required
                            validations="isWords"
                            validationError="error"
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
