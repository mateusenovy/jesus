import React, { Component } from 'react';

import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import CellFloatButton from './cellFloatButton';
import * as CellActions from './cellActions';
import C from '../constants';

export default class CellComponent extends Component {

    constructor() {
        super();

        this.state = {
            validForm: false,
            currentCell: {
                id: null,
                name: null,
                address: null,
                responsible: null
            }
        }
    }

    componentDidMount() {
        this.setState({
            currentCell: {
                id: this.props.currentCell.id || null,
                name: this.props.currentCell.name || null,
                address: this.props.currentCell.address || null,
                responsible: this.props.currentCell.responsible || null,
                isNew: !this.props.currentCell.id
            }
        });
    }

    handleOnClick(eventName) {
        let isValidOrCancel = (this.state.validForm || eventName === C.CELL_ACTION_BUTTON_CANCEL);
        isValidOrCancel && this.props.handleOnClick();
    }

    clickConfirmButton() {
        this.refs.cellForm.submit();
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

    submitCell(form) {
        let name           = form.name.trim().toUpperCaseAllFirstWord(),
            address        = form.address.trim(),
            responsible    = form.responsible.trim(),
            cellId         = this.state.currentCell.id,
            congregationId = this.props.congregationId,
            gridId         = this.props.gridId,
            isNew          = this.state.currentCell.isNew;

        if (this.state.validForm) {
            isNew ?
                CellActions.createCell(congregationId, gridId, name, address, responsible) :
                CellActions.editCell(congregationId, gridId, cellId, name, address, responsible);
        }
    }

    render() {
        return(
            <div>
                    <Formsy.Form
                        ref="cellForm"
                        onSubmit={this.submitCell.bind(this)}
                        onValid={this.setValidForm.bind(this)}
                    >
                        <FormsyText
                            name="name"
                            hintText="Nome"
                            floatingLabelText="Nome"
                            required
                            validations={{"isWords": true, "isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentCell.name}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="address"
                            hintText="Endereço"
                            floatingLabelText="Endereço"
                            required
                            validations={{"isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentCell.address}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="responsible"
                            hintText="Responsável"
                            floatingLabelText="Responsible"
                            required
                            validations={{"isWords": true, "isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentCell.responsible}
                            style={{width: '100%'}}
                        />
                        <CellFloatButton
                            showSaveAndCancel={true}
                            handleOnClick={this.handleOnClick.bind(this)}
                            handleOnClickConfirm={this.clickConfirmButton.bind(this)}
                        />
                    </Formsy.Form>
            </div>
        );
    }
}
