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
 * Constructs a tree and associates an object with it.
 *
 * @class A tree container which can have a parent and children.
 *
 * @param {object} self An object to be associated.
 */
b9.LinkedTree = b9.createClass();

/**
 * @ignore
 */
b9.LinkedTree.prototype.initialize = function(self) {
    this.self_ = self;
    this.parent_ = null;
    this.lastChild_ = null;
    this.prev_ = null;
    this.next_ = null;
};

/**
 * Destructs this tree. If this tree has the parent, this tree gets unlinked from it.
 * And all of the children of this tree get unlinked.
 */
b9.LinkedTree.prototype.finalize = function() {
    this.clear();

    if (this.parent_) {
        this.parent_.removeChild(this);
    }

    this.self_ = null;
};

/**
 * Returns the object associated with this item.
 * @return {object} The associated object.
 */
b9.LinkedTree.prototype.getSelf = function() {
    return this.self_;
};

/**
 * Returns the previous tree, regarding the whole tree as a list. If no such tree exists, returns null.
 * @return {b9.LinkedTree} The previous tree.
 */
b9.LinkedTree.prototype.getPrevAsList = function() {
    return this.prev_;
};

/**
 * Returns the next tree, regarding the whole tree as a list. If no such tree exists, returns null.
 * @return {b9.LinkedTree} The next tree.
 */
b9.LinkedTree.prototype.getNextAsList = function() {
    return this.next_;
};

/**
 * Returns the parent of this tree. If no such tree exists, returns null.
 * @return {b9.LinkedTree} The parent.
 */
b9.LinkedTree.prototype.getParent = function() {
    return this.parent_;
};

/**
 * Returns the previous sibling of this tree. If no such tree exists, returns null.
 * @return {b9.LinkedTree} The previous sibling.
 */
b9.LinkedTree.prototype.getPrevSibling = function() {
    var prev;

    if (this.parent_ && this.prev_ !== this.parent_) {
        prev = this.prev_;

        while (prev.parent_ !== this.parent_) {
            prev = prev.parent_;
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

    if (this.parent_) {
        next = this.getLastDescendant().next_;

        if (next && next.parent_ === this.parent_) {
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
    return this.lastChild_ ? this.next_ : null;
};

/**
 * Returns the last child of this tree. If no such tree exists, returns null.
 * @return {b9.LinkedTree} The last child.
 */
b9.LinkedTree.prototype.getLastChild = function() {
    return this.lastChild_;
};

/**
 * Returns the last tree of this tree, regarding this tree as a list. If no such tree exists, returns this tree.<br>
 * This method is mainly used to retrieve the terminator of the list which consists of this tree and its descendants.
 * @return {b9.LinkedTree} The last descendant.
 */
b9.LinkedTree.prototype.getLastDescendant = function() {
    var desc = this;

    while (desc.lastChild_) {
        desc = desc.lastChild_;
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

    if (child.parent_) {
        child.parent_.removeChild(child);
    }

    childDesc = child.getLastDescendant();

    child.parent_ = this;
    child.prev_ = this;
    childDesc.next_ = this.next_;

    child.prev_.next_ = child;

    if (childDesc.next_) {
        childDesc.next_.prev_ = childDesc;
    }

    if (!this.lastChild_) {
        this.lastChild_ = child;
    }
};

/**
 * Links a tree as the last child with this tree.
 * @param {b9.LinkedTree} child A tree. If the tree already belongs to some tree,
 * the tree gets unlinked with it before the operation automatically.
 */
b9.LinkedTree.prototype.addChildLast = function(child) {
    var thisDesc, childDesc;

    if (child.parent_) {
        child.parent_.removeChild(child);
    }

    thisDesc = this.getLastDescendant();
    childDesc = child.getLastDescendant();

    child.parent_ = this;
    child.prev_ = thisDesc;
    childDesc.next_ = thisDesc.next_;

    child.prev_.next_ = child;

    if (childDesc.next_) {
        childDesc.next_.prev_ = childDesc;
    }

    this.lastChild_ = child;
};

/**
 * Links a tree as the previous of the specified tree with this tree.
 * @param {b9.LinkedTree} child A tree. If the tree already belongs to some tree,
 * the tree gets unlinked with it before the operation automatically.
 * @param {b9.LinkedTree} nextChild The tree to be the next. This tree must be a child of this tree.
 */
b9.LinkedTree.prototype.insertChildBefore = function(child, nextChild) {
    var childDesc;

    if (nextChild.parent_ === this) {
        if (child.parent_) {
            child.parent_.removeChild(child);
        }

        childDesc = child.getLastDescendant();

        child.parent_ = this;
        child.prev_ = nextChild.prev_;
        childDesc.next_ = nextChild;

        child.prev_.next_ = child;
        childDesc.next_.prev_ = childDesc;
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

    if (prevChild.parent_ === this) {
        if (child.parent_) {
            child.parent_.removeChild(child);
        }

        childDesc = child.getLastDescendant();
        prevChildDesc = prevChild.getLastDescendant();

        child.parent_ = this;
        child.prev_ = prevChildDesc;
        childDesc.next_ = prevChildDesc.next_;

        child.prev_.next_ = child;

        if (childDesc.next_) {
            childDesc.next_.prev_ = childDesc;
        }

        if (this.lastChild_ === prevChild) {
            this.lastChild_ = child;
        }
    }
};

/**
 * Unlinks a child from this tree.
 * @param {b9.LinkedTree} child A child to be unlinked. This tree must be a child of this tree.
 */
b9.LinkedTree.prototype.removeChild = function(child) {
    var childDesc;

    if (child.parent_ === this) {
        childDesc = child.getLastDescendant();

        if (this.lastChild_ === child) {
            this.lastChild_ = child.getPrevSibling();
        }

        child.prev_.next_ = childDesc.next_;

        if (childDesc.next_) {
            childDesc.next_.prev_ = child.prev_;
        }

        child.parent_ = null;
        child.prev_ = null;
        childDesc.next_ = null;
    }
};

/**
 * Unlinks all of the children from this tree.
 * Note that this method only unlinks the children of this tree, so the descendants of the children doesn't change.
 */
b9.LinkedTree.prototype.clear = function() {
    while (this.lastChild_) {
        this.removeChild(this.lastChild_);
    }
};
