import React, { Component } from 'react';

import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import CellFloatButton from './cellFloatButton';
import * as CellActions from './cellActions';

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

    clickConfirmButton() {
        if (this.state.validForm)
            this.refs.cellForm.submit();
    }

    setValidForm() {
        this.setState({
            validForm: true
        });
    }

    submitCell(form) {
        let name = form.name,
            address = form.address,
            responsible = form.responsible;

        if (this.state.currentCell.isNew)
            return CellActions.createCell(name, address, responsible);

        return CellActions.editCell(this.state.currentCell.id, name, address, responsible);
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
                            validations="isWords"
                            validationError="error"
                            value={this.state.currentCell.name}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="address"
                            hintText="Endereço"
                            floatingLabelText="Endereço"
                            required
                            validations="isWords"
                            validationError="error"
                            value={this.state.currentCell.address}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="responsible"
                            hintText="Responsável"
                            floatingLabelText="Responsible"
                            required
                            validations="isWords"
                            validationError="error"
                            value={this.state.currentCell.responsible}
                            style={{width: '100%'}}
                        />
                        <CellFloatButton
                            showSaveAndCancel={true}
                            handleOnClick={this.props.handleOnClick}
                            handleOnClickConfirm={this.clickConfirmButton.bind(this)}
                        />
                    </Formsy.Form>
            </div>
        );
    }
}
