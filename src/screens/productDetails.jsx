import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
  Form,
  Modal
} from "react-bootstrap";
import { useParams } from "react-router";
import Rating from "../components/Rating";
import { addToCart } from "../actions/cartAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./productScreen.css";
import { API_URL, getToken } from "../request";
import Previous from "../components/previous";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  
  const {userLogin:{userInfo}} = useSelector(state=>state)

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${API_URL}/product/${id}`);
      if (!data.error) {
        setProduct(data.doc);
      }
    }
    fetchData();
  }, [id]);
  const handleClose = () => {
  setShowModal(false)
}

  const addToCartHandler = async () => {
    const {data:{error,msg}} = await axios.put(`${API_URL}/addToCart`, { User: userInfo._id, productId: id, Qty: qty }, getToken());
    console.log(error)
    if (!error) {
      setShowModal(true);
    } else {
      alert(msg)
    }
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
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title><i style={{color:'#4bbf73'}} class="fa-solid fa-circle-check"></i> Hooray! 1 item successfully added to the cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Product : {product.name}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary"style={{Color:'#FF9900',padding:'5px',borderRadius:"5px"}} onClick={handleClose}>
            Close
          </Button>
          <Button onClick={() => { handleClose(); navigate(`/cart/${id}/?qty=${qty}`)}} variant="success" style={{padding:'5px',borderRadius:"5px"}}>GO TO CART</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDetails;
