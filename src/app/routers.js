import React, { Component } from 'react';

import { Router, Route, hashHistory } from 'react-router';
import AppBar from '../appBar';
import Congregation from '../congregation/congregation';
import Grid from '../grid/grid';
import Organization from '../organization/organization';
import Cell from '../cell/cell';
import Login from '../login';
import * as AppBarActions from '../appBar/appBarActions';

export default class Routers extends Component {

    handleRoutersOnEnter(router) {
        let title = router.location.state ? router.location.state.titleAppBar : router.location.state;
        AppBarActions.changeTitleAppBar(title);
    }

    render() {
        return(
            <Router history={hashHistory} >
                <Route path="/" component={AppBar}>
                    <Route path="organization" component={Organization}></Route>
                    <Route path="congregation"
                        onEnter={this.handleRoutersOnEnter.bind(this)} 
                        component={Congregation}>
                    </Route>
                    <Route path="grid/:congregationId"  
                        onEnter={this.handleRoutersOnEnter.bind(this)} 
                        component={Grid}>
                    </Route>
                    <Route path="cell/:congregationId/:gridId"
                        onEnter={this.handleRoutersOnEnter.bind(this)} 
                        component={Cell}>
                    </Route>
                </Route>
                <Route path="/login"
                        component={Login}>
                </Route>
            </Router>
        );
    }
}
