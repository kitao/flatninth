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

function testTree() {
    /* b9.Tree */
    /* getSelf */
    /* getPrevAll */
    /* getNextAll */
    /* getParent */
    /* getPrevSibling */
    /* getNextSibling */
    /* getFirstChild */
    /* getLastChild */
    /* getLastDescendant */
    var dummy1 = 111;
    var tree1 = new b9.Tree(dummy1);

    assertEquals(dummy1, tree1.getSelf());
    assertEquals(null, tree1.getPrevAll());
    assertEquals(null, tree1.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(null, tree1.getFirstChild());
    assertEquals(null, tree1.getLastChild());
    assertEquals(tree1, tree1.getLastDescendant());

    /* addChildFirst */
    var dummy2 = 222;
    var tree2 = new b9.Tree(dummy2);
    tree1.addChildFirst(tree2);

    assertEquals(dummy1, tree1.getSelf());
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree2, tree1.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree2, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.getSelf());
    assertEquals(tree1, tree2.getPrevAll());
    assertEquals(null, tree2.getNextAll());
    assertEquals(tree1, tree2.getParent());
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    var dummy3 = 333;
    var tree3 = new b9.Tree(dummy3);
    tree1.addChildFirst(tree3);

    assertEquals(dummy1, tree1.getSelf());
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree3, tree1.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree3, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.getSelf());
    assertEquals(tree3, tree2.getPrevAll());
    assertEquals(null, tree2.getNextAll());
    assertEquals(tree1, tree2.getParent());
    assertEquals(tree3, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.getSelf());
    assertEquals(tree1, tree3.getPrevAll());
    assertEquals(tree2, tree3.getNextAll());
    assertEquals(tree1, tree3.getParent());
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(tree2, tree3.getNextSibling());
    assertEquals(null, tree3.getFirstChild());
    assertEquals(null, tree3.getLastChild());
    assertEquals(tree3, tree3.getLastDescendant());

    var dummy4 = 444;
    var tree4 = new b9.Tree(dummy4);
    tree3.addChildFirst(tree4);

    assertEquals(dummy1, tree1.getSelf());
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree3, tree1.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree3, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.getSelf());
    assertEquals(tree4, tree2.getPrevAll());
    assertEquals(null, tree2.getNextAll());
    assertEquals(tree1, tree2.getParent());
    assertEquals(tree3, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.getSelf());
    assertEquals(tree1, tree3.getPrevAll());
    assertEquals(tree4, tree3.getNextAll());
    assertEquals(tree1, tree3.getParent());
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(tree2, tree3.getNextSibling());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(tree4, tree3.getLastDescendant());

    assertEquals(dummy4, tree4.getSelf());
    assertEquals(tree3, tree4.getPrevAll());
    assertEquals(tree2, tree4.getNextAll());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree4.getLastDescendant());

    /* addChildLast */
    tree1.addChildLast(tree3);

    assertEquals(dummy1, tree1.getSelf());
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree2, tree1.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree2, tree1.getFirstChild());
    assertEquals(tree3, tree1.getLastChild());
    assertEquals(tree4, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.getSelf());
    assertEquals(tree1, tree2.getPrevAll());
    assertEquals(tree3, tree2.getNextAll());
    assertEquals(tree1, tree2.getParent());
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(tree3, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.getSelf());
    assertEquals(tree2, tree3.getPrevAll());
    assertEquals(tree4, tree3.getNextAll());
    assertEquals(tree1, tree3.getParent());
    assertEquals(tree2, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(tree4, tree3.getLastDescendant());

    assertEquals(dummy4, tree4.getSelf());
    assertEquals(tree3, tree4.getPrevAll());
    assertEquals(null, tree4.getNextAll());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree4.getLastDescendant());

    /* addChildBefore */
    tree1.addChildBefore(tree3, tree2);

    assertEquals(dummy1, tree1.getSelf());
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree3, tree1.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree3, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.getSelf());
    assertEquals(tree4, tree2.getPrevAll());
    assertEquals(null, tree2.getNextAll());
    assertEquals(tree1, tree2.getParent());
    assertEquals(tree3, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.getSelf());
    assertEquals(tree1, tree3.getPrevAll());
    assertEquals(tree4, tree3.getNextAll());
    assertEquals(tree1, tree3.getParent());
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(tree2, tree3.getNextSibling());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(tree4, tree3.getLastDescendant());

    assertEquals(dummy4, tree4.getSelf());
    assertEquals(tree3, tree4.getPrevAll());
    assertEquals(tree2, tree4.getNextAll());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree4.getLastDescendant());

    /* addChildAfter */
    tree1.addChildAfter(tree3, tree2);

    assertEquals(dummy1, tree1.getSelf());
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree2, tree1.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree2, tree1.getFirstChild());
    assertEquals(tree3, tree1.getLastChild());
    assertEquals(tree4, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.getSelf());
    assertEquals(tree1, tree2.getPrevAll());
    assertEquals(tree3, tree2.getNextAll());
    assertEquals(tree1, tree2.getParent());
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(tree3, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.getSelf());
    assertEquals(tree2, tree3.getPrevAll());
    assertEquals(tree4, tree3.getNextAll());
    assertEquals(tree1, tree3.getParent());
    assertEquals(tree2, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(tree4, tree3.getLastDescendant());

    assertEquals(dummy4, tree4.getSelf());
    assertEquals(tree3, tree4.getPrevAll());
    assertEquals(null, tree4.getNextAll());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree4.getLastDescendant());

    /* removeChild */
    tree1.removeChild(tree3);

    assertEquals(dummy1, tree1.getSelf());
    assertEquals(null, tree1.getPrevAll());
    assertEquals(tree2, tree1.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree2, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.getSelf());
    assertEquals(tree1, tree2.getPrevAll());
    assertEquals(null, tree2.getNextAll());
    assertEquals(tree1, tree2.getParent());
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.getSelf());
    assertEquals(null, tree3.getPrevAll());
    assertEquals(tree4, tree3.getNextAll());
    assertEquals(null, tree3.getParent());
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(tree4, tree3.getLastDescendant());

    assertEquals(dummy4, tree4.getSelf());
    assertEquals(tree3, tree4.getPrevAll());
    assertEquals(null, tree4.getNextAll());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree4.getLastDescendant());

    /* clear */
    tree1.addChildAfter(tree3, tree2);
    tree1.clear();

    assertEquals(dummy1, tree1.getSelf());
    assertEquals(null, tree1.getPrevAll());
    assertEquals(null, tree1.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(null, tree1.getFirstChild());
    assertEquals(null, tree1.getLastChild());
    assertEquals(tree1, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.getSelf());
    assertEquals(null, tree2.getPrevAll());
    assertEquals(null, tree2.getNextAll());
    assertEquals(null, tree2.getParent());
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.getSelf());
    assertEquals(null, tree3.getPrevAll());
    assertEquals(tree4, tree3.getNextAll());
    assertEquals(null, tree3.getParent());
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(tree4, tree3.getLastDescendant());

    assertEquals(dummy4, tree4.getSelf());
    assertEquals(tree3, tree4.getPrevAll());
    assertEquals(null, tree4.getNextAll());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree4.getLastDescendant());

    /* destroy */
    tree1.addChildFirst(tree2);
    tree2.addChildFirst(tree3);
    tree3.addChildLast(tree4);
    tree2.destroy();

    assertEquals(dummy1, tree1.getSelf());
    assertEquals(null, tree1.getPrevAll());
    assertEquals(null, tree1.getNextAll());
    assertEquals(null, tree1.getParent());
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(null, tree1.getFirstChild());
    assertEquals(null, tree1.getLastChild());
    assertEquals(tree1, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.getSelf());
    assertEquals(null, tree2.getPrevAll());
    assertEquals(null, tree2.getNextAll());
    assertEquals(null, tree2.getParent());
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.getSelf());
    assertEquals(null, tree3.getPrevAll());
    assertEquals(tree4, tree3.getNextAll());
    assertEquals(null, tree3.getParent());
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(tree4, tree3.getLastDescendant());

    assertEquals(dummy4, tree4.getSelf());
    assertEquals(tree3, tree4.getPrevAll());
    assertEquals(null, tree4.getNextAll());
    assertEquals(tree3, tree4.getParent());
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree4.getLastDescendant());
}
