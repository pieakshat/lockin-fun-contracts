import dotenv from 'dotenv';
dotenv.config();

export const RPC_URL = process.env.STARKNET_RPC!;
export const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY!;
export const ADMIN_ACCOUNT_ADDRESS = process.env.ADMIN_ACCOUNT_ADDRESS!;
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
