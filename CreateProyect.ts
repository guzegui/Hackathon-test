import { QubicTransaction } from "@qubic-lib/qubic-ts-library/dist/qubic-types/QubicTransaction.js";
import { CreateProjectPayload } from "./CreateProyectpayload.ts";
import { PublicKey } from "@qubic-lib/qubic-ts-library/dist/qubic-types/PublicKey.js";
import { Long } from "@qubic-lib/qubic-ts-library/dist/qubic-types/Long.js";
import { QubicDefinitions } from "@qubic-lib/qubic-ts-library/dist/QubicDefinitions.js";
import { getRPCStatus } from "./getRpcStatus.ts";
import { broadcastTransaction } from "./BroadcastTransaction.ts";

const BaseURL = "http://185.84.224.100"

export async function createProject() {
    const sourceID = "EQMBBVYGZOFUIHEXFOXKTFTANEKBXLBXHAYDFFMREEMRQEVADYMMEWACTODD"
    const sourceSeed = "xpsxzzfqvaohzzwlbofvqkqeemzhnrscpeeokoumekfodtgzmwghtqm"

    const createProjectPayload = new CreateProjectPayload({});
    const rpcStatus = await getRPCStatus();
    const currentTick = rpcStatus.lastProcessedTick.tickNumber;
    const targetTick = currentTick + 15;

    const tx = new QubicTransaction().setSourcePublicKey(sourceID)
        .setDestinationPublicKey("WEVWZOHASCHODGRVRFKZCGUDGHEDWCAZIZXWBUHZEAMNVHKZPOIZKUEHNQSJ")
        .setAmount(10)
        .setTick(targetTick)
        .setInputType(3)
        .setInputSize(0)
        .setPayload(createProjectPayload.getTransactionPayload());

    await tx.build(sourceSeed);

    const response = await broadcastTransaction(tx);
    const responseData = await response.json();

    if (!responseData.ok) {
        console.log("Failed to broadcast transaction");
        return;
    }
    console.log("Transaction broadcasted successfully");
    console.log("Transaction ID: " + responseData.transactionId)
    console.log("Scheduled for tick: " + targetTick)
}

await createProject();
