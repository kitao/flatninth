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
 * @param {Number} dimension
 */
b9.Element = function(dimension) {
    /** @private */
    this._dimension = (dimension === b9.DIM_3D) ? b9.DIM_3D : b9.DIM_2D;

    /** @private */
    this._elem_type = b9.Element.TYPE_ELEMENT;

    /** @private */
    this._elem_flag = 0;

    /** @private */
    this._local = (this._dimension === b9.DIM_3D) ? new b9.Matrix3D() : new b9.Matrix2D();

    /** @private */
    this._filter_color = new b9.Color();

    /** @private */
    this._tree = new b9.Tree(this);
};

/**
 *
 */
b9.Element.prototype.destroy =function() {
    this._tree.destroy();
    this._local = null;
    this._filter_color = null;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.Element.prototype.getDimention = function() {
    return this._dimension;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.Element.prototype.getElementType = function() {
    return this._elem_type;
};

/**
 * hoge
 * @param {Number} elem_flag hoge
 */
b9.Element.prototype.getElementFlag = function(elem_flag) {
    return (this._elem_flag & elem_flag) ? true : false;
};

/**
 * hoge
 * @param {Number} elem_flag hoge
 * @param {Boolean} is_on hoge
 */
b9.Element.prototype.setElementFlag = function(elem_flag, is_on) {
    if (is_on) {
        this._elem_flag |= elem_flag;
    } else {
        this._elem_flag &= ~elem_flag;
    }
};

/**
 * hoge
 * @param {b9.Matrix2D|b9.Matrix3D} local hoge
 */
b9.Element.prototype.getLocal = function(local) {
    local.set(this._local);
};

/**
 * hoge
 * @param {b9.Matrix2D|b9.Matrix3D} local hoge
 */
b9.Element.prototype.setLocal = function(local) {
    this._local.set(local);
};

/**
 * hoge
 * @param {b9.Color} color hoge
 */
b9.Element.prototype.getFilterColor = function(color) {
    color.set(this._filter_color);
};

/**
 * hoge
 * @param {b9.Color} color hoge
 */
b9.Element.prototype.setFilterColor = function(color) {
    this._filter_color.set(color);
};

/**
 * hoge
 * @return {Number}
 */
b9.Element.TYPE_ELEMENT = 0;

/**
 * hoge
 * @return {Number}
 */
b9.Element.TYPE_SPRITE = 1;

/**
 * hoge
 * @return {Number}
 */
b9.Element.TYPE_PRIMITIVE = 2;

/**
 * hoge
 * @return {Number}
 */
b9.Element.FLAG_VISIBLE = 0x8000;
