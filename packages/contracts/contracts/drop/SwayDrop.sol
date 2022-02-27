// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "../interfaces/ISwayAdmin.sol";
import "../interfaces/ISwayDrop.sol";
import "../interfaces/ISway.sol";

contract SwayDrop is
    Initializable,
    UUPSUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable,
    ISwayDrop
{
    string public name;
    address public swayAddr;

    // mapping of event and processed claims
    mapping(uint256 => mapping(address => bool)) public claimed;

    // mapping of event and merkle tree root hash
    mapping(uint256 => bytes32) public rootHash;

    event TokenClaimed(uint256 indexed eventId, address indexed to);
    event SwayAddressChanged(address indexed newAddress, address indexed oldAddress);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(string memory _name, address _swayAddr) public initializer {
        name = _name;
        _setSway(_swayAddr);

        __Context_init_unchained();
        __Pausable_init_unchained();
        // UUPSUpgradeable
        __ERC1967Upgrade_init_unchained();
        __UUPSUpgradeable_init_unchained();

        __ReentrancyGuard_init();
    }

    modifier onlyGovernorOrSway() {
        require(
            ISwayAdmin(swayAddr).isGovernor(msg.sender) || msg.sender == swayAddr,
            "SwayDrop: sender is not Sway or does not have Governor Role"
        );
        _;
    }

    modifier onlyGovernor() {
        require(
            ISwayAdmin(swayAddr).isGovernor(msg.sender),
            "SwayDrop: sender does not have Governor Role"
        );
        _;
    }

    function _authorizeUpgrade(address) internal override onlyGovernor {}

    function _setSway(address _swayAddr) internal {
        require(_swayAddr != address(0), "SwayDrop: swayAddr should be non-zero");
        address oldAddr = swayAddr;
        swayAddr = _swayAddr;
        emit SwayAddressChanged(swayAddr, oldAddr);
    }

    function _updateEvent(uint256 _eventId, bytes32 _roothash) internal {
        rootHash[_eventId] = _roothash;
    }

    function _makeLeaf(
        uint256 _index,
        uint256 _eventId,
        address _recipient
    ) internal pure returns (bytes32 leaf) {
        leaf = keccak256(abi.encodePacked(_index, _eventId, _recipient));
    }

    function _verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf
    ) internal pure returns (bool) {
        return MerkleProofUpgradeable.verify(proof, root, leaf);
    }

    function isEventAdded(uint256 eventId) public view override returns (bool) {
        return rootHash[eventId] != bytes32(0);
    }

    function addEvent(uint256 _eventId, bytes32 _roothash)
        external
        override
        nonReentrant
        onlyGovernorOrSway
    {
        require(
            !isEventAdded(_eventId),
            "SwayDrop::addEvent: Merkle Root already present for the event"
        );
        _updateEvent(_eventId, _roothash);
    }

    function updateEvent(uint256 _eventId, bytes32 _roothash)
        external
        override
        nonReentrant
        onlyGovernorOrSway
    {
        _updateEvent(_eventId, _roothash);
    }

    function setSway(address _swayAddr)
        external
        override
        nonReentrant
        onlyGovernorOrSway
    {
        _setSway(_swayAddr);
    }

    function claim(
        uint256 _index,
        uint256 _eventId,
        address _recipient,
        bytes32[] memory proof
    ) external override whenNotPaused {
        require(isEventAdded(_eventId), "SwayDrop: event not added for drop");
        require(!claimed[_eventId][_recipient], "SwayDrop: recipient already processed!");
        bytes32 leaf = _makeLeaf(_index, _eventId, _recipient);
        require(
            _verify(proof, rootHash[_eventId], leaf),
            "SwayDrop: recipient not in merkle tree!"
        );

        claimed[_eventId][_recipient] = true;
        emit TokenClaimed(_eventId, _recipient);

        require(
            ISway(swayAddr).mintToken(_eventId, _recipient),
            "SwayDrop: could not mint SWAY"
        );
    }

    function pause() public onlyGovernor whenNotPaused {
        _pause();
    }

    function unpause() public onlyGovernor whenPaused {
        _unpause();
    }

    uint256[50] private __gap;
}
