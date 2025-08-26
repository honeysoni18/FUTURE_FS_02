import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productsActions";
import Loader from "../Loader";
import Message from "../Message";
import Product from "../Product";

function Homescreen() {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsList);
  const { error, loading, products } = productsList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
        paddingTop: "20px",
      }}
    >
      <Container>
        {/* Hero Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            padding: "50px 20px",
            borderRadius: "12px",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <h1 className="fw-bold">Welcome to Our Store 🛍️</h1>
          <p className="lead mb-0">
            Discover amazing products at the best prices
          </p>
        </div>

        {/* Products */}
        <h2 className="mb-4 text-center fw-bold">Featured Products</h2>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : products.length === 0 ? (
          <Message variant="info">No products available.</Message>
        ) : (
          <Row className="g-4">
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <div
                  className="p-3 bg-white shadow-sm rounded-3 h-100"
                  style={{
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow =
                      "0px 8px 20px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0px 4px 12px rgba(0,0,0,0.1)";
                  }}
                >
                  <Product product={product} />
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Homescreen;
