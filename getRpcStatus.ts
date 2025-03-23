const baseURL = 'https://testnet-rpc.qubic.org'

// Querying the RPC status
export async function getRPCStatus() {
    const res = await fetch(`${baseURL}/v1/status`)
    const data = await res.json()

    console.log(JSON.stringify(data, null, 2))

    return data
}

await getRPCStatus()