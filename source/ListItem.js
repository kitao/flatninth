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
 * hoge
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
 * @return {b9.ListItem} The stored object.
 */
b9.ListItem.prototype.getSelf = function() {
    return this._self;
};

/**
 * Returns the list.
 * @return {b9.List} The list.
 */
b9.ListItem.prototype.getList = function() {
    return this._list;
};

/**
 * Returns the previous item.
 * @return {b9.ListItem} The previous item.
 */
b9.ListItem.prototype.getPrev = function() {
    return (this._list && this._prev === this._list._start) ? null : this._prev;
};

/**
 * Returns the next item.
 * @return {b9.ListItem} The next item.
 */
b9.ListItem.prototype.getNext = function() {
    return (this._list && this._next === this._list._end) ? null : this._next;
};

/**
 * hoge
 */
b9.ListItem.prototype.leave = function() {
    if (this._list) {
        this._list.removeItem(this);
    }
};
