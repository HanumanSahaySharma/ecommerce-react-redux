import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

/* Import Action from Redux Action */
import { get_All_Products, get_All_Products_Categories } from "../redux/actions/productActions";

/* Import Bootstrap Component */
import { Card, Col, Container, Row, Spinner, Button } from "react-bootstrap";

/* Import Product Component */
import Product from "../components/Product";

/* Define API URl */
const apiUrl = `${process.env.REACT_APP_API_URL}`;

export default function Products() {
   const dispatch = useDispatch();

   const [loading, setLoading] = useState(false);
   const [badgeActive, setBadgeActive] = useState(false);

   let products = useSelector((state) => state.allProducts.products);
   let categories = useSelector((state) => state.allCategories.categories);

   /* Get All Product from API */
   const getAllProduct = async () => {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/products`);
      try {
         if (response.status === 200) {
            products = response.data;
            dispatch(get_All_Products(response.data));
            setLoading(false);
         }
      } catch (error) {
         console.log(error);
      }
   };

   /* Get All Products Categories from API */
   const getAllProductCategoris = async () => {
      const response = await axios.get(`${apiUrl}/products/categories`);
      try {
         if (response.status === 200) {
            categories = response.data;
            dispatch(get_All_Products_Categories(response.data));
         }
      } catch (error) {
         console.log(error);
      }
   };

   /* Filter Products by Category name */
   const filterProductByCategory = async (categoryName) => {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/products/category/${categoryName}`);
      try {
         if (response.status === 200) {
            products = response.data;
            dispatch(get_All_Products(response.data));
            setLoading(false);
            setBadgeActive(categoryName);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProduct();
      getAllProductCategoris();
   }, []);

   return (
      <Container>
         <Card className="mb-3">
            <Card.Body>
               <Card.Title>Filter by categories</Card.Title>
               {categories.map((category) => {
                  return (
                     <Button
                        size="sm"
                        variant={badgeActive === category ? "dark" : "outline-dark"}
                        key={category}
                        className="me-2"
                        onClick={() => filterProductByCategory(category)}
                     >
                        {category}
                     </Button>
                  );
               })}
            </Card.Body>
         </Card>

         {loading ? (
            <Card>
               <Card.Body align="center">
                  <Spinner animation="border" variant="primary" />
               </Card.Body>
            </Card>
         ) : (
            <Row>
               {products.map((product, index) => {
                  return (
                     <Col md="4" key={index} className="mb-4">
                        <Product product={product}></Product>
                     </Col>
                  );
               })}
            </Row>
         )}
      </Container>
   );
}
