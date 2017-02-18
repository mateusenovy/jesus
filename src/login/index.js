import React, { Component } from 'react';

import { RaisedButton, Snackbar } from 'material-ui';
import { FormsyText } from 'formsy-material-ui/lib';
import * as LoginAction from './loginActions';
import LoginStore from './loginStore';
import C from '../constants';

export default class Login extends Component {

    constructor() {
        super();

        this.state = {
            snackbar: {
                open: false,
                message: '',
                time: 6000
            },
            currentUser: {}
        }

        this.showMessageLogin = this.showMessageLogin.bind(this);
        this.changeToHomeScreen = this.changeToHomeScreen.bind(this);
    }

    componentWillMount() {
        LoginStore.on(C.SHOW_MESSAGE_LOGIN, this.showMessageLogin);
        LoginStore.on(C.CHANGE_TO_HOME_SCREEN, this.changeToHomeScreen);
    }

    componentWillUnmount() {
        LoginStore.removeListener(C.SHOW_MESSAGE_LOGIN, this.showMessageLogin);
        LoginStore.removeListener(C.CHANGE_TO_HOME_SCREEN, this.changeToHomeScreen);
    }

    showMessageLogin(messageText, time) {
        debugger;
        this.setState({
            snackbar: {
                'open': true,
                'message': messageText || 'There is no message',
                'time': time || this.state.snackbar.time
            }
        });
    }

    changeToHomeScreen() {
        this.props.router.push('/');
    }

    handleOnClickStart() {
        this.refs.loginForm.submit();
    }

    submitLogin(loginForm) {
        let userName = loginForm.userName.trim(),
            password = loginForm.password;

        LoginAction.validateUserLogin(userName, password);
    }

    render() {
        return(
            <div>
                <Formsy.Form
                    ref="loginForm"
                    onSubmit={this.submitLogin.bind(this)}
                >
                    <FormsyText
                        name="userName"
                        hintText="Usuário"
                        floatingLabelText="Usuário"
                        required
                        validations={{"isWords": true, "isOnlySpace": true}}
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
                <Snackbar
                  open={this.state.snackbar.open}
                  message={this.state.snackbar.message}
                  autoHideDuration={this.state.snackbar.time}
                />
            </div>
        );
    }
}
