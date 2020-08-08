import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { Button } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import IssueList from "./issueList";
class ProjetDetail extends Component {
  state = {
    projectInfo: { get_creator: { id: "1" }, team_list: [] },
    textColor: { color: "#4183c4" },
    container: { padding: "7rem", height: "70vh" },
    projectId: "",
  };
  componentDidMount() {
    let projectId = this.props.match.params.projectId;
    this.setState({ projectId });
    let projectinfoUrl = "http://127.0.0.1:8000/debugger/project/" + projectId;

    axios
      .get(projectinfoUrl)
      .then((res) => {
        const projectInfo = res.data;

        this.setState({ projectInfo });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { projectInfo } = this.state;

    const wiki = projectInfo.wiki;

    return (
      <React.Fragment>
        <Container
          textAlign="center"
          style={this.state.container}
          className="projectContainer"
        >
          <div>
            <h1 className="Heading">{projectInfo.project_name}</h1>
            <br />
            <h1 className="projectDiscription">
              Created by{" "}
              <Link to={`/users/${projectInfo.get_creator.id}`}>
                {projectInfo.creator}
              </Link>
            </h1>
            <h1 key="teammember">
              Project team includes{" "}
              {projectInfo.team_list.map((team) => {
                return (
                  <Link key={team.id} to={`/users/${team.id}`}>
                    {team.username},{" "}
                  </Link>
                );
              })}
            </h1>
            <h1>Project Discription:</h1> <p>{ReactHtmlParser(wiki)}</p>
            <Link to={`/project/${this.state.projectId}/reportissue`}>
              <Button style={{ color: "#4183c4" }}>Report Issue</Button>
            </Link>
            <Link to={{ pathname: "/editproject", state: { projectInfo } }}>
              <Button style={{ color: "#4183c4" }}>Edit Project Details</Button>
            </Link>
          </div>
        </Container>
        <IssueList projectId={this.props.match.params.projectId} />
      </React.Fragment>
    );
  }
}

export default ProjetDetail;
