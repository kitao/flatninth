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

function testLinkedList() {
    var list1;
    var item1, item2;

    /* initialize */
    /* getCount */
    /* getFirst */
    /* getLast */
    list1 = new b9.LinkedList();

    assertEquals(0, list1.getCount());
    assertEquals(null, list1.getFirst());
    assertEquals(null, list1.getLast());

    /* addFirst */
    item1 = new b9.LinkedListItem(null);
    list1.addFirst(item1);

    assertEquals(1, list1.getCount());
    assertEquals(item1, list1.getFirst());
    assertEquals(item1, list1.getLast());

    assertEquals(list1, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    item2 = new b9.LinkedListItem(null);
    list1.addFirst(item2);

    assertEquals(2, list1.getCount());
    assertEquals(item2, list1.getFirst());
    assertEquals(item1, list1.getLast());

    assertEquals(list1, item1.getList());
    assertEquals(item2, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(list1, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(item1, item2.getNext());

    list1.addFirst(item1, list1);

    assertEquals(2, list1.getCount());
    assertEquals(item1, list1.getFirst());
    assertEquals(item2, list1.getLast());

    assertEquals(list1, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(item2, item1.getNext());

    assertEquals(list1, item2.getList());
    assertEquals(item1, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* addLast */
    list1.addLast(item1, list1);

    assertEquals(2, list1.getCount());
    assertEquals(item2, list1.getFirst());
    assertEquals(item1, list1.getLast());

    assertEquals(list1, item1.getList());
    assertEquals(item2, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(list1, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(item1, item2.getNext());

    /* insertBefore */
    list1.insertBefore(item1, item2);

    assertEquals(2, list1.getCount());
    assertEquals(item1, list1.getFirst());
    assertEquals(item2, list1.getLast());

    assertEquals(list1, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(item2, item1.getNext());

    assertEquals(list1, item2.getList());
    assertEquals(item1, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* insertAfter */
    list1.insertAfter(item1, item2);

    assertEquals(2, list1.getCount());
    assertEquals(item2, list1.getFirst());
    assertEquals(item1, list1.getLast());

    assertEquals(list1, item1.getList());
    assertEquals(item2, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(list1, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(item1, item2.getNext());

    /* remove */
    list1.remove(item1);

    assertEquals(1, list1.getCount());
    assertEquals(item2, list1.getFirst());
    assertEquals(item2, list1.getLast());

    assertEquals(null, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(list1, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());

    list1.remove(item2);

    assertEquals(0, list1.getCount());
    assertEquals(null, list1.getFirst());
    assertEquals(null, list1.getLast());

    assertEquals(null, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* clear */
    list1.addLast(item1);
    list1.addLast(item2);
    list1.clear();

    assertEquals(0, list1.getCount());
    assertEquals(null, list1.getFirst());
    assertEquals(null, list1.getLast());

    assertEquals(null, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(null, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* finalize */
    list1.addLast(item1);
    list1.addLast(item2);
    list1.finalize();

    assertEquals(0, list1.getCount());
    assertEquals(null, list1.getFirst());
    assertEquals(null, list1.getLast());

    assertEquals(null, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(null, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());
}
