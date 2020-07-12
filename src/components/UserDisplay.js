
import React, {Component} from "react";
import {Auth} from "@aws-amplify/auth";
class UserDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            creds: undefined
        }

    }

    componentDidMount() {
        Auth.currentCredentials().then(v => {
            this.setState({creds: v.identityId})
        });
    }

    render() {
        if(this.state.creds) {
            return (
                <div>
                    <p>Identity Id : <b>{this.state.creds}</b></p>
                </div>
            );
        }
        else
            return (
                <div>
                    <p>Waiting for user information</p>
                </div>
            );
    }
}
export default UserDisplay;
