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
 */
b9.TaskList = b9.createClass();

/**
 * @ignore
 */
b9.TaskList.prototype.initialize = function() {
    this.isActive_ = true;
    this.list_ = new b9.LinkedList();
    this.nextTask_ = null;
};

/**
 * Destructs this task list. All of the tasks belong to this task list get unlinked.
 */
b9.TaskList.prototype.finalize = function() {
    this.list_.finalize();
};

/**
 * Returns whether this task list is active.
 * If active, calls the update method of each task when the update method of this task list is called.
 * @return {boolean} true if this task list is active; false otherwise.
 */
b9.TaskList.prototype.isActive = function() {
    return this.isActive_;
};

/**
 * Sets whether this task list is active.
 * @param {boolean} isActive Whether this task list is active.
 */
b9.TaskList.prototype.setActive = function(isActive) {
    this.isActive_ = isActive;
};

/**
 * Returns the first task of this task list. If no such task exists, returns null.
 * @return {b9.Task} The first task.
 */
b9.TaskList.prototype.getFirst = function() {
    var task = this.list_.getFirst();
    return task ? task.getSelf() : null;
};

/**
 * Returns the last task of this task list. If no such task exists, returns null.
 * @return {b9.Task} The last task.
 */
b9.TaskList.prototype.getLast = function() {
    var task = this.list_.getLast();
    return task ? task.getSelf() : null;
};

/**
 * Links a task as the first task with this task list.
 * @param {b9.Task} task A task. If the task already belongs to some task list,
 * the task gets unlinked with it before the operation automatically.
 */
b9.TaskList.prototype.addFirst = function(task) {
    this.list_.addFirst(task.item_);
};

/**
 * Links a task as the last task with this task list.
 * @param {b9.Task} task A task. If the task already belongs to some task list,
 * the task gets unlinked with it before the operation automatically.
 */
b9.TaskList.prototype.addLast = function(task) {
    this.list_.addLast(task.item_);
};

/**
 * Links a task as the previous of the specified task with this task list.
 * @param {b9.Task} task A task. If the task already belongs to some task list,
 * the task gets unlinked with it before the operation automatically.
 * @param {b9.Task} nextTask The task to be the next. This task must belong to this task list.
 */
b9.TaskList.prototype.insertBefore = function(task, nextTask) {
    this.list_.insertBefore(task.item_, nextTask.item_);
};

/**
 * Links a task as the next of the specified task with this task list.
 * @param {b9.Task} task A task. If the task already belongs to some task list,
 * the task gets unlinked with it before the operation automatically.
 * @param {b9.Task} prevTask The task to be the previous. This task must belong to this task list.
 */
b9.TaskList.prototype.insertAfter = function(task, prevTask) {
    this.list_.insertAfter(task.item_, prevTask.item_);
};

/**
 * Unlinks a task from this task list.
 * @param {b9.Task} task A task to be unlinked. This task must belong to this task list.
 */
b9.TaskList.prototype.remove = function(task) {
    this.list_.remove(task.item_);
};

/**
 * Unlinks all of the task from this task list.
 */
b9.TaskList.prototype.clear = function() {
    this.list_.clear();
};

/**
 * Updates all of the tasks which belong to this task list.
 */
b9.TaskList.prototype.update = function() {
    var task;

    for (task = this.getFirst(); task; task = this.nextTask_) {
        this.nextTask_ = task.getNext();

        if (task.isActive_) {
            task.update();
        }
    }
};

/**
 * TODO
 */
b9.TaskList.prototype.dump = function() {
    // TODO
};
