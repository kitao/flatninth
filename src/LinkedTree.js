/*
 * Copyright (c) 2009-2011 Takashi Kitao
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
 * Constructs a tree.
 *
 * @class A tree container which can have a parent and children.
 */
b9.LinkedTree = b9.createClass();

/**
 * @ignore
 */
b9.LinkedTree.prototype.initialize = function() {
    /**
     * The parent of this tree. This property is read-only.
     * @return {b9.LinkedTree}
     */
    this.parent = null;

    /**
     * The previous tree, regarding the whole tree as a list. This property is read-only.
     * @return {b9.LinkedTree}
     */
    this.prevAsList = null;

    /**
     * The next tree, regarding the whole tree as a list. This property is real-only.
     * @return {b9.LinkedTree}
     */
    this.nextAsList = null;

    this._lastChild = null;
};

/**
 * Destructs this tree. If this tree has the parent, this tree gets unlinked from it.
 * And all of the children of this tree get unlinked.
 */
b9.LinkedTree.prototype.finalize = function() {
    if (this.parent) {
        this.parent.removeChild(this);
    }

    this.clear();
};

/**
 * Returns the previous sibling of this tree. If no such tree exists, returns null.
 * @return {b9.LinkedTree} The previous sibling.
 */
b9.LinkedTree.prototype.getPrevSibling = function() {
    var prev;

    if (this.parent && this.prevAsList !== this.parent) {
        prev = this.prevAsList;

        while (prev.parent !== this.parent) {
            prev = prev.parent;
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

    if (this.parent) {
        next = this.getLastDescendant().nextAsList;

        if (next && next.parent === this.parent) {
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
    return this._lastChild ? this.nextAsList : null;
};

/**
 * Returns the last child of this tree. If no such tree exists, returns null.
 * @return {b9.LinkedTree} The last child.
 */
b9.LinkedTree.prototype.getLastChild = function() {
    return this._lastChild;
};

/**
 * Returns the last tree of this tree, regarding this tree as a list. If no such tree exists, returns this tree.<br>
 * This method is mainly used to retrieve the terminator of the list which consists of this tree and its descendants.
 * @return {b9.LinkedTree} The last descendant.
 */
b9.LinkedTree.prototype.getLastDescendant = function() {
    var desc = this;

    while (desc._lastChild) {
        desc = desc._lastChild;
    }

    return desc;
};

/**
 * Links a tree as the first child with this tree.
 * @param {b9.LinkedTree} child A tree. If the tree already belongs to some tree,
 * the tree gets unlinked with it before the operation automatically.
 */
b9.LinkedTree.prototype.addChildFirst = function(child) {
    var childDesc;

    if (child.parent) {
        child.parent.removeChild(child);
    }

    childDesc = child.getLastDescendant();

    child.parent = this;
    child.prevAsList = this;
    childDesc.nextAsList = this.nextAsList;

    child.prevAsList.nextAsList = child;

    if (childDesc.nextAsList) {
        childDesc.nextAsList.prevAsList = childDesc;
    }

    if (!this._lastChild) {
        this._lastChild = child;
    }
};

/**
 * Links a tree as the last child with this tree.
 * @param {b9.LinkedTree} child A tree. If the tree already belongs to some tree,
 * the tree gets unlinked with it before the operation automatically.
 */
b9.LinkedTree.prototype.addChildLast = function(child) {
    var thisDesc, childDesc;

    if (child.parent) {
        child.parent.removeChild(child);
    }

    thisDesc = this.getLastDescendant();
    childDesc = child.getLastDescendant();

    child.parent = this;
    child.prevAsList = thisDesc;
    childDesc.nextAsList = thisDesc.nextAsList;

    child.prevAsList.nextAsList = child;

    if (childDesc.nextAsList) {
        childDesc.nextAsList.prevAsList = childDesc;
    }

    this._lastChild = child;
};

/**
 * Links a tree as the previous of the specified tree with this tree.
 * @param {b9.LinkedTree} child A tree. If the tree already belongs to some tree,
 * the tree gets unlinked with it before the operation automatically.
 * @param {b9.LinkedTree} nextChild The tree to be the next. This tree must be a child of this tree.
 */
b9.LinkedTree.prototype.insertChildBefore = function(child, nextChild) {
    var childDesc;

    if (nextChild.parent === this) {
        if (child.parent) {
            child.parent.removeChild(child);
        }

        childDesc = child.getLastDescendant();

        child.parent = this;
        child.prevAsList = nextChild.prevAsList;
        childDesc.nextAsList = nextChild;

        child.prevAsList.nextAsList = child;
        childDesc.nextAsList.prevAsList = childDesc;
    }
};

/**
 * Links a tree as the next of the specified tree with this tree.
 * @param {b9.LinkedTree} child A tree. If the tree already belongs to some tree,
 * the tree gets unlinked with it before the operation automatically.
 * @param {b9.LinkedTree} prevChild The tree to be the previous. This tree must be a child of this tree.
 */
b9.LinkedTree.prototype.insertChildAfter = function(child, prevChild)
{
    var childDesc, prevChildDesc;

    if (prevChild.parent === this) {
        if (child.parent) {
            child.parent.removeChild(child);
        }

        childDesc = child.getLastDescendant();
        prevChildDesc = prevChild.getLastDescendant();

        child.parent = this;
        child.prevAsList = prevChildDesc;
        childDesc.nextAsList = prevChildDesc.nextAsList;

        child.prevAsList.nextAsList = child;

        if (childDesc.nextAsList) {
            childDesc.nextAsList.prevAsList = childDesc;
        }

        if (this._lastChild === prevChild) {
            this._lastChild = child;
        }
    }
};

/**
 * Unlinks a child from this tree.
 * @param {b9.LinkedTree} child A child to be unlinked. This tree must be a child of this tree.
 */
b9.LinkedTree.prototype.removeChild = function(child) {
    var childDesc;

    if (child.parent === this) {
        childDesc = child.getLastDescendant();

        if (this._lastChild === child) {
            this._lastChild = child.getPrevSibling();
        }

        child.prevAsList.nextAsList = childDesc.nextAsList;

        if (childDesc.nextAsList) {
            childDesc.nextAsList.prevAsList = child.prevAsList;
        }

        child.parent = null;
        child.prevAsList = null;
        childDesc.nextAsList = null;
    }
};

/**
 * Unlinks all of the children from this tree.
 * Note that this method only unlinks the children of this tree, so the descendants of the children doesn't change.
 */
b9.LinkedTree.prototype.clear = function() {
    while (this._lastChild) {
        this.removeChild(this._lastChild);
    }
};
