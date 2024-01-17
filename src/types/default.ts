type BlockchainConfig = {
  blockchain_size: number;
  halving_count: number;
  last_block: {
    color: string;
    datetime: string;
    hash: string;
    id: number;
    miner_id: string;
    previous_hash: string;
    reward: number;
  };
  rewards: number;
};

type Solution = {
  hash: string;
  miner_id: string;
  color: string;
};

type MinerStatus = {
  balance: number;
  blocks: number;
  miner_id: string;
};

export { BlockchainConfig, Solution, MinerStatus };
