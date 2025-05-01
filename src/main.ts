import './style.css';

export type AddFunction = (a: number, b: number) => number;

export const add: AddFunction = (a, b) => a + b;
