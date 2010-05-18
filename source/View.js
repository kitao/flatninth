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
b9.View = function() {
    /** @private */
    this._pos = new b9.Vector2D();

    /** @private */
    this._size = new b9.Vector2D();

    /** @private */
    this._scale = new b9.Vector2D();

    /** @private */
    this._origin = new b9.Vector2D();

    /** @private */
    this._color = new b9.Color(b9.Color.FULL);

    /** @private */
    this._flag = 0;

    /** @private */
    this._view_tree = new b9.Tree(this);

    /** @private */
    this._elem_tree = new b9.Tree(this);
};

/**
 * hoge
 * @param {b9.Vector2D} pos
 */
b9.View.prototype.getPos = function(pos) {
    pos.set(this._origin);
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
 * @param {b9.Vector2D} size
 */
b9.View.prototype.getSize = function(size) {
    size.set(this._size);
};

/**
 * hoge
 * @param {b9.Vector2D} size
 */
b9.View.prototype.setSize = function(size) {
    this._size.x = b9.Math.max(size.x, 0.0);
    this._size.y = b9.Math.max(size.y, 0.0);
};

/**
 * hoge
 * @param {b9.Vector2D} scale
 */
b9.View.prototype.getScale = function(scale) {
    scale.set(this._scale);
};

/**
 * hoge
 * @param {b9.Vector2D} scale
 */
b9.View.prototype.setScale = function(scale) {
    this._scale.x = b9.Math.max(scale.x, 0.0);
    this._scale.y = b9.Math.max(scale.y, 0.0);
};

/**
 * hoge
 * @param {b9.Vector2D} origin
 */
b9.View.prototype.getOrigin = function(origin) {
    origin.set(this._origin);
};

/**
 * hoge
 * @param {b9.Vector2D} origin
 */
b9.View.prototype.setOrigin = function(origin) {
    this._origin.set(origin);
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
};

/**
 * hoge
 * @param {b9.View} child
 * @param {b9.View} prev_child
 */
b9.View.prototype.addChildAfter = function(child, prev_child) {
};

/**
 * hoge
 * @param {b9.View} child
 */
b9.View.prototype.removeChild = function(child) {
};

/**
 * hoge
 * @param {b9.Element} elem
 */
b9.View.prototype.addElementFirst = function(elem) {
};

/**
 * hoge
 * @param {b9.Element} elem
 */
b9.View.prototype.addElementLast = function(elem) {
};

/**
 * hoge
 * @param {b9.Element} elem
 * @param {b9.Element} next_elem
 */
b9.View.prototype.addElementBefore = function(elem, next_elem) {
};

/**
 * hoge
 * @param {b9.Element} elem
 * @param {b9.Element} prev_elem
 */
b9.View.prototype.addElementAfter = function(elem, prev_elem) {
};

/**
 * hoge
 * @param {b9.Element} elem
 */
b9.View.prototype.removeElement = function(elem) {
};

/**
 * hoge
 * @return {Number}
 */
b9.View.FLAG_VISIBLE = 0x01;
