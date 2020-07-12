import React from 'react';
import './App.css';
import Layout from "./components/Layout";
import HomeManagement from "./components/HomeManagement";
import {AmplifyAuthenticator, AmplifySignOut, withAuthenticator} from "@aws-amplify/ui-react";
import awsExports from './aws-exports';
import Amplify from "aws-amplify";
Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
        <Layout>
            <AmplifyAuthenticator>
                <div>
                    <div  style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center'}}>
                    <HomeManagement/>
                    <AmplifySignOut style={{marginTop:40}} />
                    </div>
                </div>
            </AmplifyAuthenticator>
        </Layout>
    </div>
  );
}

export default withAuthenticator(App);
