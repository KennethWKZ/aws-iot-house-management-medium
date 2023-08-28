import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import React from "react";
import "./App.css";

import awsExports from "./aws-exports";
import HomeManagement from "./components/HomeManagement";
import Layout from "./components/Layout";
Amplify.configure(awsExports);

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Layout>
          <Authenticator loginMechanisms={["email"]}>
            {({ signOut, user }) => (
              <main>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <HomeManagement />
                    <button style={{marginTop:40}} onClick={signOut}>Sign out</button>
                  </div>
                </div>
              </main>
            )}
          </Authenticator>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
