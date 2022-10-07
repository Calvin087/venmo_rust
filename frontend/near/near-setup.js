import {
  keyStores,
  KeyPair,
  Near,
  WalletConnection,
  utils as nearUtils
} from "near-api-js";

export const CONTRACT_ID = "venmo2.ctorra.testnet"; // empty string works null doesn't
const NETWORK = process.env.NEXT_PUBLIC_NETWORK;
const NETWORK_URL_BASE =
  process.env.NEXT_PUBLIC_NETWORK === "mainnet"
    ? "https://wallet.near.org"
    : "https://wallet.testnet.near.org";

export const initNear = () => {
  const near = new Near({
    networkId: `${NETWORK}`,
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: `https://rpc.${NETWORK}.near.org`,
    walletUrl: `https://wallet.${NETWORK}.near.org`
  });

  // Start wallet

  wallet = new WalletConnection(near);
};

export let wallet = null;
export let contract = null;
export const utils = nearUtils;

export const signIn = () => {
  wallet.requestSignIn({ contractId: CONTRACT_ID });
};

export const signOut = () => {
  wallet.signOut();
};

// =====================
// GENERIC VIEW METHODS
// =====================

export const contractViewFunction = async ({
  contractID = CONTRACT_ID,
  functionName,
  args = {}
}) => {
  const result = await wallet
    .account()
    .viewFunction(contractID, functionName, args);

  return result;
};

// =====================
// GENERIC CALL METHODS (CHANGE METHODS)
// =====================

export const contractCallFunction = async ({
  contractID = CONTRACT_ID,
  functionName,
  args = {},
  deposit = "0"
}) => {
  console.log("starting");
  const transaction = await wallet.account().functionCall({
    contractId: contractID,
    methodName: functionName,
    args: args,
    attachedDeposit: utils.format.parseNearAmount(deposit)
    // Some methods don't take deposits and fail if you send one.
  });

  console.log("done");
  return transaction;
};
