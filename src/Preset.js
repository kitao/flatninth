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
b9.Preset = {};

/**
 * Returns the specified task list.
 * @param {Number} The index number of an task list.
 * @return {b9.TaskList} The task list.
 */
b9.Preset.getTaskList = function(task_list_no) {
    return this._task_list_array[task_list_no - this.MIN_TASK_LIST_NO];
};

/**
 * Returns the specified screen.
 * @param {Number} The index number of a screen.
 * @return {b9.Screen} The screen.
 */
b9.Preset.getScreen = function(scr_no) {
    return this._scr_array[scr_no - this.MIN_SCREEN_NO];
};

/**
 * Returns the root node of the specified screen.
 * @param {Number} The index number of a screen.
 * @return {b9.Node} The root node.
 */
b9.Preset.getRootNode = function(scr_no) {
    return this._root_node_array[scr_no - this.MIN_SCREEN_NO];
};

/**
 *
 */
b9.Preset.defaultUpdateFunction = function() {
    var i;

    for (i = 0; i < b9.Preset.TASK_LIST_COUNT; i++) {
        b9.Preset._task_list_array[i].update();
    }
};

/**
 *
 */
b9.Preset.defaultRenderFunction = function() {
    var i;

    for (i = 0; i < b9.Preset.SCREEN_COUNT; i++) {
        b9.Preset._scr_array[i].render(b9.Preset._root_node_array[i]);
    }
};

b9.Preset.initialize_ = function() {
    var i;
    var scr;
    var width, height;
    var vert_code, frag_code;

    /*
     * initialize the preset task list
     */
    this._task_list_array = new Array(this.task_LIST_COUNT);

    for (i = 0; i < this.TASK_LIST_COUNT; i++) {
        this._task_list_array[i] = new b9.TaskList();
    }

    /*
     * initialize the preset screens
     */
    this._scr_array = new Array(this.SCREEN_COUNT);
    this._root_node_array = new Array(this.SCREEN_COUNT);

    width = b9.System.getFramebufferWidth();
    height = b9.System.getFramebufferHeight();

    for (i = 0; i < this.SCREEN_COUNT; i++) {
        this._scr_array[i] = new b9.Screen(width, height);
        this._root_node_array[i] = new b9.Node();
    }

    scr = this.getScreen(0);
    scr.setScreenFlag(b9.Screen.ScreenFlag.CLEAR_COLOR, true);
    scr.setScreenFlag(b9.Screen.ScreenFlag.CLEAR_DEPTH, true);
    scr.getClearColor().set(0, 0, 0);

    /*
     * initialize the preset shaders
     */
    vert_code =
        "uniform mat4 b9_local_to_screen;" +
        "uniform vec4 b9_node_color;" +
        "" +
        "attribute vec4 b9_vertex_pos;" +
        "attribute vec4 b9_vertex_color;" +
        "attribute vec2 b9_vertex_texcoord;" +
        "" +
        "varying vec4 pixel_color;" +
        "varying vec2 pixel_texcoord;" +
        "" +
        "void main()" +
        "{" +
        "    gl_Position = b9_local_to_screen * b9_vertex_pos;" +
        "    pixel_color = b9_vertex_color * b9_node_color / (255.0 * 255.0);" +
        "    pixel_texcoord = b9_vertex_texcoord;" +
        "}";

    frag_code =
        "precision mediump float;" +
        "" +
        "uniform sampler2D b9_texture_00;" +
        "" +
        "varying vec4 pixel_color;" +
        "varying vec2 pixel_texcoord;" +
        "" +
        "void main()" +
        "{" +
        "    gl_FragColor = texture2D(b9_texture_00, pixel_texcoord.st) * pixel_color;" +
        "}";

    this._shader = new b9.Shader(vert_code, frag_code, 0, 0, 1);

    vert_code =
        "uniform mat4 b9_local_to_screen;" +
        "uniform vec4 b9_node_color;" +
        "uniform vec4 b9_uniform_00;" +
        "uniform vec4 b9_uniform_01;" +
        "" +
        "attribute vec4 b9_vertex_pos;" +
        "attribute vec2 b9_vertex_texcoord;" +
        "" +
        "varying vec4 pixel_color;" +
        "varying vec2 pixel_texcoord;" +
        "" +
        "void main()" +
        "{" +
        "    gl_Position = b9_local_to_screen * (b9_vertex_pos * vec3(b9_uniform_00, b9_uniform_01, 1.0));" +
        "    pixel_color = b9_node_color / 255.0;" +
        "    pixel_texcoord = b9_vertex_texcoord;" +
        "}";

    frag_code =
        "precision mediump float;" +
        "" +
        "uniform sampler2D b9_texture_00;" +
        "" +
        "varying vec4 pixel_color;" +
        "varying vec2 pixel_texcoord;" +
        "" +
        "void main()" +
        "{" +
        "    gl_FragColor = texture2D(b9_texture_00, pixel_texcoord.st) * pixel_color;" +
        "}";

    this._sprite_shader = new b9.Shader(vert_code, frag_code, 2, 0, 1);
};

b9.Preset.finalize_ = function() {
    // TODO
};

/**
 *
 * @constant
 * @return {Number}
 */
b9.Preset.MIN_TASK_LIST_NO = -3;

/**
 *
 * @constant
 * @return {Number}
 */
b9.Preset.MAX_TASK_LIST_NO = 3;

/**
 *
 * @constant
 * @return {Number}
 */
b9.Preset.TASK_LIST_COUNT = b9.Preset.MAX_TASK_LIST_NO - b9.Preset.MIN_TASK_LIST_NO + 1;

/**
 *
 * @constant
 * @return {Number}
 */
b9.Preset.MIN_SCREEN_NO = -3;

/**
 *
 * @constant
 * @return {Number}
 */
b9.Preset.MAX_SCREEN_NO = 3;

/**
 *
 * @constant
 * @return {Number}
 */
b9.Preset.SCREEN_COUNT = b9.Preset.MAX_SCREEN_NO - b9.Preset.MIN_SCREEN_NO + 1;
