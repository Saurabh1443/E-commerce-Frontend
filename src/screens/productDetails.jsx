import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { useParams } from "react-router";
import Rating from "../components/Rating";
import { addToCart } from "../actions/cartAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./productScreen.css";
import { API_URL } from "../request";
import Previous from "../components/previous";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});

  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${API_URL}/product/${id}`);
      if (!data.error) {
        setProduct(data.doc);
      }
    }
    fetchData();
  }, [id]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
    navigate(`/cart/${id}/?qty=${qty}`);
  };
  return (
    <div>
      <Previous>Product Details</Previous>

      <Row>
        <Col
          md={6}
          className="effect"
          style={{ height: "fit-content", width: "40vw" }}
        >
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <h5>{product.description}</h5>
            </ListGroupItem>
            <ListGroupItem>Brand : {product.brand}</ListGroupItem>
            <ListGroupItem>Category : {product.category}</ListGroupItem>
            <ListGroupItem>
              <Rating value={product.rating} total={product.numReviews} />
            </ListGroupItem>
            <ListGroupItem>Price : ${product.price}</ListGroupItem>
            <ListGroupItem>Availability : {product.countInStock}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroupItem
              variant={product.countInStock <= 3 ? "danger" : "success"}
            >
              <Row>
                <Col>
                  Status : &nbsp;{" "}
                  {product.countInStock > 3
                    ? "In stock"
                    : product.countInStock <= 3
                    ? "Hurry! only few left"
                    : "Out of stock"}
                </Col>
              </Row>
            </ListGroupItem>
            {product.countInStock > 0 && (
              <ListGroupItem>
                <Row>
                  <span>
                    <h5>Select Quantity : </h5>
                    <Form.Select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => {
                        return (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </span>
                </Row>
              </ListGroupItem>
            )}
            <ListGroupItem className="d-grid gap-2">
              <Button
                className="btn-block"
                type="button"
                disabled={product.countInStock < 1 ? true : false}
                onClick={addToCartHandler}
              >
                Add To Cart
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails;
