// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable.sol";
import "./ISwayDrop.sol";

interface ISwayAdmin is IAccessControlEnumerableUpgradeable {
    /**
     * @dev called by the governor to pause, triggers stopped state
     */
    function pause() external;

    /**
     * @dev called by the governor to unpause, returns to normal state
     */
    function unpause() external;

    function isGovernor(address _addr) external view returns (bool);

    function isEventMinter(uint256 eventId, address _addr) external view returns (bool);

    function createEvent(address minter) external;

    function addEventMinter(uint256 eventId, address account) external;

    function removeEventMinter(uint256 eventId, address account) external;

    function addGovernor(address account) external;

    function removeGovernor(address account) external;

    function addEventDrop(
        uint256 eventId,
        bytes32 rootHash,
        ISwayDrop drop
    ) external;
}
