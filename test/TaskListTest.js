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

function testTaskList() {
    var updateCount1, updateCount2;
    var TestTaskClass1, TestTaskClass2;
    var taskList;
    var task1, task2;

    /* initialize */
    /* isActive */
    taskList = new b9.TaskList();

    assertEquals(true, taskList.isActive);

    /* update */
    TestTaskClass1 = b9.createClass(b9.Task);
    TestTaskClass1.prototype.update = function() { updateCount1++; };

    TestTaskClass2 = b9.createClass(b9.Task);
    TestTaskClass2.prototype.update = function() { updateCount2++; };

    task1 = new TestTaskClass1();
    task2 = new TestTaskClass2();

    taskList.addLast(task1);
    taskList.addLast(task2);

    updateCount1 = 0;
    updateCount2 = 0;

    taskList.isActive = false;
    taskList.update();

    assertEquals(0, updateCount1);
    assertEquals(0, updateCount2);

    taskList.isActive = true;
    taskList.update();

    assertEquals(1, updateCount1);
    assertEquals(1, updateCount2);

    task1.isActive = false;
    taskList.update();

    assertEquals(1, updateCount1);
    assertEquals(2, updateCount2);

    /* dump */
    taskList.dump();
    // TODO

    /* finalize */
    assertEquals(taskList, task1.list);
    assertEquals(taskList, task2.list);

    taskList.finalize();

    assertEquals(null, task1.list);
    assertEquals(null, task2.list);
}
