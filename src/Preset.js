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
 * Returns the specified actor list.
 * @param {Number} The index number of an actor list.
 * @return {b9.ActorList} The actor list.
 */
b9.Preset.getActorList = function(actor_list_no) {
    return this._actor_list_array[actor_list_no - this.MIN_ACTOR_LIST_NO];
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
 * Returns the root drawable of the specified screen.
 * @param {Number} The index number of a screen.
 * @return {b9.Drawable} The root drawable.
 */
b9.Preset.getRootDrawable = function(scr_no) {
    return this._root_draw_array[scr_no - this.MIN_SCREEN_NO];
};

/**
 *
 */
b9.Preset.defaultUpdateFunction = function() {
    var i;

    for (i = 0; i < b9.Preset.ACTOR_LIST_COUNT; i++) {
        b9.Preset._actor_list_array[i].update();
    }
};

/**
 *
 */
b9.Preset.defaultRenderFunction = function() {
    var i;
    var scr;

    for (i = 0; i < b9.Preset.SCREEN_COUNT; i++) {
        scr = b9.Preset._scr_array[i];

        scr.beginRender();
        scr.render(b9.Preset._root_draw_array[i]);
        scr.endRender();
    }
};

b9.Preset._initialize = function() {
    var i;
    var scr;
    var width, height;
    var vert_code, frag_code;

    /*
     * initialize the preset actor list
     */
    this._actor_list_array = new Array(this.ACTOR_LIST_COUNT);

    for (i = 0; i < this.ACTOR_LIST_COUNT; i++) {
        this._actor_list_array[i] = new b9.ActorList();
    }

    /*
     * initialize the preset screens
     */
    this._scr_array = new Array(this.SCREEN_COUNT);
    this._root_draw_array = new Array(this.SCREEN_COUNT);

    width = b9.System.getFramebufferWidth();
    height = b9.System.getFramebufferHeight();

    for (i = 0; i < this.SCREEN_COUNT; i++) {
        this._scr_array[i] = new b9.Screen(width, height);
        this._root_draw_array[i] = new b9.Drawable();
    }

    scr = this.getScreen(0);
    scr.setScreenFlag(b9.Screen.FLAG_CLEAR_COLOR, true);
    scr.setScreenFlag(b9.Screen.FLAG_CLEAR_DEPTH, true);
    scr.getClearColor().set(0, 0, 0);

    /*
     * initialize the preset shaders
     */
    vert_code =
        "uniform mat4 b9_local_to_screen;" +
        "uniform vec4 b9_drawable_color;" +
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
        "    pixel_color = b9_vertex_color * b9_drawable_color / (255.0 * 255.0);" +
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
};

/**
 *
 * @return {Number}
 */
b9.Preset.MIN_ACTOR_LIST_NO = -3;

/**
 *
 * @return {Number}
 */
b9.Preset.MAX_ACTOR_LIST_NO = 3;

/**
 *
 * @return {Number}
 */
b9.Preset.ACTOR_LIST_COUNT = b9.Preset.MAX_ACTOR_LIST_NO - b9.Preset.MIN_ACTOR_LIST_NO + 1;

/**
 *
 * @return {Number}
 */
b9.Preset.MIN_SCREEN_NO = -3;

/**
 *
 * @return {Number}
 */
b9.Preset.MAX_SCREEN_NO = 3;

/**
 *
 * @return {Number}
 */
b9.Preset.SCREEN_COUNT = b9.Preset.MAX_SCREEN_NO - b9.Preset.MIN_SCREEN_NO + 1;
