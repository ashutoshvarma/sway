// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "./interfaces/ISwayDrop.sol";
import "./interfaces/ISwayAdmin.sol";

contract SwayAdmin is
    Initializable,
    AccessControlEnumerableUpgradeable,
    PausableUpgradeable,
    ISwayAdmin
{
    using StringsUpgradeable for uint256;

    bytes32 public constant GOVERNOR_ROLE = keccak256("GOVERNOR_ROLE");

    mapping(uint256 => bytes32) public eventRoleMapping;
    // Last event id (used to generate new ids)
    uint256 public lastEventId;

    // events
    event EventAdded(
        uint256 indexed eventId,
        address indexed minter,
        bytes32 indexed role
    );
    event EventMinterAdded(uint256 indexed eventId, address indexed account);
    event EventMinterRemoved(uint256 indexed eventId, address indexed account);
    event GovernorAdded(address indexed account);
    event GovernorRemoved(address indexed account);

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
        emit GovernorAdded(governor);
    }

    function _addEventMinter(uint256 eventId, address account) internal {
        require(eventRoleMapping[eventId] != bytes32(0), "SwayAdmin: eventId not found");
        grantRole(eventRoleMapping[eventId], account);
        emit EventMinterAdded(eventId, account);
    }

    function _removeEventMinter(uint256 eventId, address account) internal {
        require(eventRoleMapping[eventId] != bytes32(0), "SwayAdmin: eventId not found");
        renounceRole(eventRoleMapping[eventId], account);
        emit EventMinterRemoved(eventId, account);
    }

    function _addGovernor(address account) internal {
        grantRole(GOVERNOR_ROLE, account);
        emit GovernorAdded(account);
    }

    function _removeGovernor(address account) internal {
        renounceRole(GOVERNOR_ROLE, account);
        emit GovernorRemoved(account);
    }

    function _createEvent(address minter) internal {
        // increment the last id
        lastEventId += 1;
        // setup the event role
        bytes32 eventRole = keccak256(abi.encodePacked(lastEventId.toString()));
        _setRoleAdmin(eventRole, GOVERNOR_ROLE);

        // save the role identifier to mapping
        eventRoleMapping[lastEventId] = eventRole;
        emit EventAdded(lastEventId, minter, eventRole);
        // add initial minter
        _addEventMinter(lastEventId, minter);
    }

    /**
     * @dev called by the governor to pause, triggers stopped state
     */
    function pause() public override onlyGovernor whenNotPaused {
        _pause();
    }

    /**
     * @dev called by the governor to unpause, returns to normal state
     */
    function unpause() public override onlyGovernor whenPaused {
        _unpause();
    }

    function isGovernor(address _addr) public view override returns (bool) {
        return hasRole(GOVERNOR_ROLE, _addr);
    }

    function isEventMinter(uint256 eventId, address _addr)
        public
        view
        override
        returns (bool)
    {
        return hasRole(eventRoleMapping[eventId], _addr) || isGovernor(_addr);
    }

    modifier onlyGovernor() {
        require(isGovernor(msg.sender), "SwayAdmin: sender does not have Governor Role");
        _;
    }

    modifier onlyEventMinter(uint256 eventId) {
        require(
            isEventMinter(eventId, msg.sender),
            "SwayAdmin: sender does not have Minter Role in Event"
        );
        _;
    }

    function createEvent(address minter) external override onlyGovernor {
        _createEvent(minter);
    }

    function addEventMinter(uint256 eventId, address account)
        external
        override
        onlyGovernor
    {
        _addEventMinter(eventId, account);
    }

    function removeEventMinter(uint256 eventId, address account)
        external
        override
        onlyGovernor
    {
        _removeEventMinter(eventId, account);
    }

    function addGovernor(address account) external override onlyGovernor {
        _addGovernor(account);
    }

    function removeGovernor(address account) external override onlyGovernor {
        _removeGovernor(account);
    }

    function addEventDrop(
        uint256 eventId,
        bytes32 rootHash,
        ISwayDrop drop
    ) external override onlyGovernor {
        require(
            address(drop) != address(0),
            "SwayAdmin: drop address should not be zero"
        );
        require(rootHash != bytes32(0), "SwayAdmin: rootHash is zero");
        require(eventRoleMapping[eventId] != bytes32(0), "SwayAdmin: eventId not found");
        // add event root hash in SwayDrop
        drop.addEvent(eventId, rootHash);
        // add SwayDrop as minter
        _addEventMinter(eventId, address(drop));
    }

    uint256[50] private __gap;
}
