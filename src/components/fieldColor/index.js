import React, { Component } from 'react';
import { Formsy, FormComponent }  from 'formsy-react';
import { ChromePicker } from 'react-color';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    over: {
        position: 'absolute',
        zIndex: '5'
    },
    overlap: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
    }
}

class FieldColor extends Component {

    constructor() {
        super();

        this.state = {
            showPickerColor: false,
            color: '#FFFFFF'
        }
    }

    mixins: [Formsy.Mixin]

    handleButtonOnClick() {
        this.setState({
            showPickerColor: true
        });
    }

    handleClickClosePicker() {
        this.setState({
            showPickerColor: false
        });
    }

    handleChangeColor(selectColor) {
        debugger;
        this.setState({
            color: selectColor.hex
        });
        this.setValue(selectColor.hex);
    }

    render() {
        const picker = this.state.showPickerColor ?
            <div style={ styles.over } >
                <div style={ styles.overlap } onClick={this.handleClickClosePicker.bind(this) } />
                <ChromePicker
                    disableAlpha={true}
                    color={this.state.color}
                    onChange={this.handleChangeColor.bind(this)}
                />
            </div> :
            <div></div>;

        return (
            <div>
                <RaisedButton
                    label="Cor"
                    fullWidth={true}
                    onClick={this.handleButtonOnClick.bind(this)}
                    backgroundColor={this.state.color}
                />
                {picker}
            </div>
        );
    }
}

export default FieldColor
