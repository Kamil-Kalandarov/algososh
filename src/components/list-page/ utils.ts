export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

type TLinkedList<T> = {
    append: (element: T) => void
    /* insertAt: (element: T, position: number) => void
    getSize: () => number
    print: () => void */
}

export class LinkedList<T> implements TLinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    constructor() {
      this.head = null;
      this.tail = null;
    }
    append = (element: T) => {
        const newNode = new Node(element)
        if(!this.head || !this.tail) {
            this.head = newNode
            this.tail = newNode
            return this
        } else {
            this.tail.next = newNode
            this.tail = newNode
        }
    } 
}