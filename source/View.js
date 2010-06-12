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
b9.View = b9.createClass();

/**
 * hoge
 * @param {Number} dimension hoge
 * @param {String} [name] hoge
 */
b9.View.prototype.initialize = function(dimension, name) {
    /** @private */
    this._id = b9.generateID();

    /** @private */
    this._name = name || "View";

    /** @private */
    this._is_root = false;

    /** @private */
    this._dimension = (dimension !== b9.DIMENSION_3) ? b9.DIMENSION_2 : b9.DIMENSION_3;

    /** @private */
    this._view_flag = b9.View.FLAG_VISIBLE;

    /** @private */
    this._pos = (this._dimension === b9.DIMENSION_2) ? new b9.Vector2D() : new b9.Vector3D();

    /** @private */
    this._size = new b9.Vector2D();

    /** @private */
    this._scale = new b9.Vector2D();

    /** @private */
    this._filter_color = new b9.Color(b9.Color.FULL);

    /** @private */
    this._clear_color = new b9.Color(b9.Color.ZERO);

    /** @private */
    this._view_tree = new b9.Tree(this);

    /** @private */
    this._elem_root = new b9.Element();
    this._elem_root._is_root = true;
};

/**
 * hoge
 */
b9.View.prototype.finalize = function() {
    b9.release(this._pos);
    this._pos = null;

    b9.release(this._size);
    this._size = null;

    b9.release(this._scale);
    this._scale = null;

    b9.release(this._filter_color);
    this._fileter_color = null;

    b9.release(this._clear_color);
    this._clear_color = null;

    b9.release(this._view_tree);
    this._view_tree = null;

    b9.release(this._elem_tree);
    this._elem_tree = null;
};

/**
 * hoge
 */
b9.View.prototype.getID = function() {
    return this._id;
};

/**
 * hoge
 * @return {String} hoge
 */
b9.View.prototype.getName = function() {
    return this._name;
};

/**
 * hoge
 * @release {Boolean} hoge
 */
b9.View.prototype.isRoot = function() {
    return this._is_root;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.View.prototype.getDimention = function() {
    return this._dimension;
};

/**
 * hoge
 * @param {Number} view_flag hoge
 * @return {Boolean} hoge
 */
b9.View.prototype.isViewFlagOn = function(view_flag) {
    return (this._view_flag & view_flag) ? true : false;
};

/**
 * hoge
 * @param {Number} view_flag hoge
 * @param {Boolean} is_on hoge
 */
b9.View.prototype.setViewFlag = function(view_flag, is_on) {
    if (is_on) {
        this._view_flag |= view_flag;
    } else {
        this._view_flag &= ~view_flag;
    }
};

/**
 * hoge
 * @param {b9.Vector2D} pos hoge
 */
b9.View.prototype.getPos = function(pos) {
    pos.set(this._pos);
};

/**
 * hoge
 * @param {b9.Vector2D} pos hoge
 */
b9.View.prototype.setPos = function(pos) {
    this._pos.set(pos);
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.View.prototype.getWidth = function() {
    return this._size.x;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.View.prototype.getHeight = function() {
    return this._size.y;
};

/**
 * hoge
 * @param {Number} width hoge
 * @param {Number} height hoge
 */
b9.View.prototype.setSize = function(width, height) {
    this._size.set(b9.Math.max(width, 0.0), b9.Math.max(height, 0.0));
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.View.prototype.getScaleX = function() {
    return this._scale.x;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.View.prototype.getScaleY = function() {
    return this._scale.y;
};

/**
 * hoge
 * @param {Number} scale_x hoge
 * @param {Number} scale_y hoge
 */
b9.View.prototype.setScale = function(scale_x, scale_y) {
    this._size.set(b9.Math.max(scale_x, 0.0), b9.Math.max(scale_y, 0.0));
};

/**
 * hoge
 * @param {b9.Color} color hoge
 */
b9.View.prototype.getFilterColor = function(color) {
    color.set(this._filter_color);
};

/**
 * hoge
 * @param {b9.Color} color hoge
 */
b9.View.prototype.setFilterColor = function(color) {
    this._filter_color.set(color);
};

/**
 * hoge
 * @param {b9.Color} color hoge
 */
b9.View.prototype.getClearColor = function(color) {
    color.set(this._clear_color);
};

/**
 * hoge
 * @param {b9.Color} color hoge
 */
b9.View.prototype.setClearColor = function(color) {
    this._clear_color.set(color);
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.View.prototype.getPrevAsList = function() {
    var tree = this._view_tree.getPrevAsList();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.View.prototype.getNextAsList = function() {
    var tree = this._view_tree.getNextAsList();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.View.prototype.getParent = function() {
    var tree = this._view_tree.getParent();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.View.prototype.getPrevSibling = function() {
    var tree = this._view_tree.getPrevSibling();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.View.prototype.getNextSibling = function() {
    var tree = this._view_tree.getNextSibling();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.View.prototype.getFirstChild = function() {
    var tree = this._view_tree.getFirstChild();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.View.prototype.getLastChild = function() {
    var tree = this._view_tree.getLastChild();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.View.prototype.getLastDescendant = function() {
    var tree = this._view_tree.getLastDescendant();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.View.prototype.addChildFirst = function(cihld) {
    this._view_tree.addChildFirst(child._view_tree);
};

/**
 * hoge
 * @param {b9.View} child hoge
 */
b9.View.prototype.addChildLast = function(child) {
    this._view_tree.addChildLast(child._view_tree);
};

/**
 * hoge
 * @param {b9.View} child hoge
 * @param {b9.View} next_child hoge
 */
b9.View.prototype.addChildBefore = function(child, next_child) {
    this._view_tree.addChildBefore(child._view_tree, next_child._view_tree);
};

/**
 * hoge
 * @param {b9.View} child hoge
 * @param {b9.View} prev_child hoge
 */
b9.View.prototype.addChildAfter = function(child, prev_child) {
    this._view_tree.addChildAfter(child._view_tree, prev_child._view_tree);
};

/**
 * hoge
 * @param {b9.View} child hoge
 */
b9.View.prototype.removeChild = function(child) {
    this._view_tree.removeChild(child._view_tree);
};

/**
 * hoge
 * @param {b9.Element} elem hoge
 */
b9.View.prototype.addElementFirst = function(elem) {
    this._elem_tree.addChildFirst(elem._tree);
};

/**
 * hoge
 * @param {b9.Element} elem hoge
 */
b9.View.prototype.addElementLast = function(elem) {
    this._elem_tree.addChildLast(elem._tree);
};

/**
 * hoge
 * @param {b9.Element} elem hoge
 * @param {b9.Element} next_elem hoge
 */
b9.View.prototype.addElementBefore = function(elem, next_elem) {
    this._elem_tree.addChildBefore(elem._tree, next_elem._tree);
};

/**
 * hoge
 * @param {b9.Element} elem hoge
 * @param {b9.Element} prev_elem hoge
 */
b9.View.prototype.addElementAfter = function(elem, prev_elem) {
    this._elem_tree.addChildAfter(elem._tree, prev_elem._tree);
};

/**
 * hoge
 * @param {b9.Element} elem hoge
 */
b9.View.prototype.removeElement = function(elem) {
    this._elem_tree.removeChild(elem._tree);
};

/** @private */
b9.View.prototype._render = function() {
    // TODO
};

/**
 * hoge
 * @return {Number}
 */
b9.View.FLAG_VISIBLE = 0x01;

/**
 * hoge
 * @return {Number}
 */
b9.View.FLAG_CLEAR = 0x02;
