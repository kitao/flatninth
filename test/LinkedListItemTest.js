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

function testLinkedListItem() {
    /* initialize */
    /* getSelf */
    /* getList */
    /* getPrev */
    /* getNext */
    var dummy1 = 123;
    var item1 = new b9.LinkedListItem(dummy1);

    assertEquals(123, item1.getSelf());
    assertEquals(null, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    var list1 = new b9.LinkedList();
    list1.addItemFirst(item1);

    assertEquals(dummy1, item1.getSelf());
    assertEquals(list1, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    var dummy2 = 456;
    var item2 = new b9.LinkedListItem(dummy2);
    list1.addItemLast(item2);

    assertEquals(dummy1, item1.getSelf());
    assertEquals(list1, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(item2, item1.getNext());

    assertEquals(dummy2, item2.getSelf());
    assertEquals(list1, item2.getList());
    assertEquals(item1, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* finalize */
    item1.finalize();

    assertEquals(null, item1.getSelf());
    assertEquals(null, item1.getList());
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    assertEquals(dummy2, item2.getSelf());
    assertEquals(list1, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());

    item2.finalize();

    assertEquals(null, item2.getSelf());
    assertEquals(null, item2.getList());
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());
}
