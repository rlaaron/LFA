import { IAlphabet } from "../interfaces/IAlphabet";
import { IWordOperations } from "../interfaces/IWord";

export class WordService implements IWordOperations {
    isValid(word: string, alphabet: IAlphabet): boolean {
        const symbols = this.splitIntoSymbols(word, alphabet);
        return symbols !== null;
    }

    concatenate(word1: string, word2: string, alphabet: IAlphabet): string {
        if (!this.isValid(word1, alphabet) || !this.isValid(word2, alphabet)) {
            throw new Error("Invalid words for the given alphabet");
        }
        return word1 + word2;
    }

    reflect(word: string, alphabet: IAlphabet): string {
        const symbols = this.splitIntoSymbols(word, alphabet);
        if (!symbols) {
            throw new Error("Invalid word for the given alphabet");
        }
        return symbols.reverse().join("");
    }

    power(word: string, exponent: number, alphabet: IAlphabet): string {
        if (!this.isValid(word, alphabet)) {
            throw new Error("Invalid word for the given alphabet");
        }
        if (exponent < 0) {
            throw new Error("Exponent must be non-negative");
        }
        return word.repeat(exponent);
    }

    isPalindrome(word: string, alphabet: IAlphabet): boolean {
        if (!this.isValid(word, alphabet)) {
            return false;
        }
        const symbols = this.splitIntoSymbols(word, alphabet);
        if (!symbols) return false;
        
        for (let i = 0; i < Math.floor(symbols.length / 2); i++) {
            if (symbols[i] !== symbols[symbols.length - 1 - i]) {
                return false;
            }
        }
        return true;
    }

    length(word: string, alphabet: IAlphabet): number {
        const symbols = this.splitIntoSymbols(word, alphabet);
        return symbols ? symbols.length : 0;
    }

    // Método auxiliar para dividir una palabra en símbolos
    private splitIntoSymbols(word: string, alphabet: IAlphabet): string[] | null {
        if (!word) return [];

        const symbols: string[] = [];
        let remainingWord = word;

        while (remainingWord.length > 0) {
            let foundSymbol = false;
            // Intentar encontrar el símbolo más largo que coincida
            for (const symbol of Object.keys(alphabet.symbols).sort((a, b) => b.length - a.length)) {
                if (remainingWord.startsWith(symbol) && alphabet.symbols[symbol]) {
                    symbols.push(symbol);
                    remainingWord = remainingWord.slice(symbol.length);
                    foundSymbol = true;
                    break;
                }
            }
            if (!foundSymbol) {
                return null; // Palabra inválida
            }
        }

        return symbols;
    }
}
