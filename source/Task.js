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
 */
b9.Task = b9.createClass();

/**
 *
 * @param {String} name
 */
b9.Task.initialize = function(name) {
    /** @private */
    this._name = name;

    /** @private */
    this._task_flag = b9.Task.FLAG_ACTIVE;

    /** @private */
    this._task_tree = new b9.Tree(this);
};

/**
 * hoge
 */
b9.Task.prototype.finalize = function() {
    this._name = null;

    b9.release(this._list_item);
    this._list_item = null;
};

/**
 * hoge
 * @release {Boolean} hoge
 */
b9.Task.prototype.isRoot = function() {
    return false;
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
 * hoge
 * @return {b9.Task} hoge
 */
b9.Task.prototype.getParent = function() {
    var parent = this._task_tree.getParent();
    return parent ? parent.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.Task.prototype.getPrevSibling = function() {
    var sibling = this._task_tree.getPrevSibling();
    return sibling ? sibling.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.Task.prototype.getNextSibling = function() {
    var sibling = this._task_tree.getNextSibling();
    return sibling ? sibling.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.Task.prototype.getFirstChild = function() {
    var child = this._task_tree.getFirstChild();
    return child ? child.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.Task.prototype.getLastChild = function() {
    var child = this._task_tree.getLastChild();
    return child ? child.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.Task.prototype.addChildFirst = function(cihld) {
    this._task_tree.addChildFirst(child._task_tree);
};

/**
 * hoge
 * @param {b9.Task} child hoge
 */
b9.Task.prototype.addChildLast = function(child) {
    this._task_tree.addChildLast(child._task_tree);
};

/**
 * hoge
 * @param {b9.Task} child hoge
 * @param {b9.Task} next_child hoge
 */
b9.Task.prototype.addChildBefore = function(child, next_child) {
    this._task_tree.addChildBefore(child._task_tree, next_child._task_tree);
};

/**
 * hoge
 * @param {b9.Task} child hoge
 * @param {b9.Task} prev_child hoge
 */
b9.Task.prototype.addChildAfter = function(child, prev_child) {
    this._task_tree.addChildAfter(child._task_tree, prev_child._task_tree);
};

/**
 * hoge
 * @param {b9.Task} child hoge
 */
b9.Task.prototype.removeChild = function(child) {
    this._task_tree.removeChild(child._task_tree);
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
