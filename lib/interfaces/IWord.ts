import { IAlphabet } from "./IAlphabet";

export interface IWordOperations {
    isValid(word: string, alphabet: IAlphabet): boolean;
    concatenate(word1: string, word2: string, alphabet: IAlphabet): string;
    reflect(word: string, alphabet: IAlphabet): string;
    power(word: string, exponent: number, alphabet: IAlphabet): string;
    isPalindrome(word: string, alphabet: IAlphabet): boolean;
    length(word: string, alphabet: IAlphabet): number;
}
