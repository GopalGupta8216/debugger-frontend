import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { Button, Header, List, Segment, Sidebar } from "semantic-ui-react";
import { toast } from "react-toastify";
class IssueList extends Component {
  state = {
    visible: false,
    issueList: [],
    button: { color: "#4183c4" },
    projectId: "",
  };
  componentDidMount() {
    console.log(this.props);

    let userinfoUrl =
      "http://127.0.0.1:8000/debugger/project/" +
      this.props.projectId +
      "/issue/";

    console.log(userinfoUrl);
    axios
      .get(userinfoUrl)
      .then((res) => {
        const issueListinfo = res.data;
        console.log(issueListinfo);

        var issueList = issueListinfo.map(function (issue) {
          return {
            key: issue.id,
            text: issue.heading,
            value: issue.id,
            created: issue.reported_on,
          };
        });
        this.setState({ issueList });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
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
          {this.state.issueList.map((issue) => {
            return (
              <List.Item key={issue.key}>
                <Link to={`${this.props.projectId}/issue/${issue.key}`}>
                  <List.Content>
                    <List.Header style={this.state.button}>
                      {issue.text}
                    </List.Header>
                    <List.Description>
                      Reported on {issue.created}
                    </List.Description>
                  </List.Content>
                </Link>
              </List.Item>
            );
          })}
        </List>
        <Button
          onClick={this.handleAnimationChange(
            "overlay",
            this.state.issueList
          ).bind(this)}
        >
          Close List
        </Button>
      </Sidebar>
    );
    return (
      <div className="issue-list-container" height="10rem">
        <Sidebar.Pushable as={Segment}>
          <HorizontalSidebar visible={visible} />
          <Sidebar.Pusher dimmed={visible}>
            <Segment basic textAlign="center">
              <Button
                style={this.state.button}
                onClick={this.handleAnimationChange(
                  "overlay",
                  this.state.issueList
                ).bind(this)}
              >
                View Issues
              </Button>
              <Header as="h3" textAlign="center"></Header>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default IssueList;
