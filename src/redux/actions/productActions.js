/* Get All Products */
export const get_All_Products = (products) => {
   return {
      type: "GET_ALL_PRODUCTS",
      payload: products,
   };
};
/* Get Product Details (Single) */
export const get_Product_Details = (product) => {
   return {
      type: "GET_PRODUCT_DETAILS",
      payload: product,
   };
};
/* Remove Existing Product when New One Come */
export const remove_Product_Details = () => {
   return {
      type: "REMOVE_PRODUCT_DETAILs",
   };
};

/* Get All Products Categories */
export const get_All_Products_Categories = (category) => {
   return {
      type: "GET_ALL_PRODUCTS_CATEGORIES",
      payload: category,
   };
};

/* Add Product into Cart */
export const add_Product_Into_Cart = (product) => {
   return {
      type: "ADD_PRODUCT_INTO_CART",
      payload: {
         product,
         quantity: 1,
      },
   };
};

/* Increase Product Quantity */
export const increase_Product_Quantity = (product) => {
   return {
      type: "INCREASE_PRODUCT_QUANTITY",
      payload: product,
   };
};

/* Decrease Product Quantity */
export const decrease_Product_Quantity = (product) => {
   return {
      type: "DECREASE_PRODUCT_QUANTITY",
      payload: product,
   };
};

/* Remove Product from Cart */
export const remove_Product_From_Cart = (productId) => {
   return {
      type: "REMOVE_PRODUCT_FROM_CART",
      payload: productId,
   };
};
