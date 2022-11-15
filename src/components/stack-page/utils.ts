export type TStack<T> = {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void
};

export class Stack<T> implements TStack<T>{
  private container: T[] = []

  push = (item: T): void => {
    this.container.push(item)
  }
  pop = (): void => {
    this.container.pop()
  }
  peak = (): T | null => {
    return (
      this.container[this.container.length - 1]
    )
  }
  getElements = () => {
    return (
      this.container
    )
  }
  clear = (): void => {
    this.container = []
  }
};