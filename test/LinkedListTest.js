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
    var list;
    var item1, item2;

    /* initialize */
    /* itemCount */
    /* getFirst */
    /* getLast */
    list = new b9.LinkedList();

    assertEquals(0, list.itemCount);
    assertEquals(null, list.getFirst());
    assertEquals(null, list.getLast());

    /* addFirst */
    item1 = new b9.LinkedListItem(null);
    list.addFirst(item1);

    assertEquals(1, list.itemCount);
    assertEquals(item1, list.getFirst());
    assertEquals(item1, list.getLast());

    assertEquals(list, item1.list);
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    item2 = new b9.LinkedListItem(null);
    list.addFirst(item2);

    assertEquals(2, list.itemCount);
    assertEquals(item2, list.getFirst());
    assertEquals(item1, list.getLast());

    assertEquals(list, item1.list);
    assertEquals(item2, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(list, item2.list);
    assertEquals(null, item2.getPrev());
    assertEquals(item1, item2.getNext());

    list.addFirst(item1, list);

    assertEquals(2, list.itemCount);
    assertEquals(item1, list.getFirst());
    assertEquals(item2, list.getLast());

    assertEquals(list, item1.list);
    assertEquals(null, item1.getPrev());
    assertEquals(item2, item1.getNext());

    assertEquals(list, item2.list);
    assertEquals(item1, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* addLast */
    list.addLast(item1, list);

    assertEquals(2, list.itemCount);
    assertEquals(item2, list.getFirst());
    assertEquals(item1, list.getLast());

    assertEquals(list, item1.list);
    assertEquals(item2, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(list, item2.list);
    assertEquals(null, item2.getPrev());
    assertEquals(item1, item2.getNext());

    /* insertBefore */
    list.insertBefore(item1, item2);

    assertEquals(2, list.itemCount);
    assertEquals(item1, list.getFirst());
    assertEquals(item2, list.getLast());

    assertEquals(list, item1.list);
    assertEquals(null, item1.getPrev());
    assertEquals(item2, item1.getNext());

    assertEquals(list, item2.list);
    assertEquals(item1, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* insertAfter */
    list.insertAfter(item1, item2);

    assertEquals(2, list.itemCount);
    assertEquals(item2, list.getFirst());
    assertEquals(item1, list.getLast());

    assertEquals(list, item1.list);
    assertEquals(item2, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(list, item2.list);
    assertEquals(null, item2.getPrev());
    assertEquals(item1, item2.getNext());

    /* remove */
    list.remove(item1);

    assertEquals(1, list.itemCount);
    assertEquals(item2, list.getFirst());
    assertEquals(item2, list.getLast());

    assertEquals(null, item1.list);
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(list, item2.list);
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());

    list.remove(item2);

    assertEquals(0, list.itemCount);
    assertEquals(null, list.getFirst());
    assertEquals(null, list.getLast());

    assertEquals(null, item2.list);
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* clear */
    list.addLast(item1);
    list.addLast(item2);
    list.clear();

    assertEquals(0, list.itemCount);
    assertEquals(null, list.getFirst());
    assertEquals(null, list.getLast());

    assertEquals(null, item1.list);
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(null, item2.list);
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* finalize */
    list.addLast(item1);
    list.addLast(item2);
    list.finalize();

    assertEquals(0, list.itemCount);
    assertEquals(null, list.getFirst());
    assertEquals(null, list.getLast());

    assertEquals(null, item1.list);
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(null, item2.list);
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());
}
