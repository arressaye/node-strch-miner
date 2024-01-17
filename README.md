### $STRCH Miner for Node.js

This is a $STRCH miner built in TypeScript to be run in Node.js  
Much of the code originates from PyTater and PyTater Mini, a Python-based $STRCH miner.  

Check them out here:  

PyTater: https://github.com/StarchIndustries/PyTater  
PyTater Mini: https://github.com/StarchIndustries/PyTaterMini/blob/main/PyTaterMini

If you like what we build, check out our project here:  

RaggieWorld: https://raggie.world  
CryptoRaggies: https://cryptoraggies.io  
CryptoRaggies X: https://x.com/cryptoraggies  
CryptoRaggies Discord: https://discord.gg/cryptoraggies

### How to use:

#### To install:  
`npm install`

#### To run:  
`npm start`

#### To use in your own project:  
If you already have a Node.js project written in TypeScript, you can simply copy the main script `src/scripts/mine-strch.ts` into your own project repository. The script exports the `mine()` function which can simply be imported anywhere in your own project and called.

### Notes:

The array `minerIDs` in `src/scripts/mine-strch.ts` contains minerIDs of my own $STRCH miners. In order to mine using your own miners, you will need to replace that with your own miner IDs. However you are also very welcome to leave my minerIDs in to help me mine more $STRCH!  
