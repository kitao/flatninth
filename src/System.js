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
    b9.canvas = document.getElementById(canvasID);

    if (!b9.canvas) {
        this.error("can't find the specified canvas.");
    }

    /**
     *
     * @return {TODO}
     */
    b9.gl = b9.canvas.getContext("experimental-webgl");

    if (!b9.gl) {
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

    /**
     *
     * @return {TODO}
     */
    this.updateFunc = b9.Preset.defaultUpdateFunc;

    /**
     *
     * @return {TODO}
     */
    this.renderFunc = b9.Preset.defaultRenderFunc;

    this._timerID = null;
    this._nextUpdateTime = 0;

    this._initializeGL();

    b9.Resource._initialize();
    b9.Input._initialize();
    b9.Debug._initialize();
    b9.Preset._initialize();
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

    this._nextUpdateTime = this.getTime();

    function onTimer() {
        var i;
        var updateCount;
        var curTime, waitTime;

        if (that._timerID) {
            clearTimeout(that._timerID);
        }

        curTime = that.getTime();
        updateCount = (curTime - that._nextUpdateTime) * that.targetFps / 1000.0;
        updateCount = b9.Math.max(b9.Math.floor(updateCount), 1);

        that._nextUpdateTime += (1000.0 / that.targetFps) * updateCount;

        for (i = 0; i < updateCount; i++) {
            that.updateFunc();
        }

        that.renderFunc();
        b9.Debug._render();

        curTime = that.getTime();
        waitTime = b9.Math.max(that._nextUpdateTime - curTime, 0);

        that._timerID = setTimeout(onTimer, waitTime);
    }

    onTimer();
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
    var gl = b9.gl;

    gl.clearDepth(-1.0);
};
