import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Header, List, Segment, Sidebar } from "semantic-ui-react";

export class UserList extends Component {
  state = {
    visible: false,
    userList: [],
    button: { color: "#4183c4" },
  };
  componentDidMount() {
    console.log(this.props);
    let userinfoUrl = "http://127.0.0.1:8000/debugger/users/";

    console.log(userinfoUrl);
    axios
      .get(userinfoUrl)
      .then((res) => {
        const userListinfo = res.data;
        console.log(userListinfo);
        var userList = userListinfo.map(function (user) {
          return {
            key: user.id,
            text: user.username,
            value: user.id,
          };
        });
        this.setState({ userList });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleAnimationChange = (animation) => () =>
    this.setState((prevState) => ({ animation, visible: !prevState.visible }));

  render() {
    const { visible } = this.state;

    const HorizontalSidebar = ({ visible }) => (
      <Sidebar
        as={Segment}
        animation="overlay"
        direction="top"
        visible={visible}
      >
        <List divided relaxed>
          {this.state.userList.map((user) => {
            return (
              <List.Item key={user.key}>
                <Link to={`/users/${user.key}`}>
                  <List.Content>
                    <List.Header style={this.state.button}>
                      {user.text}
                    </List.Header>
                  </List.Content>
                </Link>
              </List.Item>
            );
          })}
        </List>
        <Button
          onClick={this.handleAnimationChange(
            "overlay",
            this.state.userList
          ).bind(this)}
        >
          Close List
        </Button>
      </Sidebar>
    );
    return (
      <div className="user-list-container" height="10rem">
        <Sidebar.Pushable as={Segment}>
          <HorizontalSidebar visible={visible} />
          <Sidebar.Pusher dimmed={visible}>
            <Segment basic textAlign="center">
              <Button
                style={this.state.button}
                onClick={this.handleAnimationChange(
                  "overlay",
                  this.state.userList
                ).bind(this)}
              >
                Active Users
              </Button>
              <Header as="h3" textAlign="center"></Header>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
