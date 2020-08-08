import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Button } from "semantic-ui-react";
import Login from "./Components/login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./Components/register";
import Home from "./Components/Home/home";
import "./Components/axios.js";
import Nav from "./Components/nav";
import IssueDetail from "./Components/issue/issueDetail";
import EditIssue from "./Components/issue/editIssue";
import CreateProject from "./Components/createProject";
import CreateIssue from "./Components/createIssue";
import ProjectDetail from "./Components/projectDetail/detail";
import EditProject from "./Components/projectDetail/editProject";
import UserDetail from "./Components/userdetail/userdetail";
// import router from "./router/router";

// LocalstorageService

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <ToastContainer />

        <Route path="/login" component={Login} exact />
        <Route path="/editissue" component={EditIssue} exact />
        <Route path="/project/:projectId" component={ProjectDetail} exact />
        <Route
          path="/project/:projectId/reportissue"
          component={CreateIssue}
          exact
        />
        <Route
          path="/project/:projectId/issue/:issueId"
          component={IssueDetail}
          exact
        />
        <Route path="/users/:userId" component={UserDetail} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/editproject" component={EditProject} exact />

        <Route path="/createProject" component={CreateProject} exact />
        <Route path="/register" component={Register} exact />
      </div>
    </Router>
  );
}

export default App;
