const crypto = require('crypto');
const express = require('express');

// Do some express stuff
var app = express();

const port = 8080; // process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Node app is running on port', port);
});

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
            previous_hash: previousHash || this.hash(this.chain[-1])
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

        return this.getLastBlockIndex() + 1;
    }

    // @property
    // Returns the last Block in the chain
    getLastBlockIndex() {
        return this.chain[this.chain.length - 1];
    }
        
    /** Creates a SHA-256 hash of a block
     * 
     * @param {Object} block 
     * @returns {string}
     */
    static hash(block) {
        let hash = crypto.createHash('sha256');
        hash.update(JSON.stringify(block));

        return hash.digest('hex');
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
        while (!this.isValidProof(last_proof, proof)) {
            proof++; 
        }
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
