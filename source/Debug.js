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
b9.Debug = {};

/**
 * Writes a message to the console.
 * @param {String} msg A message.
 */
b9.Debug.trace = function(msg) {
    if (this.isDebugEnabled) {
        console.log(msg);
    }
};

/**
 *
 * @param {Number} x
 * @param {Number} y
 * @param {String} str
 * @param {b9.Color} color
 */
b9.Debug.drawString = function(x, y, str, color) {
    if (this.isDebugEnabled) {
        // TODO
    }
};

/**
 *
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {b9.Color} color
 */
b9.Debug.drawLine = function(x1, y1, x2, y2, color) {
    if (this.isDebugEnabled) {
        if (this._curPrimCount < this._MAX_PRIMITIVE_COUNT && this._curVertCount + 1 < this._MAX_VERTEX_COUNT) {
            // TODO

            this._curPrimCount += 1;
            this._curVertCount += 2;
        }


        // TODO
    }
};

/**
 *
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x3
 * @param {Number} y3
 * @param {b9.Color} color
 */
b9.Debug.drawPolygon3 = function(x1, y1, x2, y2, x3, y3, color) {
    if (this.isDebugEnabled) {
        // TODO
    }
};

/**
 *
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x3
 * @param {Number} y3
 * @param {Number} x4
 * @param {Number} y4
 * @param {b9.Color} color
 */
b9.Debug.drawPolygon4 = function(x1, y1, x2, y2, x3, y3, x4, y4, color) {
    if (this.isDebugEnabled) {
        // TODO
    }
};

/**
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {b9.Color} color
 */
b9.Debug.drawRectangle = function(x, y, width, height, color) {
    if (this.isDebugEnabled) {
        // TODO
    }
};

b9.Debug._draw = function() {
    if (this.isDebugEnabled) {
        if (this.isPerfMonitorEnabled) {
            this._drawPerformanceMonitor();
        }



        this._curPrimCount = 0;
        this._curVertCount = 0;
    }
};

b9.Debug._drawPerformanceMonitor = function() {
    // TODO
};

b9.Debug._initialize = function() {
    var i;

    /**
     *
     * return {Boolean}
     */
    this.isDebugEnabled = true;

    /**
     *
     * return {Boolean}
     */
    this.isPerfMonitorEnabled = false;

    this._primBuf = new b9.PrimitiveBuffer(this._MAX_VERTEX_COUNT, this._MAX_VERTEX_COUNT);
    this._primArray = new Array(this._MAX_PRIMITIVE_COUNT);

    this._curPrimCount = 0;
    this._curVertCount = 0;

    for (i = 0; i < this._MAX_PRIMITIVE_COUNT; i++) {
        this._primArray[i] = new b9.Primitive(b9.PrimitiveMode.TRIANGLES, this._primBuf);
    }
};

b9.Debug._finalize = function() {
    // TODO
};

b9.Debug._MAX_PRIMITIVE_COUNT = 100;
b9.Debug._MAX_VERTEX_COUNT = 100;
