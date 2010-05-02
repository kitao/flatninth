/*
 * Copyright (c) 2009-2010 Takashi Kitao
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
 * @class An item of b9.List.
 * @param {Object} self An object to be stored.
 */
b9.ListItem = function(self) {
    /** @private */
    this._self = self;

    /** @private */
    this._list = null;

    /** @private */
    this._prev = null;

    /** @private */
    this._next = null;
};

/**
 * Returns the stored object.
 * @returns {b9.ListItem} The stored object.
 */
b9.ListItem.prototype.getSelf = function() {
    return this._self;
};

/**
 * Returns the list.
 * @returns {b9.List} The list.
 */
b9.ListItem.prototype.getList = function() {
    return this._list;
};

/**
 * Returns the previous item.
 * @returns {b9.ListItem} The previous item.
 */
b9.ListItem.prototype.getPrev = function() {
    return (this._list && this._prev === this._list._start) ? null : this._prev;
};

/**
 * Returns the next item.
 * @returns {b9.ListItem} The next item.
 */
b9.ListItem.prototype.getNext = function() {
    return (this._list && this._next === this._list._end) ? null : this._next;
};

/**
 * @class A list container.
 */
b9.List = function() {
    /** @private */
    this._start = new b9.ListItem(null);

    /** @private */
    this._end = new b9.ListItem(null);

    /** @private */
    this._item_num = 0;

    this._start._next = this._end;
    this._end._prev = this._start;
    this._start._list = this._end._list = this;
};

/**
 * Returns the number of the items.
 * @returns {Number} The number of the items.
 */
b9.List.prototype.getItemNum = function() {
    return this._item_num;
};

/**
 * Returns the first item.
 * @returns {b9.ListItem} The first item.
 */
b9.List.prototype.getFirstItem = function() {
    return (this._item_num > 0) ? this._start._next : null;
};

/**
 * Returns the last item.
 * @returns {b9.ListItem} The last item.
 */
b9.List.prototype.getLastItem = function() {
    return (this._item_num > 0) ? this._end._prev : null;
};

/**
 * Adds an item as the first item.
 * @param {b9.ListItem} item An item.
 */
b9.List.prototype.addItemFirst = function(item) {
    this.addItemAfter(item, this._start);
};

/**
 * Adds an item as the last item.
 * @param {b9.ListItem} item An item.
 */
b9.List.prototype.addItemLast = function(item) {
    this.addItemBefore(item, this._end);
};

/**
 * Inserts an item before the specified item.
 * @param {b9.ListItem} item An item.
 * @param {b9.ListItem} next_item The next item.
 */
b9.List.prototype.addItemBefore = function(item, next_item) {
    if (next_item._list === this) {
        this.removeItem(item);

        item._list = this;
        item._prev = next_item._prev;
        item._next = next_item;

        item._prev._next = item;
        item._next._prev = item;

        this._item_num++;
    }
};

/**
 * Inserts an item after the specified item.
 * @param {b9.ListItem} item An item.
 * @param {b9.ListItem} prev_item The previous item.
 */
b9.List.prototype.addItemAfter = function(item, prev_item) {
    if (prev_item._list === this) {
        this.removeItem(item);

        item._list = this;
        item._prev = prev_item;
        item._next = prev_item._next;

        item._prev._next = item;
        item._next._prev = item;

        this._item_num++;
    }
};

/**
 * Removes an item.
 * @param {be.ListItem} item An item.
 */
b9.List.prototype.removeItem = function(item) {
    if (item._list === this) {
        this._item_num--;

        item._prev._next = item._next;
        item._next._prev = item._prev;

        item._list = null;
        item._prev = null;
        item._next = null;
    }
};

/**
 * Removes the all items.
 */
b9.List.prototype.clear = function() {
    while (this._item_num > 0) {
        this.removeItem(this.getFirstItem());
    }
};
