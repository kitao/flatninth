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
 * @class A tree container.
 * @param {Object} self An object to be stored.
 */
b9.Tree = function(self)
{
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
 * @returns {b9.Tree} The stored object.
 */
b9.Tree.prototype.getSelf = function()
{
    return this._self;
};

/**
 * Returns the previous item.
 * @returns {b9.Tree} The previous item.
 */
b9.Tree.prototype.getPrevAll = function()
{
    return this._prev;
};

/**
 * Returns the next item.
 * @returns {b9.Tree} The next item.
 */
b9.Tree.prototype.getNextAll = function()
{
    return this._next;
};

/**
 * Returns the parent.
 * @returns {b9.Tree} The parent.
 */
b9.Tree.prototype.getParent = function()
{
    return this._parent;
};

/**
 * Returns the previous sibling.
 * @returns {b9.Tree} The previous sibling.
 */
b9.Tree.prototype.getPrevSibling = function()
{
    if (this._parent && this._prev !== this._parent)
    {
        var prev = this._prev;

        while (prev._parent !== this._parent)
        {
            prev = prev._parent;
        }

        return prev;
    }

    return null;
};

/**
 * Returns the next sibling.
 * @returns {b9.Tree} The next sibling.
 */
b9.Tree.prototype.getNextSibling = function()
{
    if (this._parent)
    {
        var next = this.getLastDescendant()._next;

        if (next && next._parent === this._parent)
        {
            return next;
        }
    }

    return null;
};

/**
 * Returns the first child.
 * @returns {b9.Tree} The first child.
 */
b9.Tree.prototype.getFirstChild = function()
{
    return this._last_child ? this._next : null;
};

/**
 * Returns the last child.
 * @returns {b9.Tree} The last child.
 */
b9.Tree.prototype.getLastChild = function()
{
    return this._last_child;
};

/**
 * Returns the last descendant.
 * @returns {b9.Tree} The last descendant.
 */
b9.Tree.prototype.getLastDescendant = function()
{
    var desc = this;

    while (desc._last_child)
    {
        desc = desc._last_child;
    }

    return desc;
};

/**
 * Adds a child as the first child.
 * @param {b9.Tree} child A child.
 */
b9.Tree.prototype.addChildFirst = function(child)
{
    this.removeChild(child);

    var child_desc = child.getLastDescendant();

    child._parent = this;
    child._prev = this;
    child_desc._next = this._next;

    child._prev._next = child;

    if (child_desc._next)
    {
        child_desc._next._prev = child_desc;
    }

    if (!this._last_child)
    {
        this._last_child = child;
    }
};

/**
 * Adds a child as the last child.
 * @param {b9.Tree} child A child.
 */
b9.Tree.prototype.addChildLast = function(child)
{
    this.removeChild(child);

    var desc = getLastDescendant();
    var child_desc = child.getLastDescendant();

    child._parent = this;
    child._prev = desc;
    child_desc._next = desc._next;

    child._prev._next = child;

    if (child_desc._next)
    {
        child_desc._next._prev = child_desc;
    }

    this._last_child = child;
};

/**
 * Inserts a child before the specified child.
 * @param {b9.Tree} child A child.
 * @param {b9.Tree} next_child The next child.
 */
b9.Tree.prototype.addChildBefore = function(child, next_child)
{
    if (next_child._parent === this)
    {
        this.removeChild(child);

        var child_desc = child.getLastDescendant();

        child._parent = this;
        child._prev = next_child._prev;
        child_desc._next = next_child;

        child._prev._next = child;
        child_desc._next._prev = child_desc;
    }
};

/**
 * Inserts a chlid after the specified child.
 * @param {b9.Tree} child A child.
 * @param {b9.Tree} prev_child The previous child.
 */
b9.Tree.prototype.addChildAfter = function(child, prev_child)
{
    if (prev_child.parent === this)
    {
        this.removeChild(child);

        var child_desc = child.getLastDescendant();
        var prev_child_desc = prev_child.getLastDescendant();

        child._parent = this;
        child._prev = prev_child_desc;
        child_desc._next = prev_child_desc._next;

        child._prev._next = child;

        if (child_desc._next)
        {
            child_desc._next._prev = child_desc;
        }

        if (this._last_child === prev_child)
        {
            this._last_child = child;
        }
    }
};

/**
 * Removes a child.
 * @param {b9.Tree} child A child.
 */
b9.Tree.prototype.removeChild = function(child)
{
    if (child.parent === this)
    {
        var child_desc = child.getLastDescendant();

        if (this._last_child === child)
        {
            this._last_child = child.getPrevSibling();
        }

        child._prev._next = child_desc._next;

        if (child_desc._next)
        {
            child_desc._next._prev = child._prev;
        }

        child._parent = null;
        child._prev = null;
        child_desc._next = NULL;
    }
};

/**
 * Removes the all children.
 */
b9.Tree.prototype.clear = function()
{
    while (this._last_child)
    {
        removeChild(this._last_child);
    }
};
