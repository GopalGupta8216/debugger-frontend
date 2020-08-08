import React, { Component } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import { Grid } from "semantic-ui-react";
import UserInfo from "./userInfo";

import { ProjectList } from "./projectList";
import { UserList } from "./userList";

class Home extends Component {
  state = { user: [], userInfo: {}, isAdmin: "" };
  componentDidMount() {
    var token = localStorage.access_token;

    var userInfo = jwt(token);
    // console.log(token);

    // console.log(userInfo);
    this.setState({ userInfo });

    const userinfoUrl =
      "http://127.0.0.1:8000/debugger/users/" + userInfo.user_id + "/";

    // console.log(userinfoUrl);
    axios
      .get(userinfoUrl)
      .then((res) => {
        this.setState({ user: res.data });
        // console.log(this.state.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const isAdmin = this.state.user.is_admin;
    console.log(isAdmin);
    if (isAdmin) {
      return (
        <React.Fragment>
          <UserInfo user={this.state.user} />
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column>
                <ProjectList {...this.props} />
              </Grid.Column>
              <Grid.Column>
                <UserList {...this.props} props={this.state.user} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {/* <ProjectList {...this.props} /> */}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <UserInfo user={this.state.user} />
          <ProjectList {...this.props} />
        </React.Fragment>
      );
    }
  }
}

export default Home;
