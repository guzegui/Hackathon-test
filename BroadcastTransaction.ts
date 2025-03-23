const baseURL = "http://185.84.224.100"

export async function broadcastTransaction(transaction) {

    const encodedTransaction = transaction.encodeTransactionToBase64(transaction.getPackageData())

    return await fetch(baseURL + "/v1/broadcast-transaction",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    encodedTransaction: encodedTransaction
                }
            )
        });
}