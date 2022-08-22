import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

/* Import Action from Redux Action */
import { add_Product_Into_Cart } from "../redux/actions/productActions";

/* Import Bootstrap Components */
import { Badge, Button, Card } from "react-bootstrap";

export default function Product(props) {
   const dispatch = useDispatch();
   /* Destructure the product item */
   const { id, image, title, price, category } = props.product;
   /* Get the  cart item array */
   //const cartItems = useSelector((state) => state.cart.cartItems);

   //const [productAdded, setProductAdded] = useState(false);

   /* Set category badge background */
   const [categoryBg, setCategoryBg] = useState("primary");
   useEffect(() => {
      if (category === "men's clothing") {
         setCategoryBg("primary");
      } else if (category === "jewelery") {
         setCategoryBg("info");
      } else if (category === "electronics") {
         setCategoryBg("danger");
      } else if (category === "women's clothing") {
         setCategoryBg("warning");
      }
   }, []);

   const addToCart = (product) => {
      dispatch(add_Product_Into_Cart(product));
   };

   return (
      <Card className="h-100 product-card">
         <Card.Body className="d-flex align-items-center justify-content-center flex-grow-1 h-100">
            <Link to={`/products/${id}`}>
               <Card.Img variant="top" src={image} alt={title} style={{ maxHeight: "200px", maxWidth: "200px" }} />
            </Link>
         </Card.Body>
         <Card.Body className="d-flex flex-column">
            <div className="mb-3">
               <Card.Title as="h6">
                  <Link to={`/products/${id}`}>{title}</Link>
               </Card.Title>
               <Card.Text>
                  <Badge bg={categoryBg}>{category}</Badge>
               </Card.Text>
            </div>
            <div className="d-flex align-items-center justify-content-between">
               <Card.Text as="h6" className="m-0">
                  Price: ${price}
               </Card.Text>
               <Button variant="danger" onClick={() => addToCart(props.product)}>
                  Add to Cart
               </Button>
            </div>
         </Card.Body>
      </Card>
   );
}
