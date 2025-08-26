import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Button,
  Form,
  Container,
} from "react-bootstrap";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { addToCart, removeFromCart } from "../../actions/cartActions";

function CartScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const productId = id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center fw-bold">🛒 Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <Message variant="info">
          <div className="text-center">
            <i className="fas fa-shopping-cart fa-3x mb-3 text-secondary"></i>
            <p>Your cart is empty</p>
            <Link to="/" className="btn btn-primary">
              Go Back & Shop
            </Link>
          </div>
        </Message>
      ) : (
        <Row>
          {/* Cart Items */}
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product} className="mb-3 p-3 shadow-sm rounded">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>

                    <Col md={3}>
                      <Link
                        to={`/product/${item.product}`}
                        style={{ textDecoration: "none" }}
                      >
                        <h5 className="fw-bold">{item.name}</h5>
                      </Link>
                      <small className="text-muted">{item.brand}</small>
                    </Col>

                    <Col md={2} className="fw-bold text-success">
                      ₹{item.price}
                    </Col>

                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, Number(e.target.value)))
                        }
                      >
                        {[...Array(item.stockcount).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={2}>
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          {/* Summary Card */}
          <Col md={4}>
            <Card className="p-3 shadow rounded sticky-top">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5 className="text-center fw-bold">
                    Subtotal ({totalItems} items):{" "}
                    <span className="text-success">₹{totalPrice}</span>
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      className="btn-success fw-bold"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default CartScreen;
