// 1. Declare global variable to store the smart contract instance
let TuringContract;

// 2. Set contract address and ABI
const Turing_Contract_Address = "0x7C4848f505FB33E8753C0bedd26f46414756A06E";
const Turing_Contract_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ended",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "issueToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "codenome",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    const signer = provider.getSigner(accounts[0]);

    /* 3.1 Create instance of turing smart contract */
    TuringContract = new ethers.Contract(
      Turing_Contract_Address,
      Turing_Contract_ABI,
      signer
    );
  });
});

// 4. Creating variables for reusable dom elements
const voteForm = document.querySelector("#voteForm");
const submitVoteButton = document.querySelector("#submitVoteForm");
const submitIssueButton = document.querySelector("#submitIssueForm");
const finishVoteButton = document.querySelector("#finishVoteButton");
const submitVisualizeButton = document.querySelector("#submitVisualizeButton");
const modalAlunoButton = document.querySelector("#modalAlunoButton");
const modalProfessorButton = document.querySelector("#modalProfessorButton");

/* 5.1 Get inputs from vote form */
const userInputAluno = document.querySelector("#selectUser");
const saTuringsValueInputAluno = document.querySelector("#saTuringsValue");
const expoentInputAluno = document.querySelector("#selectExpoent");

/* 5. Function to set pet details */
const setNewVote = () => {

    submitVoteButton.innerText = "Enviando...";
    submitVoteButton.disabled = true;

    // 5.2 Getting values from the inputs
    var username = userInputAluno.options[userInputAluno.selectedIndex].value;
    var value = saTuringsValueInputAluno.value;
    var expoent = expoentInputAluno.value;
    
    var saTurings = value+"0".repeat(Number(expoent));

    /* 5.3 Set vote details in smart contract */
    TuringContract.vote(username, saTurings)
        .then(() => {
            /* 5.4 Reset form */
            userInputAluno.value = "Andre";
            saTuringsValueInputAluno.value = "2";
            expoentInputAluno.value = "0";
            submitVoteButton.innerText = "Enviar";

            $('#modalAluno').modal('hide');
            submitVoteButton.disabled = false;
        })
        .catch((err) => {
            // If error occurs, display error message
            submitVoteButton.innerText = "Enviar";
            submitVoteButton.disabled = false;

            alert("Error setting vote details" + err.message);
        });
};

/* Function to set vote details on click of button */
submitVoteButton.addEventListener("click", setNewVote);

const userInputProfessor = document.querySelector("#selectUserProfessor");
const saTuringsValueInputProfessor = document.querySelector("#saTuringsValueProfessor");
const expoentInputProfessor = document.querySelector("#selectExpoentProfessor");

const ht = new Map();
ht.set("Andre", 	"0xD07318971e2C15b4f8d3d28A0AEF8F16B9D8EAb6");
ht.set("Antonio", 	"0x127B963B9918261Ef713cB7950c4AD16d4Fe18c6");
ht.set("Ratonilo",	"0x5d84D451296908aFA110e6B37b64B1605658283f");
ht.set("eduardo", 	"0x500E357176eE9D56c336e0DC090717a5B1119cC2");
ht.set("Enzo",		"0x5217A9963846a4fD62d35BB7d58eAB2dF9D9CBb8");
ht.set("Fernando",	"0xFED450e1300CEe0f69b1F01FA85140646E596567");
ht.set("Juliana",	"0xFec23E4c9540bfA6BBE39c4728652F2def99bc1e");
ht.set("Altoe",		"0x6701D0C23d51231E676698446E55F4936F5d99dF");
ht.set("Salgado",	"0x8321730F4D59c01f5739f1684ABa85f8262f8980");
ht.set("Regata",	"0x4A35eFD10c4b467508C35f8C309Ebc34ae1e129a");
ht.set("Luis",		"0xDD551702Dc580B7fDa2ddB7a1Ca63d29E8CDCf33");
ht.set("Nicolas",	"0x01fe9DdD4916019beC6268724189B2EED8C2D49a");
ht.set("Rauta",		"0x726150C568f3C7f1BB3C47fd1A224a5C3F706BB1");
ht.set("Silva",		"0xCAFE34A88dCac60a48e64107A44D3d8651448cd9");
ht.set("Sophie",	"0xDfb0B8b7530a6444c73bFAda4A2ee3e482dCB1E3");
ht.set("Thiago",	"0xBeb89bd95dD9624dEd83b12dB782EAE30805ef97");
ht.set("Brito",		"0xEe4768Af8caEeB042Da5205fcd66fdEBa0F3FD4f");
ht.set("ulopesu",	"0x89e66f9b31DAd708b4c5B78EF9097b1cf429c8ee");
ht.set("Vinicius",	"0x48cd1D1478eBD643dba50FB3e99030BE4F84d468");
ht.set("Bonella",	"0xFADAf046e6Acd9E276940C728f6B3Ac1A043054c");
ht.set("Remix",		"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4");

/* 5. Function to set pet details */
const setNewIssueToken = () => {

    submitIssueButton.innerText = "Enviando...";
    submitIssueButton.disabled = true;

    // 5.2 Getting values from the inputs
    var username = userInputProfessor.options[userInputProfessor.selectedIndex].value;
    var value = saTuringsValueInputProfessor.value;
    var expoent = expoentInputProfessor.value;
    
    var saTurings = value+"0".repeat(Number(expoent));


    /* 5.3 Set vote details in smart contract */
    TuringContract.issueToken(ht.get(username), saTurings)
        .then(() => {
            /* 5.4 Reset form */
            userInputProfessor.value = "Andre";
            saTuringsValueInputProfessor.value = "2";
            expoentInputProfessor.value = "0";
            submitIssueButton.innerText = "Enviar";

            $('#modalProfessor').modal('hide');
            submitIssueButton.disabled = false;
        })
        .catch((err) => {
            // If error occurs, display error message
            submitIssueButton.innerText = "Enviar";            
            submitIssueButton.disabled = false;

            alert("Error setting issueToken details" + err.message);
        });
};

/* Function to set vote details on click of button */
submitIssueButton.addEventListener("click", setNewIssueToken);

const disableButtons = () => {
	submitVoteButton.disabled = true
	finishVoteButton.disabled = true;
	$('#modalProfessor').modal('hide');
}

const finishVote = () => {
    TuringContract.endVoting()
    .then(() => {
		disableButtons()
    })
    .catch((err) => {
		disableButtons()
        alert("Error setting endVoting details" + err.message);
    })
};

finishVoteButton.addEventListener("click", finishVote);

const userInputVisualize = document.querySelector("#selectUserVisualize");
const saTuringsValueOutputVisualize = document.querySelector("#saTuringsValueVisualize");

const revertChanges = () => {
	submitVisualizeButton.innerText = "Checar";
	userInputVisualize.disabled = false;
	modalAlunoButton.disabled = false;
	modalProfessorButton.disabled = false;
	submitVisualizeButton.disabled = false;
}

const check = async () => {

	submitVisualizeButton.innerText = "Checando...";
	userInputVisualize.disabled = true;
	modalAlunoButton.disabled = true;
	modalProfessorButton.disabled = true;
    submitVisualizeButton.disabled = true;

	// 5.2 Getting values from the inputs
	var username = userInputVisualize.options[userInputVisualize.selectedIndex].value;

	try {
		const amount = await TuringContract.balanceOf(ht.get(username));
		saTuringsValueOutputVisualize.value = Number(amount._hex) / (10 ** 18);
		revertChanges()
    } catch (err) {
		alert("Error fetching "+ username +" details. " + err.message);
	}
}

submitVisualizeButton.addEventListener("click", check);