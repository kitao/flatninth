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
 * @return {Number} The number of the items.
 */
b9.List.prototype.getItemNum = function() {
    return this._item_num;
};

/**
 * Returns the first item.
 * @return {b9.ListItem} The first item.
 */
b9.List.prototype.getFirstItem = function() {
    return (this._item_num > 0) ? this._start._next : null;
};

/**
 * Returns the last item.
 * @return {b9.ListItem} The last item.
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
 * Removes the all items.
 */
b9.List.prototype.clear = function() {
    while (this._item_num > 0) {
        this.getFirstItem().leave();
    }
};
