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
 * The default update function.
 */
b9.Preset.defaultUpdateFunc = function() {
    var i;

    var Preset = b9.Preset;
    var taskListCount = Preset.TASK_LIST_COUNT;

    for (i = 0; i < taskListCount; i++) {
        Preset.taskLists[i].update();
    }
};

/**
 * The default draw function.
 */
b9.Preset.defaultDrawFunc = function() {
    var i;

    var Preset = b9.Preset;
    var screenCount = Preset.SCREEN_COUNT;

    for (i = 0; i < screenCount; i++) {
        Preset.screens[i].draw(Preset.rootNodes[i]);
    }
};

b9.Preset._initialize = function() {
    var i;
    var scr;

    var width = b9.canvas.width;
    var height = b9.canvas.height;

    /**
     * The array of the preset task lists.
     * @return {Array}
     */
    this.taskLists = [];

    /**
     * The array of the preset screens.
     * @return {Array}
     */
    this.screens = [];

    /**
     * The array of the preset root nodes.
     * @return {Array}
     */
    this.rootNodes = [];

    for (i = 0; i < this.TASK_LIST_COUNT; i++) {
        this.taskLists[i] = new b9.TaskList();
    }

    for (i = 0; i < this.SCREEN_COUNT; i++) {
        this.screens[i] = new b9.Screen(width, height);
        this.rootNodes[i] = new b9.Node();
    }

    scr = this.screens[0];
    scr.screenFlag |= b9.ScreenFlag.CLEAR_COLOR | b9.ScreenFlag.CLEAR_DEPTH;
    scr.clearColor.set(0, 0, 0);

    this._initializeDefaultShader();
};

b9.Preset._finalize = function() {
    // TODO
};

b9.Preset._initializeDefaultShader = function() {
    var vertCode, fragCode;

    /*
     * initialize default primitive shader
     */
    vertCode =
        "uniform mat4 b9_localToScreen;" +
        "uniform vec4 b9_nodeColor;" +
        "" +
        "attribute vec4 b9_vertexPos;" +
        "attribute vec4 b9_vertexColor;" +
        "attribute vec2 b9_vertexTexCoord;" +
        "" +
        "varying vec4 pixelColor;" +
        "varying vec2 pixelTexCoord;" +
        "" +
        "void main()" +
        "{" +
        "    gl_Position = b9_localToScreen * b9_vertexPos;" +
        "    pixelColor = b9_vertexColor * b9_nodeColor / (255.0 * 255.0);" +
        "    pixelTexCoord = b9_vertexTexCoord;" +
        "}";

    fragCode =
        "precision mediump float;" +
        "" +
        "uniform sampler2D b9_texture_00;" +
        "" +
        "varying vec4 pixelColor;" +
        "varying vec2 pixelTexCoord;" +
        "" +
        "void main()" +
        "{" +
        "    gl_FragColor = texture2D(b9_texture_00, pixelTexCoord.st) * pixelColor;" +
        "}";

    this._defaultPrimitiveShader = new b9.Shader(vertCode, fragCode, 0, 0, 1);

    /*
     * initialize default sprite shader
     */
    vertCode =
        "uniform mat4 b9_localToScreen;" +
        "uniform vec4 b9_nodeColor;" +
        "uniform vec4 b9_uniform_00;" +
        "uniform vec4 b9_uniform_01;" +
        "" +
        "attribute vec4 b9_vertexPos;" +
        "attribute vec2 b9_vertexTexCoord;" +
        "" +
        "varying vec4 pixelColor;" +
        "varying vec2 pixelTexCoord;" +
        "" +
        "void main()" +
        "{" +
        "    gl_Position = b9_localToScreen * (b9_vertexPos * vec3(b9_uniform_00, b9_uniform_01, 1.0));" +
        "    pixelColor = b9_nodeColor / 255.0;" +
        "    pixelTexCoord = b9_vertexTexCoord;" +
        "}";

    fragCode =
        "precision mediump float;" +
        "" +
        "uniform sampler2D b9_texture_00;" +
        "" +
        "varying vec4 pixelColor;" +
        "varying vec2 pixelTexCoord;" +
        "" +
        "void main()" +
        "{" +
        "    gl_FragColor = texture2D(b9_texture_00, pixelTexCoord.st) * pixelColor;" +
        "}";

    this._defaultSpriteShader = new b9.Shader(vertCode, fragCode, 2, 0, 1);
};

/**
 * The number of the preset task lists.
 * @constant
 * @return {Number}
 */
b9.Preset.TASK_LIST_COUNT = 8;

/**
 * The number of the preset screens. The number of the root nodes is also equal to this number.
 * @constant
 * @return {Number}
 */
b9.Preset.SCREEN_COUNT = 8;
