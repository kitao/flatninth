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

{
    var list = new b9.List();

    b9.Debug.assert(list.getItemNum() === 0);
    b9.Debug.assert(!list.getFirstItem());
    b9.Debug.assert(!list.getLastItem());
}

{
    var obj = new Object();
    var item = new b9.ListItem(obj);

    b9.Debug.assert(item.getSelf() === obj);
    b9.Debug.assert(!item.getList());
    b9.Debug.assert(!item.getPrev());
    b9.Debug.assert(!item.getNext());
}

{
    var obj1 = new Object();
    var obj2 = new Object();
    var item1 = new b9.ListItem(obj1);
    var item2 = new b9.ListItem(obj2);
    var list = new b9.List();

    list.addItemFirst(item1);

    b9.Debug.assert(list.getItemNum() === 1);
    b9.Debug.assert(list.getFirstItem() === item1);
    b9.Debug.assert(list.getLastItem() === item1);

    list.addItemLast(item2);

    b9.Debug.assert(list.getItemNum() === 2);
    b9.Debug.assert(list.getFirstItem() === item1);
    b9.Debug.assert(list.getLastItem() === item2);

    b9.Debug.assert(item1.getSelf() === obj1);
    b9.Debug.assert(item1.getList() === list);
    b9.Debug.assert(!item1.getPrev());
    b9.Debug.assert(item1.getNext() === item2);

    b9.Debug.assert(item2.getSelf() === obj2);
    b9.Debug.assert(item2.getList() === list);
    b9.Debug.assert(item2.getPrev() === item1);
    b9.Debug.assert(!item2.getNext());

    list.removeItem(item1);

    b9.Debug.assert(list.getItemNum() === 1);
    b9.Debug.assert(list.getFirstItem() === item2);
    b9.Debug.assert(list.getLastItem() === item2);

    b9.Debug.assert(item1.getSelf() === obj1);
    b9.Debug.assert(!item1.getList());
    b9.Debug.assert(!item1.getPrev());
    b9.Debug.assert(!item1.getNext());

    b9.Debug.assert(item2.getSelf() === obj2);
    b9.Debug.assert(item2.getList() === list);
    b9.Debug.assert(!item2.getPrev());
    b9.Debug.assert(!item2.getNext());

    list.addItemAfter(item1, item2);

    b9.Debug.assert(list.getItemNum() === 2);
    b9.Debug.assert(list.getFirstItem() === item2);
    b9.Debug.assert(list.getLastItem() === item1);

    b9.Debug.assert(item1.getSelf() === obj1);
    b9.Debug.assert(item1.getList() === list);
    b9.Debug.assert(item1.getPrev() === item2);
    b9.Debug.assert(!item1.getNext());

    b9.Debug.assert(item2.getSelf() === obj2);
    b9.Debug.assert(item2.getList() === list);
    b9.Debug.assert(!item2.getPrev());
    b9.Debug.assert(item2.getNext() === item1);

    list.addItemBefore(item1, item2);

    b9.Debug.assert(list.getItemNum() === 2);
    b9.Debug.assert(list.getFirstItem() === item1);
    b9.Debug.assert(list.getLastItem() === item2);

    b9.Debug.assert(item1.getSelf() === obj1);
    b9.Debug.assert(item1.getList() === list);
    b9.Debug.assert(!item1.getPrev());
    b9.Debug.assert(item1.getNext() === item2);

    b9.Debug.assert(item2.getSelf() === obj2);
    b9.Debug.assert(item2.getList() === list);
    b9.Debug.assert(item2.getPrev() === item1);
    b9.Debug.assert(!item2.getNext());

    list.clear();

    b9.Debug.assert(list.getItemNum() === 0);
    b9.Debug.assert(!list.getFirstItem());
    b9.Debug.assert(!list.getLastItem());

    b9.Debug.assert(item1.getSelf() === obj1);
    b9.Debug.assert(!item1.getList());
    b9.Debug.assert(!item1.getPrev());
    b9.Debug.assert(!item1.getNext());

    b9.Debug.assert(item2.getSelf() === obj2);
    b9.Debug.assert(!item2.getList());
    b9.Debug.assert(!item2.getPrev());
    b9.Debug.assert(!item2.getNext());
}

b9.Debug.trace("list_test complete");
