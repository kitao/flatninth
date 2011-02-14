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
b9.TaskList = b9.createClass();

/**
 * @ignore
 */
b9.TaskList.prototype.initialize = function() {
    this._is_active = true;

    this._list = new b9.LinkedList();
    this._next_task = null;
};

/**
 *
 */
b9.TaskList.prototype.finalize = function() {
    this._list.finalize();
};

/**
 * hoge
 * @return {Boolean} hoge
 */
b9.TaskList.prototype.isActive = function() {
    return this._is_active;
};

/**
 * hoge
 * @param {Boolean} is_active hoge
 */
b9.TaskList.prototype.setActive = function(is_active) {
    this._is_active = is_active;
};

/**
 * Returns the first task of this task list. If no such task exists, returns null.
 * @return {b9.Task} The first task.
 */
b9.TaskList.prototype.getFirst = function() {
    var task = this._list.getFirst();
    return task ? task.getSelf() : null;
};

/**
 * Returns the last task of this task list. If no such task exists, returns null.
 * @return {b9.Task} The last task.
 */
b9.TaskList.prototype.getLast = function() {
    var task = this._list.getLast();
    return task ? task.getSelf() : null;
};

/**
 * Links an task as the first task with this task list.
 * @param {b9.Task} task An task. If the task already belongs to some task list,
 * the task gets automatically unlinked with it before the operation.
 */
b9.TaskList.prototype.addFirst = function(task) {
    this._list.addFirst(task._item);
};

/**
 * Links an task as the last task with this task list.
 * @param {b9.Task} task An task. If the task already belongs to some task list,
 * the task gets automatically unlinked with it before the operation.
 */
b9.TaskList.prototype.addLast = function(task) {
    this._list.addLast(task._item);
};

/**
 * Links an task as the previous of the specified task with this task list.
 * @param {b9.Task} task An task. If the task already belongs to some task list,
 * the task gets automatically unlinked with it before the operation.
 * @param {b9.Task} next_task The task to be the next. This task must belong to this task list.
 */
b9.TaskList.prototype.insertBefore = function(task, next_task) {
    this._list.insertBefore(task._item, next_task._item);
};

/**
 * Links an task as the next of the specified task with this task list.
 * @param {b9.Task} task An task. If the task already belongs to some task list,
 * the task gets automatically unlinked with it before the operation.
 * @param {b9.Task} prev_task The task to be the previous. This task must belong to this task list.
 */
b9.TaskList.prototype.insertAfter = function(task, prev_task) {
    this._list.insertAfter(task._item, prev_task._item);
};

/**
 * Unlinks an task from this task list.
 * @param {b9.Task} task An task to be unlinked. This task must belong to this task list.
 */
b9.TaskList.prototype.remove = function(task) {
    this._list.remove(task._item);
};

/**
 * Unlinks all of the task from this task list.
 */
b9.TaskList.prototype.clear = function() {
    this._list.clear();
};

/**
 * Updates all of the tasks which belong to this task list.
 */
b9.TaskList.prototype.update = function() {
    var task;

    for (task = this.getFirst(); task; task = this._next_task) {
        this._next_task = task.getNext();

        if (task._is_active) {
            task.update();
        }
    }
};
