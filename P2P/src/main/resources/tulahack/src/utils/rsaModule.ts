import rsa from 'js-crypto-rsa'

type KeyPair = {
    pubKey: JsonWebKey,
    privKey: JsonWebKey
}

export const generateRSA = async (): Promise<KeyPair> => {
    return rsa.generateKey(2048).then( (key) => {
        return {pubKey: key.publicKey, privKey: key.privateKey};
    });
}

export const encryptMsg = async (plainMsg: string, pubKey: JsonWebKey): Promise<Uint8Array> => {
    return rsa.encrypt(
        new TextEncoder().encode(plainMsg),
        pubKey,
        'SHA-256',
    ).then((encrypted) => {
        return encrypted;
    });
}

export const decryptMsg = async (encryptedMsg: Uint8Array, privKey: JsonWebKey): Promise<string> => {
    return rsa.decrypt(
      encryptedMsg,
      privKey,
      'SHA-256',
    ).then((decrypted) => {
        return new TextDecoder().decode(decrypted);
    });
}
