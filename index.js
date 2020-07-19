'use strict';

class QueueIterator {
    constructor(queue) {
        this._queue = queue;
        this._start = 0;
    }

    next() {
        if (this._start >= this._queue.size) {
            return {
                value: undefined,
                done: true,
            };
        }
        return {
            value: this._queue[this._start],
            done: this._start++ === this._queue.size,
        };
    }
}

class Queue {

    constructor() {
        this._size = 0;
    }

    enqueue(value) {
        this[this._size++] = value;
        return this._size;
    }

    dequeue() {
        if (this.isEmpty) {
            return;
        }
        const value = this[0];
        for (let i = 1; i < this.size; i++) {
            this[i - 1] = this[i];
        }
        delete this[--this.size];
        return value;
    }

    front() {
        return this[0];
    }

    get isEmpty() {
        return this._size === 0;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        if (typeof value !== 'number') {
            throw new TypeError('Property size must be number type');
        }
        if (value < 0 || !Number.isInteger(value)) {
            throw new RangeError('Property size must be positive integer');
        }
        this._size = value;
    }

    [Symbol.iterator]() {
        return new QueueIterator(this);
    }
}

class PriorityQueueItem {

    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        if (typeof value !== 'number') {
            throw new TypeError('Property priority must be number type');
        }
        if (value < 0 || !Number.isInteger(value)) {
            throw new RangeError('Property priority must be positive integer');
        }
        this._priority = value;
    }

}

class PriorityQueue extends Queue {

    constructor() {
        super();
    }

    enqueue(...args) {
        let newItem;
        if (args.length === 1) {
            newItem = args[0];
        } else if (args.length === 2) {
            newItem = new PriorityQueueItem(args[0], args[1]);
        }
        if (this.isEmpty) {
            this[0] = newItem;
        } else {
            for (let i = this.size - 1; i >= 0; i--) {
                if (newItem.priority >= this[i].priority) {
                    this[i + 1] = newItem;
                    break;
                } else if (newItem.priority < this[i].priority) {
                    this[i + 1] = this[i];
                }
                if (i === 0) {
                    this[i] = newItem;
                    break;
                }
            }

        }
        return ++this.size;
    }
}

const pq = new PriorityQueue();
pq.enqueue('sdsdsdsd', 4);
pq.enqueue('reeeeeee', 2);
pq.enqueue('dddddd', 3);
pq.enqueue('dghghgtff', 1);
pq.enqueue('eeefd', 3);
pq.enqueue('mnjj', 6);
pq.enqueue('dwwww', 3);
pq.enqueue(new PriorityQueueItem('22222', 3));

console.log(pq);
console.log(pq.front());
console.log(pq);
for (const item of pq) {
    console.log(item);
}


