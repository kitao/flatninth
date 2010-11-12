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
 * Constructs a tree and associates an object with it.
 *
 * @class A tree container which can have a parent and children.
 *
 * @param {Object} self An object to be associated.
 */
b9.LinkedTree = b9.createClass();

/**
 * @ignore
 */
b9.LinkedTree.prototype.initialize = function(self) {
    this._self = self;
    this._parent = null;
    this._last_child = null;
    this._prev = null;
    this._next = null;
};

/**
 * Destructs this tree. If this tree has the parent, this tree gets unlinked from it.
 * And all of the children of this tree get unlinked.
 */
b9.LinkedTree.prototype.finalize = function() {
    this.removeAllChildren();

    if (this._parent) {
        this._parent.removeChild(this);
    }

    this.self = null;
};

/**
 * Returns the object associated with this item.
 * @return {Object} The associated object.
 */
b9.LinkedTree.prototype.getSelf = function() {
    return this._self;
};

/**
 * Returns the previous tree, regarding the whole tree as a list. If no such tree exists, returns null.
 * @return {b9.LinkedTree} The previous tree.
 */
b9.LinkedTree.prototype.getPrevAsList = function() {
    return this._prev;
};

/**
 * Returns the next tree, regarding the whole tree as a list. If no such tree exists, returns null.
 * @return {b9.LinkedTree} The next tree.
 */
b9.LinkedTree.prototype.getNextAsList = function() {
    return this._next;
};

/**
 * Returns the parent of this tree. If no such tree exists, returns null.
 * @return {b9.LinkedTree} The parent.
 */
b9.LinkedTree.prototype.getParent = function() {
    return this._parent;
};

/**
 * Returns the previous sibling of this tree. If no such tree exists, returns null.
 * @return {b9.LinkedTree} The previous sibling.
 */
b9.LinkedTree.prototype.getPrevSibling = function() {
    var prev;

    if (this._parent && this._prev !== this._parent) {
        prev = this._prev;

        while (prev._parent !== this._parent) {
            prev = prev._parent;
        }

        return prev;
    }

    return null;
};

/**
 * Returns the next sibling of this tree. If no such tree exists, returns null.
 * @return {b9.LinkedTree} The next sibling.
 */
b9.LinkedTree.prototype.getNextSibling = function() {
    var next;

    if (this._parent) {
        next = this.getLastDescendant()._next;

        if (next && next._parent === this._parent) {
            return next;
        }
    }

    return null;
};

/**
 * Returns the first child of this tree. If no such tree exists, returns null.
 * @return {b9.LinkedTree} The first child.
 */
b9.LinkedTree.prototype.getFirstChild = function() {
    return this._last_child ? this._next : null;
};

/**
 * Returns the last child of this tree. If no such tree exists, returns null.
 * @return {b9.LinkedTree} The last child.
 */
b9.LinkedTree.prototype.getLastChild = function() {
    return this._last_child;
};

/**
 * Returns the last tree of this tree, regarding this tree as a list. If no such tree exists, returns this tree.<br>
 * This method is mainly used to retrieve the terminator of the list which consists of this tree and its descendants.
 * @return {b9.LinkedTree} The last descendant.
 */
b9.LinkedTree.prototype.getLastDescendant = function() {
    var desc = this;

    while (desc._last_child) {
        desc = desc._last_child;
    }

    return desc;
};

/**
 * Links a tree as the first child with this tree.
 * @param {b9.LinkedTree} child A tree. If the tree already belongs to some tree,
 * the tree gets automatically unlinked with it before the operation.
 */
b9.LinkedTree.prototype.addChildFirst = function(child) {
    var child_desc;

    if (child._parent) {
        child._parent.removeChild(child);
    }

    child_desc = child.getLastDescendant();

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
 * Links a tree as the last child with this tree.
 * @param {b9.LinkedTree} child A tree. If the tree already belongs to some tree,
 * the tree gets automatically unlinked with it before the operation.
 */
b9.LinkedTree.prototype.addChildLast = function(child) {
    var this_desc, child_desc;

    if (child._parent) {
        child._parent.removeChild(child);
    }

    this_desc = this.getLastDescendant();
    child_desc = child.getLastDescendant();

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
 * Links a tree as the previous of the specified tree with this tree.
 * @param {b9.LinkedTree} child A tree. If the tree already belongs to some tree,
 * the tree gets automatically unlinked with it before the operation.
 * @param {b9.LinkedTree} next_child The tree to be the next. This tree must be a child of this tree.
 */
b9.LinkedTree.prototype.addChildBefore = function(child, next_child) {
    var child_desc;

    if (next_child._parent === this) {
        if (child._parent) {
            child._parent.removeChild(child);
        }

        child_desc = child.getLastDescendant();

        child._parent = this;
        child._prev = next_child._prev;
        child_desc._next = next_child;

        child._prev._next = child;
        child_desc._next._prev = child_desc;
    }
};

/**
 * Links a tree as the next of the specified tree with this tree.
 * @param {b9.LinkedTree} child A tree. If the tree already belongs to some tree,
 * the tree gets automatically unlinked with it before the operation.
 * @param {b9.LinkedTree} prev_child The tree to be the previous. This tree must be a child of this tree.
 */
b9.LinkedTree.prototype.addChildAfter = function(child, prev_child)
{
    var child_desc, prev_child_desc;

    if (prev_child._parent === this) {
        if (child._parent) {
            child._parent.removeChild(child);
        }

        child_desc = child.getLastDescendant();
        prev_child_desc = prev_child.getLastDescendant();

        child._parent = this;
        child._prev = prev_child_desc;
        child_desc._next = prev_child_desc._next;

        child._prev._next = child;

        if (child_desc._next) {
            child_desc._next._prev = child_desc;
        }

        if (this._last_child === prev_child) {
            this._last_child = child;
        }
    }
};

/**
 * Unlinks a child from this tree.
 * @param {b9.LinkedTree} child A child to be unlinked. This tree must be a child of this tree.
 */
b9.LinkedTree.prototype.removeChild = function(child) {
    var child_desc;

    if (child._parent === this) {
        child_desc = child.getLastDescendant();

        if (this._last_child === child) {
            this._last_child = child.getPrevSibling();
        }

        child._prev._next = child_desc._next;

        if (child_desc._next) {
            child_desc._next._prev = child._prev;
        }

        child._parent = null;
        child._prev = null;
        child_desc._next = null;
    }
};

/**
 * Unlinks all of the children from this tree.
 * Note that this method only unlinks the children of this tree, so the descendants of the children doesn't change.
 */
b9.LinkedTree.prototype.removeAllChildren = function() {
    while (this._last_child) {
        this.removeChild(this._last_child);
    }
};
