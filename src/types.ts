export type Group = [number, number, number, number, number]

type GameNumber = {
  isSelected: boolean,
  value: number
}

export type GameGroup =
  {
    'first': GameNumber,
    'second': GameNumber,
    'third': GameNumber,
    'fourth': GameNumber,
    'fifth': GameNumber
  }