import React, { Component } from "react";
import { Dropdown, Divider, Menu } from "semantic-ui-react";
class WorkingInfo extends Component {
  state = { textColor: { color: "#4183c4" }, textColor2: { color: "#E03997" } };

  render() {
    const myProjects = [
      { key: 1, text: "Choice 1", value: 1 },
      { key: 2, text: "Choice 2", value: 2 },
      { key: 3, text: "Choice 3", value: 3 },
    ];
    const myIssue = [
      { key: 1, text: "Choice 1", value: 1 },
      { key: 2, text: "Choice 2", value: 2 },
      { key: 3, text: "Choice 3", value: 3 },
    ];

    //   const DropdownExampleSimple = () => (
    //     <Menu compact>
    //       <Dropdown text='Dropdown' options={options} simple item />
    //     </Menu>
    //   ) ;
    return (
      <Menu compact>
        <Dropdown
          text="My Projects"
          options={myProjects}
          key="1"
          simple
          item
          style={this.state.textColor}
        />
        <Divider />

        <Dropdown
          text="My Issues"
          options={myIssue}
          key="2"
          simple
          item
          style={this.state.textColor}
        />
      </Menu>
    );
  }
}

export default WorkingInfo;
