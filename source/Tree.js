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
 * @class A tree container.
 * @param {Object} self An object to be stored.
 */
b9.Tree = function(self) {
    /** @private */
    this._self = self;

    /** @private */
    this._parent = null;

    /** @private */
    this._last_child = null;

    /** @private */
    this._prev = null;

    /** @private */
    this._next = null;
};

/**
 * Returns the stored object.
 * @return {b9.Tree} The stored object.
 */
b9.Tree.prototype.getSelf = function() {
    return this._self;
};

/**
 * Returns the previous item.
 * @return {b9.Tree} The previous item.
 */
b9.Tree.prototype.getPrevAll = function() {
    return this._prev;
};

/**
 * Returns the next item.
 * @return {b9.Tree} The next item.
 */
b9.Tree.prototype.getNextAll = function() {
    return this._next;
};

/**
 * Returns the parent.
 * @return {b9.Tree} The parent.
 */
b9.Tree.prototype.getParent = function() {
    return this._parent;
};

/**
 * Returns the previous sibling.
 * @return {b9.Tree} The previous sibling.
 */
b9.Tree.prototype.getPrevSibling = function() {
    if (this._parent && this._prev !== this._parent) {
        var prev = this._prev;

        while (prev._parent !== this._parent) {
            prev = prev._parent;
        }

        return prev;
    }

    return null;
};

/**
 * Returns the next sibling.
 * @return {b9.Tree} The next sibling.
 */
b9.Tree.prototype.getNextSibling = function() {
    if (this._parent) {
        var next = this.getLastDescendant()._next;

        if (next && next._parent === this._parent) {
            return next;
        }
    }

    return null;
};

/**
 * Returns the first child.
 * @return {b9.Tree} The first child.
 */
b9.Tree.prototype.getFirstChild = function() {
    return this._last_child ? this._next : null;
};

/**
 * Returns the last child.
 * @return {b9.Tree} The last child.
 */
b9.Tree.prototype.getLastChild = function() {
    return this._last_child;
};

/**
 * Returns the last descendant.
 * @return {b9.Tree} The last descendant.
 */
b9.Tree.prototype.getLastDescendant = function() {
    var desc = this;

    while (desc._last_child) {
        desc = desc._last_child;
    }

    return desc;
};

/**
 * Adds a child as the first child.
 * @param {b9.Tree} child A child.
 */
b9.Tree.prototype.addChildFirst = function(child) {
    child.leave();

    var child_desc = child.getLastDescendant();

    child._parent = this;
    child._prev = this;
    child_desc._next = this._next;

    child._prev._next = child;

    if (child_desc._next) {
        child_desc._next._prev = child_desc;
    }

    if (!this._last_child) {
        this._last_child = child;
    }
};

/**
 * Adds a child as the last child.
 * @param {b9.Tree} child A child.
 */
b9.Tree.prototype.addChildLast = function(child) {
    child.leave();

    var this_desc = this.getLastDescendant();
    var child_desc = child.getLastDescendant();

    child._parent = this;
    child._prev = this_desc;
    child_desc._next = this_desc._next;

    child._prev._next = child;

    if (child_desc._next) {
        child_desc._next._prev = child_desc;
    }

    this._last_child = child;
};

/**
 * Removes the all children.
 */
b9.Tree.prototype.clear = function() {
    while (this._last_child) {
        this.removeChild(this._last_child);
    }
};

/**
 * Inserts a child before the specified child.
 * @param {b9.Tree} tree The next child.
 */
b9.Tree.prototype.joinBefore = function(tree) {
    if (next_child._parent) {
        this.leave();

        var desc = this.getLastDescendant();

        this._parent = tree._parent;
        this._prev = tree._prev;
        desc._next = tree;

        this._prev._next = this;
        desc._next._prev = desc;
    }
};

/**
 * Inserts a chlid after the specified child.
 * @param {b9.Tree} tree The previous child.
 */
b9.Tree.prototype.joinAfter = function(tree)
{
    if (prev_child._parent) {
        child.leave();

        var this_desc = this.getLastDescendant();
        var tree_desc = tree.getLastDescendant();

        this._parent = tree._parent;
        this._prev = tree_desc;
        this_desc._next = tree_desc._next;

        this._prev._next = this;

        if (this_desc._next) {
            this_desc._next._prev = this_desc;
        }

        if (this._parent._last_child === tree) {
            this._parent._last_child = this;
        }
    }
};

/**
 * hoge
 */
b9.Tree.prototype.leave = function() {
    if (this._parent) {
        var desc = this.getLastDescendant();

        if (this._parent._last_child === this) {
            this._parent._last_child = this.getPrevSibling();
        }

        this._prev._next = desc._next;

        if (desc._next) {
            desc._next._prev = this._prev;
        }

        this._parent = null;
        this._prev = null;
        desc._next = null;
    }
};
