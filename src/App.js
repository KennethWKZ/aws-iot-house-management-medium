import React from 'react';
import './App.css';
import House from "./components/House";
import Layout from "./components/Layout";
import TextField from "@material-ui/core/TextField";
import HomeManagement from "./components/HomeManagement";
function App() {
  return (
    <div className="App">
        <Layout>
            <HomeManagement/>
        </Layout>
    </div>
  );
}

export default App;
