// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";

interface SwayToken {
    function mintToken(uint256 eventId, address to) external returns (bool);
}

contract SwayDrop is Initializable, PausableUpgradeable, AccessControlEnumerableUpgradeable {
    bytes32 public constant GOVERNOR_ROLE = keccak256("GOVERNOR_ROLE");

    string public name;

    address public sway;

    // mapping of event and processed claims
    mapping(uint256 => mapping(address => bool)) public claimed;

    // mapping of event and merkle tree root hash
    mapping(uint256 => bytes32) public rootHash;

    event TokenClaimed(uint256 indexed eventId, address indexed to);

    function initialize(
        string memory _name,
        address _sway,
        address _governor
    ) public initializer {
        name = _name;
        sway = _sway;

        __Context_init_unchained();
        __ERC165_init_unchained();
        __AccessControl_init_unchained();
        __AccessControlEnumerable_init_unchained();
        __Pausable_init_unchained();

        _setRoleAdmin(GOVERNOR_ROLE, GOVERNOR_ROLE);
        _setupRole(GOVERNOR_ROLE, _sway);
        _setupRole(GOVERNOR_ROLE, _governor);
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

    function addEvent(uint256 _eventId, bytes32 _roothash) public onlyRole(GOVERNOR_ROLE) {
        rootHash[_eventId] = _roothash;
    }

    function setSway(address _sway) public onlyRole(GOVERNOR_ROLE) {
        sway = _sway;
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
        require(claimed[_eventId][_recipient] == false, "SwayDrop: recipient already processed!");
        bytes32 leaf = _makeLeaf(_index, _eventId, _recipient);
        require(verify(proof, rootHash[_eventId], leaf), "SwayDrop: recipient not in merkle tree!");

        claimed[_eventId][_recipient] = true;
        emit TokenClaimed(_eventId, _recipient);

        require(SwayToken(sway).mintToken(_eventId, _recipient), "SwayDrop: could not mint SWAY");
    }
}
