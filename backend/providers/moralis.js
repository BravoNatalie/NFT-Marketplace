const Moralis = require("moralis").default;
const fs = require("fs");

async function uploadToIpfs() {

    await Moralis.start({
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFmZjQ2YTViLTc5Y2UtNDFmMy1iNWI2LTJkZjQ5OGNlM2FhNCIsIm9yZ0lkIjoiMjQ1NDMxIiwidXNlcklkIjoiMjQ4MTY4IiwidHlwZUlkIjoiMTI1NGZkZjctOTFhOS00NTY4LThiZDEtODMzMjBkNTkwYjc1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTg2MTM1NDksImV4cCI6NDg1NDM3MzU0OX0.fYHCgwAO431G2UZ8W71-W08N0hqBuBzq1eDHtXVbTRg",
    });

    const uploadArray = [
        {
            path: "img.jpeg",
            content: fs.readFileSync('./imgs/a0e60137b750eb77d89495c281dcd2bb.jpeg', { encoding: 'base64' })
        },
        {
            path: "favResturants.json",
            content: {
                one: "Red Lobster",
                two: "Chipotle",
                three: "Chic-Fil-A"
            },
        },
    ];

    const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: uploadArray,
    });

    console.log(response.result)
}

const addToIpfs = async ({ path, content }) => {

    await Moralis.start({
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFmZjQ2YTViLTc5Y2UtNDFmMy1iNWI2LTJkZjQ5OGNlM2FhNCIsIm9yZ0lkIjoiMjQ1NDMxIiwidXNlcklkIjoiMjQ4MTY4IiwidHlwZUlkIjoiMTI1NGZkZjctOTFhOS00NTY4LThiZDEtODMzMjBkNTkwYjc1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTg2MTM1NDksImV4cCI6NDg1NDM3MzU0OX0.fYHCgwAO431G2UZ8W71-W08N0hqBuBzq1eDHtXVbTRg",
    });

    const uploadArray =
        [
            { path, content }
        ];

    const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: uploadArray,
    });

    return response.result;
}


module.exports = { addToIpfs }