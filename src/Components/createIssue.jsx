import React, { Component } from "react";
import { Loader, Segment, Image } from "semantic-ui-react";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Form, Label, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
class CreateIssue extends Component {
  state = {
    data: {
      project_name: "",
      status: "reported",
      heading: "",
      discription: "",
      media_uploads: [],
      tag: "",
      assigned_to: "",
      assigned_by: null,
    },
    loading: true,
    projectInfo: {},
  };
  componentDidMount() {
    let projectId = this.props.match.params.projectId;
    let projectinfoUrl = "http://127.0.0.1:8000/debugger/project/" + projectId;

    axios
      .get(projectinfoUrl)
      .then((res) => {
        const projectInfo = res.data;
        const data = { ...this.state.data };
        const project_name = this.props.match.params.projectId;
        console.log(project_name);
        data.project_name = project_name;
        // const data.project_name = projectInfo.project_name;
        this.setState({ data });
        console.log(this.state.data);
        // console.log(projectInfo);
        var newUser = projectInfo.team_list.map(function (user) {
          return {
            key: user.id,
            text: user.username,
            value: user.username,
          };
        });
        console.log(newUser);
        this.setState({ newUser });

        this.setState({ projectInfo });
        console.log(projectInfo);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({ loading: false });
  }
  handleChange(event, info) {
    // console.log(event);
    const data = { ...this.state.data };
    console.log(info);
    console.log(info.name);
    data[info.name] = info.value;
    console.log(info);
    this.setState({ data });
    console.log(this.state.data);
  }
  handleEditor = (event, info) => {
    const data = { ...this.state.data };
    data.discription = info.getData();
    this.setState({ data });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const data = { ...this.state.data };
    const project_name = this.state.projectInfo.id;
    data.project_name = project_name;
    this.setState({ data });
    let form_data = new FormData();
    form_data.append(
      "media_upload",
      this.state.data.media_uploads[0],
      this.state.data.media_uploads[0].name
    );
    form_data.append("project_name", this.state.data.project_name);
    form_data.append("discription", this.state.data.discription);
    form_data.append("heading", this.state.data.heading);
    form_data.append("status", this.state.data.status);
    form_data.append("assigned_to", this.state.data.assigned_to);
    form_data.append("assigned_by", this.state.data.assigned_by);
    form_data.append("tag", this.state.data.tag);

    const submitURL =
      "http://127.0.0.1:8000/debugger/project/" +
      this.state.projectInfo.id +
      "/issue/";

    axios
      .post(submitURL, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          this.props.history.replace(
            `/project/${res.data.project_name}/issue/${res.data.id}`
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const tag = [
      { key: "1", value: "dev", text: "Dev" },
      { key: "2", value: "design", text: "Design" },
      { key: "3", value: "UI", text: "UI" },
      { key: "4", value: "Ux", text: "Ux" },
    ];

    if (this.state.loading) {
      return (
        <Segment>
          <Loader active />

          <Image src="/images/wireframe/short-paragraph.png" />
        </Segment>
      );
    } else {
      return (
        <Container>
          <Form>
            <Form.Input
              fluid
              label="Heading"
              name="heading"
              placeholder="Heading"
              required
              onChange={this.handleChange.bind(this)}
            />
            <Form.Field>
              <Label>Description</Label>
              <CKEditor
                editor={ClassicEditor}
                data={this.state.data.discription}
                name="discription"
                onChange={this.handleEditor.bind(this)}
                config={{
                  placeholder: "Some description of your issue....",
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

            <Form.Select
              fluid
              search
              label="Tag"
              options={tag}
              name="tag"
              placeholder="Tag"
              onChange={this.handleChange.bind(this)}
            />
            <Form.Field>
              <h3>Upload Image for this issue</h3>
              <input
                type="file"
                name="media_uploads"
                // onChange={this.handleChange.bind(this)}
                onChange={(event) => {
                  const data = { ...this.state.data };
                  data.media_uploads[this.state.data.media_uploads.length] =
                    event.target.files[0];

                  const media_uploads = { ...this.state.data.media_uploads };
                  console.log(event.target.files[0]);
                  media_uploads[this.state.data.media_uploads.length] =
                    event.target.files[0];
                  this.setState({
                    data,
                  });

                  console.log(this.state.data.media_uploads);
                  alert(
                    this.state.data.media_uploads.length +
                      " Image/s Uploaded till now "
                  );
                }}
                accept="image/png, image/jpeg"
              />
            </Form.Field>
            <Form.Select
              fluid
              search
              label="Assigned to"
              options={this.state.newUser}
              name="assigned_to"
              placeholder="Assigned to"
              onChange={this.handleChange.bind(this)}
            />
            <Button
              type="submit"
              style={{ color: "#4183c4" }}
              onClick={this.handleSubmit.bind(this)}
            >
              Submit
            </Button>
            <Link
              to={{
                pathname: `/project/${this.props.match.params.projectId}/`,
              }}
            >
              <Button type="submit" style={{ color: "#4183c4" }}>
                Back to Project
              </Button>
            </Link>
          </Form>
        </Container>
      );
    }
  }
}

export default CreateIssue;
