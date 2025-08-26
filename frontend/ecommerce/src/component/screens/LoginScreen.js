import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { login } from "../../actions/userActions";

function LoginScreen() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, pass1));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6} lg={5}>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Card className="shadow-lg rounded-4">
                <Card.Header
                  as="h3"
                  className="text-center bg-dark text-light rounded-top-4"
                >
                  <i className="fa fa-user-circle me-2"></i> Login
                </Card.Header>
                <Card.Body className="p-4">
                  <Form onSubmit={submitHandler}>
                    {/* Email */}
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="fa fa-envelope"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text
                          style={{ cursor: "pointer" }}
                          onClick={() => setShow(!show)}
                        >
                          <i className={show ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                        </InputGroup.Text>
                        <Form.Control
                          type={show ? "text" : "password"}
                          placeholder="Enter your password"
                          value={pass1}
                          onChange={(e) => setPass1(e.target.value)}
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    {/* Login Button */}
                    <div className="d-grid mt-4">
                      <Button
                        variant="success"
                        type="submit"
                        className="rounded-pill fw-bold"
                      >
                        Login
                      </Button>
                    </div>
                  </Form>

                  {/* Footer */}
                  <Row className="py-3 text-center">
                    <Col>
                      <span className="text-muted">New User? </span>
                      <Link to="/signup" className="fw-bold text-primary">
                        Sign Up
                      </Link>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginScreen;
