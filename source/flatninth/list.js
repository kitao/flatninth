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
 * @class A list container.
 */
b9.List = function()
{
    /** @private */
    this.start = new b9.ListItem(null);

    /** @private */
    this.end = new b9.ListItem(null);

    /** @private */
    this.item_num = 0;

    this.start.next = this.end;
    this.end.prev = this.start;
};

/**
 * @returns {Number} The number of the items.
 */
b9.List.prototype.getItemNum()
{
    return this.item_num;
};

/**
 * @returns {b9.ListItem} The first item.
 */
b9.List.prototype.getFirstItem()
{
    return (this.start.next != this.end) ? this.start.next : null;
};

/**
 * @returns {b9.ListItem} The last item.
 */
b9.List.prototype.getLastItem()
{
    return (this.end.prev != this.start) ? this.end.prev : null;
};

/**
 * Adds an item as the first item.
 * @param {b9.ListItem} item An item.
 */
b9.List.prototype.addItemFirst(item)
{
    if (!item)
    {
        ckThrow(ExceptionInvalidArgument);
    }

    item->joinAfter(&m_start);
};

/**
 * Adds an item as the last item.
 * @param {b9.ListItem} item An item.
 */
b9.List.prototype.addItemLast(item)
{
    if (!item)
    {
        ckThrow(ExceptionInvalidArgument);
    }

    item->joinBefore(&m_end);
};

/**
 * Inserts an item before the specified item.
 * @param {b9.ListItem} item An item.
 * @param {b9.ListItem} next_item The next item.
 */
b9.List.prototype.addItemBefore(item, next_item)
{
    if (!item || item == this || !item->hasList())
    {
        ckThrow(ExceptionInvalidArgument);
    }

    leave();

    m_list = item->m_list;

    m_prev = item->m_prev;
    m_next = item;

    m_prev->m_next = m_next->m_prev = this;

    m_list->m_item_num++;
};

/**
 * Inserts an item after the specified item.
 * @param {b9.ListItem} item An item.
 * @param {b9.ListItem} prev_item The previous item.
 */
b9.List.prototype.addItemAfter(item, prev_item)
{
    if (!item || item == this || !item->hasList())
    {
        ckThrow(ExceptionInvalidArgument);
    }

    leave();

    m_list = item->m_list;

    m_prev = item;
    m_next = item->m_next;

    m_prev->m_next = m_next->m_prev = this;

    m_list->m_item_num++;
};

/**
 * Removes an item.
 * @param {be.ListItem} item An item.
 */
b9.List.prototype.removeItem(item)
{
    if (m_prev && m_next)
    {
        m_list->m_item_num--;

        m_prev->m_next = m_next;
        m_next->m_prev = m_prev;

        m_list = NULL;
        m_prev = m_next = NULL;
    }
};

/**
 * Removes the all items.
 */
b9.List.prototype.clear()
{
    while (hasItem())
    {
        getFirstN()->leave();
    }
};

/**
 * @class An item stored in b9.List.
 * @param {Object} self An object to be stored.
 */
b9.ListItem = function(self)
{
    /** @private */
    this._self = self;

    /** @private */
    this._list = null;

    /** @private */
    this._prev = null;

    /** @private */
    this._next = null;
};

/**
 * @returns {b9.ListItem} The stored object.
 */
b9.ListItem.prototype.getSelf()
{
    return this._self;
};

/**
 * @returns {b9.List} The list.
 */
b9.ListItem.prototype.getList()
{
    return this._list;
};

/**
 * @returns {b9.ListItem} The previous item.
 */
b9.ListItem.prototype.getPrev()
{
    return this._prev;
};

/**
 * @returns {b9.ListItem} The next item.
 */
b9.ListItem.prototype.getNext()
{
    return this._next;
};
