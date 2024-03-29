/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface ISwayAdminInterface extends ethers.utils.Interface {
  functions: {
    "addEventDrop(uint256,bytes32,address)": FunctionFragment;
    "addEventMinter(uint256,address)": FunctionFragment;
    "addGovernor(address)": FunctionFragment;
    "createEvent(address)": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "getRoleMember(bytes32,uint256)": FunctionFragment;
    "getRoleMemberCount(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "isEventMinter(uint256,address)": FunctionFragment;
    "isGovernor(address)": FunctionFragment;
    "pause()": FunctionFragment;
    "removeEventMinter(uint256,address)": FunctionFragment;
    "removeGovernor(address)": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "unpause()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addEventDrop",
    values: [BigNumberish, BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "addEventMinter",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "addGovernor", values: [string]): string;
  encodeFunctionData(functionFragment: "createEvent", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMember",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMemberCount",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "isEventMinter",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "isGovernor", values: [string]): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeEventMinter",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeGovernor",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "addEventDrop",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addEventMinter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addGovernor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createEvent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMember",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMemberCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isEventMinter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isGovernor", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeEventMinter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeGovernor",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;

  events: {
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
}

export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string] & {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
>;

export type RoleGrantedEvent = TypedEvent<
  [string, string, string] & { role: string; account: string; sender: string }
>;

export type RoleRevokedEvent = TypedEvent<
  [string, string, string] & { role: string; account: string; sender: string }
>;

export class ISwayAdmin extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ISwayAdminInterface;

  functions: {
    addEventDrop(
      eventId: BigNumberish,
      rootHash: BytesLike,
      drop: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addEventMinter(
      eventId: BigNumberish,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addGovernor(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    createEvent(
      minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isEventMinter(
      eventId: BigNumberish,
      _addr: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isGovernor(_addr: string, overrides?: CallOverrides): Promise<[boolean]>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeEventMinter(
      eventId: BigNumberish,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeGovernor(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addEventDrop(
    eventId: BigNumberish,
    rootHash: BytesLike,
    drop: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addEventMinter(
    eventId: BigNumberish,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addGovernor(
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  createEvent(
    minter: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

  getRoleMember(
    role: BytesLike,
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getRoleMemberCount(
    role: BytesLike,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isEventMinter(
    eventId: BigNumberish,
    _addr: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isGovernor(_addr: string, overrides?: CallOverrides): Promise<boolean>;

  pause(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeEventMinter(
    eventId: BigNumberish,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeGovernor(
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unpause(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addEventDrop(
      eventId: BigNumberish,
      rootHash: BytesLike,
      drop: string,
      overrides?: CallOverrides
    ): Promise<void>;

    addEventMinter(
      eventId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    addGovernor(account: string, overrides?: CallOverrides): Promise<void>;

    createEvent(minter: string, overrides?: CallOverrides): Promise<void>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isEventMinter(
      eventId: BigNumberish,
      _addr: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isGovernor(_addr: string, overrides?: CallOverrides): Promise<boolean>;

    pause(overrides?: CallOverrides): Promise<void>;

    removeEventMinter(
      eventId: BigNumberish,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    removeGovernor(account: string, overrides?: CallOverrides): Promise<void>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    unpause(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; previousAdminRole: string; newAdminRole: string }
    >;

    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; previousAdminRole: string; newAdminRole: string }
    >;

    "RoleGranted(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; account: string; sender: string }
    >;

    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; account: string; sender: string }
    >;

    "RoleRevoked(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; account: string; sender: string }
    >;

    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): TypedEventFilter<
      [string, string, string],
      { role: string; account: string; sender: string }
    >;
  };

  estimateGas: {
    addEventDrop(
      eventId: BigNumberish,
      rootHash: BytesLike,
      drop: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addEventMinter(
      eventId: BigNumberish,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addGovernor(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    createEvent(
      minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isEventMinter(
      eventId: BigNumberish,
      _addr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isGovernor(_addr: string, overrides?: CallOverrides): Promise<BigNumber>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeEventMinter(
      eventId: BigNumberish,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeGovernor(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addEventDrop(
      eventId: BigNumberish,
      rootHash: BytesLike,
      drop: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addEventMinter(
      eventId: BigNumberish,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addGovernor(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    createEvent(
      minter: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isEventMinter(
      eventId: BigNumberish,
      _addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isGovernor(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeEventMinter(
      eventId: BigNumberish,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeGovernor(
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unpause(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
