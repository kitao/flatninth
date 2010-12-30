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
 * @class
 */
b9.System = {};

/**
 *
 */
b9.System.setup = function(canvas_id, target_fps) {
    var i;
    var scr;

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

    this._update_func = this.defaultUpdateFunc;
    this._render_func = this.defaultRenderFunc;

    this._timer_id = null;
    this._next_update_time = 0;

    this._initActorList();
    this._initScreen();
    this._initGL();
    this._initShader();
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
b9.System.getUpdateFunc = function() {
    return this._update_func;
};

/**
 *
 */
b9.System.setUpdateFunc = function(update_func) {
    this._update_func = update_func;
};

/**
 *
 * @return {TODO}
 */
b9.System.getRenderFunc = function() {
    return this._render_func;
};

/**
 *
 */
b9.System.setRenderFunc = function(render_func) {
    this._render_func = render_func;
};

/**
 *
 */
b9.System.defaultUpdateFunc = function() {
    var i;

    for (i = 0; i < b9.System.ACTOR_LIST_COUNT; i++) {
        b9.System._actor_list_array[i].update();
    }
};

/**
 *
 */
b9.System.defaultRenderFunc = function() {
    var i;

    for (i = 0; i < b9.System.SCREEN_COUNT; i++) {
        b9.System._scr_array[i].render(b9.System._root_draw_array[i]);
    }
};

/**
 * Returns the specified actor list.
 * @param {Number} The index number of an actor list.
 * @return {b9.ActorList} The actor list.
 */
b9.System.getActorList = function(actor_list_no) {
    return this._actor_list_array[actor_list_no - this.MIN_ACTOR_LIST_NO];
};

/**
 * Returns the specified screen.
 * @param {Number} The index number of a screen.
 * @return {b9.Screen} The screen.
 */
b9.System.getScreen = function(scr_no) {
    return this._scr_array[scr_no - this.MIN_SCREEN_NO];
};

/**
 * Returns the root drawable of the specified screen.
 * @param {Number} The index number of a screen.
 * @return {b9.Drawable} The root drawable.
 */
b9.System.getRootDrawable = function(scr_no) {
    return this._root_draw_array[scr_no - this.MIN_SCREEN_NO];
};

/**
 * hoge
 * @return {Number} hoge
 */
b9.System.getTime = function() {
    return (new Date()).getTime();
};

/**
 * Writes a message to the console.
 * @param {String} msg A message.
 */
b9.System.log = function(msg) {
    console.log(msg);
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

b9.System._initActorList = function() {
    this._actor_list_array = new Array(this.ACTOR_LIST_COUNT);

    for (i = 0; i < this.ACTOR_LIST_COUNT; i++) {
        this._actor_list_array[i] = new b9.ActorList();
    }
};

b9.System._initScreen = function() {
    this._scr_array = new Array(this.SCREEN_COUNT);
    this._root_draw_array = new Array(this.SCREEN_COUNT);

    for (i = 0; i < this.SCREEN_COUNT; i++) {
        this._scr_array[i] = new b9.Screen(this._canvas.width, this._canvas.height);
        this._root_draw_array[i] = new b9.Drawable();
    }

    scr = this.getScreen(0);
    scr.setScreenFlag(b9.Screen.FLAG_CLEAR_COLOR, true);
    scr.setScreenFlag(b9.Screen.FLAG_CLEAR_DEPTH, true);
    scr.getClearColor().set(0, 0, 0);
};

b9.System._initGL = function() {
    var gl = this._gl;

    gl.clearDepth(-1.0);
};

b9.System._initShader = function() {
    vert_code =
        "precision highp float;" +
        "" +
        "uniform mat4 b9_local_to_screen;" +
        "" +
        "attribute vec4 b9_pos;" +
        "attribute vec4 b9_color;" +
        "attribute vec2 b9_texcoord;" +
        "" +
        "varying vec4 vary_color;" +
        "varying vec2 vary_texcoord;" +
        "" +
        "void main()" +
        "{" +
        "    gl_Position = b9_pos;" +
        "    vary_color = vec4(1.0, 0.0,1.0,1.0);" +
//        "    vary_color = b9_color;" +
        "}";

    frag_code =
        "precision highp float;" +
        "" +
        "varying vec4 vary_color;" +
        "varying vec2 vary_texcoord;" +
        "" +
        "void main()" +
        "{" +
        "    gl_FragColor = vary_color;" +
        "}";

    this._shader = new b9.Shader(vert_code, frag_code, 0, 0, 0);
};

/**
 *
 * @return {Number}
 */
b9.System.MIN_ACTOR_LIST_NO = -3;

/**
 *
 * @return {Number}
 */
b9.System.MAX_ACTOR_LIST_NO = 3;

/**
 *
 * @return {Number}
 */
b9.System.ACTOR_LIST_COUNT = b9.System.MAX_ACTOR_LIST_NO - b9.System.MIN_ACTOR_LIST_NO + 1;

/**
 *
 * @return {Number}
 */
b9.System.MIN_SCREEN_NO = -3;

/**
 *
 * @return {Number}
 */
b9.System.MAX_SCREEN_NO = 3;

/**
 *
 * @return {Number}
 */
b9.System.SCREEN_COUNT = b9.System.MAX_SCREEN_NO - b9.System.MIN_SCREEN_NO + 1;
