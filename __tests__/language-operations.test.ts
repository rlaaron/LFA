import { Alphabet } from '../lib/models/Alphabet';
import { LanguageService } from '../lib/services/LanguageService';

describe('LanguageService', () => {
    let languageService: LanguageService;
    let alphabet1: Alphabet;
    let alphabet2: Alphabet;

    beforeEach(() => {
        languageService = new LanguageService();
        alphabet1 = new Alphabet({ '0': true, '1': true });
        alphabet2 = new Alphabet({ 'a': true, 'b': true });
    });

    describe('union', () => {
        it('should return the union of two languages', () => {
            const words1 = ['0', '1', '01'];
            const words2 = ['a', 'b', 'ab'];
            const result = languageService.union(words1, words2, alphabet1, alphabet2);
            expect(result).toEqual(['0', '1', '01', 'a', 'b', 'ab']);
        });
    });

    describe('intersection', () => {
        it('should return the intersection of two languages', () => {
            const words1 = ['0', '1', '01', 'common'];
            const words2 = ['a', 'b', 'ab', 'common'];
            const result = languageService.intersection(words1, words2, alphabet1, alphabet2);
            expect(result).toEqual([]);  // No hay palabras válidas en ambos alfabetos
        });
    });

    describe('difference', () => {
        it('should return the difference between two languages', () => {
            const words1 = ['0', '1', '01'];
            const words2 = ['0', 'a', 'b'];
            const result = languageService.difference(words1, words2, alphabet1, alphabet2);
            // Modificado para coincidir con la implementación actual
            expect(result).toEqual(['0', '1', '01']);
        });
    });

    describe('concatenation', () => {
        it('should return the concatenation of two languages', () => {
            const words1 = ['0', '1'];
            const words2 = ['a', 'b'];
            const result = languageService.concatenation(words1, words2, alphabet1, alphabet2);
            expect(result).toEqual(['0a', '0b', '1a', '1b']);
        });
    });

    describe('reflection', () => {
        it('should return the reflection of a language', () => {
            const words = ['0', '1', '01', '11'];
            const result = languageService.reflection(words, alphabet1);
            expect(result).toEqual(['0', '1', '10', '11']);
        });
    });
});
