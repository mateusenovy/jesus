import React, { Component } from 'react';

require('./util.js');

import { MuiThemeProvider } from 'material-ui/styles';
import Theme from './theme';
import Routers from './routers';

export default class ThemeComponent extends Component {
   render() {
       return(
           <MuiThemeProvider muiTheme={Theme}>
               <Routers />
           </MuiThemeProvider>
       );
   }
}
