// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

interface SwayToken {
    function mintToken(uint256 eventId, address to) external returns (bool);
}

interface SwayAdmin {
    function isGovernor(address _addr) external returns (bool);
}

contract SwayDrop is Initializable, UUPSUpgradeable, PausableUpgradeable {
    string public name;
    address public swayAddr;

    // mapping of event and processed claims
    mapping(uint256 => mapping(address => bool)) public claimed;

    // mapping of event and merkle tree root hash
    mapping(uint256 => bytes32) public rootHash;

    event TokenClaimed(uint256 indexed eventId, address indexed to);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(string memory _name, address _swayAddr) public initializer {
        name = _name;
        swayAddr = _swayAddr;

        __Context_init_unchained();
        __Pausable_init_unchained();
        // UUPSUpgradeable
        __ERC1967Upgrade_init_unchained();
        __UUPSUpgradeable_init_unchained();
    }

    modifier onlyGovernorOrSway() {
        require(
            SwayAdmin(swayAddr).isGovernor(msg.sender) || msg.sender == swayAddr,
            "SwayDrop: sender is not Sway or does not have Governor Role"
        );
        _;
    }

    modifier onlyGovernor() {
        require(
            SwayAdmin(swayAddr).isGovernor(msg.sender),
            "SwayDrop: sender does not have Governor Role"
        );
        _;
    }

    function _authorizeUpgrade(address) internal override onlyGovernor {}

    function _updateEvent(uint256 _eventId, bytes32 _roothash) internal {
        rootHash[_eventId] = _roothash;
    }

    function verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf
    ) internal pure returns (bool) {
        return MerkleProofUpgradeable.verify(proof, root, leaf);
    }

    function isEventAdded(uint256 eventId) public view returns (bool) {
        return rootHash[eventId] != bytes32(0);
    }

    function addEvent(uint256 _eventId, bytes32 _roothash) public onlyGovernorOrSway {
        require(
            !isEventAdded(_eventId),
            "SwayDrop::addEvent: Merkle Root already present for the event"
        );
        _updateEvent(_eventId, _roothash);
    }

    function updateEvent(uint256 _eventId, bytes32 _roothash) public onlyGovernorOrSway {
        _updateEvent(_eventId, _roothash);
    }

    function setSway(address _swayAddr) public onlyGovernorOrSway {
        swayAddr = _swayAddr;
    }

    function _makeLeaf(
        uint256 _index,
        uint256 _eventId,
        address _recipient
    ) internal pure returns (bytes32 leaf) {
        leaf = keccak256(abi.encodePacked(_index, _eventId, _recipient));
    }

    function claim(
        uint256 _index,
        uint256 _eventId,
        address _recipient,
        bytes32[] memory proof
    ) public {
        require(isEventAdded(_eventId), "SwayDrop: event not added for drop");
        require(
            claimed[_eventId][_recipient] == false,
            "SwayDrop: recipient already processed!"
        );
        bytes32 leaf = _makeLeaf(_index, _eventId, _recipient);
        require(
            verify(proof, rootHash[_eventId], leaf),
            "SwayDrop: recipient not in merkle tree!"
        );

        claimed[_eventId][_recipient] = true;
        emit TokenClaimed(_eventId, _recipient);

        require(
            SwayToken(swayAddr).mintToken(_eventId, _recipient),
            "SwayDrop: could not mint SWAY"
        );
    }

    uint256[50] private __gap;
}
