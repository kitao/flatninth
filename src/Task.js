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
 * @class hoge
 */
b9.Task = b9.createClass();

/**
 * @ignore
 */
b9.Task.prototype.initialize = function() {
    this.isActive_ = true;
    this.item_ = new b9.LinkedListItem(this);
};

/**
 * hoge
 */
b9.Task.prototype.finalize = function() {
    var list = this.getList();

    if (list && list.nextTask_ === this) {
        list.nextTask_ = this.getNext();
    }

    this.taskTree_.finalize();
};

/**
 * hoge
 * @return {boolean} hoge
 */
b9.Task.prototype.isActive = function() {
    return this.isActive_;
};

/**
 * hoge
 * @param {boolean} isActive hoge
 */
b9.Task.prototype.setActive = function(isActive) {
    this.isActive_ = isActive;
};

/**
 * Returns the task list to which this task belongs. If no such task list exists, returns null.
 * @return {b9.TaskList} The task list this task belongs to.
 */
b9.Task.prototype.getList = function() {
    var list = this.item_.getList();
    return list ? list.getSelf() : null;
};

/**
 * Returns the previous task of this task. If no such task exists, returns null.
 * @return {b9.Task} The previous task.
 */
b9.Task.prototype.getPrev = function() {
    var prev = this.item_.getPrev();
    return prev ? prev.getSelf() : null;
};

/**
 * Returns the next task of this task. If no such task exists, returns null.
 * @return {b9.Task} The next task.
 */
b9.Task.prototype.getNext = function() {
    var next = this.item_.getNext();
    return next ? next.getSelf() : null;
};

/**
 *
 */
b9.Task.prototype.update = function() {};
