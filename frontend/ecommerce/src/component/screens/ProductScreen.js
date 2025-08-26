import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Container,
  Form,
} from "react-bootstrap";
import Rating from "../Rating";
import { listProductDetails } from "../../actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";

function ProductScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <Container className="py-4">
      <Link to="/" className="btn btn-dark mb-4">
        ← Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="shadow-lg p-4 rounded bg-white">
          {/* Left Side: Product Image */}
          <Col md={6} className="text-center">
            <Image
              src={product.image}
              alt={product.name}
              fluid
              rounded
              className="shadow-sm"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </Col>

          {/* Middle: Product Info */}
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="fw-bold">{product.productname}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Brand:</strong> {product.productbrand}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Description:</strong> <br />
                <span className="text-muted">{product.productinfo}</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Right: Purchase Card */}
          <Col md={3}>
            <Card className="shadow border-0">
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="fw-bold">Price:</span>
                  <span className="text-success fw-bold">
                    ₹{product.price}
                  </span>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="fw-bold">Status:</span>
                  <span
                    className={
                      product.stockcount > 0 ? "text-success" : "text-danger"
                    }
                  >
                    {product.stockcount > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </ListGroup.Item>

                {product.stockcount > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col className="fw-bold">Qty</Col>
                      <Col xs="auto">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          className="shadow-sm"
                        >
                          {[...Array(product.stockcount).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn-block w-100 btn-success fw-bold"
                    disabled={product.stockcount === 0}
                    type="button"
                    onClick={addToCartHandler}
                  >
                    🛒 Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ProductScreen;
