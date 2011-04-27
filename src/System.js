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
b9.System.setup = function(canvasID, targetFps) {
    /**
     * @return {TODO}
     */
    this.canvas = document.getElementById(canvasID);

    if (!this.canvas) {
        this.error("can't find the specified canvas.");
    }

    /**
     *
     * @return {TODO}
     */
    this.gl = this.canvas.getContext("experimental-webgl");

    if (!this.gl) {
        this.error("can't initialize WebGL.");
    }

    /**
     * This property is read-only.
     * @return {Number}
     */
    this.targetFps = b9.Math.max(targetFps, 1);

    /**
     * This property is read-only.
     * @return {Number}
     */
    this.currentFps = 0;

    this._timerID = null;
    this._nextUpdateTime = 0;

    this._initializeOpenGL();
    this._initializeBuiltinShaders();

    b9.Resource._initialize();
    b9.Input._initialize();
    b9.Debug._initialize();
    b9.Preset._initialize();

    /**
     *
     * @return {TODO}
     */
    this.updateFunc = b9.Preset.updateFunc;

    /**
     *
     * @return {TODO}
     */
    this.drawFunc = b9.Preset.drawFunc;
};

/**
 *
 */
b9.System.teardown = function() {
    b9.Preset._finalize();
    b9.Debug._finalize();
    b9.Input._finalize();
    b9.Resource._finalize();
};

/**
 *
 */
b9.System.start = function() {
    var that = this;

    function onTimer() {
        var i;
        var updateCount;
        var curTime = that.getTime();
        var delayedTime = curTime - that._nextUpdateTime;

        if (delayedTime >= 0.0) {
            updateCount = (curTime - that._nextUpdateTime) * that.targetFps / 1000.0;
            updateCount = b9.Math.max(b9.Math.floor(updateCount), 1);

            if (delayedTime >= b9.System._MAX_DELAY_TIME) {
                updateCount = 1;
                that._nextUpdateTime = curTime + (1000.0 / that.targetFps);
            } else {
                that._nextUpdateTime += (1000.0 / that.targetFps) * updateCount;
            }

            for (i = 0; i < updateCount; i++) {
                that.updateFunc();
            }

            that.drawFunc();
            b9.Debug._draw();
        }
    }

    this._nextUpdateTime = this.getTime();

    setInterval(onTimer, 1000.0 / that.targetFps);
};

/**
 *
 */
b9.System.stop = function() {
    if (this._timerID) {
        clearTimeout(this._timerID);
    }
};

/**
 * Returns the current time in millisecond. This method can be used any time.
 * @return {Number} hoge
 */
b9.System.getTime = function() {
    return (new Date()).getTime();
};

/**
 * Notifies an error and throws the Error exception. This method can be used any time.
 * @param {String} msg An error message.
 */
b9.System.error = function(msg) {
    var msg2 = "b9.System.error: " + msg;

    alert(msg2);
    throw new Error(msg2);
};

b9.System._initializeOpenGL = function() {
    var gl = this.gl;

    //gl.enable(SCISSOR_TEST);
    gl.enable(gl.DEPTH_TEST);

    gl.clearDepth(-1.0);
};

b9.System._initializeBuiltinShaders = function() {
    b9.System._builtinShader_noTexture = new b9.Shader(
            "uniform mat4 b9_localToScreen;" +
            "uniform vec4 b9_nodeColor;" +

            "attribute vec4 b9_vertexPos;" +
            "attribute vec4 b9_vertexColor;" +
            "attribute vec2 b9_vertexTexCoord;" +

            "varying vec4 pixelColor;" +
            "varying vec2 pixelTexCoord;" +

            "void main()" +
            "{" +
            "    gl_Position = b9_localToScreen * b9_vertexPos;" +
            "    pixelColor = b9_vertexColor * b9_nodeColor / (255.0 * 255.0);" +
            "    pixelTexCoord = b9_vertexTexCoord;" +
            "}",

            "precision mediump float;" +

            "varying vec4 pixelColor;" +

            "void main()" +
            "{" +
            "    gl_FragColor = pixelColor;" +
            "}",

            0, 0, 0);

    b9.System._builtinShader_textureRGBA = new b9.Shader(
            "uniform mat4 b9_localToScreen;" +
            "uniform vec4 b9_nodeColor;" +

            "attribute vec4 b9_vertexPos;" +
            "attribute vec4 b9_vertexColor;" +
            "attribute vec2 b9_vertexTexCoord;" +

            "varying vec4 pixelColor;" +
            "varying vec2 pixelTexCoord;" +

            "void main()" +
            "{" +
            "    gl_Position = b9_localToScreen * b9_vertexPos;" +
            "    pixelColor = b9_vertexColor * b9_nodeColor / (255.0 * 255.0);" +
            "    pixelTexCoord = b9_vertexTexCoord;" +
            "}",

            "precision mediump float;" +

            "uniform sampler2D b9_texture_00;" +

            "varying vec4 pixelColor;" +
            "varying vec2 pixelTexCoord;" +

            "void main()" +
            "{" +
            "    gl_FragColor = texture2D(b9_texture_00, pixelTexCoord.st) * pixelColor;" +
            "}",

            0, 0, 1);
};

b9.System._MAX_DELAY_TIME = 100.0;
