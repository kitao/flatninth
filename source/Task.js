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
 * hoge
 * @param {String} [name] hoge
 */
b9.Task.prototype.initialize = function(name) {
    /** @private */
    this._id = b9.generateID();

    /** @private */
    this._name = name || "";

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
 * @return {Number} hoge
 */
b9.Task.prototype.getID = function() {
    return this._id;
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
 * @release {Boolean} hoge
 */
b9.Task.prototype.isRoot = function() {
    return (this._task_flag & b9.Task._FLAG_ROOT) ? true : false;
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
 * @return {b9.Element} hoge
 */
b9.Task.prototype.getPrevAsList = function() {
    var tree = this._task_tree.getPrevAsList();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Element} hoge
 */
b9.Task.prototype.getNextAsList = function() {
    var tree = this._task_tree.getNextAsList();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.Task.prototype.getParent = function() {
    var tree = this._task_tree.getParent();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.Task.prototype.getPrevSibling = function() {
    var tree = this._task_tree.getPrevSibling();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.Task.prototype.getNextSibling = function() {
    var tree = this._task_tree.getNextSibling();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.Task.prototype.getFirstChild = function() {
    var tree = this._task_tree.getFirstChild();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.Task.prototype.getLastChild = function() {
    var tree = this._task_tree.getLastChild();
    return tree ? tree.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Task} hoge
 */
b9.Task.prototype.getLastDescendant = function() {
    var tree = this._task_tree.getLastDescendant();
    return tree ? tree.getSelf() : null;
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

/**
 * hoge
 * @return {Number}
 */
b9.Task.FLAG_ACTIVE = 0x8000;

/** @private */
b9.Task._FLAG_ROOT = 0x0001;
