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
    this._start = new b9.LinkedListItem(null);
    this._start._list = this;

    this._end = new b9.LinkedListItem(null);
    this._end._list = this;

    this._item_count = 0;

    this._start._next = this._end;
    this._end._prev = this._start;
};

/**
 * Destructs this list. All of the items belong to this list get unlinked.
 */
b9.LinkedList.prototype.finalize = function() {
    this.clear();
};

/**
 * Returns the number of the items belong to this list.
 * @return {Number} The number of the items.
 */
b9.LinkedList.prototype.getCount = function() {
    return this._item_count;
};

/**
 * Returns the first item of this list. If no such item exists, returns null.
 * @return {b9.LinkedListItem} The first item.
 */
b9.LinkedList.prototype.getFirst = function() {
    return (this._item_count > 0) ? this._start._next : null;
};

/**
 * Returns the last item of this list. If no such item exists, returns null.
 * @return {b9.LinkedListItem} The last item.
 */
b9.LinkedList.prototype.getLast = function() {
    return (this._item_count > 0) ? this._end._prev : null;
};

/**
 * Links an item as the first item with this list.
 * @param {b9.LinkedListItem} item An item. If the item already belongs to some list,
 * the item gets automatically unlinked with it before the operation.
 */
b9.LinkedList.prototype.addFirst = function(item) {
    this.insertAfter(item, this._start);
};

/**
 * Links an item as the last item with this list.
 * @param {b9.LinkedListItem} item An item. If the item already belongs to some list,
 * the item gets automatically unlinked with it before the operation.
 */
b9.LinkedList.prototype.addLast = function(item) {
    this.insertBefore(item, this._end);
};

/**
 * Links an item as the previous of the specified item with this list.
 * @param {b9.LinkedListItem} item An item. If the item already belongs to some list,
 * the item gets automatically unlinked with it before the operation.
 * @param {b9.LinkedListItem} next_item The item to be the next. This item must belong to this list.
 */
b9.LinkedList.prototype.insertBefore = function(item, next_item) {
    if (next_item._list === this) {
        if (item._list) {
            item._list.remove(item);
        }

        item._list = this;
        item._prev = next_item._prev;
        item._next = next_item;

        item._prev._next = item;
        item._next._prev = item;

        this._item_count++;
    }
};

/**
 * Links an item as the next of the specified item with this list.
 * @param {b9.LinkedListItem} item An item. If the item already belongs to some list,
 * the item gets automatically unlinked with it before the operation.
 * @param {b9.LinkedListItem} prev_item The item to be the previous. This item must belong to this list.
 */
b9.LinkedList.prototype.insertAfter = function(item, prev_item) {
    if (prev_item._list === this) {
        if (item._list) {
            item._list.remove(item);
        }

        item._list = this;
        item._prev = prev_item;
        item._next = prev_item._next;

        item._prev._next = item;
        item._next._prev = item;

        this._item_count++;
    }
};

/**
 * Unlinks an item from this list.
 * @param {b9.LinkedListItem} item An item to be unlinked. This item must belong to this list.
 */
b9.LinkedList.prototype.remove = function(item) {
    if (item._list === this) {
        item._prev._next = item._next;
        item._next._prev = item._prev;

        item._list = null;
        item._prev = null;
        item._next = null;

        this._item_count--;
    }
};

/**
 * Unlinks all of the items from this list.
 */
b9.LinkedList.prototype.clear = function() {
    while (this._item_count > 0) {
        this.remove(this._start._next);
    }
};