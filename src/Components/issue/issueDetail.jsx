import React, { Component } from "react";
import axios from "axios";
import { Message, Divider } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
// import AssignmentTab from "./assignment";
import CommentSection from "./comments";
import { Container, Button, Loader, Image, Label } from "semantic-ui-react";
class IssueDetail extends Component {
  state = {
    loading: true,
    projectId: "",
    issueId: "",
    issueDetail: {},
    status_color: "blue",
    assignment_done: true,
  };
  componentDidMount() {
    let projectId = this.props.match.params.projectId;
    let issueId = this.props.match.params.issueId;
    this.setState({ projectId, issueId });
    let issueinfoUrl =
      "http://127.0.0.1:8000/debugger/project/" +
      projectId +
      "/issue/" +
      issueId +
      "/";
    console.log(issueinfoUrl);

    axios
      .get(issueinfoUrl)
      .then((res) => {
        const issueDetail = res.data;
        console.log(issueDetail);
        if (issueDetail.status === "reported") {
          this.setState({ status_color: "red" });
        }
        if (issueDetail.status === "checked") {
          this.setState({ status_color: "grey" });
        }
        if (issueDetail.status === "solved") {
          this.setState({ status_color: "green" });
        }
        // const { issueDetail } = this.state;
        try {
          console.log(issueDetail.assign_info.assigned_by.name);
        } catch (TypeError) {
          this.setState({ assignment_done: false });
        }

        this.setState({ issueDetail });
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    if (this.state.loading) {
      return <Loader active size="massive" />;
    } else {
      const { issueDetail } = this.state;
      // if (issueDetail.assign_info.assigned_by) {

      // } else {
      //   this.setState({ assignment_done: false });
      // }
      //   this.setState({ assignment_done: true });

      return (
        <React.Fragment>
          <Container
            // textAlign="center"
            style={this.state.container}
            className="projectContainer"
          >
            <div>
              <h1 className="Heading">{issueDetail.heading}</h1>
              {/* <Label as="a" color={this.state.status_color}>
                <Label.Detail>{issueDetail.status}</Label.Detail>
              </Label> */}
              <br />
              <Message>
                <p>
                  Reported by{" "}
                  <Link to={`/users/${issueDetail.get_reporter.id}`}>
                    {issueDetail.get_reporter.name}
                  </Link>{" "}
                  on {issueDetail.reported_on} and last updated on{" "}
                  {issueDetail.last_updated_on}. Under tag{" "}
                  <b>{issueDetail.tag}</b>.<br></br>
                  <Label
                    as="a"
                    color={this.state.status_color}
                    textAlign="center"
                  >
                    Status
                    <Label.Detail> {issueDetail.status}</Label.Detail>
                  </Label>
                </p>
                <p>
                  <b>Discription </b>
                  <Divider />
                  {ReactHtmlParser(issueDetail.discription)}
                </p>

                <Image
                  src="https://react.semantic-ui.com/images/wireframe/image.png"
                  src={issueDetail.media_upload}
                  size="small"
                />
                <Divider />
                {this.state.assignment_done ? (
                  <center>
                    <Label as="a" color="teal" image>
                      <img src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
                      Assigned to
                      <Label.Detail>
                        {issueDetail.assign_info.assigned_to.name}
                      </Label.Detail>
                    </Label>
                    <Label as="a" color="yellow" image>
                      <img src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" />
                      Assigned by
                      <Label.Detail>
                        {issueDetail.assign_info.assigned_to.name}
                      </Label.Detail>
                    </Label>
                  </center>
                ) : (
                  <center>"Not Yet Assigned"</center>
                )}
              </Message>

              <Link to={{ pathname: "/editissue", state: { issueDetail } }}>
                <Button style={{ color: "#4183c4" }}>Edit Issue Details</Button>
              </Link>
              <Link
                to={{
                  pathname: `/project/${issueDetail.project_name}`,
                  state: { issueDetail },
                }}
              >
                <Button style={{ color: "#4183c4" }}>Exit Issue</Button>
              </Link>
            </div>
          </Container>
          <Divider />
          <CommentSection props={issueDetail} />
        </React.Fragment>
      );
    }
  }
}

export default IssueDetail;
