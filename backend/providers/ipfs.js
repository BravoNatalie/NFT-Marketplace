import { create, urlSource } from 'ipfs-http-client'


let client = create({ url: process.env.IPFS_URL });

// exports.add = async (content) => await client.add(content)

export const add = async (content) => {
    if (1 == 1)
        client = create({ url: process.env.IPFS_URL });

    return await client.add(content)
}

export const getIpfsCid = async ({ filename, content }) => {

    return (await add({
        path: './log/' + filename,
        content

      })).cid + '/' + filename;

}

const isOnline = () => client.isOnline();