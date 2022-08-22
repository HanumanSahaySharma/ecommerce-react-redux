import { combineReducers } from "redux";

import {
   Get_All_Products_Reducer,
   Get_Product_Details_Reducer,
   Get_All_Products_Categories_Reducer,
   Cart_Reducuer,
} from "./productReducer";

const rootReducer = combineReducers({
   allProducts: Get_All_Products_Reducer,
   singleProductDetails: Get_Product_Details_Reducer,
   allCategories: Get_All_Products_Categories_Reducer,
   cart: Cart_Reducuer,
});

export default rootReducer;
