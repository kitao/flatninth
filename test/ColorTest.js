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

function testColor() {
    /* b9.Color */
    var color1 = new b9.Color();
    assertTrue(color1.r === 0 && color1.g === 0 && color1.b === 0 && color1.a === 0);

    var color2 = new b9.Color(1, 2, 3);
    assertTrue(color2.r === 1 && color2.g === 2 && color2.b === 3 && color2.a === 255);

    var color3 = new b9.Color(1, 2, 3, 4);
    assertTrue(color3.r === 1 && color3.g === 2 && color3.b === 3 && color3.a === 4);

    var color4 = new b9.Color(color3);
    assertTrue(color4.r === 1 && color4.g === 2 && color4.b === 3 && color4.a === 4);

    /* set */

    /* add */

    /* sub */

    /* mul */

    /* div */

    /* interp */

    /* isEqual */

    /* toString */

    /* ZERO */
    assertEqualsColor(new b9.Color(0, 0, 0, 0), b9.Color.ZERO);

    /* FULL */
    assertEqualsColor(new b9.Color(255, 255, 255, 255), b9.Color.FULL);
}
