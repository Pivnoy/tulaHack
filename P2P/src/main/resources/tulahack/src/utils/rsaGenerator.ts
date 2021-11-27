
type keyPair = {
    public: string,
    private: string
}

export const generateRSA = (seed: string): keyPair => {
    return {public: 'a', private: 'b' };
}