// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Turing is ERC20{
    address prof;
    bool public ended = false;
    mapping(string => address) private _users;
    mapping(address => string) private _addresses;
    mapping(address => mapping(string => bool)) private _votes;

    constructor() ERC20("Turing", "TRG"){
        _users["Andre"]	    = 0xD07318971e2C15b4f8d3d28A0AEF8F16B9D8EAb6;
        _users["Antonio"]	= 0x127B963B9918261Ef713cB7950c4AD16d4Fe18c6;
        _users["Ratonilo"]	= 0x5d84D451296908aFA110e6B37b64B1605658283f;
        _users["eduardo"]	= 0x500E357176eE9D56c336e0DC090717a5B1119cC2;
        _users["Enzo"]		= 0x5217A9963846a4fD62d35BB7d58eAB2dF9D9CBb8;
        _users["Fernando"]	= 0xFED450e1300CEe0f69b1F01FA85140646E596567;
        _users["Juliana"]	= 0xFec23E4c9540bfA6BBE39c4728652F2def99bc1e;
        _users["Altoe"]	    = 0x6701D0C23d51231E676698446E55F4936F5d99dF;
        _users["Salgado"]	= 0x8321730F4D59c01f5739f1684ABa85f8262f8980;
        _users["Regata"]	= 0x4A35eFD10c4b467508C35f8C309Ebc34ae1e129a;
        _users["Luis"]		= 0xDD551702Dc580B7fDa2ddB7a1Ca63d29E8CDCf33;
        _users["Nicolas"]	= 0x01fe9DdD4916019beC6268724189B2EED8C2D49a;
        _users["Rauta"]	    = 0x726150C568f3C7f1BB3C47fd1A224a5C3F706BB1;
        _users["Silva"]	    = 0xCAFE34A88dCac60a48e64107A44D3d8651448cd9;
        _users["Sophie"]	= 0xDfb0B8b7530a6444c73bFAda4A2ee3e482dCB1E3;
        _users["Thiago"]	= 0xBeb89bd95dD9624dEd83b12dB782EAE30805ef97;
        _users["Brito"]	    = 0xEe4768Af8caEeB042Da5205fcd66fdEBa0F3FD4f;
        _users["ulopesu"]	= 0x89e66f9b31DAd708b4c5B78EF9097b1cf429c8ee;
        _users["Vinicius"]	= 0x48cd1D1478eBD643dba50FB3e99030BE4F84d468;
        _users["Bonella"]	= 0xFADAf046e6Acd9E276940C728f6B3Ac1A043054c;
        
        _addresses[0xD07318971e2C15b4f8d3d28A0AEF8F16B9D8EAb6] = "Andre";
        _addresses[0x127B963B9918261Ef713cB7950c4AD16d4Fe18c6] = "Antonio";
        _addresses[0x5d84D451296908aFA110e6B37b64B1605658283f] = "Ratonilo";
        _addresses[0x500E357176eE9D56c336e0DC090717a5B1119cC2] = "eduardo";
        _addresses[0x5217A9963846a4fD62d35BB7d58eAB2dF9D9CBb8] = "Enzo";
        _addresses[0xFED450e1300CEe0f69b1F01FA85140646E596567] = "Fernando";
        _addresses[0xFec23E4c9540bfA6BBE39c4728652F2def99bc1e] = "Juliana";
        _addresses[0x6701D0C23d51231E676698446E55F4936F5d99dF] = "Altoe";
        _addresses[0x8321730F4D59c01f5739f1684ABa85f8262f8980] = "Salgado";
        _addresses[0x4A35eFD10c4b467508C35f8C309Ebc34ae1e129a] = "Regata";
        _addresses[0xDD551702Dc580B7fDa2ddB7a1Ca63d29E8CDCf33] = "Luis";
        _addresses[0x01fe9DdD4916019beC6268724189B2EED8C2D49a] = "Nicolas";
        _addresses[0x726150C568f3C7f1BB3C47fd1A224a5C3F706BB1] = "Rauta";
        _addresses[0xCAFE34A88dCac60a48e64107A44D3d8651448cd9] = "Silva";
        _addresses[0xDfb0B8b7530a6444c73bFAda4A2ee3e482dCB1E3] = "Sophie";
        _addresses[0xBeb89bd95dD9624dEd83b12dB782EAE30805ef97] = "Thiago";
        _addresses[0xEe4768Af8caEeB042Da5205fcd66fdEBa0F3FD4f] = "Brito";
        _addresses[0x89e66f9b31DAd708b4c5B78EF9097b1cf429c8ee] = "ulopesu";
        _addresses[0x48cd1D1478eBD643dba50FB3e99030BE4F84d468] = "Vinicius";
        _addresses[0xFADAf046e6Acd9E276940C728f6B3Ac1A043054c] = "Bonella";

        prof = 0xA5095296F7fF9Bdb01c22e3E0aC974C8963378ad; // Roberta
        // prof = 0xFED450e1300CEe0f69b1F01FA85140646E596567; // Eu para testes
    }

    // Verificação para ver se a caller é a professora
    modifier onlyProf {
        require(msg.sender == prof, "Method reserved to the professor");
        _;
   }

    // Verificação para ver se a votação ainda esta aberta
    modifier isFinished {
        require(ended == false, "Poll is already closed");
        _;
    }

    // Verificações gerais para votar
    modifier isAuthorized(string memory codenome, uint256 amount) {
        // Checa se quem tentou votar é um usuário válido
        require(keccak256(bytes(_addresses[msg.sender])) != keccak256(bytes("")), "Invalid user");

        // Checa se o codenome é de um usuário valido
        require(_users[codenome] != address(0x0), "Invalid reviever");

        // Checa se o próprio usuário não pode votar em si mesmo
        require(msg.sender != _users[codenome], "Cant vote in yourself");

        // Checa se um usuario ja votou em um codenome
        require(_votes[msg.sender][codenome] == false, "Already voted on this user");

        // A quantidade de turings não pode ser maior do que 2 (neste caso 2*10^18 saTurings)
        require(amount <= 2*10**18, "Amount is to big, max is 2 Turings");
        _;
    }

    // Método que só pode ser chamado pela professora que finaliza a votação
    function endVoting() public onlyProf isFinished {
        ended = true;
    }

    // Método que pode ser usado somente pela professora para atribuir Turings
    function issueToken(address receiver , uint256 amount) public onlyProf {
        // saTuring é a menor unidade de turing (10^-18)
        _mint(receiver, amount);
    }

    function vote(string memory codenome, uint256 amount) public isFinished isAuthorized(codenome, amount) {
        // Da mint na conta do codenome indicado
        _mint(_users[codenome], amount);

        // Quem votou ganha 0.2 Turings
        _mint(msg.sender, 2*10**17);

        _votes[msg.sender][codenome] = true;
    }

}
