/*
 * Copyright (c) 2009-2011 Takashi Kitao
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Constructs a list without an item.
 *
 * @class A linked list which stores instances of the b9.LinkedListItem class.
 */
b9.LinkedList = b9.createClass();

/**
 * @ignore
 */
b9.LinkedList.prototype.initialize = function() {
    /**
     * The first item of this list. This property is read-only.
     * @return {b9.LinkedListItem}
     */
    this.first = null;

    /**
     * The last item of this list. This property is read-only.
     * @return {b9.LinkedListItem}
     */
    this.last = null;
};

/**
 * Destructs this list. All of the items belong to this list get unlinked.
 */
b9.LinkedList.prototype.finalize = function() {
    this.clear();
};

/**
 * Links an item as the first item with this list.
 * @param {b9.LinkedListItem} item An item. If the item already belongs to some list,
 * the item gets unlinked with it before the operation automatically.
 */
b9.LinkedList.prototype.addFirst = function(item) {
    if (item.list) {
        item.list.remove(item);
    }

    if (!this.first) {
        item.list = this;
        item.prev = item.next = null;

        this.first = this.last = item;
    } else {
        item.list = this;
        item.prev = null;
        item.next = this.first;

        item.next.prev = item;

        this.first = item;
    }
};

/**
 * Links an item as the last item with this list.
 * @param {b9.LinkedListItem} item An item. If the item already belongs to some list,
 * the item gets unlinked with it before the operation automatically.
 */
b9.LinkedList.prototype.addLast = function(item) {
    if (item.list) {
        item.list.remove(item);
    }

    if (!this.first) {
        item.list = this;
        item.prev = item.next = null;

        this.first = this.last = item;
    } else {
        item.list = this;
        item.prev = this.last;
        item.next = null;

        item.prev.next = item;

        this.last = item;
    }
};

/**
 * Links an item as the previous of the specified item with this list.
 * @param {b9.LinkedListItem} item An item. If the item already belongs to some list,
 * the item gets unlinked with it before the operation automatically.
 * @param {b9.LinkedListItem} nextItem The item to be the next. This item must belong to this list.
 */
b9.LinkedList.prototype.insertBefore = function(item, nextItem) {
    if (nextItem.list === this) {
        if (item.list) {
            item.list.remove(item);
        }

        item.list = this;
        item.prev = nextItem.prev;
        item.next = nextItem;

        if (item.prev) {
            item.prev.next = item;
        }

        nextItem.prev = item;

        if (this.first === nextItem) {
            this.first = item;
        }
    }
};

/**
 * Links an item as the next of the specified item with this list.
 * @param {b9.LinkedListItem} item An item. If the item already belongs to some list,
 * the item gets unlinked with it before the operation automatically.
 * @param {b9.LinkedListItem} prevItem The item to be the previous. This item must belong to this list.
 */
b9.LinkedList.prototype.insertAfter = function(item, prevItem) {
    if (prevItem.list === this) {
        if (item.list) {
            item.list.remove(item);
        }

        item.list = this;
        item.prev = prevItem;
        item.next = prevItem.next;

        prevItem.next = item;

        if (item.next) {
            item.next.prev = item;
        }

        if (this.last === prevItem) {
            this.last = item;
        }
    }
};

/**
 * Unlinks an item from this list.
 * @param {b9.LinkedListItem} item An item to be unlinked. This item must belong to this list.
 */
b9.LinkedList.prototype.remove = function(item) {
    if (item.list === this) {
        if (item.prev) {
            item.prev.next = item.next;
        } else {
            this.first = item.next;
        }

        if (item.next) {
            item.next.prev = item.prev;
        } else {
            this.last = item.prev;
        }

        item.list = null;
        item.prev = item.next = null;
    }
};

/**
 * Unlinks all of the items from this list.
 */
b9.LinkedList.prototype.clear = function() {
    var item, nextItem;

    for (item = this.first; item; item = nextItem) {
        nextItem = item.next;

        item.list = null;
        item.prev = item.next = null;
    }

    this.first = this.last = null;
};
