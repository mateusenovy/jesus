import React, { Component } from 'react';

import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import UserFloatButton from './userFloatButton';
import * as UserActions from './userActions';
import C from '../constants';

export default class UserComponent extends Component {

    constructor() {
        super();

        this.state = {
            validForm: false,
            currentUser: {
                id: null,
                name: null,
                description: null,
                isNew: true
            }
        }
    }

    componentDidMount() {
        this.setState({
            currentUser: {
                id: this.props.currentUser.id || null,
                name: this.props.currentUser.name || null,
                birth: this.props.currentUser.birth || null,
                rg: this.props.currentUser.rg || null,
                address: this.props.currentUser.address || null,
                situation: this.props.currentUser.situation || null,
                cell: this.props.currentUser.cell || null,
                disciplinarian: this.props.currentUser.disciplinarian || null,
                isNew: !this.props.currentUser.id
            }
        });
    }

    handleOnClick(eventName) {
        let isValidOrCancel = (this.state.validForm || eventName === C.USER_ACTION_BUTTON_CANCEL);
        isValidOrCancel && this.props.handleOnClick();
    }

    clickConfirmButton() {
        this.refs.userForm.submit();
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

    submitUser(form) {
        let name = form.name.trim().toUpperCaseAllFirstWord(),
            password = form.password,
            birth = form.birth.trim(),
            rg = form.rg.trim(),
            address = form.address.trim(),
            situation = form.situation.trim(),
            cell = form.cell.trim(),
            disciplinarian = form.disciplinarian.trim(),
            isNew = this.state.currentUser.isNew;

        if (this.state.validForm) {
            isNew ?
                UserActions.createUser(name, password, birth, rg, address, situation, cell, disciplinarian) :
                UserActions.editUser(this.state.currentUser.id, name, birth, rg, address, situation, cell, disciplinarian);
        }

    }

    render() {
        return(
            <div>
                    <Formsy.Form
                        ref="userForm"
                        onSubmit={this.submitUser.bind(this)}
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
                            value={this.state.currentUser.name}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="password"
                            hintText="Senha"
                            floatingLabelText="Senha"
                            required
                            validations={{"isWords": true, "isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentUser.password}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="birth"
                            hintText="Nascimento"
                            floatingLabelText="Nascimento"
                            required
                            validations={{"isWords": true, "isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentUser.birth}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="rg"
                            hintText="RG"
                            floatingLabelText="RG"
                            required
                            validations={{"isWords": true, "isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentUser.rg}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="address"
                            hintText="Endereço"
                            floatingLabelText="Endereço"
                            required
                            validations={{"isWords": true, "isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentUser.address}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="situation"
                            hintText="Situação"
                            floatingLabelText="Situação"
                            required
                            validations={{"isWords": true, "isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentUser.situation}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="cell"
                            hintText="Célula"
                            floatingLabelText="Célula"
                            required
                            validations={{"isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentUser.cell}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="disciplinarian"
                            hintText="Discipulador"
                            floatingLabelText="Discipulador"
                            required
                            validations={{"isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentUser.disciplinarian}
                            style={{width: '100%'}}
                        />
                        <UserFloatButton
                            showSaveAndCancel={true}
                            handleOnClick={this.handleOnClick.bind(this)}
                            handleOnClickConfirm={this.clickConfirmButton.bind(this)}
                        />
                    </Formsy.Form>
            </div>
        );
    }
}
