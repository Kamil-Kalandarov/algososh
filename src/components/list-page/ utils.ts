export class Node<T> {
    value: T
    next: Node<T> | null
    /* previouse: null; */
    tail: Node<T> | null | undefined;
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
        /* this.previouse = null */
    }
};

type TLinkedList<T> = {
    prepend: (value: T, next: Node<T> | null) => void
    append: (value: T, next: Node<T> | null) => void
    delete: (index: number) => void
    /* insertAt: (value: T, position: number) => void */
    getSize: () => number
    print: () => T[]
};

export class LinkedList<T> implements TLinkedList<T> {
    private head: Node<T> | null
    private tail: Node<T> | null
    /* private previouse: Node<T> | null | undefined */
    private length: number
    constructor() {
      this.head = null
      this.tail = null
      this.length = 0
    };
    

    prepend = (value: T) => {
        const newNode = new Node(value, this.head)
        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;
            this.length++
            return this;
        };
        this.tail.next = newNode;
        this.tail = newNode
        this.length++
        /* this.head = newNode
        if (!this.tail) {
            this.tail = newNode;
            this.length++
            return this;
        } 
        const currenNode = this.head;
        this.head = newNode;
        this.head.next = currenNode;
        this.length++ */
    };

    append = (value: T) => {
        const newNode = new Node(value)
        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;
            this.length++
            return this;
        } else {
            this.tail = newNode
            this.tail.next = newNode;
            this.length++
        }
    };

    delete = (index: number) => {
        if(!this.head) {
            return null
        }
    }

    print = (): T[] => {
        const result = []
        let current = this.head
        while(current) {
            result.push(current.value)
            current = current.next
        }
        return [...result]
    }

    getSize = (): number => {
        return (
            this.length
        )
    };

};