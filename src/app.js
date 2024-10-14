// Import Web3.js library (make sure you have it included in your HTML file)
// <script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.6.1/web3.min.js"></script>

// Connect to the blockchain and interact with the smart contract
let web3;
let courseReviewContract;
const contractAddress = '0xA343042098DFB30a5e341631E6BbBF4b02790C4e'; // Replace with your contract address
const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "question1Rating",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "question2Rating",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "reviewText",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "studentAddress",
                "type": "address"
            }
        ],
        "name": "ReviewSubmitted",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "reviews",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "question1Rating",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "question2Rating",
                "type": "uint8"
            },
            {
                "internalType": "string",
                "name": "reviewText",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "studentAddress",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "_question1Rating",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "_question2Rating",
                "type": "uint8"
            },
            {
                "internalType": "string",
                "name": "_reviewText",
                "type": "string"
            }
        ],
        "name": "storeReview",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getReview",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint8",
                        "name": "question1Rating",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "question2Rating",
                        "type": "uint8"
                    },
                    {
                        "internalType": "string",
                        "name": "reviewText",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "studentAddress",
                        "type": "address"
                    }
                ],
                "internalType": "struct CourseReview.Review",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "getReviewCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
];

// Initialize the app on load
async function init() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        // Create a new Web3 instance
        web3 = new Web3(window.ethereum);

        // Request account access
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Accounts:', accounts);
            // Create the contract instance
            courseReviewContract = new web3.eth.Contract(contractABI, contractAddress);
        } catch (error) {
            console.error('User denied account access or there was an error:', error);
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this dApp.');
    }
}

// Handle form submission
document.getElementById('reviewForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
  
    const rating1 = document.getElementById('rating1').value;
    const rating2 = document.getElementById('rating2').value;
    const reviewText = document.getElementById('reviewText').value;
  
    try {
        // Send review data to the blockchain
        const accounts = await web3.eth.getAccounts(); // Get accounts
        await courseReviewContract.methods.storeReview(rating1, rating2, reviewText).send({ from: accounts[0] });
        console.log('Review submitted successfully!');
        document.getElementById('feedback').innerText = 'Review submitted successfully!';
    } catch (error) {
        console.error("Error submitting review: ", error);
        document.getElementById('feedback').innerText = 'Error submitting review: ' + error.message;
    }
});

// Call the init function when the page loads
window.onload = init;
