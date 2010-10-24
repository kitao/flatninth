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
 * @class An element of the b9.LinkedList class.
 */
b9.LinkedListItem = b9.createClass();

/**
 * Constructs an item and links an object with it.
 * @param {Object} self An object.
 */
b9.LinkedListItem.prototype.initialize = function(self) {
    this._self = self;
    this._list = null;
    this._prev = null;
    this._next = null;
};

/**
 * Destructs this item. If this item is in a list, this item will be removed from it.
 */
b9.LinkedListItem.prototype.finalize = function() {
    if (this._list) {
        this._list.removeItem(this);
    }

    this._self = null;
};

/**
 * Returns the object linked with this item.
 * @return {Object} The linked object.
 */
b9.LinkedListItem.prototype.getSelf = function() {
    return this._self;
};

/**
 * Returns the list in which this item is. If no such list exists, returns null.
 * @return {b9.LinkedList} The list in which this item is.
 */
b9.LinkedListItem.prototype.getList = function() {
    return this._list;
};

/**
 * Returns the previous item of this item. If no such item exists, returns null.
 * @return {b9.LinkedListItem} The previous item.
 */
b9.LinkedListItem.prototype.getPrev = function() {
    return (this._list && this._prev === this._list._start) ? null : this._prev;
};

/**
 * Returns the next item of this item. If no such item exists, returns null.
 * @return {b9.LinkedListItem} The next item.
 */
b9.LinkedListItem.prototype.getNext = function() {
    return (this._list && this._next === this._list._end) ? null : this._next;
};
