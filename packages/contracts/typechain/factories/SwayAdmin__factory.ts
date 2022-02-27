/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SwayAdmin, SwayAdminInterface } from "../SwayAdmin";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "minter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "EventAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "EventMinterAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "EventMinterRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "GovernorAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "GovernorRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GOVERNOR_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "rootHash",
        type: "bytes32",
      },
      {
        internalType: "contract ISwayDrop",
        name: "drop",
        type: "address",
      },
    ],
    name: "addEventDrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "addEventMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "addGovernor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    name: "createEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "eventRoleMapping",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "isEventMinter",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "isGovernor",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastEventId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "removeEventMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "removeGovernor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611639806100206000396000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c80638456cb59116100c3578063ca15c8731161007c578063ca15c873146102bc578063ccc57490146102cf578063d547741f146102e4578063e43581b8146102f7578063e5458e201461030a578063eecdac881461031d57600080fd5b80638456cb591461023b5780639010d07c1461024357806391d148541461026e5780639cd3cad614610281578063a217fddf14610294578063b2c50b121461029c57600080fd5b80632f2ff15d116101155780632f2ff15d146101dc57806336568abe146101ef5780633c4a25d0146102025780633f4ba83a146102155780635c975abb1461021d578063787b8d471461022857600080fd5b806301ffc9a714610152578063054e95071461017a578063166c4b0514610191578063248a9ca3146101a657806328db38b4146101c9575b600080fd5b610165610160366004611310565b610330565b60405190151581526020015b60405180910390f35b61018360fc5481565b604051908152602001610171565b6101a461019f366004611338565b61035b565b005b6101836101b43660046112a8565b60009081526065602052604090206001015490565b6101656101d7366004611338565b610397565b6101a46101ea3660046112c0565b6103c6565b6101a46101fd3660046112c0565b6103ed565b6101a461021036600461128c565b61040f565b6101a4610440565b60c95460ff16610165565b6101a461023636600461128c565b6104b8565b6101a46104e6565b6102566102513660046112ef565b610559565b6040516001600160a01b039091168152602001610171565b61016561027c3660046112c0565b610571565b6101a461028f366004611338565b61059c565b610183600081565b6101836102aa3660046112a8565b60fb6020526000908152604090205481565b6101836102ca3660046112a8565b6105cb565b6101836000805160206115e483398151915281565b6101a46102f23660046112c0565b6105e2565b61016561030536600461128c565b6105ec565b6101a461031836600461134a565b610606565b6101a461032b36600461128c565b610777565b60006001600160e01b03198216635a05180f60e01b14806103555750610355826107a5565b92915050565b610364336105ec565b6103895760405162461bcd60e51b81526004016103809061147d565b60405180910390fd5b61039382826107da565b5050565b600082815260fb60205260408120546103b09083610571565b806103bf57506103bf826105ec565b9392505050565b6103d08282610858565b60008281526097602052604090206103e8908261087e565b505050565b6103f78282610893565b60008281526097602052604090206103e8908261090d565b610418336105ec565b6104345760405162461bcd60e51b81526004016103809061147d565b61043d81610922565b50565b610449336105ec565b6104655760405162461bcd60e51b81526004016103809061147d565b60c95460ff166104ae5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610380565b6104b6610971565b565b6104c1336105ec565b6104dd5760405162461bcd60e51b81526004016103809061147d565b61043d81610a04565b6104ef336105ec565b61050b5760405162461bcd60e51b81526004016103809061147d565b60c95460ff16156105515760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610380565b6104b6610ac4565b60008281526097602052604081206103bf9083610b3f565b60009182526065602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6105a5336105ec565b6105c15760405162461bcd60e51b81526004016103809061147d565b6103938282610b4b565b600081815260976020526040812061035590610bc9565b6103f78282610bd3565b60006103556000805160206115e483398151915283610571565b61060f336105ec565b61062b5760405162461bcd60e51b81526004016103809061147d565b6001600160a01b0381166106945760405162461bcd60e51b815260206004820152602a60248201527f5377617941646d696e3a2064726f7020616464726573732073686f756c64206e6044820152696f74206265207a65726f60b01b6064820152608401610380565b816106e15760405162461bcd60e51b815260206004820152601b60248201527f5377617941646d696e3a20726f6f7448617368206973207a65726f00000000006044820152606401610380565b600083815260fb602052604090205461070c5760405162461bcd60e51b815260040161038090611446565b6040516330dde7eb60e21b815260048101849052602481018390526001600160a01b0382169063c3779fac90604401600060405180830381600087803b15801561075557600080fd5b505af1158015610769573d6000803e3d6000fd5b505050506103e88382610b4b565b610780336105ec565b61079c5760405162461bcd60e51b81526004016103809061147d565b61043d81610bf9565b60006001600160e01b03198216637965db0b60e01b148061035557506301ffc9a760e01b6001600160e01b0319831614610355565b600082815260fb60205260409020546108055760405162461bcd60e51b815260040161038090611446565b600082815260fb602052604090205461081e90826103ed565b6040516001600160a01b0382169083907fb6882c4d609d560f6d57e78e73dd96027f0d9852739b0b922537a6dd3c8e944c90600090a35050565b6000828152606560205260409020600101546108748133610c48565b6103e88383610cac565b60006103bf836001600160a01b038416610d32565b6001600160a01b03811633146109035760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610380565b6103938282610d81565b60006103bf836001600160a01b038416610de8565b61093a6000805160206115e4833981519152826103c6565b6040516001600160a01b038216907fdc5a48d79e2e147530ff63ecdbed5a5a66adb9d5cf339384d5d076da197c40b590600090a250565b60c95460ff166109ba5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610380565b60c9805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600160fc6000828254610a1791906114ca565b925050819055506000610a2b60fc54610f05565b604051602001610a3b9190611382565b604051602081830303815290604052805190602001209050610a6b816000805160206115e4833981519152611027565b60fc8054600090815260fb60205260408082208490559154915183926001600160a01b0386169290917f613e137a89b79c7d1e214c39381dfac9f62e1f202a0e2e8c17d44d7d689cd8ea9190a461039360fc5483610b4b565b60c95460ff1615610b0a5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610380565b60c9805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586109e73390565b60006103bf8383611072565b600082815260fb6020526040902054610b765760405162461bcd60e51b815260040161038090611446565b600082815260fb6020526040902054610b8f90826103c6565b6040516001600160a01b0382169083907fe1bd660d9f7c60e6fb12dd6479fdde12d21fc96385dc7b9b022c0b2f319e739190600090a35050565b6000610355825490565b600082815260656020526040902060010154610bef8133610c48565b6103e88383610d81565b610c116000805160206115e4833981519152826103ed565b6040516001600160a01b038216907f1ebe834e73d60a5fec822c1e1727d34bc79f2ad977ed504581cc1822fe20fb5b90600090a250565b610c528282610571565b61039357610c6a816001600160a01b031660146110aa565b610c758360206110aa565b604051602001610c8692919061139e565b60408051601f198184030181529082905262461bcd60e51b825261038091600401611413565b610cb68282610571565b6103935760008281526065602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610cee3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000818152600183016020526040812054610d7957508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610355565b506000610355565b610d8b8282610571565b156103935760008281526065602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60008181526001830160205260408120548015610efb576000610e0c600183611515565b8554909150600090610e2090600190611515565b9050818114610ea1576000866000018281548110610e4e57634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080876000018481548110610e7f57634e487b7160e01b600052603260045260246000fd5b6000918252602080832090910192909255918252600188019052604090208390555b8554869080610ec057634e487b7160e01b600052603160045260246000fd5b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610355565b6000915050610355565b606081610f295750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610f535780610f3d81611573565b9150610f4c9050600a836114e2565b9150610f2d565b60008167ffffffffffffffff811115610f7c57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610fa6576020820181803683370190505b5090505b841561101f57610fbb600183611515565b9150610fc8600a8661158e565b610fd39060306114ca565b60f81b818381518110610ff657634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350611018600a866114e2565b9450610faa565b949350505050565b600082815260656020526040808220600101805490849055905190918391839186917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a4505050565b600082600001828154811061109757634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905092915050565b606060006110b98360026114f6565b6110c49060026114ca565b67ffffffffffffffff8111156110ea57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015611114576020820181803683370190505b509050600360fc1b8160008151811061113d57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061117a57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600061119e8460026114f6565b6111a99060016114ca565b90505b600181111561123d576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106111eb57634e487b7160e01b600052603260045260246000fd5b1a60f81b82828151811061120f57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c936112368161155c565b90506111ac565b5083156103bf5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610380565b60006020828403121561129d578081fd5b81356103bf816115ce565b6000602082840312156112b9578081fd5b5035919050565b600080604083850312156112d2578081fd5b8235915060208301356112e4816115ce565b809150509250929050565b60008060408385031215611301578182fd5b50508035926020909101359150565b600060208284031215611321578081fd5b81356001600160e01b0319811681146103bf578182fd5b600080604083850312156112d2578182fd5b60008060006060848603121561135e578081fd5b83359250602084013591506040840135611377816115ce565b809150509250925092565b6000825161139481846020870161152c565b9190910192915050565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516113d681601785016020880161152c565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161140781602884016020880161152c565b01602801949350505050565b602081526000825180602084015261143281604085016020870161152c565b601f01601f19169190910160400192915050565b6020808252601c908201527f5377617941646d696e3a206576656e744964206e6f7420666f756e6400000000604082015260600190565b6020808252602d908201527f5377617941646d696e3a2073656e64657220646f6573206e6f7420686176652060408201526c476f7665726e6f7220526f6c6560981b606082015260800190565b600082198211156114dd576114dd6115a2565b500190565b6000826114f1576114f16115b8565b500490565b6000816000190483118215151615611510576115106115a2565b500290565b600082821015611527576115276115a2565b500390565b60005b8381101561154757818101518382015260200161152f565b83811115611556576000848401525b50505050565b60008161156b5761156b6115a2565b506000190190565b6000600019821415611587576115876115a2565b5060010190565b60008261159d5761159d6115b8565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b6001600160a01b038116811461043d57600080fdfe7935bd0ae54bc31f548c14dba4d37c5c64b3f8ca900cb468fb8abd54d5894f55a2646970667358221220ecf6f3ac839632a62d29981b0961440be46dd243ccbeb499831733236dcef3a964736f6c63430008040033";

export class SwayAdmin__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SwayAdmin> {
    return super.deploy(overrides || {}) as Promise<SwayAdmin>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SwayAdmin {
    return super.attach(address) as SwayAdmin;
  }
  connect(signer: Signer): SwayAdmin__factory {
    return super.connect(signer) as SwayAdmin__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SwayAdminInterface {
    return new utils.Interface(_abi) as SwayAdminInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SwayAdmin {
    return new Contract(address, _abi, signerOrProvider) as SwayAdmin;
  }
}
