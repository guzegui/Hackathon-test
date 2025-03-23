const baseURL = "http://185.84.224.100"

// Querying an individual transaction
export async function getTransaction() {

    const transactionId = 'rhcoiqjxbzwxiarupdazhmxgehielgfeivcrhiwapgfdprwcnvjzshbffcli'


    const res = await fetch(`${baseURL}/v2/transactions/${transactionId}`,)
    const data = await res.json()

    console.log(JSON.stringify(data, null, 2))

    return data
}

await getTransaction()