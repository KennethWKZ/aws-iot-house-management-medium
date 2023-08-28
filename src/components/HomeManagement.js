import { Auth } from "@aws-amplify/auth";
import { AWSIoTProvider } from "@aws-amplify/pubsub";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { Amplify, Hub, PubSub } from "aws-amplify";
import React, { Component } from "react";
import House from "./House";
import UserDisplay from "./UserDisplay";

class HomeManagement extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();

    this.state = { command: "", hideHouse: false, creds: "" };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.hideHouse = this.hideHouse.bind(this);
  }

  componentDidMount() {
    Auth.currentCredentials().then((user) => {
      this.user = user;
      Amplify.addPluggable(
        new AWSIoTProvider({
          aws_pubsub_region: "ap-southeast-1",
          aws_pubsub_endpoint:
            "wss://<YOUR_PUBSUB_ENDPOINT>.iot.ap-southeast-1.amazonaws.com/mqtt",
          clientId: user.identityId,
        })
      );

      Hub.listen("pubsub", (data) => {
        const { payload } = data;
        const connectionState = payload.data.connectionState;
        console.log(connectionState);
      });

      PubSub.subscribe(user.identityId + "/house").subscribe(
        (data) => {
          console.log("Message received", data.value);
          this.child.current.changeColor(data.value.message);
        },
        (error) => console.error(error),
        () => console.log("Done")
      );
    });
  }

  handleOnChange(event) {
    this.setState({
      command: event.target.value,
      hideHouse: this.state.hideHouse,
      creds: this.state.creds,
    });
  }

  hideHouse() {
    this.setState({
      command: this.state.command,
      hideHouse: !this.state.hideHouse,
      creds: this.state.creds,
    });
  }

  onClick = () => {
    PubSub.publish(this.user.identityId + "/house", {
      message: this.state.command,
    });
  };

  render() {
    return (
      <div style={{ marginTop: 50 }}>
        <UserDisplay></UserDisplay>
        <form noValidate autoComplete="off">
          <p>{this.state.creds}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Command message"
                variant="outlined"
                onChange={(event) => this.handleOnChange(event)}
                value={this.state.command}
              />
              <IconButton
                color={"primary"}
                aria-label="delete"
                onClick={this.onClick}
              >
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </form>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {this.state.hideHouse ? null : (
            <House style={{ marginTop: 50 }} ref={this.child} />
          )}
          <Button
            variant="contained"
            style={{ width: 150, marginTop: 50 }}
            color="primary"
            onClick={this.hideHouse}
            disableElevation
          >
            {this.state.hideHouse ? "Show House" : "Hide house"}
          </Button>
        </div>
      </div>
    );
  }
}

export default HomeManagement;
