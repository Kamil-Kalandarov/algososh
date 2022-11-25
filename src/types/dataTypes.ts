import { ElementStates } from "./element-states"

export type TCircle = {
  state?: ElementStates;
  value: string | number,
  head?: string
};

export type TColumn = {
  number: number,
  color: ElementStates
}