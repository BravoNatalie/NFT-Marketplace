import contractData from '../config/contract-data.json';

export const config = {
    local: {
        contracts: {
            token: {
                address: contractData.token.address,
                abi: contractData.token.abi,
            },
            market: {
                address: contractData.market.address,
                abi: contractData.market.abi,
            }
        }

    }
}