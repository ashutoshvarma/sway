/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ISwayDropInterface extends utils.Interface {
  contractName: "ISwayDrop";
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

export interface ISwayDrop extends BaseContract {
  contractName: "ISwayDrop";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISwayDropInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

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