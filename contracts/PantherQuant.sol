// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC1155.sol";
import "./Ownable.sol";

contract PantherQuant is ERC1155, Ownable {
    constructor() ERC1155("https://image/api/") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(
        address[] memory account,
        uint256 id,
        uint256 amount
    ) public onlyOwner {
        for (uint256 i = 0; i < account.length; i++)
            _mint(account[i], id, amount);
    }

    function mintOne(
        address account,
        uint256 id,
        uint256 amount
    ) external onlyOwner {
        _mint(account, id, amount);
    }
}
