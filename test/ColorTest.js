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
    /* getR */
    /* getG */
    /* getB */
    /* getA */
    var color1 = new b9.Color();
    assertTrue(color1.getR() === 0.0 && color1.getG() === 0.0 && color1.getB() === 0.0 && color1.getA() === 0.0);

    var color2 = new b9.Color(0.1, 0.2, 0.3);
    assertTrue(color2.getR() === 0.1 && color2.getG() === 0.2 && color2.getB() === 0.3 && color2.getA() === 1.0);

    var color3 = new b9.Color(0.1, 0.2, 0.3, 0.4);
    assertTrue(color3.getR() === 0.1 && color3.getG() === 0.2 && color3.getB() === 0.3 && color3.getA() === 0.4);

    var color4 = new b9.Color(-0.1, -0.2, -0.3, -0.4);
    assertTrue(color4.getR() === 0.0 && color4.getG() === 0.0 && color4.getB() === 0.0 && color4.getA() === 0.0);

    var color5 = new b9.Color(2.0, 3.0, 4.0, 5.0);
    assertTrue(color5.getR() === 1.0 && color5.getG() === 1.0 && color5.getB() === 1.0 && color5.getA() === 1.0);

    var color6 = new b9.Color(color3);
    assertTrue(color6.getR() === 0.1 && color6.getG() === 0.2 && color6.getB() === 0.3 && color6.getA() === 0.4);

    /* setR */
    color1.setR(0.5);
    assertEquals(0.5, color1.getR());

    color1.setR(-0.5);
    assertEquals(0.0, color1.getR());

    color1.setR(2.0);
    assertEquals(1.0, color1.getR());

    /* setG */
    color1.setG(0.5);
    assertEquals(0.5, color1.getG());

    color1.setG(-0.5);
    assertEquals(0.0, color1.getG());

    color1.setG(2.0);
    assertEquals(1.0, color1.getG());

    /* setB */
    color1.setB(0.5);
    assertEquals(0.5, color1.getB());

    color1.setB(-0.5);
    assertEquals(0.0, color1.getB());

    color1.setB(2.0);
    assertEquals(1.0, color1.getB());

    /* setA */
    color1.setA(0.5);
    assertEquals(0.5, color1.getA());

    color1.setA(-0.5);
    assertEquals(0.0, color1.getA());

    color1.setA(2.0);
    assertEquals(1.0, color1.getA());

    /* set */
    color1.set(0.1, 0.2, 0.3);
    assertEqualsColor(new b9.Color(0.1, 0.2, 0.3, 1.0), color1);

    color2.set(0.1, 0.2, 0.3, 0.4);
    assertEqualsColor(new b9.Color(0.1, 0.2, 0.3, 0.4), color2);

    color3.set(-0.1, -0.2, -0.3, -0.4);
    assertEqualsColor(b9.Color.ZERO, color3);

    color4.set(2.0, 3.0, 4.0, 5.0);
    assertEqualsColor(b9.Color.FULL, color4);

    color5.set(color2);
    assertEqualsColor(color2, color5);

    /* add */
    color1.set(0.1, 0.2, 0.3, 0.4);
    color2.set(0.2, 0.3, 0.4, 0.5);
    color1.add(color2);
    assertEqualsColor(new b9.Color(0.3, 0.5, 0.7, 0.9), color1);

    color1.set(0.8, 0.8, 0.8, 0.8);
    color2.set(0.4, 0.5, 0.6, 0.7);
    color1.add(color2);
    assertEqualsColor(b9.Color.FULL, color1);

    /* sub */
    color1.set(0.5, 0.6, 0.7, 0.8);
    color2.set(0.4, 0.3, 0.2, 0.1);
    color1.sub(color2);
    assertEqualsColor(new b9.Color(0.1, 0.3, 0.5, 0.7), color1);

    color1.set(0.2, 0.2, 0.2, 0.2);
    color2.set(0.3, 0.4, 0.5, 0.6);
    color1.sub(color2);
    assertEqualsColor(b9.Color.ZERO, color1);

    /* mul */
    color1.set(0.4, 0.4, 0.4, 0.4);
    color2.set(0.25, 0.5, 0.75, 1.0);
    color1.mul(color2);
    assertEqualsColor(new b9.Color(0.1, 0.2, 0.3, 0.4), color1);

    color1.set(0.2, 0.4, 0.6, 0.8);
    color1.mul(0.5);
    assertEqualsColor(new b9.Color(0.1, 0.2, 0.3, 0.4), color1);

    color1.set(0.1, 0.2, 0.3, 0.4);
    color1.mul(-1.0);
    assertEqualsColor(b9.Color.ZERO, color1);

    color1.set(0.2, 0.3, 0.4, 0.5);
    color1.mul(10.0);
    assertEqualsColor(b9.Color.FULL, color1);

    /* div */
    color1.set(0.2, 0.4, 0.6, 0.8);
    color1.div(2.0);
    assertEqualsColor(new b9.Color(0.1, 0.2, 0.3, 0.4), color1);

    color1.set(0.1, 0.2, 0.3, 0.4);
    color1.div(-1.0);
    assertEqualsColor(b9.Color.ZERO, color1);

    color1.set(0.2, 0.3, 0.4, 0.5);
    color1.div(0.1);
    assertEqualsColor(b9.Color.FULL, color1);

    /* interp */
    color1.set(0.2, 0.4, 0.6, 0.8);
    color2.set(0.4, 0.6, 0.8, 1.0);
    color1.interp(color2, -1.0);
    assertEqualsColor(new b9.Color(0.2, 0.4, 0.6, 0.8), color1);

    color1.set(0.2, 0.4, 0.6, 0.8);
    color2.set(0.4, 0.6, 0.8, 1.0);
    color1.interp(color2, 0.5);
    assertEqualsColor(new b9.Color(0.3, 0.5, 0.7, 0.9), color1);

    color1.set(0.2, 0.4, 0.6, 0.8);
    color2.set(0.4, 0.6, 0.8, 1.0);
    color1.interp(color2, 2.0);
    assertEqualsColor(color2, color1);

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

    /* ZERO */
    assertEqualsColor(new b9.Color(0.0, 0.0, 0.0, 0.0), b9.Color.ZERO);

    /* FULL */
    assertEqualsColor(new b9.Color(1.0, 1.0, 1.0, 1.0), b9.Color.FULL);
}
