import React, { Component } from "react";
import axios from "axios";
import { Container, Button, Loader, Form, Label } from "semantic-ui-react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ReactHtmlParser from "react-html-parser";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
class EditProject extends Component {
  state = {
    textColor: { color: "#4183c4" },
    projectInfo: {},
    container: { padding: "7rem", height: "70vh" },
    users: [],
    loading: false,
  };
  async componentDidMount() {
    const projectInfo = this.props.location.state.projectInfo;
    let unparsedWiki = projectInfo.wiki;
    this.setState({ projectInfo });
    // CKEDITOR.instances.editor1.insertText(wiki);

    axios
      .get("http://127.0.0.1:8000/debugger/users/")
      .then((res) => {
        const userList = res.data;
        console.log(userList);
        var newUser = userList.map(function (user) {
          return {
            key: user.enrollment,
            text: user.username,
            value: user.username,
          };
        });

        console.log(newUser);

        this.setState({ users: newUser });
        this.setState({ loading: true });

        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  }
  handleChange(event, info) {
    const projectInfo = { ...this.state.projectInfo };
    projectInfo[info.name] = info.value;
    console.log(info);
    this.setState({ projectInfo });
  }
  handleDelete = (event) => {
    console.log("deleted");
    axios
      .delete(
        `http://127.0.0.1:8000/debugger/project/` +
          this.state.projectInfo.id +
          "/",
        this.state.projectInfo
      )
      .then((res) => {
        console.log(res);
        toast.success("Successfully Deleted");
        this.props.history.replace(`/home/`);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status == 403) {
          toast.error("Not Allowed");
        } else {
          toast.error("Check Submission");
        }
      });
  };
  handleEditor = (event, info) => {
    const projectInfo = { ...this.state.projectInfo };
    projectInfo.wiki = info.getData();
    this.setState({ projectInfo });
  };

  handleUpdate = (event) => {
    event.preventDefault();
    console.log("Submitted");

    axios
      .put(
        `http://127.0.0.1:8000/debugger/project/` +
          this.state.projectInfo.id +
          "/",
        this.state.projectInfo
      )
      .then((res) => {
        console.log(res);
        alert("Successfully Updated");
        this.props.history.replace(
          `/project/${this.props.location.state.projectInfo.id}`
        );
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status == 403) {
          toast.error("Not Allowed");
        } else {
          toast.error("Check Submission");
        }
      });
  };
  render() {
    console.log(this.state.loading);
    if (!this.state.loading) {
      return <Loader active size="massive" />;
    } else {
      const { projectInfo } = this.state;

      return (
        <React.Fragment>
          <Container
            textAlign="center"
            style={this.state.container}
            className="projectContainer"
          >
            <Form>
              <h1 className="Heading">{projectInfo.project_name}</h1>
              <Form.Select
                fluid
                multiple
                search
                style={{ color: "#4183c4" }}
                value={projectInfo.team_member}
                label="Team Member"
                options={this.state.users}
                name="team_member"
                placeholder="Team Members"
                onChange={this.handleChange.bind(this)}
              />
              <Form.Field>
                <Label style={{ color: "#4183c4" }}>Description</Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={projectInfo.wiki}
                  value="hello"
                  name="wiki"
                  onChange={this.handleEditor.bind(this)}
                  config={{
                    placeholder: "Some description of your project....",
                    toolbar: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "blockQuote",
                      "link",
                      "numberedList",
                      "bulletedList",
                      "insertTable",
                      "tableColumn",
                      "tableRow",
                      "mergeTableCells",
                      "|",
                      "undo",
                      "redo",
                    ],
                  }}
                />
              </Form.Field>

              <Form.Button
                onClick={this.handleUpdate.bind(this)}
                style={{ color: "#4183c4" }}
              >
                Update
              </Form.Button>
              <Link
                to={{
                  pathname: `/project/${projectInfo.id}`,
                  state: { projectInfo },
                }}
              >
                <Button style={{ color: "#4183c4" }}>Exit Editing </Button>
              </Link>
              <Button
                style={{ color: "red" }}
                onClick={this.handleDelete.bind(this)}
              >
                delete Project
              </Button>
            </Form>
          </Container>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </React.Fragment>
      );
    }
  }
}

export default EditProject;
