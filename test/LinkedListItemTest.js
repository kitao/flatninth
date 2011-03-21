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

function testLinkedListItem() {
    var list;
    var item1, item2;
    var dummy1, dummy2;

    /* initialize */
    /* self */
    /* list */
    /* getPrev */
    /* getNext */
    dummy1 = 123;
    item1 = new b9.LinkedListItem(dummy1);

    assertEquals(123, item1.self);
    assertEquals(null, item1.list);
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    list = new b9.LinkedList();
    list.addFirst(item1);

    assertEquals(dummy1, item1.self);
    assertEquals(list, item1.list);
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    dummy2 = 456;
    item2 = new b9.LinkedListItem(dummy2);
    list.addLast(item2);

    assertEquals(dummy1, item1.self);
    assertEquals(list, item1.list);
    assertEquals(null, item1.getPrev());
    assertEquals(item2, item1.getNext());

    assertEquals(dummy2, item2.self);
    assertEquals(list, item2.list);
    assertEquals(item1, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* finalize */
    item1.finalize();

    assertEquals(null, item1.self);
    assertEquals(null, item1.list);
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(dummy2, item2.self);
    assertEquals(list, item2.list);
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());

    item2.finalize();

    assertEquals(null, item2.self);
    assertEquals(null, item2.list);
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());
}
