import React, { Component } from "react";
import axios from "axios";
import UserInfo from "../Home/userInfo";
import { Button } from "semantic-ui-react";
import jwt from "jwt-decode";
import { toast } from "react-toastify";
class UserDetail extends Component {
  state = { user: [], userInfo: {}, loggedUser: [] };
  componentDidMount() {
    var token = localStorage.access_token;

    var userInfo = jwt(token);

    const loggeduserinfoUrl =
      "http://127.0.0.1:8000/debugger/users/" + userInfo.user_id + "/";

    axios
      .get(loggeduserinfoUrl)
      .then((res) => {
        console.log(res.data);
        this.setState({ loggedUser: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    let userId = this.props.match.params.userId;

    const userinfoUrl = "http://127.0.0.1:8000/debugger/users/" + userId + "/";

    console.log(userinfoUrl);
    axios
      .get(userinfoUrl)
      .then((res) => {
        this.setState({ user: res.data });
        console.log(this.state.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  makeAdmin() {
    let userId = this.props.match.params.userId;
    const makeAdminUrl = "http://127.0.0.1:8000/debugger/users/" + userId + "/";
    axios
      .patch(makeAdminUrl, {
        is_admin: true,
      })
      .then((res) => {
        this.setState({ user: res.data });
        console.log(this.state.user);
        toast.success("User Made Admin");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  removeAdmin() {
    let userId = this.props.match.params.userId;
    const makeAdminUrl = "http://127.0.0.1:8000/debugger/users/" + userId + "/";
    axios
      .patch(makeAdminUrl, {
        is_admin: false,
      })
      .then((res) => {
        this.setState({ user: res.data });
        console.log(this.state.user);
        toast.success("User Removed Admin");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const admin_logged_in = this.state.loggedUser.is_admin;
    const is_admin = this.state.user.is_admin;
    console.log(admin_logged_in);
    return (
      <React.Fragment>
        <UserInfo user={this.state.user} />

        {admin_logged_in ? (
          <center>
            {is_admin ? (
              <Button onClick={this.removeAdmin.bind(this)}>
                Remove Admin
              </Button>
            ) : (
              <Button onClick={this.makeAdmin.bind(this)}>Make Admin</Button>
            )}
          </center>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default UserDetail;
