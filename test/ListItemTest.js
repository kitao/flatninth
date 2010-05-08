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
    /* b9.ListItem */
    var dummy = 123;
    var item1 = new b9.ListItem(dummy);

    /* getSelf */
    assertEquals(123, item1.getSelf());

    /* getList */
    assertEquals(null, item1.getList());

    /* getPrev */
    assertEquals(null, item1.getPrev());

    /* getNext */
    assertEquals(null, item1.getNext());

    /* leave */
    item1.leave();

    /* b9.List */
    var list1 = new b9.List();

    /* getItemNum */
    assertEquals(0, list1.getItemNum());

    /* getFirstItem */
    assertEquals(null, list1.getFirstItem());

    /* getLastItem */
    assertEquals(null, list1.getLastItem());

    /* addItemFirst */
    list1.addItemFirst(item1);
    assertEquals(1, list1.getItemNum());
    assertEquals(item1, list1.getFirstItem());
    assertEquals(item1, list1.getLastItem());
    assertEquals(null, item1.getPrev());
    assertEquals(null, item1.getNext());

    /* addItemLast */
    var item2 = new b9.ListItem(dummy);
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

function testTree() {
    /* b9.Tree */
    var dummy = 123;
    var tree1 = new b9.Tree(123);

    /* getSelf */
    assertEquals(123, tree1.getSelf());

    /* getPrevAll */
    assertEquals(null, tree1.getPrevAll());

    /* getNextAll */
    assertEquals(null, tree1.getNextAll());

    /* getParent */
    assertEquals(null, tree1.getParent());

    /* getPrevSibling */
    assertEquals(null, tree1.getPrevSibling());

    /* getNextSibling */
    assertEquals(null, tree1.getNextSibling());

    /* getFirstChild */
    assertEquals(null, tree1.getFirstChild());

    /* getLastChild */
    assertEquals(null, tree1.getLastChild());

    /* getLastDescendant */
    assertEquals(tree1, tree1.getLastDescendant());

    /* addChildFirst */
    var tree2 = new b9.Tree(dummy);
    tree1.addChildFirst(tree2);
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree2, tree1.getNextAll());
    assertEquals(tree1, tree2.getPrevAll());
    assertEquals(null, tree2.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(tree1, tree2.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(tree2, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());
    assertEquals(tree2, tree2.getLastDescendant());

    var tree3 = new b9.Tree(dummy);
    tree1.addChildFirst(tree3);
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree3, tree1.getNextAll());
    assertEquals(tree3, tree2.getPrevAll());
    assertEquals(null, tree2.getNextAll());
    assertEquals(tree1, tree3.getPrevAll());
    assertEquals(tree2, tree3.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(tree1, tree2.getParent());
    assertEquals(tree1, tree3.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree3, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(tree2, tree3.getNextSibling());
    assertEquals(tree3, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(null, tree3.getFirstChild());
    assertEquals(null, tree3.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());
    assertEquals(tree2, tree2.getLastDescendant());
    assertEquals(tree3, tree3.getLastDescendant());

    var tree4 = new b9.Tree(dummy);
    tree3.addChildFirst(tree4);
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree3, tree1.getNextAll());
    assertEquals(tree4, tree2.getPrevAll());
    assertEquals(null, tree2.getNextAll());
    assertEquals(tree1, tree3.getPrevAll());
    assertEquals(tree4, tree3.getNextAll());
    assertEquals(tree3, tree4.getPrevAll());
    assertEquals(tree2, tree4.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(tree1, tree2.getParent());
    assertEquals(tree1, tree3.getParent());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree1.getParent());
    assertEquals(tree1, tree2.getParent());
    assertEquals(tree1, tree3.getParent());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree3, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(tree2, tree3.getNextSibling());
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(tree3, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());
    assertEquals(tree2, tree2.getLastDescendant());
    assertEquals(tree4, tree3.getLastDescendant());
    assertEquals(tree4, tree4.getLastDescendant());

    /* addChildLast */
    tree1.addChildLast(tree3);
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree2, tree1.getNextAll());
    assertEquals(tree1, tree2.getPrevAll());
    assertEquals(tree3, tree2.getNextAll());
    assertEquals(tree2, tree3.getPrevAll());
    assertEquals(tree4, tree3.getNextAll());
    assertEquals(tree3, tree4.getPrevAll());
    assertEquals(null, tree4.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(tree1, tree2.getParent());
    assertEquals(tree1, tree3.getParent());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(tree3, tree2.getNextSibling());
    assertEquals(tree2, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(tree2, tree1.getFirstChild());
    assertEquals(tree3, tree1.getLastChild());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree1.getLastDescendant());
    assertEquals(tree2, tree2.getLastDescendant());
    assertEquals(tree4, tree3.getLastDescendant());
    assertEquals(tree4, tree4.getLastDescendant());

    /* addChildBefore */
    tree1.addChildBefore(tree3, tree2);
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree3, tree1.getNextAll());
    assertEquals(tree4, tree2.getPrevAll());
    assertEquals(null, tree2.getNextAll());
    assertEquals(tree1, tree3.getPrevAll());
    assertEquals(tree4, tree3.getNextAll());
    assertEquals(tree3, tree4.getPrevAll());
    assertEquals(tree2, tree4.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(tree1, tree2.getParent());
    assertEquals(tree1, tree3.getParent());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree1.getParent());
    assertEquals(tree1, tree2.getParent());
    assertEquals(tree1, tree3.getParent());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree3, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(tree2, tree3.getNextSibling());
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(tree3, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());
    assertEquals(tree2, tree2.getLastDescendant());
    assertEquals(tree4, tree3.getLastDescendant());
    assertEquals(tree4, tree4.getLastDescendant());

    /* addChildAfter */
    tree1.addChildAfter(tree3, tree2);
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree2, tree1.getNextAll());
    assertEquals(tree1, tree2.getPrevAll());
    assertEquals(tree3, tree2.getNextAll());
    assertEquals(tree2, tree3.getPrevAll());
    assertEquals(tree4, tree3.getNextAll());
    assertEquals(tree3, tree4.getPrevAll());
    assertEquals(null, tree4.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(tree1, tree2.getParent());
    assertEquals(tree1, tree3.getParent());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(tree3, tree2.getNextSibling());
    assertEquals(tree2, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(tree2, tree1.getFirstChild());
    assertEquals(tree3, tree1.getLastChild());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree1.getLastDescendant());
    assertEquals(tree2, tree2.getLastDescendant());
    assertEquals(tree4, tree3.getLastDescendant());
    assertEquals(tree4, tree4.getLastDescendant());

    /* removeChild */
    tree1.removeChild(tree3);
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree2, tree1.getNextAll());
    assertEquals(tree1, tree2.getPrevAll());
    assertEquals(null, tree2.getNextAll());
    assertEquals(null, tree3.getPrevAll());
    assertEquals(tree4, tree3.getNextAll());
    assertEquals(tree3, tree4.getPrevAll());
    assertEquals(null, tree4.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(tree1, tree2.getParent());
    assertEquals(null, tree3.getParent());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(tree2, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());
    assertEquals(tree2, tree2.getLastDescendant());
    assertEquals(tree4, tree3.getLastDescendant());
    assertEquals(tree4, tree4.getLastDescendant());

    /* clear */
    tree1.addChildAfter(tree3, tree2);
    tree1.clear();
    assertEquals(null, tree1.getPrevAll());
    assertEquals(null, tree1.getNextAll());
    assertEquals(null, tree2.getPrevAll());
    assertEquals(null, tree2.getNextAll());
    assertEquals(null, tree3.getPrevAll());
    assertEquals(tree4, tree3.getNextAll());
    assertEquals(tree3, tree4.getPrevAll());
    assertEquals(null, tree4.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(null, tree2.getParent());
    assertEquals(null, tree3.getParent());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree1.getFirstChild());
    assertEquals(null, tree1.getLastChild());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree1, tree1.getLastDescendant());
    assertEquals(tree2, tree2.getLastDescendant());
    assertEquals(tree4, tree3.getLastDescendant());
    assertEquals(tree4, tree4.getLastDescendant());

    /* leave */
    tree1.addChildLast(tree2);
    tree1.addChildLast(tree3);
    tree2.addChildLast(tree4);
    tree4.leave();
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree2, tree1.getNextAll());
    assertEquals(tree1, tree2.getPrevAll());
    assertEquals(tree3, tree2.getNextAll());
    assertEquals(tree2, tree3.getPrevAll());
    assertEquals(null, tree3.getNextAll());
    assertEquals(null, tree4.getPrevAll());
    assertEquals(null, tree4.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(tree1, tree2.getParent());
    assertEquals(tree1, tree3.getParent());
    assertEquals(null, tree4.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(tree3, tree2.getNextSibling());
    assertEquals(tree2, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(tree2, tree1.getFirstChild());
    assertEquals(tree3, tree1.getLastChild());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(null, tree3.getFirstChild());
    assertEquals(null, tree3.getLastChild());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree3, tree1.getLastDescendant());
    assertEquals(tree2, tree2.getLastDescendant());
    assertEquals(tree3, tree3.getLastDescendant());
    assertEquals(tree4, tree4.getLastDescendant());
}
