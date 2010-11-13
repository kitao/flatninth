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
 * Constructs a drawable.
 *
 * @class A general abstraction for something that can be drawn.
 */
b9.Drawable = b9.createClass();

/**
 * @ignore
 */
b9.Drawable.prototype.initialize = function() {
    this._draw_flag = b9.Drawable.FLAG_VISIBLE;
    this._alpha = 1.0;
    this._local = new b9.Matrix3D(b9.Matrix3D.UNIT);

    this._tree = new b9.LinkedTree(this);
    this._world = new b9.Matrix3D();
    this._final_alpha = 1.0;
};

/**
 * Destructs this drawable. If this drawable has the parent, this drawable gets unlinked from it.
 * And all of the children of this drawable get unlinked.
 */
b9.Drawable.prototype.finalize = function() {
    this._tree.finalize();
};

/**
 * Returns whether the specified drawable flag is enabled.
 * @param {Number} draw_flag A drawable flag.
 * @return {Boolean} true the flag is enabled; false otherwise.
 */
b9.Drawable.prototype.getDrawableFlag = function(draw_flag) {
    return (this._draw_flag & draw_flag) ? true : false;
};

/**
 * Sets the specified drawable flag.
 * @param {Number} draw_flag A drawable flag.
 * @param {Boolean} is_enabled Whether the flag is enabled.
 */
b9.Drawable.prototype.setDrawableFlag = function(draw_flag, is_enabled) {
    if (is_enabled) {
        this._draw_flag |= draw_flag;
    } else {
        this._draw_flag &= ~draw_flag;
    }
};

/**
 * Returns the alpha value of this drawable.
 * @return {Number} The alpha value.
 */
b9.Drawable.prototype.getAlpha = function() {
    return this._alpha;
};

/**
 * Sets the alpha value of this drawable.
 * @param {Number} alpha An alpha value.
 */
b9.Drawable.prototype.setAlpha = function(alpha) {
    this._alpha = b9.Math.clamp(alpha, 0.0, 1.0);
};

/**
 * Returns the local matrix of this drawable.
 * @return {b9.Matrix3D} The local matrix.
 */
b9.Drawable.prototype.getLocal = function() {
    return this._local;
};

/**
 * Returns the previous drawable, regarding the whole drawable-tree as a list. If no such drawable exists, returns null.
 * @return {b9.Drawable} The previous drawable.
 */
b9.Drawable.prototype.getPrevAsList = function() {
    var tree = this._tree.getPrevAsList();
    return tree ? tree.getSelf() : null;
};

/**
 * Returns the next drawable, regarding the whole drawable-tree as a list. If no such drawable exists, returns null.
 * @return {b9.Drawable} The next drawable.
 */
b9.Drawable.prototype.getNextAsList = function() {
    var tree = this._tree.getNextAsList();
    return tree ? tree.getSelf() : null;
};

/**
 * Returns the parent of this drawable. If no such drawable exists, returns null.
 * @return {b9.Drawable} The parent.
 */
b9.Drawable.prototype.getParent = function() {
    var tree = this._tree.getParent();
    return tree ? tree.getSelf() : null;
};

/**
 * Returns the previous sibling of this drawable. If no such drawable exists, returns null.
 * @return {b9.Drawable} The previous sibling.
 */
b9.Drawable.prototype.getPrevSibling = function() {
    var tree = this._tree.getPrevSibling();
    return tree ? tree.getSelf() : null;
};

/**
 * Returns the next sibling of this drawable. If no such drawable exists, returns null.
 * @return {b9.Drawable} The next sibling.
 */
b9.Drawable.prototype.getNextSibling = function() {
    var tree = this._tree.getNextSibling();
    return tree ? tree.getSelf() : null;
};

/**
 * Returns the first child of this drawable. If no such drawable exists, returns null.
 * @return {b9.Drawable} The first child.
 */
b9.Drawable.prototype.getFirstChild = function() {
    var tree = this._tree.getFirstChild();
    return tree ? tree.getSelf() : null;
};

/**
 * Returns the last child of this drawable. If no such drawable exists, returns null.
 * @return {b9.Drawable} The last child.
 */
b9.Drawable.prototype.getLastChild = function() {
    var tree = this._tree.getLastChild();
    return tree ? tree.getSelf() : null;
};

/**
 * Returns the last drawable of this drawable-tree, regarding this drawable-tree as a list.
 * If no such drawable exists, returns this tree.<br>
 * This method is mainly used to retrieve the terminator of the list
 * which consists of this drawable and its descendants.
 * @return {b9.Drawable} The last descendant.
 */
b9.Drawable.prototype.getLastDescendant = function() {
    var tree = this._tree.getLastDescendant();
    return tree ? tree.getSelf() : null;
};

/**
 * Links a drawable as the first child with this drawable.
 * @param {b9.Drawable} child A drawable. If the drawable already belongs to some drawable,
 * the drawable gets automatically unlinked with it before the operation.
 */
b9.Drawable.prototype.addChildFirst = function(cihld) {
    this._tree.addChildFirst(child._tree);
};

/**
 * Links a drawable as the last child with this drawable.
 * @param {b9.Drawable} child A drawable. If the drawable already belongs to some drawable,
 * the drawable gets automatically unlinked with it before the operation.
 */
b9.Drawable.prototype.addChildLast = function(child) {
    this._tree.addChildLast(child._tree);
};

/**
 * Links a drawable as the previous of the specified drawable with this drawable.
 * @param {b9.Drawable} child A drawable. If the drawable already belongs to some drawable,
 * the drawable gets automatically unlinked with it before the operation.
 * @param {b9.Drawable} next_child The drawable to be the next. This drawable must be a child of this drawable.
 */
b9.Drawable.prototype.insertChildBefore = function(child, next_child) {
    this._tree.insertChildBefore(child._tree, next_child._tree);
};

/**
 * Links a drawable as the next of the specified drawable with this drawable.
 * @param {b9.Drawable} child A drawable. If the drawable already belongs to some drawable,
 * the drawable gets automatically unlinked with it before the operation.
 * @param {b9.Drawable} prev_child The drawable to be the previous. This drawable must be a child of this drawable.
 */
b9.Drawable.prototype.insertChildAfter = function(child, prev_child) {
    this._tree.insertChildAfter(child._tree, prev_child._tree);
};

/**
 * Unlinks a child from this drawable.
 * @param {b9.Drawable} child A child to be unlinked. This drawable must be a child of this drawable.
 */
b9.Drawable.prototype.removeChild = function(child) {
    this._tree.removeChild(child._tree);
};

b9.Drawable.prototype._calcFinal = function() {
    var parent = this.getParent();

    this._world.set(this._local);
    this._final_alpha = this._alpha;

    if (parent) {
        this._world.toGlobal(parent._local);
        this._final_alpha *= parent._final_alpha;
    }
};

b9.Drawable.prototype._render = function(canvas) {
    this._calcFinal();
};

/**
 * hoge
 * @return {Number}
 */
b9.Drawable.FLAG_VISIBLE = 0x80000000;

/**
 * hoge
 * @return {Number}
 */
b9.Drawable.FLAG_Z_SORT = 0x40000000;
