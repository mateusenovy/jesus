import { deepOrange500, blue900, teal50 } from 'material-ui/styles/colors';
import { getMuiTheme } from 'material-ui/styles';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
    primary1Color: blue900,
    canvasColor: teal50,
  }
});

export default muiTheme;
