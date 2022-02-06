// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol";
import "./ISwayAdmin.sol";

interface ISway is IERC721EnumerableUpgradeable {
    function setBaseURI(string memory baseURI) external;

    function setBaseURIExtension(string memory baseURIExtension) external;

    /**
     * @dev Gets the token ID at a given index of the tokens list of the requested owner
     * @param owner address owning the tokens list to be accessed
     * @param index uint256 representing the index to be accessed of the requested tokens list
     */
    function tokenDetailsOfOwnerByIndex(address owner, uint256 index)
        external
        view
        returns (uint256 tokenId, uint256 eventId);

    /**
     * @dev Function to mint tokens
     * @param eventId EventId for the new token
     * @param to The address that will receive the minted tokens.
     * @return A boolean that indicates if the operation was successful.
     */
    function mintToken(uint256 eventId, address to) external returns (bool);

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
    ) external returns (bool);

    function burn(uint256 tokenId) external;
}
