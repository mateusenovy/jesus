import React, { Component } from 'react';

import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import FieldColor from '../components/fieldColor';
import GridFloatButton from './gridFloatButton';
import * as GridActions from './gridActions';
import C from '../constants';

export default class GridComponent extends Component {

    constructor() {
        super();

        this.state = {
            validForm: false,
            currentGrid: {
                id: null,
                name: null,
                color: null,
                responsible: null
            }
        }
    }

    componentDidMount() {
        this.setState({
            currentGrid: {
                id: this.props.currentGrid.id || null,
                name: this.props.currentGrid.name || null,
                color: this.props.currentGrid.color || null,
                responsible: this.props.currentGrid.responsible || null,
                isNew: !this.props.currentGrid.id
            }
        });
    }

    handleOnClick(eventName) {
        let isValidOrCancel = (this.state.validForm || eventName === C.GRID_ACTION_BUTTON_CANCEL);
        isValidOrCancel && this.props.handleOnClick();
    }

    clickConfirmButton() {
        this.refs.gridForm.submit();
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

    submitGrid(form) {
        let name = form.name.trim().toUpperCaseAllFirstWord(),
            color = form.color.trim(),
            responsible = form.responsible.trim(),
            congregationId = this.props.congregationId,
            isNew = this.state.currentGrid.isNew;

        if (this.state.validForm) {
            isNew ?
                GridActions.createGrid(congregationId, name, color, responsible) :
                GridActions.editGrid(this.state.currentGrid.id, congregationId, name, color, responsible);
        }
    }

    render() {
        return(
            <div>
                    <Formsy.Form
                        ref="gridForm"
                        onSubmit={this.submitGrid.bind(this)}
                        onValid={this.setValidForm.bind(this)}
                        onInvalid={this.setInvalidForm.bind(this)}
                    >
                        <FormsyText
                            name="name"
                            floatingLabelText="Nome"
                            required
                            validations={{"isWords": true, "isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentGrid.name}
                            style={{width: '100%'}}
                        />
                        <FieldColor
                            name="color"
                            required
                            validations={{"isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentGrid.color}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="responsible"
                            floatingLabelText="Responsável"
                            required
                            validations={{"isWords": true, "isOnlySpace": true}}
                            validationError="Campo inválido"
                            requiredError="Campo obrigatório"
                            value={this.state.currentGrid.responsible}
                            style={{width: '100%'}}
                        />
                        <GridFloatButton
                            showSaveAndCancel={true}
                            handleOnClick={this.handleOnClick.bind(this)}
                            handleOnClickConfirm={this.clickConfirmButton.bind(this)}
                        />
                    </Formsy.Form>
            </div>
        );
    }
}
