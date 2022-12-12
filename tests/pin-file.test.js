import pinFile from "../modules/pin-file";

const data = {
    questions: [
        {
            question: 'What is the best decentralised file storage',
            _id: '124321',
            choices: [
                {
                    _id: '32cc33',
                    choice: 'IPFS'
                },
                {
                    _id:  '124321232355',
                    choice: 'Arweave'
                }
            ]
        },
        {
            question: 'What is the best blockchain',
            _id:  '1243dd21d2121',
            choices: [
                {
                    _id:  '124313cxcc1',
                    choice: 'Polygon'
                },
                {
                    _id: '124321121xdsd',
                    choice: 'Ethereum'
                }
            ]
        }
    ],
}


describe('Pin json data and retrieve hash', () => {
    it('should be returning',async () => {
        expect(await pinFile({}, {}, data, 'survey')).toHaveReturned()
    
    })
    it('should be a string returned', async () => {
        const ipfsHash = await pinFile({}, {}, data, 'survey')
        expect(typeof ipfsHash).toBe('string');
    })
})


// const runTest = async () => {
//     const pinnedFile = await pinFile({}, {}, data, 'survey')
//     console.log(pinnedFile)
// }

// runTest()

