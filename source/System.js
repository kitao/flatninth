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

/** @private */
b9.System._initialize = function(canvas_id, aim_fps) {
    /** @private */
    this._aim_fps = b9.Math.max(aim_fps, 1);

    /** @private */
    this._task_root = new b9.Task("TASK_ROOT");

    /** @private */
    this._view_root = new b9.View(2, "VIEW_ROOT");
    this._view_root.attachCanvas(canvas_id);

    /** @private */
    this._timer_id = null;

    /** @private */
    this._default_task_first = new b9.Task("DEFAULT_TASK_FIRST");
    this._task_root.addChildLast(this._default_task_first);

    /** @private */
    this._default_task_before = new b9.Task("DEFAULT_TASK_BEFORE");
    this._task_root.addChildLast(this._default_task_before);

    /** @private */
    this._default_task_normal = new b9.Task("DEFAULT_TASK_NORMAL");
    this._task_root.addChildLast(this._default_task_normal);

    /** @private */
    this._default_task_after = new b9.Task("DEFAULT_TASK_AFTER");
    this._task_root.addChildLast(this._default_task_after);

    /** @private */
    this._default_task_last = new b9.Task("DEFAULT_TASK_LAST");
    this._task_root.addChildLast(this._default_task_last);

    /** @private */
    this._default_view_2d = new b9.View(2, "DEFAULT_VIEW_2D");
    this._view_root.addChildLast(this._default_view_2d);

    /** @private */
    this._default_view_3d = null; //new b9.View(3, "DEFAULT_VIEW_3D");
//    this._view_root.addChildLast(this._default_view_3d);
};

/** @private */
b9.System._finalize = function() {
    b9.release(this._task_root);
    this._task_root = null;

    b9.release(this._view_root);
    this._view_root = null;
};

/**
 * hoge
 * @param {String} canvas_id
 * @param {Number} fps
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
    return this._default_task_first;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.System.defaultTaskBefore = function() {
    return this._default_task_before;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.System.defaultTaskNormal = function() {
    return this._default_task_normal;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.System.defaultTaskAfter = function() {
    return this._default_task_after;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.System.defaultTaskLast = function() {
    return this._default_task_last;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.System.defaultView2D = function() {
    return this._default_view_2d;
};

/**
 * hoge
 * @return {b9.View} hoge
 */
b9.System.defaultView3D = function() {
    return this._default_view_3d;
};

/**
 *
 */
b9.System._update = function() {
    var next_task;

    for (var task = this._task_root.getFirstChild(); task; task = next_task) {
        next_task = task.getNextAsList();

        if (task.isTaskFlagOn(b9.Task.FLAG_ACTIVE)) {
            // TODO
            task.onUpdate();
        }
    }
};

var x = 0;
/**
 *
 */
b9.System._render = function() {
    for (var view = this._view_root.getFirstChild(); view; view = view.getNextAsList()) {
        if (view.isViewFlagOn(b9.View.FLAG_VISIBLE)) {
            // TODO
            view._render();
        }
    }

    var canvas = document.getElementById(this._view_root._canvas_id);

    if (!canvas || !canvas.getContext) {
        return;
    }

    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x + 20, 20);
    ctx.lineTo(x + 120, 20);
    ctx.lineTo(x + 120, 120);
    ctx.lineTo(x + 20, 120);
    ctx.closePath();
    ctx.stroke();

    x++;
};
