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
b9.Element = b9.createClass();

/**
 * hoge
 * @param {Number} dimension hoge
 */
b9.Element.prototype.initialize = function(dimension) {
    /** @private */
    this._is_root = false;

    /** @private */
    this._dimension = (dimension !== b9.DIMENSION_3) ? b9.DIMENSION_2 : b9.DIMENSION_3;

    /** @private */
    this._elem_type = b9.Element.TYPE_ELEMENT;

    /** @private */
    this._elem_flag = 0;

    /** @private */
    this._local = (this._dimension === b9.DIMENSION_2) ? new b9.Matrix2D() : new b9.Matrix3D();

    /** @private */
    this._filter_color = new b9.Color();

    /** @private */
    this._elem_tree = new b9.Tree(this);
};

/**
 *
 */
b9.Element.prototype.finalize = function() {
    b9.release(this._local);
    this._local = null;

    b9.release(this._filter_color);
    this._filter_color = null;

    b9.release(this._elem_tree);
    this._elem_tree = null;
};

/**
 * hoge
 * @return {Boolean} hoge
 */
b9.Element.prototype.isRoot = function() {
    return this._is_root;
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
 * @return {b9.Element} hoge
 */
b9.Element.prototype.getPrevAsList = function() {
    var tree = this._elem_tree.getPrevAsList();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.Element.prototype.getNextAsList = function() {
    var tree = this._elem_tree.getNextAsList();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.Element.prototype.getParent = function() {
    var tree = this._elem_tree.getParent();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.Element.prototype.getPrevSibling = function() {
    var tree = this._elem_tree.getPrevSibling();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.Element.prototype.getNextSibling = function() {
    var tree = this._elem_tree.getNextSibling();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.Element.prototype.getFirstChild = function() {
    var tree = this._elem_tree.getFirstChild();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.Element.prototype.getLastChild = function() {
    var tree = this._elem_tree.getLastChild();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.Element.prototype.getLastDescendant = function() {
    var tree = this._elem_tree.getLastDescendant();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.Element.prototype.addChildFirst = function(cihld) {
    this._elem_tree.addChildFirst(child._elem_tree);
};

/**
 * hoge
 * @param {b9.Element} child hoge
 */
b9.Element.prototype.addChildLast = function(child) {
    this._elem_tree.addChildLast(child._elem_tree);
};

/**
 * hoge
 * @param {b9.Element} child hoge
 * @param {b9.Element} next_child hoge
 */
b9.Element.prototype.addChildBefore = function(child, next_child) {
    this._elem_tree.addChildBefore(child._elem_tree, next_child._elem_tree);
};

/**
 * hoge
 * @param {b9.Element} child hoge
 * @param {b9.Element} prev_child hoge
 */
b9.Element.prototype.addChildAfter = function(child, prev_child) {
    this._elem_tree.addChildAfter(child._elem_tree, prev_child._elem_tree);
};

/**
 * hoge
 * @param {b9.Element} child hoge
 */
b9.Element.prototype.removeChild = function(child) {
    this._elem_tree.removeChild(child._elem_tree);
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
