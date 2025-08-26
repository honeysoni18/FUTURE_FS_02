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
import { validEmail, validPassword } from "./Regex";
import { signup } from "../../actions/userActions";

function SignupScreen() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userSignup = useSelector((state) => state.userSignup);
  const { error, loading, userInfo } = userSignup;

  useEffect(() => {
    if (userInfo) {
      setMessage(userInfo.details);
      setFname("");
      setLname("");
      setEmail("");
      setPass1("");
      setPass2("");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (pass1 !== pass2) {
      setMessage("Passwords do not match ❌");
      return;
    } else if (!validPassword.test(pass1)) {
      setMessage("Password criteria does not match ❌");
      return;
    } else {
      dispatch(signup(fname, lname, email, pass1));
      setMessage("Signup Successful ✅");
      navigate("/signup");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #00c6ff, #0072ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={7} lg={6}>
            <Card className="shadow-lg rounded-4">
              <Card.Header
                as="h3"
                className="text-center bg-dark text-light rounded-top-4"
              >
                <i className="fa fa-user-plus me-2"></i> Sign Up
              </Card.Header>
              <Card.Body className="p-4">
                {message && <Message variant="danger">{message}</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>
                  {/* First Name */}
                  <Form.Group className="mb-3" controlId="fname">
                    <Form.Label>First Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fa fa-user"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter your first name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* Last Name */}
                  <Form.Group className="mb-3" controlId="lname">
                    <Form.Label>Last Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fa fa-user"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter your last name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </Form.Group>

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
                  <Form.Group className="mb-3" controlId="pass1">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPass(!showPass)}
                      >
                        <i
                          className={showPass ? "fa fa-eye" : "fa fa-eye-slash"}
                        ></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showPass ? "text" : "password"}
                        placeholder="Enter password"
                        value={pass1}
                        onChange={(e) => setPass1(e.target.value)}
                        required
                      />
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Must include [0-9][a-z][A-Z][!@#$] and min 5 characters
                    </Form.Text>
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="mb-3" controlId="pass2">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPass(!showPass)}
                      >
                        <i
                          className={showPass ? "fa fa-eye" : "fa fa-eye-slash"}
                        ></i>
                      </InputGroup.Text>
                      <Form.Control
                        type={showPass ? "text" : "password"}
                        placeholder="Confirm password"
                        value={pass2}
                        onChange={(e) => setPass2(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* Signup Button */}
                  <div className="d-grid mt-4">
                    <Button
                      variant="success"
                      type="submit"
                      className="rounded-pill fw-bold"
                    >
                      Sign Up
                    </Button>
                  </div>
                </Form>

                {/* Footer */}
                <Row className="py-3 text-center">
                  <Col>
                    <span className="text-muted">Already a user? </span>
                    <Link to="/login" className="fw-bold text-primary">
                      Login
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignupScreen;
