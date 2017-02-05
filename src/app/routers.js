import React, { Component } from 'react';

import { Router, Route, hashHistory } from 'react-router';
import AppBar from './appBar';
import Congregation from '../congregation/congregation';
import Grid from '../grid/grid';
import Organization from '../organization/organization';
import Cell from '../cell/cell';

export default class Routers extends Component {

    render() {
        return(
            <Router history={hashHistory}>
                <Route path="/" component={AppBar}>
                    <Route path="organization" component={Organization}></Route>
                    <Route path="congregation" component={Congregation}></Route>
                    <Route path="grid/:congregationId" component={Grid}></Route>
                    <Route path="cell" component={Cell}></Route>
                </Route>
            </Router>
        );
    }
}
