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

function testList() {
    /* b9.List */
    var list1 = new b9.List();

    /* getItemNum */
    assertEquals(0, list1.getItemNum());

    /* getFirstItem */
    assertEquals(null, list1.getFirstItem());

    /* getLastItem */
    assertEquals(null, list1.getLastItem());

    /* addItemFirst */
    var item1 = new b9.ListItem(null);
    list1.addItemFirst(item1);
    assertEquals(1, list1.getItemNum());
    assertEquals(item1, list1.getFirstItem());
    assertEquals(item1, list1.getLastItem());
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    /* addItemLast */
    var item2 = new b9.ListItem(null);
    list1.addItemLast(item2);
    assertEquals(2, list1.getItemNum());
    assertEquals(item1, list1.getFirstItem());
    assertEquals(item2, list1.getLastItem());
    assertEquals(null, item1.getPrev());
    assertEquals(item2, item1.getNext());
    assertEquals(item1, item2.getPrev());
    assertEquals(null, item2.getNext());

    list1.addItemFirst(item2, list1);
    assertEquals(2, list1.getItemNum());
    assertEquals(item2, list1.getFirstItem());
    assertEquals(item1, list1.getLastItem());
    assertEquals(null, item2.getPrev());
    assertEquals(item1, item2.getNext());
    assertEquals(item2, item1.getPrev());
    assertEquals(null, item1.getNext());

    item2.leave();
    assertEquals(1, list1.getItemNum());
    assertEquals(item1, list1.getFirstItem());
    assertEquals(item1, list1.getLastItem());
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    /* addItemBefore */
    list1.addItemBefore(item2, item1);
    assertEquals(2, list1.getItemNum());
    assertEquals(item2, list1.getFirstItem());
    assertEquals(item1, list1.getLastItem());
    assertEquals(null, item2.getPrev());
    assertEquals(item1, item2.getNext());
    assertEquals(item2, item1.getPrev());
    assertEquals(null, item1.getNext());

    /* addItemAfter */
    list1.addItemAfter(item2, item1);
    assertEquals(2, list1.getItemNum());
    assertEquals(item1, list1.getFirstItem());
    assertEquals(item2, list1.getLastItem());
    assertEquals(null, item1.getPrev());
    assertEquals(item2, item1.getNext());
    assertEquals(item1, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* removeItem */
    list1.removeItem(item1);
    assertEquals(1, list1.getItemNum());
    assertEquals(item2, list1.getFirstItem());
    assertEquals(item2, list1.getLastItem());
    assertEquals(null, item2.getPrev());
    assertEquals(null, item2.getNext());

    /* clear */
    list1.addItemLast(item1);
    assertEquals(2, list1.getItemNum());

    list1.clear();
    assertEquals(0, list1.getItemNum());
    assertEquals(null, list1.getFirstItem());
    assertEquals(null, list1.getLastItem());
}
