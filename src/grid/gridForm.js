import React, { Component } from 'react';

import Formsy from 'formsy-react';
import { FormsyText, FormsyAutoComplete } from 'formsy-material-ui/lib';
import { AutoComplete } from 'material-ui';
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
                congregation: null,
                responsible: null
            },
            selectedCongregation: null
        }
    }

    componentDidMount() {
        this.setState({
            currentGrid: {
                id: this.props.currentGrid.id || null,
                name: this.props.currentGrid.name || null,
                color: this.props.currentGrid.color || null,
                responsible: this.props.responsible || null,
                isNew: !this.props.currentGrid.id
            },
            selectedCongregation: this.props.congregation || null
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

    onSelectAutoComplte(selected) {
        this.setState({
            selectedCongregation: selected
        });
    }

    submitGrid(form) {
        debugger;
        let name = form.name,
            color = form.color,
            responsible = form.responsible,
            congregation = this.state.selectedCongregation.id;

        if (this.state.currentGrid.isNew)
            return GridActions.createGrid(congregation, name, color, responsible);

        return GridActions.editGrid(this.state.currentGrid.id, congregation, name, color, responsible);
    }

    render() {
        console.log(this.props);
        debugger;

        return(
            <div>
                    <Formsy.Form
                        ref="gridForm"
                        onSubmit={this.submitGrid.bind(this)}
                        onValid={this.setValidForm.bind(this)}
                    >
                        <FormsyAutoComplete
                            name="congregation"
                            hintText="Congregação"
                            floatingLabelText="Congregação"
                            dataSource={this.props.congregations}
                            dataSourceConfig={{ text: 'label', value: 'id'}}
                            onNewRequest={this.onSelectAutoComplte.bind(this)}
                            value={this.state.selectedCongregation}
                            filter={AutoComplete.fuzzyFilter}
                            openOnFocus={true}
                            fullWidth={true}
                            menuStyle={{maxHeight:"40vh"}}
                            maxSearchResults={50}
                        />
                        <FormsyText
                            name="name"
                            hintText="Nome"
                            floatingLabelText="Nome"
                            required
                            validations="isWords"
                            validationError="error"
                            value={this.state.currentGrid.name}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="color"
                            hintText="Cor"
                            floatingLabelText="Color"
                            required
                            validations="isWords"
                            validationError="error"
                            value={this.state.currentGrid.color}
                            style={{width: '100%'}}
                        />
                        <FormsyText
                            name="responsible"
                            hintText="Responsável"
                            floatingLabelText="Responsible"
                            required
                            validations="isWords"
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
