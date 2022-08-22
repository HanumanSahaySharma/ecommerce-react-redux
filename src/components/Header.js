import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import {
   increase_Product_Quantity,
   decrease_Product_Quantity,
   remove_Product_From_Cart,
} from "../redux/actions/productActions";

/* Import Bootstrap Components */
import { Navbar, Container, Nav, Dropdown, ButtonGroup, Button, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
/* Import Font Awesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart, faMinus, faPlus } from "@fortawesome/fontawesome-free-solid";
import { faTrashAlt } from "@fortawesome/fontawesome-free-regular";

export default function Header() {
   const cartItems = useSelector((state) => state.cart.cartItems);
   const [grandTotal, setGrandTotal] = useState(0);
   const dispatch = useDispatch();

   const removeCartItem = (productId) => {
      dispatch(remove_Product_From_Cart(productId));
   };
   const increaseQuantity = (productId) => {
      const findItem = cartItems.find((item) => item.product.id === productId);
      if (findItem) {
         findItem.quantity += 1;
      }
      dispatch(increase_Product_Quantity(findItem));
   };

   const decreaseQuantity = (productId) => {
      const findItem = cartItems.find((item) => item.product.id === productId);
      if (findItem) {
         findItem.quantity -= 1;
      }
      dispatch(decrease_Product_Quantity(findItem));
   };

   useEffect(() => {
      /* Get Grand Total */
      let grandTotal = cartItems.reduce((total, item) => {
         return (total += item.product.price * item.quantity);
      }, 0);
      setGrandTotal(grandTotal);
   }, [cartItems]);

   return (
      <Navbar bg="dark" expand="lg" sticky="top" variant="dark">
         <Container>
            <Navbar.Brand href="#home">React Redux</Navbar.Brand>
            <Navbar.Toggle aria-controls="ReactReduxApp" />
            <Navbar.Collapse id="ReactReduxApp">
               <Nav as="ul" className="me-auto">
                  <Nav.Item as="li">
                     <Nav.Link as={NavLink} to="/">
                        Home
                     </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                     <Nav.Link as={NavLink} to="/about">
                        About
                     </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                     <Nav.Link as={NavLink} to="/products">
                        Products
                     </Nav.Link>
                  </Nav.Item>
               </Nav>
               <Nav as="ul" className="ms-auto">
                  <Nav.Item as="li" className="me-2">
                     <Button variant="light">
                        <FontAwesomeIcon icon={faUser} />
                     </Button>
                  </Nav.Item>
                  <Nav.Item as="li">
                     <Dropdown align="end" className="cart-dropdown" autoClose="outside">
                        <Dropdown.Toggle disabled={cartItems.length <= 0} variant="light" id="AddToCart-Button">
                           <FontAwesomeIcon icon={faShoppingCart} />
                        </Dropdown.Toggle>
                        {cartItems.length > 0 && (
                           <>
                              <Badge bg="danger" className="item-couter">
                                 {cartItems.length}
                              </Badge>
                              <Dropdown.Menu className="p-0">
                                 {cartItems.map((item, index) => {
                                    return (
                                       <Dropdown.Item as="div" key={index} className="d-flex p-3 border-bottom">
                                          <div className="cart-dropdown-image rounded-circle border">
                                             <img
                                                src={item.product.image}
                                                alt={item.product.title}
                                                width="80px"
                                                height="80px"
                                             />
                                          </div>
                                          <div className="flex-grow-1 ps-3">
                                             <h6 className="mb-2">{item.product.title}</h6>
                                             <p className="mb-2 text-muted">${item.product.price}</p>
                                             <div className="d-flex align-items-center justify-content-between">
                                                <ButtonGroup>
                                                   <Button
                                                      variant="secondary"
                                                      size="sm"
                                                      onClick={() => decreaseQuantity(item.product.id)}
                                                   >
                                                      <FontAwesomeIcon icon={faMinus} />
                                                   </Button>
                                                   <div className="form-control rounded-0 lh-1">{item.quantity}</div>
                                                   <Button
                                                      variant="secondary"
                                                      size="sm"
                                                      onClick={() => increaseQuantity(item.product.id)}
                                                   >
                                                      <FontAwesomeIcon icon={faPlus} />
                                                   </Button>
                                                </ButtonGroup>
                                                <OverlayTrigger
                                                   placement="top"
                                                   overlay={<Tooltip id="tooltip-button">Remove</Tooltip>}
                                                >
                                                   <Button
                                                      variant="danger"
                                                      size="sm"
                                                      onClick={() => removeCartItem(item.product.id)}
                                                   >
                                                      <FontAwesomeIcon icon={faTrashAlt} />
                                                   </Button>
                                                </OverlayTrigger>
                                             </div>
                                          </div>
                                       </Dropdown.Item>
                                    );
                                 })}
                                 <Dropdown.Item as="div" className="pt-3 pb-3">
                                    <h5 className="mb-0">Grand Total: ${grandTotal.toFixed(2)}</h5>
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </>
                        )}
                     </Dropdown>
                  </Nav.Item>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
}
