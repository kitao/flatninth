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

function testSystem() {
    function updateFunc() {
        alert("hoge");
    }

    function renderFunc() {
    }

    /* setup */
    b9.System.setup("test_canvas", updateFunc, renderFunc, 60);

    /* start */
    b9.System.start();

    /* stop */
    b9.System.stop();

    /* getCanvas */
    assertEquals(document.getElementById("test_canvas"), b9.System.getCanvas());

    /* getGLContext */
    assertNotUndefined(b9.System.getGLContext());

    /* getUpdatFunction */
    assertEquals(updateFunc, b9.System.getUpdateFunction());

    /* getRenderFunction */
    assertEquals(renderFunc, b9.System.getRenderFunction());

    /* getTargetFPS */
    assertEquals(60, b9.System.getTargetFPS());

    /* getCurrentFPS */
    b9.System.getCurrentFPS();

    /* getTime */
    b9.System.getTime();

    /* error */
    try {
        b9.System.error("test");
    } catch (e) {}
}
