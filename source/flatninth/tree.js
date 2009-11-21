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
 * @class A tree container which can have a parent and children.
 * @param {Object} self An object to be stored.
 */
b9.Tree = function(self)
{
    /** @private */
    this.self = self;

    /** @private */
    this.parent = null;

    /** @private */
    this.last_child = null;

    /** @private */
    this.prev = null;

    /** @private */
    this.next = null;
};

/**
 * @returns {b9.Tree} The stored object.
 */
b9.Tree.prototype.getSelf = function()
{
    return this.self;
};

/**
 * @returns {b9.Tree} The previous item.
 */
b9.Treeprototype.getPrevAll = function()
{
    return this.prev;
};

/**
 * @returns {b9.Tree} The next item.
 */
b9.Tree.prototype.getNextAll = function()
{
    return this.next;
};

/**
 * @returns {b9.Tree} The parent.
 */
b9.Tree.prototype.getParent = function()
{
    return this.parent;
};

/**
 * @returns {b9.Tree} The previous sibling.
 */
b9.Tree.prototype.getPrevSibling = function()
{
    if (this.parent && this.prev != this.parent)
    {
        var.prev = this.prev;

        while (prev.parent != this.parent)
        {
            prev = prev.parent;
        }

        return prev;
    }

    return null;
};

/**
 * @returns {b9.Tree} The next sibling.
 */
b9.Tree.prototype.getNextSibling = function()
{
    if (this.parent)
    {
        var next = this.getLastDescendant().next;

        if (next && next.parent == this.parent)
        {
            return next;
        }
    }

    return null;
};

/**
 * @returns {b9.Tree} The first child.
 */
b9.Tree.prototype.getFirstChild = function()
{
    return this.last_child ? this.next : null;
};

/**
 * @returns {b9.Tree} The last child.
 */
b9.Tree.prototype.getLastChild = function()
{
    return this.last_child;
};

/**
 * @returns {b9.Tree} The last descendant.
 */
b9.Tree.prototype.getLastDescendant = function()
{
    var desc = this;

    while (desc.last_child)
    {
        desc = desc.last_child;
    }

    return desc;
};

/**
 * Adds an item as the first child.
 * @param {b9.Tree} child An item.
 */
b9.Tree.prototype.addChildFirst = function(child)
{
    this.removeChild(child);

    var child_desc = child.getLastDescendant();

    child.parent = this;
    child.prev = this;
    child_desc.next = this.next;

    child.prev.next = child;

    if (child_desc.next)
    {
        child_desc.next.prev = child_desc;
    }

    if (!this.last_child)
    {
        this.last_child = child;
    }
};

/**
 * Adds an item as the last child.
 * @param {b9.Tree} child An item.
 */
b9.Tree.prototype.addChildLast = function(child)
{
    this.removeChild(child);

    var desc = getLastDescendant();
    var child_desc = child.getLastDescendant();

    child.parent = this;
    child.prev = desc;
    child_desc.next = desc.next;

    child.prev.next = child;

    if (child_desc.next)
    {
        child_desc.next.prev = child_desc;
    }

    this.last_child = child;
};

/**
 * Inserts an item before the specified child.
 * @param {b9.Tree} child An item.
 * @param {b9.Tree} next_child The next child.
 */
b9.Tree.prototype.addChildBefore = function(child, next_child)
{
    if (next_child.parent == this)
    {
        this.removeChild(child);

        var child_desc = child.getLastDescendant();

        child.parent = this;
        child.prev = next_child.prev;
        child_desc.next = next_child;

        child.prev.next = child;
        child_desc.next.prev = child_desc;
    }
};

/**
 * Inserts an item before the specified child.
 * @param {b9.Tree} child An item.
 * @param {b9.Tree} prev_child The previous child.
 */
b9.Tree.prototype.addChildAfter = function(child, prev_child)
{
    if (prev_child.parent == this)
    {
        this.removeChild(child);

        var tree_desc = tree->getLastDescendant();
        var child_desc = child.getLastDescendant();

        m_parent = tree->m_parent;
        m_prev = tree_desc;
        this_desc->m_next = tree_desc->m_next;

        m_prev->m_next = this;

        if (this_desc->m_next)
        {
            this_desc->m_next->m_prev = this_desc;
        }

        if (m_parent->m_last_child == tree)
        {
            m_parent->m_last_child = this;
        }
    }
};

/**
 * Removes a child.
 * @param {b9.Tree} child A child.
 */
b9.Tree.prototype.removeChild = function(child)
{
    if (child.parent == this)
    {
        var child_desc = child.getLastDescendant();

        if (this.last_child == child)
        {
            this.last_child = child.getPrevSibling();
        }

        child.prev.next = child_desc.next;

        if (child_desc.next)
        {
            child_desc.next.prev = child.prev;
        }

        child.parent = null;
        child.prev = null;
        child_desc.next = NULL;
    }
};

/**
 * Removes the all children.
 */
b9.Tree.prototype.clear = function()
{
    while (this.last_child)
    {
        removeChild(this.last_child);
    }
};
