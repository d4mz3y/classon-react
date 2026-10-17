// All content here is original: emoji for pictures, words chosen by hand.

export const LETTERS = [
  { l: 'A', word: 'Apple', emoji: '🍎', syl: ['Ap', 'ple'] },
  { l: 'B', word: 'Ball', emoji: '⚽', syl: ['Ball'] },
  { l: 'C', word: 'Cat', emoji: '🐱', syl: ['Cat'] },
  { l: 'D', word: 'Dog', emoji: '🐶', syl: ['Dog'] },
  { l: 'E', word: 'Elephant', emoji: '🐘', syl: ['El', 'e', 'phant'] },
  { l: 'F', word: 'Fish', emoji: '🐟', syl: ['Fish'] },
  { l: 'G', word: 'Grapes', emoji: '🍇', syl: ['Grapes'] },
  { l: 'H', word: 'Hat', emoji: '🎩', syl: ['Hat'] },
  { l: 'I', word: 'Ice cream', emoji: '🍦', syl: ['Ice', 'cream'] },
  { l: 'J', word: 'Juice', emoji: '🧃', syl: ['Juice'] },
  { l: 'K', word: 'Kite', emoji: '🪁', syl: ['Kite'] },
  { l: 'L', word: 'Lion', emoji: '🦁', syl: ['Li', 'on'] },
  { l: 'M', word: 'Moon', emoji: '🌙', syl: ['Moon'] },
  { l: 'N', word: 'Nest', emoji: '🪺', syl: ['Nest'] },
  { l: 'O', word: 'Orange', emoji: '🍊', syl: ['Or', 'ange'] },
  { l: 'P', word: 'Penguin', emoji: '🐧', syl: ['Pen', 'guin'] },
  { l: 'Q', word: 'Queen', emoji: '👑', syl: ['Queen'] },
  { l: 'R', word: 'Rainbow', emoji: '🌈', syl: ['Rain', 'bow'] },
  { l: 'S', word: 'Sun', emoji: '☀️', syl: ['Sun'] },
  { l: 'T', word: 'Tree', emoji: '🌳', syl: ['Tree'] },
  { l: 'U', word: 'Umbrella', emoji: '☂️', syl: ['Um', 'brel', 'la'] },
  { l: 'V', word: 'Violin', emoji: '🎻', syl: ['Vi', 'o', 'lin'] },
  { l: 'W', word: 'Whale', emoji: '🐳', syl: ['Whale'] },
  { l: 'X', word: 'Xylophone', emoji: '🎶', syl: ['Xy', 'lo', 'phone'] },
  { l: 'Y', word: 'Yo-yo', emoji: '🪀', syl: ['Yo', 'yo'] },
  { l: 'Z', word: 'Zebra', emoji: '🦓', syl: ['Ze', 'bra'] },
]

export const NUMBERS = [
  { n: 1, name: 'One', emoji: '⭐' },
  { n: 2, name: 'Two', emoji: '🐞' },
  { n: 3, name: 'Three', emoji: '🍓' },
  { n: 4, name: 'Four', emoji: '🐠' },
  { n: 5, name: 'Five', emoji: '🌼' },
  { n: 6, name: 'Six', emoji: '🦋' },
  { n: 7, name: 'Seven', emoji: '🍪' },
  { n: 8, name: 'Eight', emoji: '🎈' },
  { n: 9, name: 'Nine', emoji: '🐥' },
  { n: 10, name: 'Ten', emoji: '🍬' },
]

export const DICTION_ACTIVITIES = ['watch', 'sing', 'trace', 'read']
export const NUMERACY_ACTIVITIES = ['count', 'quiz']

export const SUBJECTS = [
  { id: 'diction', title: 'Diction', blurb: 'Letters, sounds and words', color: 'bg-berry', total: LETTERS.length, activities: DICTION_ACTIVITIES, to: '/learn/diction', glyph: 'Aa' },
  { id: 'numeracy', title: 'Numeracy', blurb: 'Counting from 1 to 10', color: 'bg-sun', total: NUMBERS.length, activities: NUMERACY_ACTIVITIES, to: '/learn/numeracy', glyph: '123' },
  { id: 'story', title: 'Story', blurb: 'Coming soon', color: 'bg-leaf', soon: true, glyph: '📖' },
  { id: 'moral', title: 'Moral', blurb: 'Coming soon', color: 'bg-brand-500', soon: true, glyph: '💛' },
]
