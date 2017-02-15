import React, { Component } from 'react';

import { RaisedButton } from 'material-ui';
import { FormsyText } from 'formsy-material-ui/lib';

export default class Login extends Component {

	constructor() {
        super();

        this.state = {
            currentUser: {}
        }
    }

    handleOnClickStart() {
    	console.log('a');
    }

    render() {
        return(
            <Formsy.Form
                ref="loginForm"
            >
                <FormsyText
                    name="email"
                    hintText="Email"
                    floatingLabelText="Email"
                    required
                    validations={{"isEmail": true, "isOnlySpace": true}}
                    validationError="Campo inválido"
                    requiredError="Campo obrigatório"
                    value={this.state.currentUser.email}
                    style={{width: '100%'}}
                />
                <FormsyText
                    name="password"
                    hintText="Senha"
                    floatingLabelText="Senha"
                    required
                    validations={{ "isOnlySpace": true }}
                    validationError="Campo inválido"
                    requiredError="Campo obrigatório"
                    value={this.state.currentUser.password}
                    style={{width: '100%'}}
                />
                <RaisedButton 
                	label="Entrar"
                	fullWidth={true} 
                	primary={true} 
                	onClick={this.handleOnClickStart.bind(this)}
                />
            </Formsy.Form>
        );
    }
}
