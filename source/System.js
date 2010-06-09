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

/**
 *
 */
b9.System.startFlatninth = function() {
    /** @private */
    this._task_root = new Array(b9.Task._ORDER_NUM);

    for (var i = 0; i < b9.Task._ORDER_NUM; i++) {
        this._task_root[i] = new b9.TaskRoot(i);
    }

    /** @private */
    this._view_root = new b9.ViewRoot();
};

/**
 *
 */
b9.System.endFlatninth = function() {
    for (var i = 0; i < b9.Task._ORDER_NUM; i++) {
        this._task_root[i].destroy();
        this._task_root[i] = null;
    }

    this._task_root = null;

    // TODO
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

        for (var task = this._task_root.getFirstChild(); task; task = next_task) {
            next_task = task.getNextAll();

            if (task.isFlagOn(b9.Task.FLAG_ACTIVE)) {
                task.onUpdate();
            }
        }
    }
};
