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
        b9.Tree._obj1 = this._prev;

        while (b9.Tree._obj1._parent !== this._parent) {
            b9.Tree._obj1 = b9.Tree._obj1._parent;
        }

        return b9.Tree._obj1;
    }

    return null;
};

/**
 * Returns the next sibling.
 * @return {b9.Tree} The next sibling.
 */
b9.Tree.prototype.getNextSibling = function() {
    if (this._parent) {
        b9.Tree._obj1 = this.getLastDescendant()._next;

        if (b9.Tree._obj1 && b9.Tree._obj1._parent === this._parent) {
            return b9.Tree._obj1;
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
    b9.Tree._obj1 = this;

    while (b9.Tree._obj1._last_child) {
        b9.Tree._obj1 = b9.Tree._obj1._last_child;
    }

    return b9.Tree._obj1;
};

/**
 * Adds a child as the first child.
 * @param {b9.Tree} child A child.
 */
b9.Tree.prototype.addChildFirst = function(child) {
    child.leave();

    b9.Tree._obj1 = child.getLastDescendant();

    child._parent = this;
    child._prev = this;
    b9.Tree._obj1._next = this._next;

    child._prev._next = child;

    if (b9.Tree._obj1._next) {
        b9.Tree._obj1._next._prev = b9.Tree._obj1;
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

    b9.Tree._obj2 = this.getLastDescendant();
    b9.Tree._obj3 = child.getLastDescendant();

    child._parent = this;
    child._prev = b9.Tree._obj2;
    b9.Tree._obj3._next = b9.Tree._obj2._next;

    child._prev._next = child;

    if (b9.Tree._obj3._next) {
        b9.Tree._obj3._next._prev = b9.Tree._obj3;
    }

    this._last_child = child;
};

/**
 * Inserts a child before the specified child.
 * @param {b9.Tree} child A child.
 * @param {b9.Tree} next_child The next child.
 */
b9.Tree.prototype.addChildBefore = function(child, next_child) {
    if (next_child._parent === this) {
        child.leave();

        b9.Tree._obj1 = child.getLastDescendant();

        child._parent = this;
        child._prev = next_child._prev;
        b9.Tree._obj1._next = next_child;

        child._prev._next = child;
        b9.Tree._obj1._next._prev = b9.Tree._obj1;
    }
};

/**
 * Inserts a chlid after the specified child.
 * @param {b9.Tree} child A child.
 * @param {b9.Tree} prev_child The previous child.
 */
b9.Tree.prototype.addChildAfter = function(child, prev_child)
{
    if (prev_child._parent === this) {
        child.leave();

        b9.Tree._obj2 = child.getLastDescendant();
        b9.Tree._obj3 = prev_child.getLastDescendant();

        child._parent = this;
        child._prev = b9.Tree._obj3;
        b9.Tree._obj2._next = b9.Tree._obj3._next;

        child._prev._next = child;

        if (b9.Tree._obj2._next) {
            b9.Tree._obj2._next._prev = b9.Tree._obj2;
        }

        if (this._last_child === prev_child) {
            this._last_child = child;
        }
    }
};

/**
 * Removes a child.
 * @param {b9.Tree} child A child.
 */
b9.Tree.prototype.removeChild = function(child) {
    if (child._parent === this) {
        b9.Tree._obj2 = child.getLastDescendant();

        if (this._last_child === child) {
            this._last_child = child.getPrevSibling();
        }

        child._prev._next = b9.Tree._obj2._next;

        if (b9.Tree._obj2._next) {
            b9.Tree._obj2._next._prev = child._prev;
        }

        child._parent = null;
        child._prev = null;
        b9.Tree._obj2._next = null;
    }
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
 * hoge
 */
b9.Tree.prototype.leave = function() {
    if (this._parent) {
        this._parent.removeChild(this);
    }
};

/** @private */
b9.Tree._obj1 = null;

/** @private */
b9.Tree._obj2 = null;

/** @private */
b9.Tree._obj3 = null;
