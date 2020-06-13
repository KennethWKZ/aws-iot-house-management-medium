
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, {Component} from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import {ThemeProvider} from "@material-ui/styles";


const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});
class Layout extends Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        IoT House Management
                    </Typography>
                </Toolbar>
            </AppBar>
                <div>{this.props.children}</div>
            </ThemeProvider>
        );
    }
}
export default Layout;
