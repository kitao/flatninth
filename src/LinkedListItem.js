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
 * Constructs an item and associates an object with it.
 *
 * @class An element of the b9.LinkedList class.
 *
 * @param {Object} object An object to be associated.
 */
b9.LinkedListItem = b9.createClass();

/**
 * @ignore
 */
b9.LinkedListItem.prototype.initialize = function(object) {
    /**
     * The object associated with this item.
     * @return {Object}
     */
    this.object = object;

    /**
     * The list to which this item belongs. This property is read-only.
     * @return {b9.LinkedList}
     */
    this.list = null;

    this._prev = null;
    this._next = null;
};

/**
 * Destructs this item. If this item belongs to a list, this item gets unlinked from it.
 */
b9.LinkedListItem.prototype.finalize = function() {
    if (this.list) {
        this.list.remove(this);
    }

    this.object = null;
};

/**
 * Returns the previous item of this item. If no such item exists, returns null.
 * @return {b9.LinkedListItem} The previous item.
 */
b9.LinkedListItem.prototype.getPrev = function() {
    return (this.list && this._prev === this.list._start) ? null : this._prev;
};

/**
 * Returns the next item of this item. If no such item exists, returns null.
 * @return {b9.LinkedListItem} The next item.
 */
b9.LinkedListItem.prototype.getNext = function() {
    return (this.list && this._next === this.list._end) ? null : this._next;
};
