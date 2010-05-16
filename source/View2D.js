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
    this._tree = new b9.Tree(this);
};

/**
 * hoge
 * @param {b9.Vector2D} pos
 */
b9.View2D.prototype.getPos = function(pos) {
    pos.set(this._origin);
};

/**
 * hoge
 * @param {b9.Vector2D} pos
 */
b9.View2D.prototype.setPos = function(pos) {
    this._pos.set(pos);
};

/**
 * hoge
 * @param {b9.Vector2D} size
 */
b9.View2D.prototype.getSize = function(size) {
    size.set(this._size);
};

/**
 * hoge
 * @param {b9.Vector2D} size
 */
b9.View2D.prototype.setSize = function(size) {
    this._size.x = b9.Math.max(size.x, 0.0);
    this._size.y = b9.Math.max(size.y, 0.0);
};

/**
 * hoge
 * @param {b9.Vector2D} scale
 */
b9.View2D.prototype.getScale = function(scale) {
    scale.set(this._scale);
};

/**
 * hoge
 * @param {b9.Vector2D} scale
 */
b9.View2D.prototype.setScale = function(scale) {
    this._scale.x = b9.Math.max(scale.x, 0.0);
    this._scale.y = b9.Math.max(scale.y, 0.0);
};

/**
 * hoge
 * @param {b9.Vector2D} origin
 */
b9.View2D.prototype.getOrigin = function(origin) {
    origin.set(this._origin);
};

/**
 * hoge
 * @param {b9.Vector2D} origin
 */
b9.View2D.prototype.setOrigin = function(origin) {
    this._origin.set(origin);
};

/**
 * hoge
 * @param {b9.Color} color
 */
b9.View2D.prototype.getColor = function(color) {
    color.set(this._color);
};

/**
 * hoge
 * @param {b9.Color} color
 */
b9.View2D.prototype.setColor = function(color) {
    this._color.set(color);
};

/**
 * hoge
 * @param {Number} flag
 * @return {Boolean}
 */
b9.View2D.prototype.isViewFlagOn = function(flag) {
    return (this._flag & flag) ? true : false;
};

/**
 * hoge
 * @param {Number} flag
 * @param {Boolean} is_on
 */
b9.View2D.prototype.setViewFlag = function(flag, is_on) {
    if (is_on) {
        this._flag |= flag;
    } else {
        this._flag &= ~flag;
    }
};

/**
 * hoge
 * @return {b9.View2D}
 */
b9.View2D.prototype.getParent = function() {
    var parent = this._tree.getParent();
    return parent ? parent.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View2D}
 */
b9.View2D.prototype.getPrevSibling = function() {
    var sibling = this._tree.getPrevSibling();
    return sibling ? sibling.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View2D}
 */
b9.View2D.prototype.getNextSibling = function() {
    var sibling = this._tree.getNextSibling();
    return sibling ? sibling.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View2D}
 */
b9.View2D.prototype.getFirstChild = function() {
    var child = this._tree.getFirstChild();
    return child ? child.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View2D}
 */
b9.View2D.prototype.getLastChild = function() {
    var child = this._tree.getLastChild();
    return child ? child.getSelf() : null;
};

/**
 * hoge
 * @return {b9.View2D}
 */
b9.View2D.prototype.addChildFirst = function(cihld) {
    this._tree.addChildFirst(child._tree);
};

/**
 * hoge
 * @param {b9.View2D} child
 */
b9.View2D.prototype.addChildLast = function(child) {
    this._tree.addChildLast(child._tree);
};

/**
 * hoge
 * @return {Number}
 */
b9.View2D.FLAG_VISIBLE = 0x01;
