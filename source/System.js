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
    this._canvas_id = canvas_id;

    /** @private */
    this._aim_fps = b9.Math.max(aim_fps, 1);

    /** @private */
    this._task_root = new Array(b9.Task._ORDER_NUM);

    for (var i = 0; i < b9.Task._ORDER_NUM; i++) {
        this._task_root[i] = new b9.TaskRoot(i);
    }

    /** @private */
    this._view_root = new b9.ViewRoot();

    /** @private */
    this._timer_id = null;
};

/** @private */
b9.System._finalize = function() {
    for (var i = 0; i < b9.Task._ORDER_NUM; i++) {
        this._task_root[i].destroy();
        this._task_root[i] = null;
    }

    this._task_root = null;
};

/**
 * hoge
 * @return {b9.TaskRoot} hoge
 */
b9.System.getTaskRoot = function(task_order) {
    return this._task_root[task_order];
};

/**
 * hoge
 * @return {b9.ViewRoot} hoge
 */
b9.System.getViewRoot = function() {
    return this._view_root;
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
 *
 */
b9.System._update = function() {
    for (var i = 0; i < b9.Task._ORDER_NUM; i++) {
        var next_task = null;

        for (var task = this._task_root[i].getFirstChild(); task; task = next_task) {
            next_task = task.getNextAll();

            if (task.isFlagOn(b9.Task.FLAG_ACTIVE)) {
                task.onUpdate();
            }
        }
    }
};

var x = 0;
/**
 *
 */
b9.System._render = function() {
    for (var view = this._view_root.getFirstChild(); view; view = view.getNextAsList()) {
        if (view.isFlagOn(b9.View.FLAG_VISIBLE)) {
            // TODO
            view._render();
        }
    }

    var canvas = document.getElementById(this._canvas_id);

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
