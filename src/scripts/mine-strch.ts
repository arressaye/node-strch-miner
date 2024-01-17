import fetch from "node-fetch";
import crypto from "crypto";
import { BlockchainConfig, Solution, MinerStatus } from "../types/default.js";

const host = "https://starch.one/api";
const minerIDs: string[] = ["F145AAE2", "BF1D681A", "2E4138CF", "1FD6F320", "D2F8ECB1"]; //fill array with miner IDs. These miners will be used for mining in this script.

function getColor() {
  return `#${Buffer.from(crypto.randomBytes(3)).toString("hex").toUpperCase()}`;
}

async function getConfig(): Promise<BlockchainConfig | undefined> {
  const request = await fetch(`${host}/blockchain_config`).catch((e) => {
    console.log(`Error fetching in getConfig()`, e);
  });
  if (request && request.ok) {
    const config = (await request.json().catch((e) => console.log(`Error decoding JSON in getConfig()`, e))) as BlockchainConfig;
    return config;
  } else return undefined;
}

function solve(minerID: string, config: BlockchainConfig): Solution | undefined {
  if (!minerID || !config) return undefined;
  const color = getColor();
  const lastHash = config.last_block.hash;
  const string = `${lastHash} ${minerID} ${color}`;
  const hashFunction = crypto.createHash("sha-256");
  hashFunction.update(Buffer.from(string, "ascii"));
  const newHash = Buffer.from(hashFunction.digest()).toString("hex");
  return {
    hash: newHash,
    miner_id: minerID,
    color: color,
  };
}

async function submitBlocks(blocks: Solution[]): Promise<void> {
  const datatToSend = JSON.stringify({ blocks });
  const request = await fetch(`${host}/submit_blocks`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: datatToSend,
  }).catch((e) => {
    console.log(`Error submitting block in submitBlocks()`, e);
  });
  if (request && request.ok) {
    console.log("Blocks submitted:");
    console.log({ blocks });
  }
}

async function checkStatus(miners: string[]) {
  let allStatus: MinerStatus[] = [];
  for (const miner of miners) {
    const request = await fetch(`${host}/miner/${miner}`).catch((e) => {
      console.log(`Error checking status for miner ${miner} at checkStatus()`, e);
    });
    if (request && request.ok) {
      const status = (await request.json().catch((e) => {
        console.log(`Error decoding JSON in checkStatus()`, e);
      })) as MinerStatus;
      if (status) allStatus.push(status);
    }
  }
  return allStatus;
}

async function mine() {
  console.log(`Mining for ${minerIDs}`);
  console.log("Current miner status:");
  console.log(await checkStatus(minerIDs));
  const config = await getConfig();
  if (!config) return;
  let blocks: Solution[] = [];
  for (const miner of minerIDs) {
    const newBlock = solve(miner, config);
    if (!newBlock) continue;
    blocks.push(newBlock);
  }
  if (blocks.length > 0) await submitBlocks(blocks);
  setTimeout(mine, 49000);
}

export { mine };
