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

function testLinkedTree() {
    var tree1, tree2, tree3, tree4;
    var dummy1, dummy2, dummy3, dummy4;

    /* initialize */
    /* object */
    /* parent */
    /* prevAsList */
    /* nextAsLst */
    /* getPrevSibling */
    /* getNextSibling */
    /* getFirstChild */
    /* getLastChild */
    /* getLastDescendant */
    dummy1 = 111;
    tree1 = new b9.LinkedTree(dummy1);

    assertEquals(dummy1, tree1.object);
    assertEquals(null, tree1.prevAsList);
    assertEquals(null, tree1.nextAsList);
    assertEquals(null, tree1.parent);
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(null, tree1.getFirstChild());
    assertEquals(null, tree1.getLastChild());
    assertEquals(tree1, tree1.getLastDescendant());

    /* addChildFirst */
    dummy2 = 222;
    tree2 = new b9.LinkedTree(dummy2);
    tree1.addChildFirst(tree2);

    assertEquals(dummy1, tree1.object);
    assertEquals(null, tree1.prevAsList);
    assertEquals(tree2, tree1.nextAsList);
    assertEquals(null, tree1.parent);
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree2, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.object);
    assertEquals(tree1, tree2.prevAsList);
    assertEquals(null, tree2.nextAsList);
    assertEquals(tree1, tree2.parent);
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    dummy3 = 333;
    tree3 = new b9.LinkedTree(dummy3);
    tree1.addChildFirst(tree3);

    assertEquals(dummy1, tree1.object);
    assertEquals(null, tree1.prevAsList);
    assertEquals(tree3, tree1.nextAsList);
    assertEquals(null, tree1.parent);
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree3, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.object);
    assertEquals(tree3, tree2.prevAsList);
    assertEquals(null, tree2.nextAsList);
    assertEquals(tree1, tree2.parent);
    assertEquals(tree3, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.object);
    assertEquals(tree1, tree3.prevAsList);
    assertEquals(tree2, tree3.nextAsList);
    assertEquals(tree1, tree3.parent);
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(tree2, tree3.getNextSibling());
    assertEquals(null, tree3.getFirstChild());
    assertEquals(null, tree3.getLastChild());
    assertEquals(tree3, tree3.getLastDescendant());

    dummy4 = 444;
    tree4 = new b9.LinkedTree(dummy4);
    tree3.addChildFirst(tree4);

    assertEquals(dummy1, tree1.object);
    assertEquals(null, tree1.prevAsList);
    assertEquals(tree3, tree1.nextAsList);
    assertEquals(null, tree1.parent);
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree3, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.object);
    assertEquals(tree4, tree2.prevAsList);
    assertEquals(null, tree2.nextAsList);
    assertEquals(tree1, tree2.parent);
    assertEquals(tree3, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.object);
    assertEquals(tree1, tree3.prevAsList);
    assertEquals(tree4, tree3.nextAsList);
    assertEquals(tree1, tree3.parent);
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(tree2, tree3.getNextSibling());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(tree4, tree3.getLastDescendant());

    assertEquals(dummy4, tree4.object);
    assertEquals(tree3, tree4.prevAsList);
    assertEquals(tree2, tree4.nextAsList);
    assertEquals(tree3, tree4.parent);
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree4.getLastDescendant());

    /* addChildLast */
    tree1.addChildLast(tree3);

    assertEquals(dummy1, tree1.object);
    assertEquals(null, tree1.prevAsList);
    assertEquals(tree2, tree1.nextAsList);
    assertEquals(null, tree1.parent);
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree2, tree1.getFirstChild());
    assertEquals(tree3, tree1.getLastChild());
    assertEquals(tree4, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.object);
    assertEquals(tree1, tree2.prevAsList);
    assertEquals(tree3, tree2.nextAsList);
    assertEquals(tree1, tree2.parent);
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(tree3, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.object);
    assertEquals(tree2, tree3.prevAsList);
    assertEquals(tree4, tree3.nextAsList);
    assertEquals(tree1, tree3.parent);
    assertEquals(tree2, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(tree4, tree3.getLastDescendant());

    assertEquals(dummy4, tree4.object);
    assertEquals(tree3, tree4.prevAsList);
    assertEquals(null, tree4.nextAsList);
    assertEquals(tree3, tree4.parent);
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree4.getLastDescendant());

    /* insertChildBefore */
    tree1.insertChildBefore(tree3, tree2);

    assertEquals(dummy1, tree1.object);
    assertEquals(null, tree1.prevAsList);
    assertEquals(tree3, tree1.nextAsList);
    assertEquals(null, tree1.parent);
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree3, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.object);
    assertEquals(tree4, tree2.prevAsList);
    assertEquals(null, tree2.nextAsList);
    assertEquals(tree1, tree2.parent);
    assertEquals(tree3, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.object);
    assertEquals(tree1, tree3.prevAsList);
    assertEquals(tree4, tree3.nextAsList);
    assertEquals(tree1, tree3.parent);
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(tree2, tree3.getNextSibling());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(tree4, tree3.getLastDescendant());

    assertEquals(dummy4, tree4.object);
    assertEquals(tree3, tree4.prevAsList);
    assertEquals(tree2, tree4.nextAsList);
    assertEquals(tree3, tree4.parent);
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree4.getLastDescendant());

    /* insertChildAfter */
    tree1.insertChildAfter(tree3, tree2);

    assertEquals(dummy1, tree1.object);
    assertEquals(null, tree1.prevAsList);
    assertEquals(tree2, tree1.nextAsList);
    assertEquals(null, tree1.parent);
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree2, tree1.getFirstChild());
    assertEquals(tree3, tree1.getLastChild());
    assertEquals(tree4, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.object);
    assertEquals(tree1, tree2.prevAsList);
    assertEquals(tree3, tree2.nextAsList);
    assertEquals(tree1, tree2.parent);
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(tree3, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.object);
    assertEquals(tree2, tree3.prevAsList);
    assertEquals(tree4, tree3.nextAsList);
    assertEquals(tree1, tree3.parent);
    assertEquals(tree2, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(tree4, tree3.getLastDescendant());

    assertEquals(dummy4, tree4.object);
    assertEquals(tree3, tree4.prevAsList);
    assertEquals(null, tree4.nextAsList);
    assertEquals(tree3, tree4.parent);
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree4.getLastDescendant());

    /* removeChild */
    tree1.removeChild(tree3);

    assertEquals(dummy1, tree1.object);
    assertEquals(null, tree1.prevAsList);
    assertEquals(tree2, tree1.nextAsList);
    assertEquals(null, tree1.parent);
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(tree2, tree1.getFirstChild());
    assertEquals(tree2, tree1.getLastChild());
    assertEquals(tree2, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.object);
    assertEquals(tree1, tree2.prevAsList);
    assertEquals(null, tree2.nextAsList);
    assertEquals(tree1, tree2.parent);
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.object);
    assertEquals(null, tree3.prevAsList);
    assertEquals(tree4, tree3.nextAsList);
    assertEquals(null, tree3.parent);
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(tree4, tree3.getLastDescendant());

    assertEquals(dummy4, tree4.object);
    assertEquals(tree3, tree4.prevAsList);
    assertEquals(null, tree4.nextAsList);
    assertEquals(tree3, tree4.parent);
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree4.getLastDescendant());

    /* clear */
    tree1.insertChildAfter(tree3, tree2);
    tree1.clear();

    assertEquals(dummy1, tree1.object);
    assertEquals(null, tree1.prevAsList);
    assertEquals(null, tree1.nextAsList);
    assertEquals(null, tree1.parent);
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(null, tree1.getFirstChild());
    assertEquals(null, tree1.getLastChild());
    assertEquals(tree1, tree1.getLastDescendant());

    assertEquals(dummy2, tree2.object);
    assertEquals(null, tree2.prevAsList);
    assertEquals(null, tree2.nextAsList);
    assertEquals(null, tree2.parent);
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.object);
    assertEquals(null, tree3.prevAsList);
    assertEquals(tree4, tree3.nextAsList);
    assertEquals(null, tree3.parent);
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(tree4, tree3.getLastDescendant());

    assertEquals(dummy4, tree4.object);
    assertEquals(tree3, tree4.prevAsList);
    assertEquals(null, tree4.nextAsList);
    assertEquals(tree3, tree4.parent);
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree4.getLastDescendant());

    /* finalize */
    tree1.addChildFirst(tree2);
    tree2.addChildFirst(tree3);
    tree3.addChildLast(tree4);
    tree2.finalize();

    assertEquals(dummy1, tree1.object);
    assertEquals(null, tree1.prevAsList);
    assertEquals(null, tree1.nextAsList);
    assertEquals(null, tree1.parent);
    assertEquals(null, tree1.getPrevSibling());
    assertEquals(null, tree1.getNextSibling());
    assertEquals(null, tree1.getFirstChild());
    assertEquals(null, tree1.getLastChild());
    assertEquals(tree1, tree1.getLastDescendant());

    assertEquals(null, tree2.object);
    assertEquals(null, tree2.prevAsList);
    assertEquals(null, tree2.nextAsList);
    assertEquals(null, tree2.parent);
    assertEquals(null, tree2.getPrevSibling());
    assertEquals(null, tree2.getNextSibling());
    assertEquals(null, tree2.getFirstChild());
    assertEquals(null, tree2.getLastChild());
    assertEquals(tree2, tree2.getLastDescendant());

    assertEquals(dummy3, tree3.object);
    assertEquals(null, tree3.prevAsList);
    assertEquals(tree4, tree3.nextAsList);
    assertEquals(null, tree3.parent);
    assertEquals(null, tree3.getPrevSibling());
    assertEquals(null, tree3.getNextSibling());
    assertEquals(tree4, tree3.getFirstChild());
    assertEquals(tree4, tree3.getLastChild());
    assertEquals(tree4, tree3.getLastDescendant());

    assertEquals(dummy4, tree4.object);
    assertEquals(tree3, tree4.prevAsList);
    assertEquals(null, tree4.nextAsList);
    assertEquals(tree3, tree4.parent);
    assertEquals(null, tree4.getPrevSibling());
    assertEquals(null, tree4.getNextSibling());
    assertEquals(null, tree4.getFirstChild());
    assertEquals(null, tree4.getLastChild());
    assertEquals(tree4, tree4.getLastDescendant());
}
