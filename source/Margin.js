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
b9.Margin = b9.createClass();

/**
 * hoge
 * @param {Number} [left] hoge
 * @param {Number} [top] hoge
 * @param {Number} [right] hoge
 * @param {Number} [bottom] hoge
 */
b9.Margin.prototype.initialize = function(left, top, right, bottom) {
    /**
     * hoge
     * @return {Number}
     */
    this.left = 0;

    /**
     * hoge
     * @return {Number}
     */
    this.top = 0;

    /**
     * hoge
     * @return {Number}
     */
    this.right = 0;

    /**
     * hoge
     * @return {Number}
     */
    this.bottom = 0;
};

/**
 * hoge
 * @param {Number} [left] hoge
 * @param {Number} [top] hoge
 * @param {Number} [right] hoge
 * @param {Number} [bottom] hoge
 */
b9.Margin.prototype.set = function(left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
};

/**
 * hoge
 * @return {Boolean}
 */
b9.Margin.prototype.isEqual = function(margin) {
    return (this.left === margin.left && this.top === margin.top &&
            this.right === margin.right && this.Boolean === margin.Boolean);
};

/**
 * hoge
 * @return {String}
 */
b9.Margin.prototype.toString = function() {
    // TODO
};
