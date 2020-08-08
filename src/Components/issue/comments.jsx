import React, { Component } from "react";
import { Form, Button, Comment, Header, Message } from "semantic-ui-react";
import { toast } from "react-toastify";
import axios from "axios";
class CommentSection extends Component {
  state = {
    ws: null,
    issueId: "",
    mycomment: "",
    comment: [],
  };

  componentDidMount() {
    let issueId = this.props.props.id;
    let commentinfoUrl =
      "http://127.0.0.1:8000/debugger/issue/" + issueId + "/comment/";

    console.log(commentinfoUrl);

    axios
      .get(commentinfoUrl)
      .then((res) => {
        const comment = res.data;
        console.log(comment);
        this.setState({ comment });
      })
      .catch((err) => {
        console.log(err);
      });

    this.connect();
  }
  connect = () => {
    // console.log(this.state);
    var ws = new WebSocket(
      `ws://localhost:8000/ws/comment/${this.props.props.id}/`
    );

    ws.onopen = () => {
      console.log("connected ws main component");

      this.setState({ ws: ws });

      // clear Interval on on open of websocket connection
    };
    ws.onclose = (e) => {
      console.log(`Socket is closed.`);
    };

    // websocket onerror event listener
    ws.onerror = (err) => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      ws.close();
    };

    ws.onmessage = (evt) => {
      console.log("data received ", evt);
      let response = JSON.parse(evt.data);
      console.log(response);
      if (response.end_message) {
        if (response.is_reconnect) {
          const ws = this.connect();
          this.setState({ ws });
        }
        toast.error(response.end_message);
      } else {
        console.log(response);
        const message = response.message;
        this.setState({ comment: [...this.state.comment, message] });
      }
    };
  };

  handleComment = (e, info) => {
    e.preventDefault();
    let data = {
      message: this.state.mycomment,
      token: localStorage.getItem("access_token"),
      rtoken: localStorage.getItem("refresh_token"),
    };
    this.state.ws.send(JSON.stringify(data));
    this.setState({ mycomment: "" });
  };
  handleChange = (e, info) => {
    const mycomment = info.value;
    this.setState({ mycomment });
  };
  render() {
    return (
      <React.Fragment>
        <Message>
          <Comment.Group>
            <Header as="h3" dividing textAlign="center">
              Comments
            </Header>

            {this.state.comment.map((comment) => {
              return (
                <Comment key={comment.id}>
                  <Comment.Avatar src={comment.get_commentor.image} />
                  <Comment.Content>
                    <Comment.Author as="a">
                      {comment.commented_by}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{comment.created_on}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.message}</Comment.Text>
                  </Comment.Content>
                </Comment>
              );
            })}
            <Form reply>
              <Form.TextArea
                onChange={this.handleChange.bind(this)}
                value={this.state.mycomment}
                required
              />
              <Button
                content="Add Reply"
                labelPosition="left"
                icon="edit"
                primary
                onClick={this.handleComment.bind(this)}
              />
            </Form>
          </Comment.Group>
        </Message>
      </React.Fragment>
    );
  }
}

export default CommentSection;
