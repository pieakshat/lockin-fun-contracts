import { Provider, Account, ec, json, CallData, uint256 } from "starknet";
import { RPC_URL, ADMIN_PRIVATE_KEY, ADMIN_ACCOUNT_ADDRESS } from "./config";

const provider = new Provider({ nodeUrl: RPC_URL });

const privateKey = ADMIN_PRIVATE_KEY;
const accountAddress = ADMIN_ACCOUNT_ADDRESS;

const adminAccount = new Account(provider, accountAddress, privateKey);

export { provider, adminAccount };
