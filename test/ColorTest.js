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
    /* initialize */
    var color1 = new b9.Color();
    assertTrue(color1.r === 0.0 && color1.g === 0.0 && color1.b === 0.0 && color1.a === 0.0);

    var color2 = new b9.Color(0.1, 0.2, 0.3);
    assertTrue(color2.r === 0.1 && color2.g === 0.2 && color2.b === 0.3 && color2.a === 1.0);

    var color3 = new b9.Color(0.1, 0.2, 0.3, 0.4);
    assertTrue(color3.r === 0.1 && color3.g === 0.2 && color3.b === 0.3 && color3.a === 0.4);

    var color4 = new b9.Color(-0.1, -0.2, -0.3, -0.4);
    assertTrue(color4.r === 0.0 && color4.g === 0.0 && color4.b === 0.0 && color4.a === 0.0);

    var color5 = new b9.Color(2.0, 3.0, 4.0, 5.0);
    assertTrue(color5.r === 1.0 && color5.g === 1.0 && color5.b === 1.0 && color5.a === 1.0);

    var color6 = new b9.Color(color3);
    assertTrue(color6.r === 0.1 && color6.g === 0.2 && color6.b === 0.3 && color6.a === 0.4);

    /* set */
    assertEqualsColor(new b9.Color(0.1, 0.2, 0.3, 1.0), color1.set(0.1, 0.2, 0.3));
    assertEqualsColor(new b9.Color(0.1, 0.2, 0.3, 0.4), color2.set(0.1, 0.2, 0.3, 0.4));
    assertEqualsColor(b9.Color.ZERO, color3.set(-0.1, -0.2, -0.3, -0.4));
    assertEqualsColor(b9.Color.FULL, color4.set(2.0, 3.0, 4.0, 5.0));
    assertEqualsColor(color2, color5.set(color2));

    /* add */
    color1.set(0.1, 0.2, 0.3, 0.4);
    color2.set(0.2, 0.3, 0.4, 0.5);
    assertEqualsColor(new b9.Color(0.3, 0.5, 0.7, 0.9), color1.add(color2));

    color1.set(0.8, 0.8, 0.8, 0.8);
    color2.set(0.4, 0.5, 0.6, 0.7);
    assertEqualsColor(b9.Color.FULL, color1.add(color2));

    /* sub */
    color1.set(0.5, 0.6, 0.7, 0.8);
    color2.set(0.4, 0.3, 0.2, 0.1);
    assertEqualsColor(new b9.Color(0.1, 0.3, 0.5, 0.7), color1.sub(color2));

    color1.set(0.2, 0.2, 0.2, 0.2);
    color2.set(0.3, 0.4, 0.5, 0.6);
    assertEqualsColor(b9.Color.ZERO, color1.sub(color2));

    /* mul */
    color1.set(0.4, 0.4, 0.4, 0.4);
    color2.set(0.25, 0.5, 0.75, 1.0);
    assertEqualsColor(new b9.Color(0.1, 0.2, 0.3, 0.4), color1.mul(color2));

    color1.set(0.2, 0.4, 0.6, 0.8);
    assertEqualsColor(new b9.Color(0.1, 0.2, 0.3, 0.4), color1.mul(0.5));

    color1.set(0.1, 0.2, 0.3, 0.4);
    assertEqualsColor(b9.Color.ZERO, color1.mul(-1.0));

    color1.set(0.2, 0.3, 0.4, 0.5);
    assertEqualsColor(b9.Color.FULL, color1.mul(10.0));

    /* div */
    color1.set(0.2, 0.4, 0.6, 0.8);
    assertEqualsColor(new b9.Color(0.1, 0.2, 0.3, 0.4), color1.div(2.0));

    color1.set(0.1, 0.2, 0.3, 0.4);
    assertEqualsColor(b9.Color.ZERO, color1.div(-1.0));

    color1.set(0.2, 0.3, 0.4, 0.5);
    assertEqualsColor(b9.Color.FULL, color1.div(0.1));

    /* interp */
    color1.set(0.2, 0.4, 0.6, 0.8);
    color2.set(0.4, 0.6, 0.8, 1.0);
    assertEqualsColor(new b9.Color(0.2, 0.4, 0.6, 0.8), color1.interp(color2, -1.0));

    color1.set(0.2, 0.4, 0.6, 0.8);
    color2.set(0.4, 0.6, 0.8, 1.0);
    assertEqualsColor(new b9.Color(0.3, 0.5, 0.7, 0.9), color1.interp(color2, 0.5));

    color1.set(0.2, 0.4, 0.6, 0.8);
    color2.set(0.4, 0.6, 0.8, 1.0);
    assertEqualsColor(color2, color1.interp(color2, 2.0));

    /* isEqual */
    color1.set(0.1, 0.2, 0.3, 0.4);
    color2.set(color1);
    assertTrue(color1.isEqual(color2));

    color2.set(0.0, 0.2, 0.3, 0.4);
    assertFalse(color1.isEqual(color2));

    color2.set(0.1, 0.0, 0.3, 0.4);
    assertFalse(color1.isEqual(color2));

    color2.set(0.1, 0.2, 0.0, 0.4);
    assertFalse(color1.isEqual(color2));

    color2.set(0.1, 0.2, 0.3, 0.0);
    assertFalse(color1.isEqual(color2));

    /* toString */
    assertEquals("(0.1, 0.2, 0.3, 0.4)", (new b9.Color(0.1, 0.2, 0.3, 0.4)).toString());

    /* toRGB */
    assertEquals("rgb(26,51,77)", (new b9.Color(0.1, 0.2, 0.3, 0.4)).toRGB());

    /* toRGBA */
    assertEquals("rgba(26,51,77,102)", (new b9.Color(0.1, 0.2, 0.3, 0.4)).toRGBA());

    /* ZERO */
    assertEqualsColor(new b9.Color(0.0, 0.0, 0.0, 0.0), b9.Color.ZERO);

    /* FULL */
    assertEqualsColor(new b9.Color(1.0, 1.0, 1.0, 1.0), b9.Color.FULL);
}
