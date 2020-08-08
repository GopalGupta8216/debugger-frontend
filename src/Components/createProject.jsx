import React, { Component } from "react";
import axios from "axios";
// import validate from "react-joi-validation";
import Joi from "joi-browser";
// import { Multiselect } from "multiselect-react-dropdown"; Prob is module install ni maan ra
import { Form, Label } from "semantic-ui-react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// ReactJoiValidations.setJoi(Joi);

class CreateProject extends Component {
  state = { users: [], data: { project_name: "", wiki: "", team_member: [] } };

  // schema = Joi.object().keys({
  //   username: Joi.string().required(),
  //   password: Joi.string().min(8).required(),
  // });
  async componentDidMount() {
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
        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleChange(event, info) {
    const data = { ...this.state.data };
    data[info.name] = info.value;
    console.log(info);
    this.setState({ data });
  }
  handleEditor = (event, info) => {
    const data = { ...this.state.data };
    data.wiki = info.getData();
    this.setState({ data });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log(event.target[1]);
    console.log(event.target[2]);

    //console.log(this.inputNode.value);
    axios
      .post(`http://127.0.0.1:8000/debugger/project/`, this.state.data)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          this.props.history.replace(`/project/${res.data.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Project name"
            name="project_name"
            placeholder="Project name"
            required
            onChange={this.handleChange.bind(this)}
          />
          <Form.Select
            fluid
            multiple
            search
            label="Select Team"
            options={this.state.users}
            name="team_member"
            placeholder="Team Members"
            onChange={this.handleChange.bind(this)}
          />
        </Form.Group>
        <Form.Field>
          <Label>Description</Label>
          <CKEditor
            editor={ClassicEditor}
            data={this.state.data.wiki}
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
            // onInit={(editor) => {
            //   // You can store the "editor" and use when it is needed.
            //   console.log("Editor is ready to use!", editor);
            // }}
            // onChange={(event, editor) => {
            //   const data = editor.getData();
            //   console.log({ event, editor, data });
            // }}
            // onBlur={(event, editor) => {
            //   console.log("Blur.", editor);
            // }}
            // onFocus={(event, editor) => {
            //   console.log("Focus.", editor);
            // }}
          />
        </Form.Field>

        <Form.Button onClick={this.handleSubmit.bind(this)}>Submit</Form.Button>
      </Form>
    );
  }
}

export default CreateProject;
