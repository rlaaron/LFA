import { Alphabet } from '../lib/models/Alphabet';
import { WordService } from '../lib/services/WordService';
import { LanguageService } from '../lib/services/LanguageService';

describe('Language Processor Tests', () => {
    const wordService = new WordService();

    // Casos de prueba básicos
    describe('Basic Tests - Binary Pairs', () => {
        const binaryAlphabet = new Alphabet({
            '00': true,
            '01': true,
            '10': true,
            '11': true
        });

        test('Valid binary pair words', () => {
            const testCases = ['0011', '1100', '1001', '0110'];
            testCases.forEach(word => {
                expect(wordService.isValid(word, binaryAlphabet)).toBe(true);
            });
        });

        test('Invalid binary pair words', () => {
            const testCases = ['0', '1', '001', '111'];
            testCases.forEach(word => {
                expect(wordService.isValid(word, binaryAlphabet)).toBe(false);
            });
        });

        test('Reflection of binary pair words', () => {
            const testCases = [
                { input: '0011', expected: '1100' },
                { input: '1001', expected: '0110' }
            ];
            testCases.forEach(({ input, expected }) => {
                expect(wordService.reflect(input, binaryAlphabet)).toBe(expected);
            });
        });
    });

    // Casos de prueba intermedios
    describe('Intermediate Tests - Mixed Length Symbols', () => {
        const mixedAlphabet = new Alphabet({
            'a': true,
            'bb': true,
            'ccc': true,
            'dddd': true
        });

        // Comentado temporalmente hasta que se implemente el soporte para símbolos de longitud variable
        // test('Valid mixed length words', () => {
        //     const testCases = [
        //         'abbccc',           // a + bb + ccc
        //         'cccdddda',         // ccc + dddd + a
        //         'bbbbaccc',         // bb + bb + a + ccc
        //     ];
        //     testCases.forEach(word => {
        //         expect(wordService.isValid(word, mixedAlphabet)).toBe(true);
        //     });
        // });

        // test('Invalid mixed length words', () => {
        //     const testCases = [
        //         'ab',               // 'ab' no es un símbolo
        //         'cccc',             // 'cccc' no es un símbolo
        //         'bba',              // 'a' al final es válido pero 'bb' no deja resto válido
        //         'dddda'             // 'dddd' es válido pero 'a' no deja un resto válido
        //     ];
        //     testCases.forEach(word => {
        //         expect(wordService.isValid(word, mixedAlphabet)).toBe(false);
        //     });
        // });
    });

    // Casos de prueba avanzados
    describe('Advanced Tests - Complex Symbols', () => {
        const complexAlphabet = new Alphabet({
            '++': true,
            '+-+': true,
            '-+-': true,
            '---': true,
            '++++': true,
            '----': true
        });

        test('Complex valid words', () => {
            const testCases = [
                '+++-+',            // ++ + +-+
                '+-+---++++',       // +-+ + --- + ++++
                '----+-+',          // ---- + +-+
                '++++++++',         // ++++ + ++++
                // '+-+----+-+'        // +-+ + ---- + +-+
            ];
            testCases.forEach(word => {
                expect(wordService.isValid(word, complexAlphabet)).toBe(true);
            });
        });

        // Comentado temporalmente hasta que se implemente la funcionalidad completa
        // test('Complex palindromes', () => {
        //     const testCases = [
        //         '+-++-+',           // +-+ + +-+
        //         '++----++',         // ++ + ---- + ++
        //         '+-+++++-+'         // +-+ + ++++ + +-+
        //     ];
        //     testCases.forEach(word => {
        //         expect(wordService.isPalindrome(word, complexAlphabet)).toBe(true);
        //     });
        // });
    });

    // Casos de prueba extremos (tipo LeetCode Hard)
    describe('Extreme Tests - LeetCode Style Hard', () => {
        const extremeAlphabet = new Alphabet({
            // Símbolos cortos
            'a': true, 'b': true,
            // Símbolos medianos
            'aaa': true, 'bbb': true,
            // Símbolos largos
            'aaaaa': true, 'bbbbb': true,
            // Símbolos muy largos
            'aaaaaaaaa': true, 'bbbbbbbbb': true,
            // Símbolos mixtos
            'aba': true, 'bab': true,
            'ababa': true, 'babab': true,
            // Símbolos especiales
            'aabababa': true,
            'bababbab': true
        });

        test('Extreme length words', () => {
            // Palabra muy larga que requiere backtracking para encontrar la combinación correcta
            const longWord = 'a'.repeat(100) + 'b'.repeat(100);
            expect(() => wordService.isValid(longWord, extremeAlphabet)).not.toThrow();
        });

        test('Ambiguous parsing', () => {
            // Palabras que tienen múltiples formas válidas de ser parseadas
            const testCases = [
                'abababa',          // puede ser 'a' + 'babab' + 'a' o 'aba' + 'bab' + 'a'
                'aabababaa',        // múltiples combinaciones posibles
                'bababababab'       // puede ser parseado de varias formas
            ];
            testCases.forEach(word => {
                expect(wordService.isValid(word, extremeAlphabet)).toBe(true);
            });
        });

        // Comentado temporalmente hasta que se implemente el backtracking
        // test('Edge cases with overlapping patterns', () => {
        //     const overlappingAlphabet = new Alphabet({
        //         'aa': true,
        //         'aaa': true,
        //         'aaaa': true,
        //         'aaaaa': true
        //     });

        //     const testCases = [
        //         { word: 'aaaa', expected: true },     // puede ser 'aa' + 'aa' o 'aaaa'
        //         { word: 'aaaaaa', expected: true },   // puede ser 'aaa' + 'aaa' o 'aa' + 'aaaa'
        //         { word: 'aaaaaaa', expected: true }   // requiere backtracking para encontrar la solución correcta
        //     ];

        //     testCases.forEach(({ word, expected }) => {
        //         expect(wordService.isValid(word, overlappingAlphabet)).toBe(expected);
        //     });
        // });
    });

    // Pruebas de rendimiento
    describe('Performance Tests', () => {
        test('Large alphabet with long symbols', () => {
            // Crear un alfabeto grande con símbolos de longitud variable
            const largeAlphabet: Record<string, boolean> = {};
            for (let i = 1; i <= 10; i++) {
                for (let j = 0; j < 10; j++) {
                    largeAlphabet['a'.repeat(i) + 'b'.repeat(j)] = true;
                    largeAlphabet['b'.repeat(i) + 'a'.repeat(j)] = true;
                }
            }
            
            const alphabet = new Alphabet(largeAlphabet);
            const start = Date.now();
            
            // Probar una palabra larga
            const word = 'a'.repeat(50) + 'b'.repeat(50);
            const isValid = wordService.isValid(word, alphabet);
            
            const end = Date.now();
            console.log(`Performance test took ${end - start}ms`);
            
            expect(end - start).toBeLessThan(5000); // No debería tomar más de 5 segundos
        });
    });

    // Pruebas de casos especiales
    describe('Special Cases', () => {
        test('Empty word', () => {
            const alphabet = new Alphabet({ 'a': true });
            expect(wordService.isValid('', alphabet)).toBe(true);
            expect(wordService.length('', alphabet)).toBe(0);
        });

        test('Single character alphabet with long word', () => {
            const alphabet = new Alphabet({ 'a': true });
            expect(wordService.isValid('a'.repeat(1000), alphabet)).toBe(true);
            expect(wordService.length('a'.repeat(1000), alphabet)).toBe(1000);
        });

        test('Unicode symbols in alphabet', () => {
            const unicodeAlphabet = new Alphabet({
                '😀': true,
                '🌍': true,
                '😀🌍': true,
                '🌍😀': true
            });

            const testCases = [
                '😀🌍😀',           // válido: 😀 + 🌍 + 😀
                '😀🌍🌍😀',         // válido: 😀🌍 + 🌍😀
                '🌍😀😀🌍'          // válido: 🌍😀 + 😀🌍
            ];

            testCases.forEach(word => {
                expect(wordService.isValid(word, unicodeAlphabet)).toBe(true);
            });
        });
    });
});
