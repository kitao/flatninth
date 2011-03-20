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
 * Constructs a list without an item.
 *
 * @class A linked list which stores instances of the b9.LinkedListItem class.
 */
b9.LinkedList = b9.createClass();

/**
 * @ignore
 */
b9.LinkedList.prototype.initialize = function() {
    this.start_ = new b9.LinkedListItem(null);
    this.start_.list_ = this;

    this.end_ = new b9.LinkedListItem(null);
    this.end_.list_ = this;

    this.itemCount_ = 0;

    this.start_.next_ = this.end_;
    this.end_.prev_ = this.start_;
};

/**
 * Destructs this list. All of the items belong to this list get unlinked.
 */
b9.LinkedList.prototype.finalize = function() {
    this.clear();
};

/**
 * Returns the number of the items belong to this list.
 * @return {Number} The number of the items.
 */
b9.LinkedList.prototype.getCount = function() {
    return this.itemCount_;
};

/**
 * Returns the first item of this list. If no such item exists, returns null.
 * @return {b9.LinkedListItem} The first item.
 */
b9.LinkedList.prototype.getFirst = function() {
    return (this.itemCount_ > 0) ? this.start_.next_ : null;
};

/**
 * Returns the last item of this list. If no such item exists, returns null.
 * @return {b9.LinkedListItem} The last item.
 */
b9.LinkedList.prototype.getLast = function() {
    return (this.itemCount_ > 0) ? this.end_.prev_ : null;
};

/**
 * Links an item as the first item with this list.
 * @param {b9.LinkedListItem} item An item. If the item already belongs to some list,
 * the item gets unlinked with it before the operation automatically.
 */
b9.LinkedList.prototype.addFirst = function(item) {
    this.insertAfter(item, this.start_);
};

/**
 * Links an item as the last item with this list.
 * @param {b9.LinkedListItem} item An item. If the item already belongs to some list,
 * the item gets unlinked with it before the operation automatically.
 */
b9.LinkedList.prototype.addLast = function(item) {
    this.insertBefore(item, this.end_);
};

/**
 * Links an item as the previous of the specified item with this list.
 * @param {b9.LinkedListItem} item An item. If the item already belongs to some list,
 * the item gets unlinked with it before the operation automatically.
 * @param {b9.LinkedListItem} nextItem The item to be the next. This item must belong to this list.
 */
b9.LinkedList.prototype.insertBefore = function(item, nextItem) {
    if (nextItem.list_ === this) {
        if (item.list_) {
            item.list_.remove(item);
        }

        item.list_ = this;
        item.prev_ = nextItem.prev_;
        item.next_ = nextItem;

        item.prev_.next_ = item;
        item.next_.prev_ = item;

        this.itemCount_++;
    }
};

/**
 * Links an item as the next of the specified item with this list.
 * @param {b9.LinkedListItem} item An item. If the item already belongs to some list,
 * the item gets unlinked with it before the operation automatically.
 * @param {b9.LinkedListItem} prevItem The item to be the previous. This item must belong to this list.
 */
b9.LinkedList.prototype.insertAfter = function(item, prevItem) {
    if (prevItem.list_ === this) {
        if (item.list_) {
            item.list_.remove(item);
        }

        item.list_ = this;
        item.prev_ = prevItem;
        item.next_ = prevItem.next_;

        item.prev_.next_ = item;
        item.next_.prev_ = item;

        this.itemCount_++;
    }
};

/**
 * Unlinks an item from this list.
 * @param {b9.LinkedListItem} item An item to be unlinked. This item must belong to this list.
 */
b9.LinkedList.prototype.remove = function(item) {
    if (item.list_ === this) {
        item.prev_.next_ = item.next_;
        item.next_.prev_ = item.prev_;

        item.list_ = null;
        item.prev_ = null;
        item.next_ = null;

        this.itemCount_--;
    }
};

/**
 * Unlinks all of the items from this list.
 */
b9.LinkedList.prototype.clear = function() {
    while (this.itemCount_ > 0) {
        this.remove(this.start_.next_);
    }
};
