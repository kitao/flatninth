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
 * @class hoge
 */
b9.LinkedList = b9.createClass();

/**
 * hoge
 */
b9.LinkedList.prototype.initialize = function() {
    this._start = new b9.LinkedListItem(null);
    this._start._list = this;

    this._end = new b9.LinkedListItem(null);
    this._end._list = this;

    this._item_num = 0;

    this._start._next = this._end;
    this._end._prev = this._start;
};

/**
 * hoge
 */
b9.LinkedList.prototype.finalize = function() {
    this.clear();
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.LinkedList.prototype.getItemNum = function() {
    return this._item_num;
};

/**
 * hoge
 * @return {b9.LinkedListItem} hoge
 */
b9.LinkedList.prototype.getFirstItem = function() {
    return (this._item_num > 0) ? this._start._next : null;
};

/**
 * hoge
 * @return {b9.LinkedListItem} hoge
 */
b9.LinkedList.prototype.getLastItem = function() {
    return (this._item_num > 0) ? this._end._prev : null;
};

/**
 * hoge
 * @param {b9.LinkedListItem} item hoge
 */
b9.LinkedList.prototype.addItemFirst = function(item) {
    this.addItemAfter(item, this._start);
};

/**
 * hoge
 * @param {b9.LinkedListItem} item hoge
 */
b9.LinkedList.prototype.addItemLast = function(item) {
    this.addItemBefore(item, this._end);
};

/**
 * hoge
 * @param {b9.LinkedListItem} item hoge
 * @param {b9.LinkedListItem} next_item hoge
 */
b9.LinkedList.prototype.addItemBefore = function(item, next_item) {
    if (next_item._list === this) {
        if (item._list) {
            item._list.removeItem(item);
        }

        item._list = this;
        item._prev = next_item._prev;
        item._next = next_item;

        item._prev._next = item;
        item._next._prev = item;

        this._item_num++;
    }
};

/**
 * hoge
 * @param {b9.LinkedListItem} item hoge
 * @param {b9.LinkedListItem} prev_item hoge
 */
b9.LinkedList.prototype.addItemAfter = function(item, prev_item) {
    if (prev_item._list === this) {
        if (item._list) {
            item._list.removeItem(item);
        }

        item._list = this;
        item._prev = prev_item;
        item._next = prev_item._next;

        item._prev._next = item;
        item._next._prev = item;

        this._item_num++;
    }
};

/**
 * hoge
 * @param {b9.LinkedListItem} item hoge
 */
b9.LinkedList.prototype.removeItem = function(item) {
    if (item._list === this) {
        item._prev._next = item._next;
        item._next._prev = item._prev;

        item._list = null;
        item._prev = null;
        item._next = null;

        this._item_num--;
    }
};

/**
 * hoge
 */
b9.LinkedList.prototype.clear = function() {
    while (this._item_num > 0) {
        this.removeItem(this._start._next);
    }
};
