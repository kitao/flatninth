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
 * @class hoge
 * @param {String} name
 */
b9.Task = function(name) {
    /** @private */
    this._name = name;

    /** @private */
    this._task_flag = b9.Task.FLAG_ACTIVE;

    /** @private */
    this._list_item = b9.ListItem(this);
};

/**
 * hoge
 */
b9.Task.prototype.finalize = function() {
    this._list_item.finalize();

    this._name = null;
};

/**
 *
 * @return {String}
 */
b9.Task.prototype.getName = function() {
    return this._name;
};

/**
 * hoge
 * @param {Number} task_flag hoge
 * @return {Boolean} hoge
 */
b9.Task.prototype.isTaskFlagOn = function(task_flag) {
    return (this._task_flag & task_flag) ? true : false;
};

/**
 * hoge
 * @param {Number} task_flag hoge
 * @param {Boolean} is_on hoge
 */
b9.Task.prototype.setTaskFlag = function(task_flag, is_on) {
    if (is_on) {
        this._task_flag |= task_flag;
    } else {
        this._task_flag &= ~task_flag;
    }
};

/**
 *
 */
b9.Task.prototype.onUpdate = function() {};

/** @private */
b9.Task._ORDER_MINUS_5 = 0;

/**
 * hoge
 * @return {Number}
 */
b9.Task.ORDER_MINUS_4 = 1;

/**
 * hoge
 * @return {Number}
 */
b9.Task.ORDER_MINUS_3 = 2;

/**
 * hoge
 * @return {Number}
 */
b9.Task.ORDER_MINUS_2 = 3;

/**
 * hoge
 * @return {Number}
 */
b9.Task.ORDER_MINUS_1 = 4;

/**
 * hoge
 * @return {Number}
 */
b9.Task.ORDER_ZERO = 5;

/**
 * hoge
 * @return {Number}
 */
b9.Task.ORDER_PLUS_1 = 6;

/**
 * hoge
 * @return {Number}
 */
b9.Task.ORDER_PLUS_2 = 7;

/**
 * hoge
 * @return {Number}
 */
b9.Task.ORDER_PLUS_3 = 8;

/**
 * hoge
 * @return {Number}
 */
b9.Task.ORDER_PLUS_4 = 9;

/** @private */
b9.Task._ORDER_PLUS_5 = 10;

/** @private */
b9.Task._ORDER_NUM = 11;

/**
 * hoge
 * @return {Number}
 */
b9.Task.FLAG_ACTIVE = 0x8000;
