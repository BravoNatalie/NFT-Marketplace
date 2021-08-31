import { combineReducers } from "redux";
import { nftReducer, selectedNftReducer } from "./nftReducer";

const reducers = combineReducers({
  allNft: nftReducer,
  nft: selectedNftReducer,
});

export default reducers;
