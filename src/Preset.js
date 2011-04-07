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
 *
 */
b9.Preset.defaultUpdateFunc = function() {
    var Preset = b9.Preset;

    Preset.taskList_m3.update();
    Preset.taskList_m2.update();
    Preset.taskList_m1.update();
    Preset.taskList_p0.update();
    Preset.taskList_p1.update();
    Preset.taskList_p2.update();
    Preset.taskList_p3.update();
};

/**
 *
 */
b9.Preset.defaultRenderFunc = function() {
    var Preset = b9.Preset;

    Preset.screen_m3.render(Preset.rootNode_m3);
    Preset.screen_m2.render(Preset.rootNode_m2);
    Preset.screen_m1.render(Preset.rootNode_m1);
    Preset.screen_p0.render(Preset.rootNode_p0);
    Preset.screen_p1.render(Preset.rootNode_p1);
    Preset.screen_p2.render(Preset.rootNode_p2);
    Preset.screen_p3.render(Preset.rootNode_p3);
};

b9.Preset._initialize = function() {
    var scr;
    var vertCode, fragCode;
    var width = b9.canvas.width;
    var height = b9.canvas.height;

    /**
     * @return {b9.TaskList}
     */
    this.taskList_m3 = new b9.TaskList();

    /**
     * @return {b9.TaskList}
     */
    this.taskList_m2 = new b9.TaskList();

    /**
     * @return {b9.TaskList}
     */
    this.taskList_m1 = new b9.TaskList();

    /**
     * @return {b9.TaskList}
     */
    this.taskList_p0 = new b9.TaskList();

    /**
     * @return {b9.TaskList}
     */
    this.taskList_p1 = new b9.TaskList();

    /**
     * @return {b9.TaskList}
     */
    this.taskList_p2 = new b9.TaskList();

    /**
     * @return {b9.TaskList}
     */
    this.taskList_p3 = new b9.TaskList();

    /**
     * @return {b9.Screen}
     */
    this.screen_m3 = new b9.Screen(width, height);

    /**
     * @return {b9.Screen}
     */
    this.screen_m2 = new b9.Screen(width, height);

    /**
     * @return {b9.Screen}
     */
    this.screen_m1 = new b9.Screen(width, height);

    /**
     * @return {b9.Screen}
     */
    this.screen_p0 = new b9.Screen(width, height);

    /**
     * @return {b9.Screen}
     */
    this.screen_p1 = new b9.Screen(width, height);

    /**
     * @return {b9.Screen}
     */
    this.screen_p2 = new b9.Screen(width, height);

    /**
     * @return {b9.Screen}
     */
    this.screen_p3 = new b9.Screen(width, height);

    /**
     * @return {b9.Node}
     */
    this.rootNode_m3 = new b9.Node();

    /**
     * @return {b9.Node}
     */
    this.rootNode_m2 = new b9.Node();

    /**
     * @return {b9.Node}
     */
    this.rootNode_m1 = new b9.Node();

    /**
     * @return {b9.Node}
     */
    this.rootNode_p0 = new b9.Node();

    /**
     * @return {b9.Node}
     */
    this.rootNode_p1 = new b9.Node();

    /**
     * @return {b9.Node}
     */
    this.rootNode_p2 = new b9.Node();

    /**
     * @return {b9.Node}
     */
    this.rootNode_p3 = new b9.Node();

    scr = this.screen_p0;
    scr.screenFlag |= b9.ScreenFlag.CLEAR_COLOR | b9.ScreenFlag.CLEAR_DEPTH;
    scr.clearColor.set(0, 0, 0);

    /*
     * initialize the preset shaders
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

b9.Preset._finalize = function() {
    // TODO
};
