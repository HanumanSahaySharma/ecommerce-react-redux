import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { get_Product_Details, remove_Product_Details } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Container, Row, Col, Card, Badge, Button, Spinner } from "react-bootstrap";

/* Define API URl */
const apiUrl = `${process.env.REACT_APP_API_URL}`;

export default function ProductDetails() {
   const product = useSelector((state) => state.singleProductDetails);
   const { image, title, description, price, category } = product;
   const dispatch = useDispatch();
   const productId = useParams();
   console.log(Object.keys(product).length === 0);
   /* Get Single Product From API by Id */
   const getSingleProduct = async () => {
      const response = await axios.get(`${apiUrl}/products/${productId.id}`);
      try {
         if (response.status === 200) {
            dispatch(get_Product_Details(response.data));
         }
      } catch (error) {
         console.log(error);
      }
   };
   useEffect(() => {
      if (productId && productId !== "") {
         getSingleProduct();
         dispatch(remove_Product_Details());
      }
   }, [productId.id]);
   return (
      <Container>
         <Card>
            <Card.Body>
               {Object.keys(product).length === 0 ? (
                  <Spinner animation="border" variant="primary" />
               ) : (
                  <Row>
                     <Col md="5">
                        <Card.Img variant="top" src={image} alt={title} />
                     </Col>
                     <Col md="7">
                        <Card.Title as="h4">{title}</Card.Title>
                        <Card.Text>
                           <Badge bg="primary">{category}</Badge>
                        </Card.Text>
                        <Card.Text as="h5" className="mb-4">
                           Price: ${price}
                        </Card.Text>
                        <Card.Text className="mb-4">{description}</Card.Text>
                        <Button variant="danger" size="md">
                           Add to Cart
                        </Button>
                     </Col>
                  </Row>
               )}
            </Card.Body>
         </Card>
      </Container>
   );
}
