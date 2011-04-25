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
    /* first */
    /* last */
    list = new b9.LinkedList();

    assertEquals(null, list.first);
    assertEquals(null, list.last);

    /* addFirst */
    item1 = new b9.LinkedListItem(null);
    list.addFirst(item1);

    assertEquals(item1, list.first);
    assertEquals(item1, list.last);

    assertEquals(list, item1.list);
    assertEquals(null, item1.prev);
    assertEquals(null, item1.next);

    item2 = new b9.LinkedListItem(null);
    list.addFirst(item2);

    assertEquals(item2, list.first);
    assertEquals(item1, list.last);

    assertEquals(list, item1.list);
    assertEquals(item2, item1.prev);
    assertEquals(null, item1.next);

    assertEquals(list, item2.list);
    assertEquals(null, item2.prev);
    assertEquals(item1, item2.next);

    list.addFirst(item1);

    assertEquals(item1, list.first);
    assertEquals(item2, list.last);

    assertEquals(list, item1.list);
    assertEquals(null, item1.prev);
    assertEquals(item2, item1.next);

    assertEquals(list, item2.list);
    assertEquals(item1, item2.prev);
    assertEquals(null, item2.next);

    /* addLast */
    list.addLast(item1);

    assertEquals(item2, list.first);
    assertEquals(item1, list.last);

    assertEquals(list, item1.list);
    assertEquals(item2, item1.prev);
    assertEquals(null, item1.next);

    assertEquals(list, item2.list);
    assertEquals(null, item2.prev);
    assertEquals(item1, item2.next);

    /* insertBefore */
    list.insertBefore(item1, item2);

    assertEquals(item1, list.first);
    assertEquals(item2, list.last);

    assertEquals(list, item1.list);
    assertEquals(null, item1.prev);
    assertEquals(item2, item1.next);

    assertEquals(list, item2.list);
    assertEquals(item1, item2.prev);
    assertEquals(null, item2.next);

    /* insertAfter */
    list.insertAfter(item1, item2);

    assertEquals(item2, list.first);
    assertEquals(item1, list.last);

    assertEquals(list, item1.list);
    assertEquals(item2, item1.prev);
    assertEquals(null, item1.next);

    assertEquals(list, item2.list);
    assertEquals(null, item2.prev);
    assertEquals(item1, item2.next);

    /* remove */
    list.remove(item1);

    assertEquals(item2, list.first);
    assertEquals(item2, list.last);

    assertEquals(null, item1.list);
    assertEquals(null, item1.prev);
    assertEquals(null, item1.next);

    assertEquals(list, item2.list);
    assertEquals(null, item2.prev);
    assertEquals(null, item2.next);

    list.remove(item2);

    assertEquals(null, list.first);
    assertEquals(null, list.last);

    assertEquals(null, item2.list);
    assertEquals(null, item2.prev);
    assertEquals(null, item2.next);

    /* clear */
    list.addLast(item1);
    list.addLast(item2);
    list.clear();

    assertEquals(null, list.first);
    assertEquals(null, list.last);

    assertEquals(null, item1.list);
    assertEquals(null, item1.prev);
    assertEquals(null, item1.next);

    assertEquals(null, item2.list);
    assertEquals(null, item2.prev);
    assertEquals(null, item2.next);

    /* finalize */
    list.addLast(item1);
    list.addLast(item2);
    list.finalize();

    assertEquals(null, list.first);
    assertEquals(null, list.last);

    assertEquals(null, item1.list);
    assertEquals(null, item1.prev);
    assertEquals(null, item1.next);

    assertEquals(null, item2.list);
    assertEquals(null, item2.prev);
    assertEquals(null, item2.next);
}
