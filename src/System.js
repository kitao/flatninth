/*
 * Copyright (c) 2009-2011 Takashi Kitao
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
 * @class
 */
b9.System = {};

/**
 *
 */
b9.System.setup = function(canvas_id, target_fps) {
    this._canvas = document.getElementById(canvas_id);

    if (!this._canvas) {
        this.error("can't find the specified canvas.");
    }

    this._gl = this._canvas.getContext("experimental-webgl");

    if (!this._gl) {
        this.error("can't initialize WebGL.");
    }

    this._target_fps = b9.Math.max(target_fps, 1);
    this._current_fps = 0;
    this._update_func = b9.Preset.defaultUpdateFunction;
    this._render_func = b9.Preset.defaultRenderFunction;
    this._timer_id = null;
    this._next_update_time = 0;

    this._initializeGL();

    b9.Resource._initialize();
    b9.Input._initialize();
    b9.Debug._initialize();
    b9.Preset._initialize();
};

/**
 * hoge
 */
b9.System.start = function() {
    var that = this;

    this._next_update_time = this.getTime();

    function onTimer() {
        var i;
        var update_count;
        var cur_time, wait_time;

        if (that._timer_id) {
            clearTimeout(that._timer_id);
        }

        cur_time = that.getTime();
        update_count = (cur_time - that._next_update_time) * that._target_fps / 1000.0;
        update_count = b9.Math.min(b9.Math.floor(update_count), 1);

        that._next_update_time += (1000.0 / that._target_fps) * update_count;

        for (i = 0; i < update_count; i++) {
            that._update_func();
        }

        that._render_func();
        b9.Debug._render();

        cur_time = that.getTime();
        wait_time = b9.Math.max(that._next_update_time - cur_time, 0);

        that._timer_id = setTimeout(onTimer, wait_time);
    }

    onTimer();
};

/**
 *
 */
b9.System.stop = function() {
    if (this._timer_id) {
        clearTimeout(this._timer_id);
    }
};

/**
 *
 * @return {Canvas}
 */
b9.System.getCanvas = function() {
    return this._canvas;
};

/**
 *
 * @return {GL}
 */
b9.System.getGLContext = function() {
    return this._gl;
};

/**
 *
 * @return {Number}
 */
b9.System.getFramebufferWidth = function() {
    return this._canvas.width;
};

/**
 *
 * @return {Number}
 */
b9.System.getFramebufferHeight = function() {
    return this._canvas.height;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.System.getTargetFPS = function() {
    return this._target_fps;
};

/**
 *
 * @return {Number}
 */
b9.System.getCurrentFPS = function() {
    return this._current_fps;
};

/**
 *
 * @return {TODO}
 */
b9.System.getUpdateFunction = function() {
    return this._update_func;
};

/**
 *
 */
b9.System.setUpdateFunction = function(update_func) {
    this._update_func = update_func;
};

/**
 *
 * @return {TODO}
 */
b9.System.getRenderFunction = function() {
    return this._render_func;
};

/**
 *
 */
b9.System.setRenderFunction = function(render_func) {
    this._render_func = render_func;
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.System.getTime = function() {
    return (new Date()).getTime();
};

/**
 * Notifies an error and throws the Error exception.
 * @param {String} msg An error message.
 */
b9.System.error = function(msg) {
    var msg2 = "b9.System.error: " + msg;

    alert(msg2);
    throw new Error(msg2);
};

b9.System._initializeGL = function() {
    var gl = this._gl;

    gl.clearDepth(-1.0);
};
