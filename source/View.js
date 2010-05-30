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
 * @param {Number} id
 * @param {Number} dimension
 */
b9.View = function(id, dimension) {
    /** @private */
    this._id = id;

    /** @private */
    this._dimension = (dimension === b9.DIM_3D) ? b9.DIM_3D : b9.DIM_2D;

    /** @private */
    this._pos = (this._dimension === b9.DIM_2D) ? new b9.Vector2D() : new b9.Vector3D();

    /** @private */
    this._size = new b9.Vector2D();

    /** @private */
    this._scale = new b9.Vector2D();

    /** @private */
    this._color = new b9.Color(b9.Color.FULL);

    /** @private */
    this._flag = 0;

    /** @private */
    this._view_tree = new b9.Tree(this);

    /** @private */
    this._elem_tree = new b9.Tree(this);

    b9.System._registerView(this);
    // TODO
};

/**
 * hoge
 */
b9.View.prototype.destroy = function() {
    b9.System._unregisterView(this);

    this._view_tree.destroy();
    this._elem_tree.destroy();

    this._pos = null;
    this._size = null;
    this._scale = null;
    this._color = null;
};

/**
 *
 */
b9.View.prototype.getID = function() {
    return this._id;
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
 * @param {b9.Vector2D} pos
 */
b9.View.prototype.getPos = function(pos) {
    pos.set(this._pos);
};

/**
 * hoge
 * @param {b9.Vector2D} pos
 */
b9.View.prototype.setPos = function(pos) {
    this._pos.set(pos);
};

/**
 * hoge
 * @return {Number}
 */
b9.View.prototype.getWidth = function() {
    return this._size.x;
};

/**
 * hoge
 * @return {Number}
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
 * @return {Number}
 */
b9.View.prototype.getScaleX = function() {
    return this._scale.x;
};

/**
 * hoge
 * @return {Number}
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
 * @param {b9.Color} color
 */
b9.View.prototype.getColor = function(color) {
    color.set(this._color);
};

/**
 * hoge
 * @param {b9.Color} color
 */
b9.View.prototype.setColor = function(color) {
    this._color.set(color);
};

/**
 * hoge
 * @param {Number} flag
 * @return {Boolean}
 */
b9.View.prototype.isViewFlagOn = function(flag) {
    return (this._flag & flag) ? true : false;
};

/**
 * hoge
 * @param {Number} flag
 * @param {Boolean} is_on
 */
b9.View.prototype.setViewFlag = function(flag, is_on) {
    if (is_on) {
        this._flag |= flag;
    } else {
        this._flag &= ~flag;
    }
};

/**
 * hoge
 * @return {b9.View}
 */
b9.View.prototype.getParent = function() {
    var parent = this._view_tree.getParent();
    return parent ? parent.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View}
 */
b9.View.prototype.getPrevSibling = function() {
    var sibling = this._view_tree.getPrevSibling();
    return sibling ? sibling.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View}
 */
b9.View.prototype.getNextSibling = function() {
    var sibling = this._view_tree.getNextSibling();
    return sibling ? sibling.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View}
 */
b9.View.prototype.getFirstChild = function() {
    var child = this._view_tree.getFirstChild();
    return child ? child.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View}
 */
b9.View.prototype.getLastChild = function() {
    var child = this._view_tree.getLastChild();
    return child ? child.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View}
 */
b9.View.prototype.addChildFirst = function(cihld) {
    this._view_tree.addChildFirst(child._view_tree);
};

/**
 * hoge
 * @param {b9.View} child
 */
b9.View.prototype.addChildLast = function(child) {
    this._view_tree.addChildLast(child._view_tree);
};

/**
 * hoge
 * @param {b9.View} child
 * @param {b9.View} next_child
 */
b9.View.prototype.addChildBefore = function(child, next_child) {
    this._view_tree.addChildBefore(child._view_tree, next_child._view_tree);
};

/**
 * hoge
 * @param {b9.View} child
 * @param {b9.View} prev_child
 */
b9.View.prototype.addChildAfter = function(child, prev_child) {
    this._view_tree.addChildAfter(child._view_tree, prev_child._view_tree);
};

/**
 * hoge
 * @param {b9.View} child
 */
b9.View.prototype.removeChild = function(child) {
    this._view_tree.removeChild(child._view_tree);
};

/**
 * hoge
 * @param {b9.Element} elem
 */
b9.View.prototype.addElementFirst = function(elem) {
    this._elem_tree.addChildFirst(elem._tree);
};

/**
 * hoge
 * @param {b9.Element} elem
 */
b9.View.prototype.addElementLast = function(elem) {
    this._elem_tree.addChildLast(elem._tree);
};

/**
 * hoge
 * @param {b9.Element} elem
 * @param {b9.Element} next_elem
 */
b9.View.prototype.addElementBefore = function(elem, next_elem) {
    this._elem_tree.addChildBefore(elem._tree, next_elem._tree);
};

/**
 * hoge
 * @param {b9.Element} elem
 * @param {b9.Element} prev_elem
 */
b9.View.prototype.addElementAfter = function(elem, prev_elem) {
    this._elem_tree.addChildAfter(elem._tree, prev_elem._tree);
};

/**
 * hoge
 * @param {b9.Element} elem
 */
b9.View.prototype.removeElement = function(elem) {
    this._elem_tree.removeChild(elem._tree);
};

/**
 * hoge
 * @return {Number}
 */
b9.DIM_2D = 2;

/**
 * hoge
 * @return {Number}
 */
b9.DIM_3D = 3;

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
