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

    this._task_root = new b9.Task("TASK_ROOT");
    this._task_root.setTaskFlag(b9.Task._FLAG_ROOT);

    this._view_root = new b9.View("VIEW_ROOT");
    this._view_root.setViewFlag(b9.View._FLAG_ROOT, true);
    this._view_root.attachCanvas(canvas_id);

    this._timer_id = null;

    this._default_task = new Array(this._ORDER_NUM);
    this._default_view = new Array(this._ORDER_NUM);

    for (var i = 0; i < this._ORDER_NUM; i++) {
        var task = new b9.Task("DEFAULT_TASK");

        this._default_task[i] = task;
        this._task_root.addChildLast(task);

        var view = new b9.View("DEFAULT_VIEW");
        view.setSize(this._view_root.getWidth(), this._view_root.getHeight());

        this._default_view[i] = view;
        this._view_root.addChildLast(view);
    }
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
 * @param {Number} system_order
 * @return {b9.Task} hoge
 */
b9.System.defaultTask = function(system_order) {
    return this._default_task[system_order];
};

/**
 * hoge
 * @param {Number} system_order
 * @return {b9.View} hoge
 */
b9.System.defaultView = function(system_order) {
    return this._default_view[system_order];
};

b9.System._update = function() {
    var next_task;

    for (var task = this._task_root; task; task = next_task) {
        next_task = task.getNextAsList();

        if (task.isTaskFlagOn(b9.Task.FLAG_ACTIVE)) {
            // TODO
            task.onUpdate();
        }
    }
};

b9.System._render = function() {
    for (var view = this._view_root; view; view = view.getNextAsList()) {
        if (view.isViewFlagOn(b9.View.FLAG_VISIBLE)) {
            // TODO
            view._render();
        }
    }
};

/**
 * hoge
 * @return {Number}
 */
b9.System.ORDER_FIRST = 0;

/**
 * hoge
 * @return {Number}
 */
b9.System.ORDER_BEFORE = 1;

/**
 * hoge
 * @return {Number}
 */
b9.System.ORDER_NORMAL = 2;

/**
 * hoge
 * @return {Number}
 */
b9.System.ORDER_AFTER = 3;

/**
 * hoge
 * @return {Number}
 */
b9.System.ORDER_LAST = 4;

b9.System._ORDER_NUM = 5;
