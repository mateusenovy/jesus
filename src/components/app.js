import React, { Component } from 'react';

import { MuiThemeProvider } from 'material-ui/styles';
import Theme from './theme';
import AppBar from './appBar';

export default class ThemeComponent extends Component {
   render() {
       return(
           <MuiThemeProvider muiTheme={Theme}>
               <AppBar />
           </MuiThemeProvider>
       );
   }
}
