const A = 65;
const Z = 90;
const a = 97;
const z = 122;
const LETTERS_AMOUNT = 26;

// direction = 1 for encoding, -1 -- for decoding
type Direction = 1 | -1;

const getCharacterByDirection = (unicodeCharacter: number, endPosition: number, shift: number) => {
  return ((unicodeCharacter - endPosition) + shift) % LETTERS_AMOUNT + endPosition;
};

export const caesar = (
  data: string,
  shiftModule: number,
  direction: Direction
): string => {
  return data
    .split("")
    .map((character): string => {
      const unicodeNumber = character.charCodeAt(0);
      const shift = shiftModule * direction;
      let encodedUnicodeNumber = unicodeNumber;
      if (A <= unicodeNumber && unicodeNumber <= Z) {
        encodedUnicodeNumber = getCharacterByDirection(
          unicodeNumber,
          shift >= 0 ? A : Z,
          shift
        );
      } else if (a <= unicodeNumber && unicodeNumber <= z) {
        encodedUnicodeNumber = getCharacterByDirection(
          unicodeNumber,
          shift >= 0 ? a : z,
          shift
        );
      }
      return String.fromCharCode(encodedUnicodeNumber);
    })
    .join('');
};
