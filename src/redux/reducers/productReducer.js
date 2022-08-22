const initialState = {
   products: [],
};
const initialCategories = {
   categories: [],
};
const initialCart = {
   cartItems: [],
};

/* Create Reducer for All Products */
export const Get_All_Products_Reducer = (state = initialState, action) => {
   switch (action.type) {
      case "GET_ALL_PRODUCTS":
         return {
            ...state,
            products: action.payload,
         };
      default:
         return state;
   }
};

/* Create Reducer for Product Details */
export const Get_Product_Details_Reducer = (state = {}, action) => {
   switch (action.type) {
      case "GET_PRODUCT_DETAILS":
         return {
            ...state,
            ...action.payload,
         };
      case "REMOVE_PRODUCT_DETAILs":
         return {};
      default:
         return state;
   }
};

/* Create Reducer for All Product Categories */
export const Get_All_Products_Categories_Reducer = (state = initialCategories, action) => {
   switch (action.type) {
      case "GET_ALL_PRODUCTS_CATEGORIES":
         return {
            ...state,
            categories: [...action.payload],
         };
      default:
         return state;
   }
};

/* Create Reducer for Add Product into Cart */
export const Cart_Reducuer = (state = initialCart, action) => {
   const isProductExits = state.cartItems.find((item) => item.product.id === action.payload.product.id);
   switch (action.type) {
      case "ADD_PRODUCT_INTO_CART":
         if (!isProductExits) {
            return {
               ...state,
               cartItems: [...state.cartItems, action.payload],
            };
         }
         return state;
      case "INCREASE_PRODUCT_QUANTITY":
      //eslint-disable-next-line
      case "DECREASE_PRODUCT_QUANTITY":
      //eslint-disable-next-line
      case "REMOVE_PRODUCT_FROM_CART":
         return {
            ...state,
            cartItems: [...state.cartItems.filter((item) => item.product.id !== action.payload)],
         };
      default:
         return state;
   }
};

export default {
   Get_All_Products_Reducer,
   Get_Product_Details_Reducer,
   Get_All_Products_Categories_Reducer,
   Cart_Reducuer,
};
