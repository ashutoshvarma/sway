// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable.sol";

interface ISwayDrop {
    function isEventAdded(uint256 eventId) external returns (bool);

    function addEvent(uint256 _eventId, bytes32 _roothash) external;

    function setSway(address _sway) external;

    function claim(
        uint256 _index,
        uint256 _eventId,
        address _recipient,
        bytes32[] memory proof
    ) external;
}
