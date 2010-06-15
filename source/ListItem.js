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
b9.ListItem = b9.createClass();

/**
 * hoge
 * @param {Object} self hoge
 */
b9.ListItem.prototype.initialize = function(self) {
    this._self = self;
    this._list = null;
    this._prev = null;
    this._next = null;
};

/**
 * hoge
 */
b9.ListItem.prototype.finalize = function() {
    if (this._list) {
        this._list.removeItem(this);
    }

    this._self = null;
};

/**
 * hoge
 * @return {Object} hoge
 */
b9.ListItem.prototype.getSelf = function() {
    return this._self;
};

/**
 * hoge
 * @return {b9.List} hoge
 */
b9.ListItem.prototype.getList = function() {
    return this._list;
};

/**
 * hoge
 * @return {b9.ListItem} hoge
 */
b9.ListItem.prototype.getPrev = function() {
    return (this._list && this._prev === this._list._start) ? null : this._prev;
};

/**
 * hoge
 * @return {b9.ListItem} hoge
 */
b9.ListItem.prototype.getNext = function() {
    return (this._list && this._next === this._list._end) ? null : this._next;
};
