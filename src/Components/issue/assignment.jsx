import React, { Component } from "react";
import {
  Container,
  Button,
  Loader,
  Form,
  Grid,
  Image,
  Label,
} from "semantic-ui-react";
class AssignmentTab extends Component {
  state = {};

  render() {
    console.log(this.props.props);
    const issueDetail = this.props.props;
    return (
      <center>
        <Label as="a" color="teal" image>
          <img src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
          Assigned to
          <Label.Detail>{issueDetail.assign_info.assigned_to}</Label.Detail>
        </Label>
        <Label as="a" color="yellow" image>
          <img src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" />
          Assigned by
          <Label.Detail>Co-worker</Label.Detail>
        </Label>
      </center>
    );
  }
}

export default AssignmentTab;
