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

b9.Preset._initialize = function() {
    var width = b9.canvas.width;
    var height = b9.canvas.height;

    /**
     * The preset task list
     * @return {b9.TaskList}
     */
    this.taskList = new b9.TaskList();

    /**
     * The preset 3D screen.
     * @return {b9.Screen}
     */
    this.screen3D = new b9.Screen(width, height);

    this.screen3D.screenFlag |= b9.ScreenFlag.CLEAR_COLOR | b9.ScreenFlag.CLEAR_DEPTH;
    this.screen3D.clearColor.set(0, 0, 0);

    /**
     * The preset 2D screen.
     * @return {b9.Screen}
     */
    this.screen2D = new b9.Screen(width, height);

    /**
     * The root node of the preset 3D screen.
     * @return {b9.Node}
     */
    this.rootNode3D = new b9.Node();

    /**
     * The root node of the preset 2D screen.
     * @return {b9.Node}
     */
    this.rootNode2D = new b9.Node();

    /**
     * The preset update function.
     */
    this.updateFunc = function() {
        b9.Preset.taskList.update();
    };

    /**
     * The preset draw function.
     */
    this.drawFunc = function() {
        b9.Preset.screen3D.draw(b9.Preset.rootNode3D);
        b9.Preset.screen2D.draw(b9.Preset.rootNode2D);
    };
};

b9.Preset._finalize = function() {
    // TODO
};
