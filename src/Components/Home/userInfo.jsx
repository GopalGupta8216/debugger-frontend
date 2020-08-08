import React, { Component } from "react";
import { Card, Container, Icon, Image } from "semantic-ui-react";
import WorkingInfo from "./userWorkingInput";
import { Loader, Segment } from "semantic-ui-react";

class UserInfo extends Component {
  state = {
    user: this.props.user,
    textColor: { color: "#4183c4" },
    textColor2: { color: "#E03997" },
    loading: true,
  };
  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Segment>
          <Loader active />

          <Image src="/images/wireframe/short-paragraph.png" />
        </Segment>
      );
    } else {
      // console.log(this.props.user);
      const isAdmin = this.props.user.is_admin;
      // console.log(this.props.user.enrollment);
      // console.log(isAdmin);

      return (
        <Container textAlign="center">
          <Card>
            <Image src={this.props.user.image} wrapped ui={false} />
            <Card.Content>
              <Card.Header style={this.state.textColor}>
                {this.props.user.username}
              </Card.Header>
              <Card.Meta style={this.state.textColor}>
                <b>{isAdmin ? "Admin" : "Normal User"}</b>
              </Card.Meta>

              <Card.Meta>
                <span className="enrollment" style={this.state.textColor}>
                  {this.props.user.enrollment}
                </span>
              </Card.Meta>
              <Card.Description style={this.state.textColor}>
                {this.props.user.username} is a Maintainer working in IMG.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a style={this.state.textColor}>
                <Icon name="user" style={this.state.textColor} />
                {this.props.user.email}
              </a>
            </Card.Content>
          </Card>
          <WorkingInfo />
        </Container>
      );
    }
  }
}

export default UserInfo;

// const UserInfo = () => (
// console.log(this.props);
//   <Card>
//     <Image src="/images/avatar/large/matthew.png" wrapped ui={false} />
//     <Card.Content>
//       <Card.Header>Matthew</Card.Header>
//       <Card.Meta>
//         <span className="date">Joined in 2015</span>
//       </Card.Meta>
//       <Card.Description>
//         Matthew is a musician living in Nashville.
//       </Card.Description>
//     </Card.Content>
//     <Card.Content extra>
//       <a>
//         <Icon name="user" />
//         22 Friends
//       </a>
//     </Card.Content>
//   </Card>
// );

// export default UserInfo;
