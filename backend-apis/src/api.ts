import express from "express";
import { adminAccount } from "./starknetClient";
import { CONTRACT_ADDRESS } from "./config";
import { uint256 } from "starknet";

const router = express.Router();

router.post("/mint", async (req, res) => {
    const { to, amount } = req.body;

    const call = {
        contractAddress: CONTRACT_ADDRESS,
        entrypoint: "mint_from_curve",
        calldata: [to, ...Object.values(uint256.bnToUint256(BigInt(amount)))]
    };

    try {
        const tx = await adminAccount.execute(call);
        res.json({ txHash: tx.transaction_hash });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
