import React, { Component } from 'react';

import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import GridFloatButton from './gridFloatButton';
import * as GridActions from './gridActions';

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

    clickConfirmButton() {
        if (this.state.validForm)
            this.refs.gridForm.submit();
    }

    setValidForm() {
        this.setState({
            validForm: true
        });
    }

    submitGrid(form) {
        let name = form.name.trim().toUpperCaseAllFirstWord(),
            color = form.color.trim(),
            responsible = form.responsible.trim(),
            congregationId = this.props.congregationId;

        if (this.state.currentGrid.isNew)
            return GridActions.createGrid(congregationId, name, color, responsible);

        return GridActions.editGrid(this.state.currentGrid.id, congregationId, name, color, responsible);
    }

    render() {
        return(
            <div>
                    <Formsy.Form
                        ref="gridForm"
                        onSubmit={this.submitGrid.bind(this)}
                        onValid={this.setValidForm.bind(this)}
                    >
                        <FormsyText
                            name="name"
                            hintText="Nome"
                            floatingLabelText="Nome"
                            required
                            validations={{"isWords": true, "isOnlySpace": true}}
                            validationError="error"
                            value={this.state.currentGrid.name}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="color"
                            hintText="Cor"
                            floatingLabelText="Color"
                            required
                            validations={{"isWords": true, "isOnlySpace": true}}
                            validationError="error"
                            value={this.state.currentGrid.color}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="responsible"
                            hintText="Responsável"
                            floatingLabelText="Responsible"
                            required
                            validations={{"isWords": true, "isOnlySpace": true}}
                            validationError="error"
                            value={this.state.currentGrid.responsible}
                            style={{width: '100%'}}
                        />
                        <GridFloatButton
                            showSaveAndCancel={true}
                            handleOnClick={this.props.handleOnClick}
                            handleOnClickConfirm={this.clickConfirmButton.bind(this)}
                        />
                    </Formsy.Form>
            </div>
        );
    }
}
