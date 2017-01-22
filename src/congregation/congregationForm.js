import React, { Component } from 'react';

import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import CongregationFloatButton from './congregationFloatButton';
// import C from '../constants';
import * as CongregationActions from './congregationActions';
// import CongregationStore from './congregationStore';

export default class CongregationComponent extends Component {

    constructor() {
        super();

        this.state = {
            validForm: false,
            currentCongregation: {
                id: null,
                cnpj: null,
                address: null,
                responsible: true
            }
        }
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
            }
        });
    }

    clickConfirmButton() {
        if (this.state.validForm)
            this.refs.congregationForm.submit();
    }

    setValidForm() {
        this.setState({
            validForm: true
        });
    }

    submitCongregation(form) {
        let name = form.name,
            cnpj = form.cnpj,
            address = form.address,
            responsible = form.responsible;

        if (this.state.currentCongregation.isNew)
            return CongregationActions.createCongregation(name, cnpj, address, responsible);

        return CongregationActions.editCongregation(this.state.currentCongregation.id, name, cnpj, address, responsible);
    }

    render() {
        return(
            <div>
                    <Formsy.Form
                        ref="congregationForm"
                        onSubmit={this.submitCongregation.bind(this)}
                        onValid={this.setValidForm.bind(this)}
                    >
                        <FormsyText
                            name="name"
                            hintText="Nome"
                            floatingLabelText="Nome"
                            required
                            validations="isWords"
                            validationError="error"
                            value={this.state.currentCongregation.name}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="cnpj"
                            hintText="CNPJ"
                            floatingLabelText="CNPJ"
                            required
                            validations="isWords"
                            validationError="error"
                            value={this.state.currentCongregation.cnpj}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="address"
                            hintText="Endereço"
                            floatingLabelText="Endereço"
                            required
                            validations="isWords"
                            validationError="error"
                            value={this.state.currentCongregation.address}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="responsible"
                            hintText="Responsável"
                            floatingLabelText="Responsible"
                            required
                            validations="isWords"
                            validationError="error"
                            value={this.state.currentCongregation.responsible}
                            style={{width: '100%'}}
                        />
                        <CongregationFloatButton
                            showSaveAndCancel={true}
                            handleOnClick={this.props.handleOnClick}
                            handleOnClickConfirm={this.clickConfirmButton.bind(this)}
                        />
                    </Formsy.Form>
            </div>
        );
    }
}
