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
 * Constructs an item and associates an object with it.
 *
 * @class An element of the b9.LinkedList class.
 *
 * @param {object} self An object to be associated.
 */
b9.LinkedListItem = b9.createClass();

/**
 * @ignore
 */
b9.LinkedListItem.prototype.initialize = function(self) {
    this.self_ = self;
    this.list_ = null;
    this.prev_ = null;
    this.next_ = null;
};

/**
 * Destructs this item. If this item belongs to a list, this item gets unlinked from it.
 */
b9.LinkedListItem.prototype.finalize = function() {
    if (this.list_) {
        this.list_.remove(this);
    }

    this.self_ = null;
};

/**
 * Returns the object associated with this item.
 * @return {object} The associated object.
 */
b9.LinkedListItem.prototype.getSelf = function() {
    return this.self_;
};

/**
 * Returns the list to which this item belongs. If no such list exists, returns null.
 * @return {b9.LinkedList} The list this item belongs to.
 */
b9.LinkedListItem.prototype.getList = function() {
    return this.list_;
};

/**
 * Returns the previous item of this item. If no such item exists, returns null.
 * @return {b9.LinkedListItem} The previous item.
 */
b9.LinkedListItem.prototype.getPrev = function() {
    return (this.list_ && this.prev_ === this.list_.start_) ? null : this.prev_;
};

/**
 * Returns the next item of this item. If no such item exists, returns null.
 * @return {b9.LinkedListItem} The next item.
 */
b9.LinkedListItem.prototype.getNext = function() {
    return (this.list_ && this.next_ === this.list_.end_) ? null : this.next_;
};
