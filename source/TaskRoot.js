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
 * hoge
 * @class hoge
 * @extends b9.Task
 */
b9.TaskRoot = b9.createClass(b9.Task);

/**
 * hoge
 * @param {Number} task_order
 */
b9.TaskRoot.prototype.initialize = function(task_order) {
    this.initializeSuper("TaskRoot");

    /** @private */
    this._task_order = task_order;
};

/**
 * hoge
 */
b9.TaskRoot.prototype.finalize = function() {
    this.finalizeSuper();
};

/**
 * hoge
 * @release {Boolean} hoge
 */
b9.TaskRoot.prototype.isRoot = function() {
    return true;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.TaskRoot.prototype.getTaskOrder = function() {
    return this._task_order;
};
