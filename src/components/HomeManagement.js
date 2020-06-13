
import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import House from "./House";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import Button from "@material-ui/core/Button";
class HomeManagement extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();

        this.state = {command : "", hideHouse: false};
        this.handleOnChange = this.handleOnChange.bind(this);
        this.hideHouse = this.hideHouse.bind(this);

    }
    handleOnChange(event) {
        this.setState({
            command: event.target.value,
            hideHouse: this.state.hideHouse
        })
    }

    hideHouse() {
        this.setState({
            command: this.state.command,
            hideHouse: !this.state.hideHouse
        })
    }

    onClick = () => {
        this.child.current.changerColor(this.state.command);
    };
    render() {

        return (
            <div style={{marginTop: 50}}>
                <form noValidate autoComplete="off">

                    <div  style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center'}}>
                    <div  style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                    <TextField id="outlined-basic" label="Command message" variant="outlined" onChange={(event) => this.handleOnChange(event)} value={this.state.command} />
                        <IconButton color={"primary"} aria-label="delete" onClick={this.onClick}>
                            <SendIcon/>
                        </IconButton>
                    </div>

                    </div>
                </form>

                <div  style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center'}}>
                {this.state.hideHouse? null : <House style={{marginTop: 50}}   ref={this.child} />}
                <Button variant="contained" style={{width: 150, marginTop:50}} color="primary" onClick={this.hideHouse} disableElevation>
                    {this.state.hideHouse? 'Show House':'Hide house'}
                </Button>
                </div>
            </div>
        );
    }

}
export default HomeManagement;
