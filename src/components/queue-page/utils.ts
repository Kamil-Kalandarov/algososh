export type TQueue<T> = {
  enqueue: (item: T) => void
  dequeue: () => void
  peak: () => T | null
  clear: () => void
  isEmpty: () => boolean
};
  
export class Queue<T> implements TQueue<T>{
  private container: (T | null)[] = []
  private head = 0
  private tail = 0
  private readonly size: number = 0
  private length: number = 0

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T): void => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail] = item
    this.tail ++
  }

  dequeue = (): void => {
    if(this.isEmpty()) {
      throw new Error("No elements in the queue");
    } 
    this.container[this.head] = null
    this.head ++
  }

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('peek: No elements in the queue');
    }
    return this.container[this.head % this.size];
  }

  getElements = () => {
    return (
      this.container
    )
  }

  getHead = () => {
    return (
      this.head
    )
  }

  getTail = () => {
    return (
      this.tail
    )
  }

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = [];
  }
  
  isEmpty = () => {
    return this.length === 0
  }
};