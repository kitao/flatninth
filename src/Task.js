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

/**
 * Constructs a task.
 *
 * @class A lightweight task which is managed by the b9.TaskList class and gets updated every frame.
 */
b9.Task = b9.createClass();

/**
 * @ignore
 */
b9.Task.prototype.initialize = function() {
    /**
     * The name of this task.
     * @return {String}
     */
    this.name = "noname";

    /**
     * Whether this task is active. If active, the update method is called by the task list.
     * @return {Boolean}
     */
    this.isActive = true;

    this._listItem = new b9.LinkedListItem(this);
};

/**
 * Destructs this task. If this task belongs to a task list, this task gets unlinked from it.
 */
b9.Task.prototype.finalize = function() {
    var list = this.getTaskList();

    if (list && list.nextTask_ === this) {
        list.nextTask_ = this.getNext();
    }

    this._listItem.finalize();
};

/**
 * Returns the task list to which this task belongs. If no such task list exists, returns null.
 * @return {b9.TaskList} The task list this task belongs to.
 */
b9.Task.prototype.getTaskList = function() {
    var list = this._listItem.getList();
    return list ? list.getSelf() : null;
};

/**
 * Returns the previous task of this task. If no such task exists, returns null.
 * @return {b9.Task} The previous task.
 */
b9.Task.prototype.getPrev = function() {
    var prev = this._listItem.getPrev();
    return prev ? prev.getSelf() : null;
};

/**
 * Returns the next task of this task. If no such task exists, returns null.
 * @return {b9.Task} The next task.
 */
b9.Task.prototype.getNext = function() {
    var next = this._listItem.getNext();
    return next ? next.getSelf() : null;
};

/**
 * The method to update the state of this task.
 * This method is overridden by eash derived class and called by the task list every frame.
 */
b9.Task.prototype.update = function() {};
