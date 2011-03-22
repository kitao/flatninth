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
 * Constructs an item.
 *
 * @class An element of the b9.LinkedList class.
 */
b9.LinkedListItem = b9.createClass();

/**
 * @ignore
 */
b9.LinkedListItem.prototype.initialize = function() {
    /**
     * The list to which this item belongs. This property is read-only.
     * @return {b9.LinkedList}
     */
    this.list = null;

    /**
     * The previous item of this item. This property is read-only.
     * @return {b9.LinkedListItem}
     */
    this.prev = null;

    /**
     * The next item of this item. This property is read-only.
     * @return {b9.LinkedListItem}
     */
    this.next = null;
};

/**
 * Destructs this item. If this item belongs to a list, gets unlinked from it.
 */
b9.LinkedListItem.prototype.finalize = function() {
    if (this.list) {
        this.list.remove(this);
    }
};
