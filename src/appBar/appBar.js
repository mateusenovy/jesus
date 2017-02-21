import React, { Component } from 'react';

import { Drawer, AppBar, MenuItem } from 'material-ui';
import { Link } from 'react-router';
import AppBarStore from './appBarStore';
import Dashboard from '../app/dashboard';
import C from '../constants';

import NavigationClose from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';

export default class AppBarComponent extends Component {

    constructor() {
        super();

        this.state = {
            openDrawer: false,
            title: 'Treis'
        }

        this.setTitleBar = this.setTitleBar.bind(this);
    }

    componentWillMount() {
        AppBarStore.on(C.ACTION_CHANGE_TITLE, this.setTitleBar);
    }

    componentWillUnmount() {
        AppBarStore.removeListener(C.ACTION_CHANGE_TITLE, this.setTitleBar);
    }

    setDrawerState(isOpen = false) {
        this.setState({
            openDrawer: isOpen
        });
    }

    hundleTitleTouchTap() {
        this.setDrawerState(true);
    }

    hundleLeftIconButtonTouchTap() {
        this.setDrawerState(true);
    }

    closeDrawer() {
        this.setDrawerState();
    }

    setTitleBar(title, showGoBack) {
        this.setState({
            'title': title,
            'showGoBack': title !== 'Treis' || showGoBack
        });
    }

    handleGoBack() {
        this.props.router.goBack();
        this.setTitleBar('Treis', false);
    };

    render() {
        let appBarProps = {
            onTitleTouchTap: this.hundleTitleTouchTap.bind(this),
            onLeftIconButtonTouchTap: this.hundleLeftIconButtonTouchTap.bind(this),
            showMenuIconButton: false
        },
            renderDashboard = this.props.children || <Dashboard />;

        if (this.state.showGoBack) {
            appBarProps.iconElementLeft = <IconButton><NavigationClose /></IconButton>;
            appBarProps.onTitleTouchTap = this.handleGoBack.bind(this);
            appBarProps.onLeftIconButtonTouchTap = this.handleGoBack.bind(this);
            appBarProps.showMenuIconButton = true;
        }

        return(
            <div>
                <AppBar
                    {...appBarProps}
                    title={this.state.title}
                />
                {renderDashboard}
            </div>
        );
    }
}
