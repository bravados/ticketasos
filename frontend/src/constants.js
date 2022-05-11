import Big from "big.js";

export const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

export const PRICE_FOR_MINTING = 0.01; // Near

export const PRICE_FOR_APPROVING = 0.0005; // Near
