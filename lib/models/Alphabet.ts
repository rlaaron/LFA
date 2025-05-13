import { IAlphabet, IAlphabetOperations } from "../interfaces/IAlphabet";

export class Alphabet implements IAlphabet, IAlphabetOperations {
    symbols: Record<string, boolean>;

    constructor(symbols: Record<string, boolean> = {}) {
        this.symbols = { ...symbols };
    }

    addSymbol(symbol: string): IAlphabet {
        this.symbols[symbol] = true;
        return this;
    }

    removeSymbol(symbol: string): IAlphabet {
        delete this.symbols[symbol];
        return this;
    }

    hasSymbol(symbol: string): boolean {
        return this.symbols[symbol] === true;
    }

    getSymbols(): Record<string, boolean> {
        return { ...this.symbols };
    }

    merge(other: IAlphabet): IAlphabet {
        return new Alphabet({
            ...this.symbols,
            ...other.symbols
        });
    }
}
