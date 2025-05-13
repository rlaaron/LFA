export interface IAlphabet {
    symbols: Record<string, boolean>;
}

export interface IAlphabetOperations {
    addSymbol(symbol: string): IAlphabet;
    removeSymbol(symbol: string): IAlphabet;
    hasSymbol(symbol: string): boolean;
    getSymbols(): Record<string, boolean>;
    merge(other: IAlphabet): IAlphabet;
}
