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

/**
 * @class An ID based on a string.
 */
b9.System = {};

b9.System._initialize = function(canvas_id, aim_fps) {
    this._aim_fps = b9.Math.max(aim_fps, 1);

    this._task_root = new b9.Task();
    this._task_root.setName("TASK_ROOT");
    this._task_root.setTaskFlag(b9.Task._FLAG_ROOT);

    this._view_root = new b9.View();
    this._view_root.setName("VIEW_ROOT");
    this._view_root.setViewFlag(b9.View._FLAG_ROOT, true);
    this._view_root.attachCanvas(canvas_id);

    this._timer_id = null;

    this._ORDER_NUM = 5;

    this._default_task = new Array(this._ORDER_NUM);
    this._default_view = new Array(this._ORDER_NUM);

    for (var i = 0; i < this._ORDER_NUM; i++) {
        this._default_task[i] = new b9.Task(this._task_root);
        this._default_view[i] = new b9.View(this._view_root);
        this._default_view[i].size().set(this._view_root.size());
    }

    this._default_task[this._ORDER_FIRST].setName("DEFAULT_TASK_FIRST");
    this._default_task[this._ORDER_BEFORE].setName("DEFAULT_TASK_BEFORE");
    this._default_task[this._ORDER_NORMAL].setName("DEFAULT_TASK_NORMAL");
    this._default_task[this._ORDER_AFTER].setName("DEFAULT_TASK_AFTER");
    this._default_task[this._ORDER_LAST].setName("DEFAULT_TASK_LAST");

    this._default_view[this._ORDER_FIRST].setName("DEFAULT_TASK_FIRST");
    this._default_view[this._ORDER_BEFORE].setName("DEFAULT_TASK_BEFORE");
    this._default_view[this._ORDER_NORMAL].setName("DEFAULT_TASK_NORMAL");
    this._default_view[this._ORDER_AFTER].setName("DEFAULT_TASK_AFTER");
    this._default_view[this._ORDER_LAST].setName("DEFAULT_TASK_LAST");
};

b9.System._finalize = function() {
    for (var i = 0; i < this._ORDER_NUM; i++) {
        this._default_task[i].finalize();
        this._default_view[i].finalize();
    }

    this._task_root.finalize();
    this._view_root.finalize();
};

/**
 * hoge
 * @param {String} canvas_id hoge
 * @param {Number} fps hoge
 */
b9.System.setup = function(canvas_id, aim_fps) {
    this._initialize(canvas_id, aim_fps);
};

/**
 * hoge
 */
b9.System.start = function() {
    function onTimer() {
        if (b9.System._timer_id) {
            clearTimeout(b9.System._timer_id);
        }

        b9.System._update();
        b9.System._render();

        b9.System._timer_id = setTimeout(onTimer, 1000 / b9.System._aim_fps);
    }

    onTimer();
};

/**
 * hoge
 */
b9.System.exit = function() {
};

/**
 * hoge
 * @param {String} msg hoge
 */
b9.System.trace = function(msg) {
    // TODO
};

/**
 * hoge
 * @param {String} msg hoge
 */
b9.System.error = function(msg) {
    throw new Error(msg);
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.System.taskRoot = function() {
    return this._task_root;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.System.viewRoot = function() {
    return this._view_root;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.System.defaultTaskFirst = function() {
    return this._default_task[this._ORDER_FIRST];
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.System.defaultTaskBefore = function() {
    return this._default_task[this._ORDER_BEFORE];
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.System.defaultTaskNormal = function() {
    return this._default_task[this._ORDER_NORMAL];
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.System.defaultTaskAfter = function() {
    return this._default_task[this._ORDER_AFTER];
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.System.defaultTaskLast = function() {
    return this._default_task[this._ORDER_LAST];
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.System.defaultViewFirst = function() {
    return this._default_view[this._ORDER_FIRST];
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.System.defaultViewBefore = function() {
    return this._default_view[this._ORDER_BEFORE];
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.System.defaultViewNormal = function() {
    return this._default_view[this._ORDER_NORMAL];
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.System.defaultViewAfter = function() {
    return this._default_view[this._ORDER_AFTER];
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.System.defaultViewLast = function() {
    return this._default_view[this._ORDER_LAST];
};

b9.System._update = function() {
    var next_task;

    for (var task = this._task_root; task; task = next_task) {
        next_task = task.getNextAsList();

        if (task.isTaskFlagOn(b9.Task.FLAG_ACTIVE)) {
            task.onUpdate();
        } else {
            next_task = task.getLastDescendant().getNextAsList();
        }
    }
};

b9.System._render = function() {
    for (var view = this._view_root; view; view = view.getNextAsList()) {
        if (view.isViewFlagOn(b9.View.FLAG_VISIBLE)) {
            view._render();
        } else {
            view = view.getLastDescendant();
        }
    }
};

b9.System._ORDER_FIRST = 0;
b9.System._ORDER_BEFORE = 1;
b9.System._ORDER_NORMAL = 2;
b9.System._ORDER_AFTER = 3;
b9.System._ORDER_LAST = 4;
b9.System._ORDER_NUM = 5;
