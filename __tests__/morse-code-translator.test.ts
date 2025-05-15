import { describe, it, expect } from '@jest/globals';
import { translateMorseCode } from '../lib/morse-translator';

describe('Morse Code Translator', () => {
  // Nivel Fácil (Palabras cortas)
  describe('Nivel Fácil (Palabras cortas)', () => {
    it('should translate ".- .-.. ." to "ALE"', () => {
      const morse = ".- .-.. .";
      const expected = "ALE";
      expect(translateMorseCode(morse)).toBe(expected);
    });

    it('should translate "... --- ..." to "SOS"', () => {
      const morse = "... --- ...";
      const expected = "SOS";
      expect(translateMorseCode(morse)).toBe(expected);
    });

    it('should handle invalid characters in "*.... --- .-.. .-" to "[*....?]OLA"', () => {
      const morse = "*.... --- .-.. .-";
      const expected = "[*....?]OLA";
      expect(translateMorseCode(morse)).toBe(expected);
    });
  });

  // Nivel Intermedio (Frases simples)
  describe('Nivel Intermedio (Frases simples)', () => {
    it('should translate ".- ..- -.. .. ---   -.-. --- -- . .-." to "AUDIO COMER"', () => {
      const morse = ".- ..- -.. .. ---   -.-. --- -- . .-.";
      const expected = "AUDIO COMER";
      expect(translateMorseCode(morse)).toBe(expected);
    });

    it('should translate ". .-..   -- .- .-.   . ...   .- -- .- .-. .. .-.. .-.. ---" to "EL MAR ES AMARILLO"', () => {
      const morse = ". .-..   -- .- .-.   . ...   .- -- .- .-. .. .-.. .-.. ---";
      const expected = "EL MAR ES AMARILLO";
      expect(translateMorseCode(morse)).toBe(expected);
    });

    it('should translate "..- -. .-   ..-. .-.. --- .-.   .--. .- .-. .-   -- .." to "UNA FLOR PARA MI"', () => {
      const morse = "..- -. .-   ..-. .-.. --- .-.   .--. .- .-. .-   -- ..";
      const expected = "UNA FLOR PARA MI";
      expect(translateMorseCode(morse)).toBe(expected);
    });
  });

  // Nivel Avanzado (Frases más largas y complejas)
  describe('Nivel Avanzado (Frases más largas y complejas)', () => {
    it('should translate ".-.. .-   .--. .- -.. .-. .   . ... -.-. .-. .. -... .. ---   . -.   .-.. .-   .- .-. . -. .-*" with error handling', () => {
      const morse = ".-.. .-   .--. .- -.. .-. .   . ... -.-. .-. .. -... .. ---   . -.   .-.. .-   .- .-. . -. .-*";
      const expected = "LA PADRE ESCRIBIO EN LA AREN[.-*?]";
      expect(translateMorseCode(morse)).toBe(expected);
    });

    it('should translate ".--. .-. .. -- . .-. ---   ... .-.. .- ...- .-   .-.. .. -... . .-. .-   . -.   .---- ---.. ..--- ..---" to "PRIMERO SLAVA LIBERA EN 1822"', () => {
      const morse = ".--. .-. .. -- . .-. ---   ... .-.. .- ...- .-   .-.. .. -... . .-. .-   . -.   .---- ---.. ..--- ..---";
      const expected = "PRIMERO SLAVA LIBERA EN 1822";
      expect(translateMorseCode(morse)).toBe(expected);
    });

    it('should translate "-.-. --- -.. .. --. ---   -- --- .-. ... .   . ...   ..- -.   .-.. . -. --. ..- .- .--- .   ..- -. .. ...- . .-. ... .- .-.." to "CODIGO MORSE ES UN LENGUAJE UNIVERSAL"', () => {
      const morse = "-.-. --- -.. .. --. ---   -- --- .-. ... .   . ...   ..- -.   .-.. . -. --. ..- .- .--- .   ..- -. .. ...- . .-. ... .- .-..";
      const expected = "CODIGO MORSE ES UN LENGUAJE UNIVERSAL";
      expect(translateMorseCode(morse)).toBe(expected);
    });
  });

  // Bonus (Números y signos)
  describe('Bonus (Números y signos)', () => {
    it('should translate "..--- ----- ..--- ....-   .---- ...-- --...   ..--.. -.-.--" to "2024 137 ?!"', () => {
      const morse = "..--- ----- ..--- ....-   .---- ...-- --...   ..--.. -.-.--";
      const expected = "2024 137 ?!";
      expect(translateMorseCode(morse)).toBe(expected);
    });

    it('should translate ".--. .- .-. .   -.. . ... -.-. .. ..-. .-. .- .-.   . ... - .   -- . -. ... .- .--- ." to "PARE DESCIFRAR ESTE MENSAJE"', () => {
      const morse = ".--. .- .-. .   -.. . ... -.-. .. ..-. .-. .- .-.   . ... - .   -- . -. ... .- .--- .";
      const expected = "PARE DESCIFRAR ESTE MENSAJE";
      expect(translateMorseCode(morse)).toBe(expected);
    });
  });

  // Edge cases
  describe('Edge cases', () => {
    it('should handle empty input', () => {
      const morse = "";
      const expected = "";
      expect(translateMorseCode(morse)).toBe(expected);
    });

    it('should handle whitespace-only input', () => {
      const morse = "   ";
      const expected = "";
      expect(translateMorseCode(morse)).toBe(expected);
    });

    it('should handle multiple consecutive spaces', () => {
      const morse = ".-    -...";
      const expected = "A B";
      expect(translateMorseCode(morse)).toBe(expected);
    });
  });
});
