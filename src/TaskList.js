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
 * Constructs a task list.
 *
 * @class A container which stores and updates instances of the b9.Task class.
 * @extends b9.LinkedList
 */
b9.TaskList = b9.createClass(b9.LinkedList);

/**
 * @ignore
 */
b9.TaskList.prototype.initialize = function() {
    this.initializeSuper();

    /**
     * Whether this task list is active.
     * If active, calls the update method of each task when the update method of this task list is called.
     * @return {Boolean}
     */
    this.isActive = true;

    this._nextTask = null;
};

/**
 * Destructs this task list. All of the tasks belong to this task list get unlinked.
 */
b9.TaskList.prototype.finalize = function() {
    this.finalizeSuper();
};

/**
 * Updates all of the tasks which belong to this task list.
 */
b9.TaskList.prototype.update = function() {
    var task;

    if (this.isActive) {
        for (task = this.first; task; task = this._nextTask) {
            this._nextTask = task.next;

            if (task.isActive) {
                task.update();
            }
        }
    }
};

/**
 * TODO
 */
b9.TaskList.prototype.dump = function() {
    // TODO
};
