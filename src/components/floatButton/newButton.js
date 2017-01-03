import React, { Component } from 'react';

import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class NewButton extends Component {

    render() {
        return(
            <FloatingActionButton
                style={this.props.style} 
                onClick={this.props.handleOnClickNew} >
                    <ContentAdd />
            </FloatingActionButton>
        );
    }
}
