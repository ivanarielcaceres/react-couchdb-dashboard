import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {teal500, grey900} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: teal500
  },
  drawer: {
    width: 230,
    color: grey900
  },
  raisedButton: {
    primaryColor: teal500,
  }
});


export default themeDefault;