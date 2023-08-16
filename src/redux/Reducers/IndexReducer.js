import ProgressBarReducer from './ProgressBarReducer';
import ProfileReducer from './ProfileReducer';
import categoryReducer from './CategoryReducer';
import usersReducer from './UserReducers';
import subCategoryReducer from './SubCategoryReducer';
import softwareReducer from './SoftwareReducer';
import feedBackReducer from './FeedBackReducer';
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
const rootReducer = combineReducers({
    ProgressBarReducer,
    ProfileReducer,
    categoryReducer,
    usersReducer,
    subCategoryReducer,
    softwareReducer,
    feedBackReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default store;