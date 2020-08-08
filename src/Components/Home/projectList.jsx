import React, { Component } from "react";

import axios from "axios";

import { Link } from "react-router-dom";
import { Button, Header, List, Segment, Sidebar } from "semantic-ui-react";

export class ProjectList extends Component {
  state = {
    visible: false,
    projectList: [],
    button: { color: "#4183c4" },
  };
  componentDidMount() {
    let userinfoUrl = "http://127.0.0.1:8000/debugger/project/";

    console.log(userinfoUrl);
    axios
      .get(userinfoUrl)
      .then((res) => {
        const projectListinfo = res.data;
        var projectList = projectListinfo.map(function (project) {
          return {
            key: project.id,
            text: project.project_name,
            value: project.id,
            created: project.created_on,
          };
        });
        this.setState({ projectList });
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
          {this.state.projectList.map((project) => {
            return (
              <List.Item key={project.key}>
                <Link to={`/project/${project.key}`}>
                  <List.Content>
                    <List.Header style={this.state.button}>
                      {project.text}
                    </List.Header>
                    <List.Description>
                      Created on {project.created}
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
            this.state.projectList
          ).bind(this)}
        >
          Close List
        </Button>
      </Sidebar>
    );
    return (
      <div className="project-list-container" height="10rem">
        <Sidebar.Pushable as={Segment}>
          <HorizontalSidebar visible={visible} />
          <Sidebar.Pusher dimmed={visible}>
            <Segment basic textAlign="center">
              <Button
                style={this.state.button}
                onClick={this.handleAnimationChange(
                  "overlay",
                  this.state.projectList
                ).bind(this)}
              >
                Active Projects
              </Button>
              <Header as="h3" textAlign="center"></Header>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
