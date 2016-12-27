import React, { Component } from 'react';

import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
};

export default class AddButton extends Component {
    render() {
        return(
            <FloatingActionButton style={style}>
                <ContentAdd />
            </FloatingActionButton>
        );
    }
}
