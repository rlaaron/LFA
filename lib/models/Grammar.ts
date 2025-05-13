import { IGrammar, IGrammarOperations } from "../interfaces/IGrammar";

export class Grammar implements IGrammar, IGrammarOperations {
    rules: Record<string, string[]>;

    constructor(rules: Record<string, string[]> = {}) {
        this.rules = { ...rules };
    }

    addRule(nonTerminal: string, productions: string[]): void {
        this.rules[nonTerminal] = [...productions];
    }

    removeRule(nonTerminal: string): void {
        delete this.rules[nonTerminal];
    }

    getProductions(nonTerminal: string): string[] {
        return this.rules[nonTerminal] || [];
    }

    generateWord(startSymbol: string): string {
        const maxIterations = 100; // Evitar bucles infinitos
        let currentWord = startSymbol;
        let iterations = 0;

        while (iterations < maxIterations) {
            let foundNonTerminal = false;
            
            // Buscar el primer no terminal en la palabra actual
            for (const nonTerminal of Object.keys(this.rules)) {
                const index = currentWord.indexOf(nonTerminal);
                if (index !== -1) {
                    // Reemplazar el no terminal con una producción aleatoria
                    const productions = this.rules[nonTerminal];
                    const randomProduction = productions[Math.floor(Math.random() * productions.length)];
                    currentWord = currentWord.substring(0, index) + 
                                randomProduction + 
                                currentWord.substring(index + nonTerminal.length);
                    foundNonTerminal = true;
                    break;
                }
            }

            // Si no se encontraron no terminales, la palabra está completa
            if (!foundNonTerminal) {
                break;
            }

            iterations++;
        }

        return currentWord;
    }
}
