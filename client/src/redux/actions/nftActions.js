import { ActionTypes } from "../constants/action-types";

export const setNft = (nft) => {
  return {
    type: ActionTypes.SET_NFT,
    payload: nft,
  };
};

export const selectedNft = (nft) => {
  return {
    type: ActionTypes.SELECTED_NFT,
    payload: nft,
  };
};

export const removeSelectedNft = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_NFT,
  };
};

export const setAccount = (account) => {
  return {
    type: ActionTypes.SET_ACCOUNT,
    payload: account,
  };
};

export const setTokenContract = (tokenContract) => {
  return {
    type: ActionTypes.SET_TOKEN_COTRACT,
    payload: tokenContract,
  };
};

export const setMarketContract = (marketContract) => {
  return {
    type: ActionTypes.SET_MARKET_CONTRACT,
    payload: marketContract,
  };
};