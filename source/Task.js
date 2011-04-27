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
 * @extends b9.LinkedListItem
 */
b9.Task = b9.createClass(b9.LinkedListItem);

/**
 * @ignore
 */
b9.Task.prototype.initialize = function() {
    this.initializeSuper();

    /**
     * The name of this task.
     * @return {String}
     */
    this.name = "";

    /**
     * Whether this task is active. If active, the update method is called by the task list.
     * @return {Boolean}
     */
    this.isActive = true;
};

/**
 * Destructs this task. If this task belongs to a task list, this task gets unlinked from it.
 */
b9.Task.prototype.finalize = function() {
    if (this.list && this.list._nextTask === this) {
        list._nextTask = this.next;
    }

    this.finalizeSuper();
};

/**
 * The method to update the state of this task.
 * This method is overridden by each derived class and called by the task list every frame.
 */
b9.Task.prototype.update = function() {};
