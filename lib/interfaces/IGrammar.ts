export interface IGrammar {
    rules: Record<string, string[]>;
}

export interface IGrammarOperations {
    addRule(nonTerminal: string, productions: string[]): void;
    removeRule(nonTerminal: string): void;
    getProductions(nonTerminal: string): string[];
    generateWord(startSymbol: string): string;
}
