/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { SwayToken, SwayTokenInterface } from "../SwayToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "mintToken",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class SwayToken__factory {
  static readonly abi = _abi;
  static createInterface(): SwayTokenInterface {
    return new utils.Interface(_abi) as SwayTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SwayToken {
    return new Contract(address, _abi, signerOrProvider) as SwayToken;
  }
}
