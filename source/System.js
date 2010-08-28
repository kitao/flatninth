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

b9.System._initialize = function(canvas_id, target_fps) {
    var canvas = document.getElementById(canvas_id);

    if (canvas && canvas.getContext) {
        canvas.context = canvas.getContext("2d");
    }

    this._main_canvas = canvas;
    this._target_fps = b9.Math.max(target_fps, 1);
    this._layer_list = new b9.List();
    this._task_root = new b9.Task();
    this._task_root.setName("TASK_ROOT");
    this._task_root._is_root = true;
    this._timer_id = null;
    this._next_update_time = 0;

    this._default_layer = new Array(this._ORDER_NUM);
    this._default_task = new Array(this._ORDER_NUM);

    for (var i = 0; i < this._ORDER_NUM; i++) {
        this._default_layer[i] = new b9.Layer(i * 100);
        this._default_layer[i].size().set(this._main_canvas.width, this._main_canvas.height);
        this._default_layer[i].setClear(false);
        this._default_layer[i].clearColor().set(b9.Color.ZERO);

        this._default_task[i] = new b9.Task(this._task_root);
    }

    this._default_layer[this._ORDER_FIRST].setClear(true);

    this._default_layer[this._ORDER_FIRST].setName("DEFAULT_TASK_FIRST");
    this._default_layer[this._ORDER_BEFORE].setName("DEFAULT_TASK_BEFORE");
    this._default_layer[this._ORDER_NORMAL].setName("DEFAULT_TASK_NORMAL");
    this._default_layer[this._ORDER_AFTER].setName("DEFAULT_TASK_AFTER");
    this._default_layer[this._ORDER_LAST].setName("DEFAULT_TASK_LAST");

    this._default_task[this._ORDER_FIRST].setName("DEFAULT_TASK_FIRST");
    this._default_task[this._ORDER_BEFORE].setName("DEFAULT_TASK_BEFORE");
    this._default_task[this._ORDER_NORMAL].setName("DEFAULT_TASK_NORMAL");
    this._default_task[this._ORDER_AFTER].setName("DEFAULT_TASK_AFTER");
    this._default_task[this._ORDER_LAST].setName("DEFAULT_TASK_LAST");

    b9.Asset._initialize();
    b9.Graphics._initialize();
    b9.Debug._initialize();
};

b9.System._finalize = function() {
    if (this._timer_id) {
        clearTimeout(this._timer_id);
    }

    b9.Debug._finalize();
    b9.Graphics._finalize();
    b9.Asset._finalize();

    for (var i = 0; i < this._ORDER_NUM; i++) {
        this._default_layer[i].finalize();
        this._default_task[i].finalize();
    }

    this._layer_list.finalize();
    this._task_root.finalize();
};

/**
 * hoge
 * @param {String} canvas_id hoge
 * @param {Number} target_fps hoge
 */
b9.System.setup = function(canvas_id, target_fps) {
    this._initialize(canvas_id, target_fps);
};

/**
 * hoge
 */
b9.System.start = function() {
    this._next_update_time = this.getTime();

    function onTimer() {
        if (b9.System._timer_id) {
            clearTimeout(b9.System._timer_id);
        }

        var cur_time = b9.System.getTime();
        var update_count = (cur_time - b9.System._next_update_time) * b9.System._target_fps / 1000.0;
        update_count = b9.Math.min(b9.Math.floor(update_count), 1);

        b9.System._next_update_time += (1000.0 / b9.System._target_fps) * update_count;

        for (var i = 0; i < update_count; i++) {
            b9.System._update();
        }

        b9.System._render();

        cur_time = b9.System.getTime();
        var wait_time = b9.Math.max(b9.System._next_update_time - cur_time, 0);

        b9.System._timer_id = setTimeout(onTimer, wait_time);
    }

    onTimer();
};

/**
 * hoge
 */
b9.System.teardown = function() {
    b9.System._finalize();
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
 * @param {Canvas} hoge
 */
b9.System.getMainCanvas = function() {
    return this._main_canvas;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.System.getTargetFPS = function() {
    return this._target_fps;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.System.getTime = function() {
    return (new Date()).getTime();
};

/**
 * hoge
 * @return {b9.Layer} hoge
 */
b9.System.getFirstLayer = function() {
    var item = this._layer_list.getFirstItem();
    return item ? item.getSelf() : null;
};

/**
 * hoge
 * @return {b9.Layer} hoge
 */
b9.System.getLastLayer = function() {
    var item = this._layer_list.getLastItem();
    return item ? item.getSelf() : null;
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
 * @return {b9.Layer} hoge
 */
b9.System.defaultLayerFirst = function() {
    return this._default_layer[this._ORDER_FIRST];
};

/**
 * hoge
 * @return {b9.Layer} hoge
 */
b9.System.defaultLayerBefore = function() {
    return this._default_layer[this._ORDER_BEFORE];
};

/**
 * hoge
 * @return {b9.Layer} hoge
 */
b9.System.defaultLayerNormal = function() {
    return this._default_layer[this._ORDER_NORMAL];
};

/**
 * hoge
 * @return {b9.Layer} hoge
 */
b9.System.defaultLayerAfter = function() {
    return this._default_layer[this._ORDER_AFTER];
};

/**
 * hoge
 * @return {b9.Layer} hoge
 */
b9.System.defaultLayerLast = function() {
    return this._default_layer[this._ORDER_LAST];
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

b9.System._update = function() {
    var next_task;

    for (var task = this._task_root; task; task = next_task) {
        next_task = task.getNextAsList();

        if (task._is_active) {
            task.onUpdate();
        } else {
            next_task = task.getLastDescendant().getNextAsList();
        }
    }
};

b9.System._render = function() {
    for (var layer = this.getFirstLayer(); layer; layer = layer.getNext()) {
        if (layer._is_visible) {
            layer._render();
        }
    }
};

b9.System._registerLayer = function(layer) {
    this._unregisterLayer(layer);

    for (var layer2 = this.getLastLayer(); layer2; layer2 = layer2.getPrev()) {
        if (layer.getOrder() >= layer2.getOrder()) {
            this._layer_list.addItemAfter(layer._list_item, layer2._list_item);
            return;
        }
    }

    this._layer_list.addItemFirst(layer._list_item);
};

b9.System._unregisterLayer = function(layer) {
    if (layer._list_item.getList()) {
        this._layer_list.removeItem(layer._list_item);
    }
};

b9.System._ORDER_FIRST = 0;
b9.System._ORDER_BEFORE = 1;
b9.System._ORDER_NORMAL = 2;
b9.System._ORDER_AFTER = 3;
b9.System._ORDER_LAST = 4;
b9.System._ORDER_NUM = 5;
