const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

class Blockchain {
    constructor() {
        this.chain = [];
        this.current_transactions = [];

        // create the genesis block
        this.generateNewBlock(100, 1);
    }
    
    /** Create a new block in the blockchain
     * 
     * @param {int} proof - the proof given by the PoW algorithm
     * @param {string} previousHash - Optional; 
     * @returns {Object} - new block
     */
    generateNewBlock(proof, previousHash = null) {
        let block = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.current_transactions,
            proof: proof,
            previous_hash: previousHash || this.hashBlock(this.chain[-1])
        };

        // reset current list of transactions
        this.current_transactions = [];
        this.chain.push(block);

        return block;
    }

    /** Creates a new transaction to go into the next mined block.
     * 
     * @param {string} senderAddr - Address of the Sender 
     * @param {string} receiverAddr - Address of the recipient
     * @param {int} amount - amount to spend
     * @returns {int} The index of the block that will hold this transaction
     */
    newTransaction(senderAddr, receiverAddr, amount) {
        this.current_transactions.push({
            sender: senderAddr,
            recipient: receiverAddr,
            amount: amount
        });

        // return block index:
        let lastBlock = this.getLastBlock();
        return lastBlock.index + 1;
    }

    // @property
    // Returns the last Block in the chain
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
        
    /** Creates a SHA-256 hash of a block
     * 
     * @param {Object} block 
     * @returns {string}
     */
    static hashBlock(block) {
        let hash = crypto.createHash('sha256');
        hash.update(JSON.stringify(block));

        return hash.digest('hex');
    }

    /** Validates the proof: Does hash(last_proof, proof) contain 4 leading zeros?
     * 
     * @param {int} lastProof - previous proof
     * @param {int} proof - current proof
     * @returns {Boolean} True if correct, False if not
     */
    static isValidProof(lastProof, proof) {
        let hash = crypto.createHash('sha256');
        let guess = `${lastProof}${proof}`;
        let guessHash = hash.update(guess);

        return guessHash.digest('hex').substr(-4) == "0000";
    }

    /** Simple Proof of Work algorithm
     * Find a number p' such that hash(pp') contains 4 leading zeros, 
     * where p is the previous p'.
     * p is the previous proof, and p' is the new proof
     * 
     * @param {int} last_proof 
     */
    proof_of_work(last_proof) {
        let proof = 0;

        // keep incrementing the proof guess until a match is hit
        while (!this.constructor.isValidProof(last_proof, proof)) {
            proof++; 
        }

        return proof;
    }

    /* Example block 
    block = {
        'index': 1,
        'timestamp': 1506057125.900785,
        'transactions': [
            {
                'sender': "8527147fe1f5426f9dd545de4b27ee00",
                'recipient': "a77f5cdfa2934df3954a5c7c7da5df1f",
                'amount': 5
            }
        ],
        'proof': 324984774000,
        'previous_hash': "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
    };
    */
}

// Set up the server
var app = express();
app.use(bodyParser.json());
var nodeUUID = uuidv4(); // generate UUID for this node
var blockchain = new Blockchain();

app.get('/mine', function(req, res) {
    // We run the proof of work algorithm to get the next proof...
    let last_block = blockchain.getLastBlock();
    let lastProof = last_block.proof;
    let proof = blockchain.proof_of_work(lastProof);

    // We must receive a reward for finding the proof.
    // The sender is "0" to signify that this node has mined a new coin.
    blockchain.newTransaction(sender="0", recipient=nodeUUID, amount=1);

    // Forge the new Block by adding it to the chain
    let previousHash = Blockchain.hashBlock(last_block);
    let block = blockchain.generateNewBlock(proof, previousHash);

    let response = {
        'message': "New Block Forged",
        'index': block.index,
        'transactions': block.transactions,
        'proof': block.proof,
        'previous_hash': block.previous_hash,
    };

    return res.status(200).send(JSON.stringify(response));
});

app.get('/chain', function(req, res) {
    let response = {
        'chain': blockchain.chain,
        'length': blockchain.chain.length,
    };

    res.status(200).send(JSON.stringify(response));
});
    
/**
 * Example send to server
 * {
      "sender": "my address",
      "recipient": "someone else's address",
      "amount": 5
    }
 */
app.post('/transaction/new', function(req, res) {
    // console.log(req.body);
    // console.log(req.body.sender);
    // console.log(req.body.recipient);
    // console.log(req.body.amount);

    // Check that the required fields are in the POST'ed data 
    if (!req.body.sender || !req.body.recipient || !req.body.amount) {
        return res.status(404).send("Error, missing POST request value(s)");
    }

    // create new transaction:
    let index = blockchain.newTransaction(req.body.sender, req.body.recipient, req.body.amount);
    let response = {
        'message': `Transaction will be added to Block ${index}`
    };

    return res.status(201).send(JSON.stringify(response));
});

const port = 5000; // process.env.PORT || 5000;
app.listen(port, function() {
  console.log('Node app is running on port', port);
});
