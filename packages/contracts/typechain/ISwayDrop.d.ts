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

interface ISwayDropInterface extends ethers.utils.Interface {
  functions: {
    "addEvent(uint256,bytes32)": FunctionFragment;
    "claim(uint256,uint256,address,bytes32[])": FunctionFragment;
    "isEventAdded(uint256)": FunctionFragment;
    "setSway(address)": FunctionFragment;
    "updateEvent(uint256,bytes32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addEvent",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "claim",
    values: [BigNumberish, BigNumberish, string, BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "isEventAdded",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "setSway", values: [string]): string;
  encodeFunctionData(
    functionFragment: "updateEvent",
    values: [BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "addEvent", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isEventAdded",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setSway", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateEvent",
    data: BytesLike
  ): Result;

  events: {};
}

export class ISwayDrop extends BaseContract {
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

  interface: ISwayDropInterface;

  functions: {
    addEvent(
      _eventId: BigNumberish,
      _roothash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claim(
      _index: BigNumberish,
      _eventId: BigNumberish,
      _recipient: string,
      proof: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isEventAdded(
      eventId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    setSway(
      _swayAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateEvent(
      _eventId: BigNumberish,
      _roothash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addEvent(
    _eventId: BigNumberish,
    _roothash: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claim(
    _index: BigNumberish,
    _eventId: BigNumberish,
    _recipient: string,
    proof: BytesLike[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isEventAdded(
    eventId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  setSway(
    _swayAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateEvent(
    _eventId: BigNumberish,
    _roothash: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addEvent(
      _eventId: BigNumberish,
      _roothash: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    claim(
      _index: BigNumberish,
      _eventId: BigNumberish,
      _recipient: string,
      proof: BytesLike[],
      overrides?: CallOverrides
    ): Promise<void>;

    isEventAdded(
      eventId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setSway(_swayAddr: string, overrides?: CallOverrides): Promise<void>;

    updateEvent(
      _eventId: BigNumberish,
      _roothash: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    addEvent(
      _eventId: BigNumberish,
      _roothash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claim(
      _index: BigNumberish,
      _eventId: BigNumberish,
      _recipient: string,
      proof: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isEventAdded(
      eventId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setSway(
      _swayAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateEvent(
      _eventId: BigNumberish,
      _roothash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addEvent(
      _eventId: BigNumberish,
      _roothash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claim(
      _index: BigNumberish,
      _eventId: BigNumberish,
      _recipient: string,
      proof: BytesLike[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isEventAdded(
      eventId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setSway(
      _swayAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateEvent(
      _eventId: BigNumberish,
      _roothash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
