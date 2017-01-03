import React, { Component } from 'react';

import NewFloatButton from './newButton';
import ConfirmFloatButton from './confirmButton';
import CancelFloatButton from './cancelButton';

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
}, miniStyle = {...style, right: 80 };

export default class FloatButton extends Component {

    render() {
        const showSaveAndCancel = this.props.showSaveAndCancel;

        let buttonComponent = <NewFloatButton style={style} handleOnClickNew={this.props.handleOnClickNew} />;

        if (showSaveAndCancel) {
            //TODO Put Popover
            buttonComponent =
                <div>
                    <ConfirmFloatButton style={style} handleOnClickConfirm={this.props.handleOnClickConfirm} />
                    <CancelFloatButton isMini={true} style={miniStyle} handleOnClickCancel={this.props.handleOnClickCancel} />
                </div>;
        }

        return(
            <div>
                {buttonComponent}
            </div>
        );
    }
}
