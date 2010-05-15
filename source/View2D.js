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
 * @class hoge
 */
b9.View2D = function() {
    /** @private */
    this._flag = 0;

    /** @private */
    this._left = 0;

    /** @private */
    this._top = 0;

    /** @private */
    this._width = 0;

    /** @private */
    this._height = 0;

    /** @private */
    this._scale_x = 0.0;

    /** @private */
    this._scale_y = 0.0;

    /** @private */
    this._color = new b9.Color(b9.Color.FULL);
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.View2D.prototype.getLeft = function() {
    return this._left;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.View2D.prototype.getTop = function() {
    return this._top;
};

/**
 * hoge
 * @param {Number} left
 * @param {Number} top
 */
b9.View2D.prototype.setPos = function(left, top) {
    this._left = b9.floor(left);
    this._top = b9.floor(top);
};

/**
 * hoge
 * @return {Number}
 */
b9.View2D.prototype.getWidth = function() {
    return this._width;
};

/**
 * hoge
 * @return {Number}
 */
b9.View2D.prototype.getHeight = function() {
    return this._height;
};

/**
 * hoge
 * @param {Number} width
 * @param {Number} height
 */
b9.View2D.prototype.setSize = function(width, height) {
    this._width = b9.Math.max(b9.Math.floor(width), 0);
    this._height = b9.Math.max(b9.Math.floor(height), 0);
};

/**
 * hoge
 * @return {Number}
 */
b9.View2D.prototype.getScaleX = function(scale_x) {
    return this._scale_x;
};

/**
 * hoge
 * @return {Number}
 */
b9.View2D.prototype.getScaleY = function(scale_y) {
    return this._scale_y;
};

/**
 * hoge
 * @param {Number} scale_x
 * @param {Number} scale_y
 */
b9.View2D.prototype.setScale = function(scale_x, scale_y) {
    this._scale_x = b9.Math.max(scale_x, 0.0);
    this._scale_y = b9.Math.max(scale_y, 0.0);
};

/**
 * hoge
 * @param {Number} color
 */
b9.View2D.prototype.getColor = function(color) {
    color.set(this._color);
};

/**
 * hoge
 * @param {Number} color
 */
b9.View2D.prototype.setColor = function(color) {
    this._color.set(color);
};

/**
 *
 */
b9.View2D.prototype.isViewFlagOn = function(flag) {
    // TODO
};

/**
 *
 */
b9.View2D.prototype.setViewFlag = function(flag, is_on) {
    // TODO
};

/**
 * hoge
 * @return {Number}
 */
b9.View2D.FLAG_VISIBLE = 0x01;
