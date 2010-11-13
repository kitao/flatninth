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

function testLinkedList() {
    /* initialize */
    /* getItemCount */
    /* getFirstItem */
    /* getLastItem */
    var list1 = new b9.LinkedList();

    assertEquals(0, list1.getItemCount());
    assertEquals(null, list1.getFirstItem());
    assertEquals(null, list1.getLastItem());

    /* addItemFirst */
    var item1 = new b9.LinkedListItem(null);
    list1.addItemFirst(item1);

    assertEquals(1, list1.getItemCount());
    assertEquals(item1, list1.getFirstItem());
    assertEquals(item1, list1.getLastItem());

    assertEquals(list1, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    var item2 = new b9.LinkedListItem(null);
    list1.addItemLast(item2);

    assertEquals(2, list1.getItemCount());
    assertEquals(item1, list1.getFirstItem());
    assertEquals(item2, list1.getLastItem());

    assertEquals(list1, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(item2, item1.getNext());

    assertEquals(list1, item2.getList());
    assertEquals(item1, item2.getPrev());
    assertEquals(null, item2.getNext());

    list1.addItemFirst(item2, list1);

    assertEquals(2, list1.getItemCount());
    assertEquals(item2, list1.getFirstItem());
    assertEquals(item1, list1.getLastItem());

    assertEquals(list1, item1.getList());
    assertEquals(item2, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(list1, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(item1, item2.getNext());

    /* addItemLast */
    list1.addItemLast(item2, list1);

    assertEquals(2, list1.getItemCount());
    assertEquals(item1, list1.getFirstItem());
    assertEquals(item2, list1.getLastItem());

    assertEquals(list1, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(item2, item1.getNext());

    assertEquals(list1, item2.getList());
    assertEquals(item1, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* insertItemBefore */
    list1.insertItemBefore(item2, item1);

    assertEquals(2, list1.getItemCount());
    assertEquals(item2, list1.getFirstItem());
    assertEquals(item1, list1.getLastItem());

    assertEquals(list1, item1.getList());
    assertEquals(item2, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(list1, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(item1, item2.getNext());

    /* insertItemAfter */
    list1.insertItemAfter(item2, item1);

    assertEquals(2, list1.getItemCount());
    assertEquals(item1, list1.getFirstItem());
    assertEquals(item2, list1.getLastItem());

    assertEquals(list1, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(item2, item1.getNext());

    assertEquals(list1, item2.getList());
    assertEquals(item1, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* removeItem */
    list1.removeItem(item1);

    assertEquals(1, list1.getItemCount());
    assertEquals(item2, list1.getFirstItem());
    assertEquals(item2, list1.getLastItem());

    assertEquals(null, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(list1, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());

    list1.removeItem(item2);

    assertEquals(0, list1.getItemCount());
    assertEquals(null, list1.getFirstItem());
    assertEquals(null, list1.getLastItem());

    assertEquals(null, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* clear */
    list1.addItemLast(item1);
    list1.addItemLast(item2);
    list1.clear();

    assertEquals(0, list1.getItemCount());
    assertEquals(null, list1.getFirstItem());
    assertEquals(null, list1.getLastItem());

    assertEquals(null, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(null, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* finalize */
    list1.addItemLast(item1);
    list1.addItemLast(item2);
    list1.finalize();

    assertEquals(0, list1.getItemCount());
    assertEquals(null, list1.getFirstItem());
    assertEquals(null, list1.getLastItem());

    assertEquals(null, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(null, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());
}
