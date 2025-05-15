// Morse code dictionary
export const MORSE_CODE: Record<string, string> = {
  ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E",
  "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J",
  "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O",
  ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
  "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y",
  "--..": "Z", ".----": "1", "..---": "2", "...--": "3", "....-": "4",
  ".....": "5", "-....": "6", "--...": "7", "---..": "8", "----.": "9",
  "-----": "0", ".-.-.-": ".", "--..--": ",", "..--..": "?",
  ".----.": "'", "-.-.--": "!", "-..-.": "/", "-.--.": "(",
  "-.--.-": ")", ".-...": "&", "---...": ":", "-.-.-.": ";",
  "-...-": "=", ".-.-.": "+", "-....-": "-", "..--.-": "_",
  ".-..-.": "\"", "...-..-": "$", ".--.-.": "@"
};

/**
 * Translates Morse code to text
 * @param morseInput Morse code string with dots (.), dashes (-), spaces between letters, and triple spaces between words
 * @returns Translated text
 */
export function translateMorseCode(morseInput: string): string {
  if (!morseInput.trim()) {
    return "";
  }
  
  const words = morseInput.trim().split("   ");
  const translatedWords = words.map(word => {
    const letters = word.split(" ");
    return letters
      .map(letter => {
        if (!letter) return "";
        return MORSE_CODE[letter] || `[${letter}?]`;
      })
      .join("");
  });
  
  return translatedWords.join(" ");
}
