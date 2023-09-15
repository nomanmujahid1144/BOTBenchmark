import ProgressBarReducer from "./ProgressBarReducer";
import ProfileReducer from "./ProfileReducer";
import userReducer from "./UserReducers";
import categoryReducer from "./CategoryReducer";
import subcategoryReducer from "./SubCategoryReducer";
import softwareReducer from "./SoftwareReducer";
import customerMessagesReducer from "./CustomerMessagesReducer";
import claimedSoftwareReducer from "./ClaimedSoftwaresReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
const rootReducer = combineReducers({
  ProgressBarReducer,
  ProfileReducer,
  userReducer,
  categoryReducer,
  subcategoryReducer,
  softwareReducer,
  customerMessagesReducer,
  claimedSoftwareReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default store;
