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

/** @private */
b9.TaskDaemon = function() {};

b9.TaskDaemon.prototype = new b9.Task("");
b9.TaskDaemon.constructor = b9.TaskDaemon;

/** @private */
b9.TaskManager._initialize = function() {
    /** @private */
    b9.TaskManager._task_list = new Array(b9.Task._ORDER_NUM);

    for (var i = 0; i < b9.Task._ORDER_NUM; i++) {
        b9.TaskManager._task_list[i] = new b9.List();
    }
};

/** @private */
b9.TaskManager._finalize = function() {
    for (var i = 0; i < b9.Task._ORDER_NUM; i++) {
        b9.TaskManager._task_list[i].destroy();
    }

    b9.TaskManager._task_list = null;
};

/**
 * hoge
 * @return {b9.Task} order hoge
 */
b9.TaskManager.getFirstTask = function(order) {
    var child = this._task_list.getFirstItem();
    return child ? child.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Task} order hoge
 */
b9.TaskManager.getLastTask = function(order) {
    var child = this._task_list.getLastItem();
    return child ? child.getSelf() : null;
};

/**
 * hoge
 * @param {Number} task_order
 * @param {b9.Task} task
 */
b9.TaskManager.addTaskFirst = function(task_order, task) {
    b9.TaskManager._task_list.addItemFirst(task._list_item);
};

/**
 * hoge
 * @param {Number} task_order
 * @param {b9.Task} task
 */
b9.TaskManager.addTaskLast = function(task_order, task) {
    b9.TaskManager._task_list.addItemLast(task._list_item);
};

/**
 * hoge
 * @param {b9.Task} task
 * @param {b9.Task} next_task
 */
b9.TaskManager.addTaskBefore = function(task, next_task) {
    b9.TaskManager._task_list.addItemBefore(task._list_item, next_task._list_item);
};

/**
 * hoge
 * @param {b9.Task} task
 * @param {b9.Task} prev_task
 */
b9.TaskManager.addTaskAfter = function(task, prev_task) {
    b9.TaskManager._task_list.addItemAfter(task._list_item, prev_task._list_item);
};

/**
 * hoge
 * @param {b9.Task} task
 */
b9.TaskManager.removeTask = function(task) {
    b9.TaskManager._task_list.removeItem(task._list_item);
};

/** @private */
b9.TaskManager._update = function() {
    for (var item = b9.TaskManager._task_list.getFirstItem(); item; item = item.getNextItem()) {
        var task = item.getSelf();

        if (task.isFlagOn(b9.Task.FLAG_ACTIVE)) {
            task.onUpdate();
        }
    }
};
