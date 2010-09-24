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
b9.Element = b9.createClass();

/**
 * hoge
 * @param {b9.Element} [parent] hoge
 */
b9.Element.prototype.initialize = function(parent) {
    this._elem_type = b9.Element.TYPE_ELEMENT;
    this._is_root = false;
    this._is_visible = true;
    this._local = new b9.Matrix2D(b9.Matrix2D.UNIT);
    this._filter_color = new b9.Color(b9.Color.FULL);
    this._image = "";
    this._elem_tree = new b9.Tree(this);

    this._world = new b9.Matrix2D();
    this._final_filter_color = new b9.Color();

    if (parent) {
        parent.addChildLast(this);
    }
};

/**
 * hoge
 */
b9.Element.prototype.finalize = function() {
    this._elem_tree.finalize();
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
 * @return {Boolean} hoge
 */
b9.Element.prototype.isRoot = function() {
    return this._is_root;
};

/**
 * hoge
 * @return {Boolean} hoge
 */
b9.Element.prototype.isVisible = function() {
    return this._is_visible;
};

/**
 * hoge
 * @param {Boolean} is_visible hoge
 */
b9.Element.prototype.setVisible = function(is_visible) {
    this._is_visible = is_visible;
};

/**
 * hoge
 * @return {b9.Matrix2D} hoge
 */
b9.Element.prototype.local = function() {
    return this._local;
};

/**
 * hoge
 * @return {b9.Color} hoge
 */
b9.Element.prototype.filterColor = function() {
    return this._filter_color;
};

/**
 * hoge
 * @return {String} hoge
 */
b9.Element.prototype.getImage = function() {
    return this._image;
};

/**
 * hoge
 * @param {String} name hoge
 */
b9.Element.prototype.setImage = function(name) {
    this._image = name;
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

b9.Element.prototype._calcFinal = function() {
    this._world.set(this._local);
    this._final_filter_color.set(this._filter_color);

    if (!this.isRoot()) {
        var parent = this.getParent();

        this._world.toGlobal(parent._local);
        this._final_filter_color.mul(parent._filter_color);
    }
};

b9.Element.prototype._render = function(canvas) {
    this._calcFinal();
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
b9.Element.TYPE_USER = 3;
