import React, { Component } from 'react';

import Formsy from 'formsy-react';
import { FormsyText, FormsyAutoComplete } from 'formsy-material-ui/lib';
import AutoComplete from 'material-ui/AutoComplete';
import CongregationFloatButton from './congregationFloatButton';
import * as CongregationActions from './congregationActions';
import UserStore from './../user/userStore';
import C from '../constants';

export default class CongregationComponent extends Component {

    constructor() {
        super();

        this.state = {
            validForm: false,
            currentCongregation: {
                id: null,
                name: null,
                cnpj: null,
                address: null,
                responsible: null
            },
            dataSourceUsers: []
        }
    }

    createDataSourceUsers() {
        const users = UserStore.findUser();
        let dataSourceUsers = users.map(function(user) {
            return {
                text: user.name || 'novy',
                value: user.id
            }
        });

        return dataSourceUsers;
    }

    componentDidMount() {
        this.setState({
            currentCongregation: {
                id: this.props.currentCongregation.id || null,
                name: this.props.currentCongregation.name || null,
                cnpj: this.props.currentCongregation.cnpj || null,
                address: this.props.currentCongregation.address || null,
                responsible: this.props.currentCongregation.responsible || null,
                isNew: !this.props.currentCongregation.id
            },
            dataSourceUsers: this.createDataSourceUsers()
        });
    }

    handleOnClick(eventName) {
        let isValidOrCancel = (this.state.validForm || eventName === C.CONGR_ACTION_BUTTON_CANCEL);
        isValidOrCancel && this.props.handleOnClick();
    }

    validateInvalidForm() {
        this.handleOnClick(C.CONGR_ACTION_BUTTON_CONFIRM)
    }

    clickConfirmButton() {
        this.refs.congregationForm.submit();
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

    submitCongregation(form) {
        debugger;
        let name = form.name.trim().toUpperCaseAllFirstWord(),
            cnpj = form.cnpj.trim(),
            address = form.address.trim(),
            responsible = form.responsible.trim(),
            id = this.state.currentCongregation.id,
            isNew = this.state.currentCongregation.isNew;

        if (this.state.validForm) {
            isNew ?
                CongregationActions.createCongregation(name, cnpj, address, responsible) :
                CongregationActions.editCongregation(id, name, cnpj, address, responsible);
        }

    }

    render() {
        return(
            <div>
                    <Formsy.Form
                        ref="congregationForm"
                        onSubmit={this.submitCongregation.bind(this)}
                        onValid={this.setValidForm.bind(this)}
                        onInvalid={this.setInvalidForm.bind(this)}
                    >
                        <FormsyText
                            name="name"
                            floatingLabelText="Nome"
                            required
                            validations={{"isWords": true, "isOnlySpace": true }}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentCongregation.name}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="cnpj"
                            floatingLabelText="CNPJ"
                            required
                            validations={{"isCnpj": true}}
                            validationError="CNPJ inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentCongregation.cnpj}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="address"
                            floatingLabelText="Endereço"
                            required
                            validations={{"isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentCongregation.address}
                            style={{width: '100%'}}
                        />
                        <FormsyAutoComplete
                            name="responsible"
                            floatingLabelText="Responsável"
                            required
                            filter={AutoComplete.noFilter}
                            validations={{"isWords": true, "isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            dataSource={this.state.dataSourceUsers}
                            openOnFocus={true}
                            value={this.state.currentCongregation.responsible}
                            fullWidth={true}
                        />
                        <CongregationFloatButton
                            showSaveAndCancel={true}
                            handleOnClick={this.handleOnClick.bind(this)}
                            handleOnClickConfirm={this.clickConfirmButton.bind(this)}
                        />
                    </Formsy.Form>
            </div>
        );
    }
}
