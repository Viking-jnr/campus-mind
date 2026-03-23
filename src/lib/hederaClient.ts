import { Client, AccountId, PrivateKey } from "@hashgraph/sdk";

const operatorId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);
const operatorKey = PrivateKey.fromStringECDSA(process.env.HEDERA_PRIVATE_KEY!);

export const HederaClient = Client.forTestnet().setOperator(operatorId, operatorKey);