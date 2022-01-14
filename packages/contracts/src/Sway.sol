// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./SwayAdmin.sol";

contract Sway is Initializable, UUPSUpgradeable, ERC721EnumerableUpgradeable, SwayAdmin {
    using StringsUpgradeable for uint256;

    // used to generate new ids
    uint256 private lastId;

    // Base token URI
    string private _baseURIextendend;

    // Base token URI extension
    string private _baseURIExtension;

    // EventId for each token
    mapping(uint256 => uint256) public tokenEvent;

    // events
    event EventToken(uint256 eventId, uint256 tokenId);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(
        string memory __name,
        string memory __symbol,
        string memory __baseURI,
        string memory __baseURIExtension,
        address governor
    ) public initializer {
        _baseURIextendend = __baseURI;
        _baseURIExtension = __baseURIExtension;

        __SwayAdmin_init(governor);
        __ERC721_init_unchained(__name, __symbol);
        __ERC721Enumerable_init_unchained();
        // UUPSUpgradeable
        __ERC1967Upgrade_init_unchained();
        __UUPSUpgradeable_init_unchained();
    }

    function _authorizeUpgrade(address) internal override onlyGovernor {}

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721EnumerableUpgradeable, AccessControlEnumerableUpgradeable)
        returns (bool)
    {
        return
            ERC721EnumerableUpgradeable.supportsInterface(interfaceId) ||
            AccessControlEnumerableUpgradeable.supportsInterface(interfaceId);
    }

    function setBaseURI(string memory baseURI) public onlyGovernor whenNotPaused {
        _baseURIextendend = baseURI;
    }

    function setBaseURIExtension(string memory baseURIExtension)
        public
        onlyGovernor
        whenNotPaused
    {
        _baseURIExtension = baseURIExtension;
    }

    /**
     * @dev Gets the token ID at a given index of the tokens list of the requested owner
     * @param owner address owning the tokens list to be accessed
     * @param index uint256 representing the index to be accessed of the requested tokens list
     */
    function tokenDetailsOfOwnerByIndex(address owner, uint256 index)
        public
        view
        returns (uint256 tokenId, uint256 eventId)
    {
        tokenId = tokenOfOwnerByIndex(owner, index);
        eventId = tokenEvent[tokenId];
    }

    /**
     * @dev Gets the token uri
     * @return string representing the token uri
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Sway: URI query for nonexistent token");

        uint256 eventId = tokenEvent[tokenId];
        return
            string(
                abi.encodePacked(
                    _baseURI(),
                    eventId.toString(),
                    "/",
                    tokenId.toString(),
                    _baseURIExtension
                )
            );
    }

    /**
     * @dev Function to mint tokens
     * @param eventId EventId for the new token
     * @param to The address that will receive the minted tokens.
     * @return A boolean that indicates if the operation was successful.
     */
    function mintToken(uint256 eventId, address to)
        public
        whenNotPaused
        onlyEventMinter(eventId)
        returns (bool)
    {
        lastId += 1;
        return _mintToken(eventId, lastId, to);
    }

    /**
     * @dev Function to mint tokens with a specific id
     * @param eventId EventId for the new token
     * @param tokenId TokenId for the new token
     * @param to The address that will receive the minted tokens.
     * @return A boolean that indicates if the operation was successful.
     */
    function mintToken(
        uint256 eventId,
        uint256 tokenId,
        address to
    ) public whenNotPaused onlyEventMinter(eventId) returns (bool) {
        return _mintToken(eventId, tokenId, to);
    }

    function burn(uint256 tokenId) public {
        //solhint-disable-next-line max-line-length
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "Sway: caller is not owner nor approved"
        );
        _burn(tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseURIextendend;
    }

    /**
     * @dev Internal function to burn a specific token
     * Reverts if the token does not exist
     *
     * @param tokenId uint256 ID of the token being burned by the msg.sender
     */
    function _burn(uint256 tokenId) internal override {
        super._burn(tokenId);
        delete tokenEvent[tokenId];
    }

    /**
     * @dev Function to mint tokens
     * @param eventId EventId for the new token
     * @param tokenId The token id to mint.
     * @param to The address that will receive the minted tokens.
     * @return A boolean that indicates if the operation was successful.
     */
    function _mintToken(
        uint256 eventId,
        uint256 tokenId,
        address to
    ) internal returns (bool) {
        _mint(to, tokenId);
        tokenEvent[tokenId] = eventId;
        emit EventToken(eventId, tokenId);
        return true;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721EnumerableUpgradeable) {
        super._beforeTokenTransfer(from, to, tokenId);

        require(!paused(), "Sway: token transfer while paused");
    }

    uint256[50] private __gap;
}
