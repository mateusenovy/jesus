import React, { Component } from 'react';

import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import OrganizationFloatButton from './organizationFloatButton';
// import C from '../constants';
// import * as OrganizationActions from './organizationActions';
// import OrganizationStore from './organizationStore';

export default class OrganizationComponent extends Component {

    confirmForm() {
        console.log('confirm');
    }

    render() {
        return(
            <div>
                    <Formsy.Form>
                        <FormsyText
                            name="description"
                            hintText="Descrição"
                            floatingLabelText="Descrição"
                            required
                            validations="isWords"
                            validationError="error"
                            style={{width: '100%'}}
                        />
                        <OrganizationFloatButton
                            showSaveAndCancel={true}
                            handleOnClick={this.props.handleOnClickNew}
                            handleOnClickConfirm={this.confirmForm.bind(this)}
                        />
                    </Formsy.Form>
            </div>
        );
    }
}
