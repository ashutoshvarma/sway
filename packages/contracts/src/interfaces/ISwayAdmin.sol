// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable.sol";

interface ISwayAdmin is IAccessControlEnumerableUpgradeable {
    function addEventMinter(uint256 eventId, address account) external;

    function createEvent(address minter) external returns (uint256);

    function isEventMinter(uint256 eventId, address _addr) external returns (bool);

    function isGovernor(address _addr) external returns (bool);

    function unpause(address _addr) external;

    function pause(address _addr) external;
}
