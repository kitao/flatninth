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
 * @extends b9.Element
 * @param {Number} dimension
 * @param {Number} max_rect_num
 */
b9.Sprite = function(dimension, max_rect_num) {
    b9.Element.call(this, dimension);
    this._elem_type = b9.Element.TYPE_SPRITE;

    // TODO
};

b9.Sprite.prototype = b9.Element;
b9.Sprite.constructor = b9.Sprite;

/**
 *
 */
b9.Sprite.prototype.destroy = function() {
    b9.Element.destroy.call(this);
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.Sprite.prototype.getMaxRectNum() {
};

/**
 *
 */
b9.Sprite.prototype.setMaxRectNum(max_rect_num) {
};

/**
 *
 */
b9.Sprite.prototype.getCurRectNum() {
};

/**
 *
 */
b9.Sprite.prototype.setCurRectNum() {
};
