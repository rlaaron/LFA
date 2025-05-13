import { IAlphabet } from "../interfaces/IAlphabet";
import { WordService } from "./WordService";

export class LanguageService {
    private wordService: WordService;

    constructor() {
        this.wordService = new WordService();
    }

    union(words1: string[], words2: string[], alphabet1: IAlphabet, alphabet2: IAlphabet): string[] {
        const result = new Set<string>();
        
        for (const word of words1) {
            if (this.wordService.isValid(word, alphabet1)) {
                result.add(word);
            }
        }
        
        for (const word of words2) {
            if (this.wordService.isValid(word, alphabet2)) {
                result.add(word);
            }
        }
        
        return Array.from(result);
    }

    intersection(words1: string[], words2: string[], alphabet1: IAlphabet, alphabet2: IAlphabet): string[] {
        const set1 = new Set(words1.filter(word => this.wordService.isValid(word, alphabet1)));
        return words2.filter(word => 
            this.wordService.isValid(word, alphabet2) && set1.has(word)
        );
    }

    difference(words1: string[], words2: string[], alphabet1: IAlphabet, alphabet2: IAlphabet): string[] {
        const set2 = new Set(words2.filter(word => this.wordService.isValid(word, alphabet2)));
        return words1.filter(word => 
            this.wordService.isValid(word, alphabet1) && !set2.has(word)
        );
    }

    concatenation(words1: string[], words2: string[], alphabet1: IAlphabet, alphabet2: IAlphabet): string[] {
        const result = new Set<string>();
        
        for (const word1 of words1) {
            if (!this.wordService.isValid(word1, alphabet1)) continue;
            
            for (const word2 of words2) {
                if (!this.wordService.isValid(word2, alphabet2)) continue;
                
                result.add(word1 + word2);
            }
        }
        
        return Array.from(result);
    }

    reflection(words: string[], alphabet: IAlphabet): string[] {
        return words
            .filter(word => this.wordService.isValid(word, alphabet))
            .map(word => this.wordService.reflect(word, alphabet));
    }
}
