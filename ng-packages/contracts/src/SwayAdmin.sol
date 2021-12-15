// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";

interface ISwayDrop {
    function addEvent(uint256 _eventId, bytes32 _roothash) external;
}

contract SwayAdmin is Initializable, AccessControlEnumerableUpgradeable, PausableUpgradeable {
    using StringsUpgradeable for uint256;

    bytes32 public constant GOVERNOR_ROLE = keccak256("GOVERNOR_ROLE");

    // drop address
    address public drop;

    mapping(uint256 => bytes32) public eventRoleMapping;
    // Last event id (used to generate new ids)
    uint256 public lastEventId;

    // events
    event EventAdded(uint256 indexed eventId, address indexed minter, bytes32 indexed role);
    event SwayDropAddressUpdated(address indexed drop);

    function __SwayAdmin_init(address governor) internal initializer {
        __Context_init_unchained();
        __ERC165_init_unchained();

        // access control
        __AccessControl_init_unchained();
        __AccessControlEnumerable_init_unchained();

        // pausable
        __Pausable_init_unchained();

        __SwayAdmin_init_unchained(governor);
    }

    function __SwayAdmin_init_unchained(address governor) internal initializer {
        _setRoleAdmin(GOVERNOR_ROLE, GOVERNOR_ROLE);
        _setupRole(GOVERNOR_ROLE, governor);
    }

    function _createEvent(address minter) internal {
        // increment the last id
        lastEventId += 1;
        // setup the event role
        bytes32 eventRole = keccak256(abi.encodePacked(lastEventId.toString()));
        _setRoleAdmin(eventRole, GOVERNOR_ROLE);

        // save the role identifier to mapping
        eventRoleMapping[lastEventId] = eventRole;

        grantRole(eventRole, minter);
        emit EventAdded(lastEventId, minter, eventRole);
    }

    /**
     * @dev called by the governor to pause, triggers stopped state
     */
    function pause() public onlyGovernor whenNotPaused {
        _pause();
    }

    /**
     * @dev called by the governor to unpause, returns to normal state
     */
    function unpause() public onlyGovernor whenPaused {
        _unpause();
    }

    function isGovernor(address _addr) public view returns (bool) {
        return hasRole(GOVERNOR_ROLE, _addr);
    }

    function isEventMinter(uint256 eventId, address _addr) public view returns (bool) {
        return hasRole(eventRoleMapping[eventId], _addr) || isGovernor(_addr);
    }

    modifier onlyGovernor() {
        require(isGovernor(msg.sender), "SwayAdmin: sender does not have Governor Role");
        _;
    }

    modifier onlyEventMinter(uint256 eventId) {
        require(isEventMinter(eventId, msg.sender), "SwayAdmin: sender does not have Minter Role in Event");
        _;
    }

    function setDrop(address _drop) public onlyGovernor {
        drop = _drop;
        emit SwayDropAddressUpdated(_drop);
    }

    function createEvent(address minter) public onlyGovernor {
        _createEvent(minter);
    }

    function addEventDrop(uint256 eventId, bytes32 rootHash) public onlyGovernor {
        require(drop != address(0), "SwayAdmin: drop address not set");
        require(rootHash != bytes32(0), "SwayAdmin: rootHash is zero");
        require(eventRoleMapping[eventId] != bytes32(0), "SwayAdmin: eventId not found");
        addEventMinter(eventId, drop);
        ISwayDrop(drop).addEvent(lastEventId, rootHash);
    }

    function addEventMinter(uint256 eventId, address account) public onlyGovernor {
        require(eventRoleMapping[eventId] != bytes32(0), "SwayAdmin: eventId not found");
        grantRole(eventRoleMapping[eventId], account);
    }

    function _removeEventMinter(uint256 eventId, address account) internal {
        _minters[eventId].remove(account);
        emit EventMinterRemoved(eventId, account);
    }

    function _removeAdmin(address account) internal {
        _admins.remove(account);
        emit AdminRemoved(account);
    }
}
