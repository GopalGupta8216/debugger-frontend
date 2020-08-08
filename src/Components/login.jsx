import React from "react";
import { Container, Divider, Button } from "semantic-ui-react";

const Login = () => (
  localStorage.removeItem("access_token"),
  localStorage.removeItem("refresh_token"),
  (
    <Container textAlign="center">
      <div>
        <h1>Welcome To Debugger</h1>
        <Divider />
        <a href="https://internet.channeli.in/oauth/authorise?client_id=zrkRVm7TY9xaNOQmdRlVzgTI4DS4R2tNqpgfNxB2&state=200&redirect_uri=http://localhost:3000/register">
          <Button className="login">Login with Channeli</Button>
        </a>
      </div>
    </Container>
  )
);

export default Login;
