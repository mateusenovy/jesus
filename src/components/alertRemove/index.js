import React, { Component } from 'react';

import { FlatButton, Dialog } from 'material-ui';

export default class OrganizationComponent extends Component {

    render() {
        const ACTIONS = [
              <FlatButton
                label="Cancelar"
                onClick={this.props.onClickCancel}
              />,
              <FlatButton
                label="Remover"
                onClick={this.props.onClickRemove}
              />
        ];

        return(
            <Dialog
                  actions={ACTIONS}
                  modal={false}
                  open={this.props.showAlertRemove}
            >Remover registro?
            </Dialog>
        );
    }
}
