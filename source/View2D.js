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
    this._pos = new b9.Vector2D();

    /** @private */
    this._size = new b9.Vector2D();

    /** @private */
    //this._color;
};

/**
 *
 */
b9.View2D.prototype.getPos = function(pos) {
};

/**
 * hoge
 * @param {b9.Vector2D|Number} arg1 hoge
 * @param {Number} [arg2] hoge
 */
b9.View2D.prototype.setPos = function(arg1, arg2) {
    // TODO
};

/**
 *
 */
b9.View2D.prototype.getWidth = function() {
};

/**
 *
 */
b9.View2D.prototype.getHeight = function() {
};

/**
 *
 */
b9.View2D.prototype.setSize = function(width, height) {
};

/**
 *
 */
b9.View2D.prototype.getScaleX = function(scale_x) {
    // TODO
};

/**
 *
 */
b9.View2D.prototype.getScaleY = function(scale_y) {
};

/**
 *
 */
b9.View2D.prototype.setScale = function() {
    // TODO
};

/**
 *
 */
b9.View2D.prototype.getColor = function(color) {
};

/**
 *
 */
b9.View2D.prototype.setColor = function(color) {
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
 *
 */
b9.View2D.FLAG_VISIBLE = 0x01;
