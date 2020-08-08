import React, { Component } from "react";
import axios from "axios";
import { Container, Button, Loader, Form } from "semantic-ui-react";
// import CKEditor from "@ckeditor/ckeditor5-react";
// import ReactHtmlParser from "react-html-parser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
class EditIssue extends Component {
  state = {
    textColor: { color: "#4183c4" },
    issueDetail: {},
    container: { padding: "7rem", height: "70vh" },
    users: [],
    loading: false,
  };
  async componentDidMount() {
    const issueDetail = this.props.location.state.issueDetail;
    // let unparsedWiki = issueDetail.discription;
    console.log(issueDetail);
    // const wiki = ReactHtmlParser(unparsedWiki);
    this.setState({ issueDetail });
    this.setState({ loading: true });
  }
  handleChange(event, info) {
    const issueDetail = { ...this.state.issueDetail };
    issueDetail[info.name] = info.value;
    console.log(info);
    this.setState({ issueDetail });
  }

  handleUpdate = (event) => {
    event.preventDefault();
    console.log("Submitted");
    axios
      .put(
        `http://127.0.0.1:8000/debugger/project/` +
          this.state.issueDetail.project_name +
          "/issue/" +
          this.state.issueDetail.id +
          "/",
        this.state.issueDetail
      )
      .then((res) => {
        console.log(res);
        toast.success("Successfully Updated");
        this.props.history.replace(
          `/project/${this.props.location.state.issueDetail.project_name}/issue/${this.state.issueDetail.id}`
        );
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 403) {
          toast.error("Not Allowed");
        }
        //  else {
        //   toast.error("Check Submission");
        // }
      });
  };
  handleDelete = (event) => {
    console.log("deleted");
    axios
      .delete(
        `http://127.0.0.1:8000/debugger/project/` +
          this.state.issueDetail.project_name +
          "/issue/" +
          this.state.issueDetail.id +
          "/",
        this.state.issueDetail
      )
      .then((res) => {
        console.log(res);
        toast.success("Successfully Deleted");
        this.props.history.replace(`/home/`);
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 403) {
          toast.error("Not Allowed");
        }
        //  else {
        //   toast.error("Check Submission");
        // }
      });
  };

  render() {
    if (!this.state.loading) {
      return <Loader active size="massive" />;
    } else {
      const { issueDetail } = this.state;
      const status = [
        { key: "1", value: "reported", text: "reported" },
        { key: "2", value: "checked", text: "checked" },
        { key: "3", value: "solved", text: "solved" },
      ];
      const team_member = issueDetail.team_member.map((team) => {
        return { key: team.id, value: team.name, text: team.name };
      });

      console.log(this.state.issueDetail.status);
      return (
        <React.Fragment>
          <Container
            textAlign="center"
            style={this.state.container}
            className="projectContainer"
          >
            <Form>
              <h1 className="Heading">{issueDetail.heading}</h1>
              <Form.Select
                fluid
                search
                style={{ color: "#4183c4" }}
                value={issueDetail.status}
                label="Status"
                options={status}
                name="status"
                placeholder="Status"
                onChange={this.handleChange.bind(this)}
              />
              <Form.Select
                fluid
                search
                style={{ color: "#4183c4" }}
                value={issueDetail.assigned_to}
                label="Assign Issue to"
                options={team_member}
                name="assigned_to"
                placeholder="Assigned_to"
                onChange={this.handleChange.bind(this)}
              />

              <Form.Button
                onClick={this.handleUpdate.bind(this)}
                style={{ color: "#4183c4" }}
              >
                Update
              </Form.Button>
              <Link
                to={{
                  pathname: `/project/${issueDetail.get_project.id}/issue/${issueDetail.id}`,
                  state: { issueDetail },
                }}
              >
                <Button style={{ color: "#4183c4" }}>Exit Editing </Button>
              </Link>
              <Button
                style={{ color: "red" }}
                onClick={this.handleDelete.bind(this)}
              >
                delete Issue
              </Button>
            </Form>

            {/* Same as */}
          </Container>
        </React.Fragment>
      );
    }
  }
}

export default EditIssue;
