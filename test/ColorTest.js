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
    assertTrue(color1.getR() === 0 && color1.getG() === 0 && color1.getB() === 0 && color1.getA() === 0);

    var color2 = new b9.Color(1.5, 2.5, 3.5);
    assertTrue(color2.getR() === 1 && color2.getG() === 2 && color2.getB() === 3 && color2.getA() === 255);

    var color3 = new b9.Color(1.5, 2.5, 3.5, 4.5);
    assertTrue(color3.getR() === 1 && color3.getG() === 2 && color3.getB() === 3 && color3.getA() === 4);

    var color4 = new b9.Color(-100, -200, -300, -400);
    assertTrue(color4.getR() === 0 && color4.getG() === 0 && color4.getB() === 0 && color4.getA() === 0);

    var color5 = new b9.Color(300, 400, 500, 600);
    assertTrue(color5.getR() === 255 && color5.getG() === 255 && color5.getB() === 255 && color5.getA() === 255);

    var color6 = new b9.Color(color3);
    assertTrue(color6.getR() === 1 && color6.getG() === 2 && color6.getB() === 3 && color6.getA() === 4);

    /* setR */
    color1.setR(100.5);
    assertEquals(100, color1.getR());

    color1.setR(-1);
    assertEquals(0, color1.getR());

    color1.setR(300);
    assertEquals(255, color1.getR());

    /* setG */
    color1.setG(100.5);
    assertEquals(100, color1.getG());

    color1.setG(-1);
    assertEquals(0, color1.getG());

    color1.setG(300);
    assertEquals(255, color1.getG());

    /* setB */
    color1.setB(100.5);
    assertEquals(100, color1.getB());

    color1.setB(-1);
    assertEquals(0, color1.getB());

    color1.setB(300);
    assertEquals(255, color1.getB());

    /* setA */
    color1.setA(100.5);
    assertEquals(100, color1.getA());

    color1.setA(-1);
    assertEquals(0, color1.getA());

    color1.setA(300);
    assertEquals(255, color1.getA());

    /* set */
    color1.set(10.5, 11.5, 12.5);
    assertEqualsColor(new b9.Color(10, 11, 12, 255), color1);

    color2.set(10.5, 11.5, 12.5, 13.5);
    assertEqualsColor(new b9.Color(10, 11, 12, 13), color2);

    color3.set(-100, -200, -300, -400);
    assertEqualsColor(new b9.Color(0, 0, 0, 0), color3);

    color4.set(300, 400, 500, 600);
    assertEqualsColor(new b9.Color(255, 255, 255, 255), color4);

    color5.set(color2);
    assertEqualsColor(color2, color5);

    /* add */
    color1.set(1, 2, 3, 4);
    color2.set(5, 6, 7, 8);
    color1.add(color2);
    assertEqualsColor(new b9.Color(6, 8, 10, 12), color1);

    color1.set(200, 200, 200, 200);
    color2.set(300, 400, 500, 600);
    color1.add(color2);
    assertEqualsColor(b9.Color.FULL, color1);

    /* sub */
    color1.set(5, 6, 7, 8);
    color2.set(4, 3, 2, 1);
    color1.sub(color2);
    assertEqualsColor(new b9.Color(1, 3, 5, 7), color1);

    color1.set(200, 200, 200, 200);
    color2.set(300, 400, 500, 600);
    color1.sub(color2);
    assertEqualsColor(b9.Color.ZERO, color1);

    /* mul */
    color1.set(64, 64, 64, 64);
    color2.set(32, 64, 128, 255);
    color1.mul(color2);
    assertEqualsColor(new b9.Color(8, 16, 32, 64), color1);

    color1.set(32, 64, 128, 255);
    color1.mul(0.5);
    assertEqualsColor(new b9.Color(16, 32, 64, 127), color1);

    color1.set(32, 64, 128, 255);
    color1.mul(-1.0);
    assertEqualsColor(b9.Color.ZERO, color1);

    color1.set(32, 64, 128, 255);
    color1.mul(10.0);
    assertEqualsColor(b9.Color.FULL, color1);

    /* div */
    color1.set(16, 32, 64, 128);
    color1.div(2.0);
    assertEqualsColor(new b9.Color(8, 16, 32, 64), color1);

    color1.set(16, 32, 64, 128);
    color1.div(-1.0);
    assertEqualsColor(b9.Color.ZERO, color1);

    color1.set(16, 32, 64, 128);
    color1.div(0.01);
    assertEqualsColor(b9.Color.FULL, color1);

    /* interp */
    color1.set(8, 16, 32, 64);
    color2.set(16, 32, 64, 128);
    color1.interp(color2, -1.0);
    assertEqualsColor(new b9.Color(8, 16, 32, 64), color1);

    color1.set(8, 16, 32, 64);
    color2.set(16, 32, 64, 128);
    color1.interp(color2, 0.5);
    assertEqualsColor(new b9.Color(12, 24, 48, 96), color1);

    color1.set(8, 16, 32, 64);
    color2.set(16, 32, 64, 128);
    color1.interp(color2, 2.0);
    assertEqualsColor(color2, color1);

    /* isEqual */
    color1.set(1, 2, 3, 4);
    color2.set(color1);
    assertTrue(color1.isEqual(color2));

    color2.set(0, 2, 3, 4);
    assertFalse(color1.isEqual(color2));

    color2.set(1, 0, 3, 4);
    assertFalse(color1.isEqual(color2));

    color2.set(1, 2, 0, 4);
    assertFalse(color1.isEqual(color2));

    color2.set(1, 2, 3, 0);
    assertFalse(color1.isEqual(color2));

    /* toString */
    assertEquals("(1, 2, 3, 4)", (new b9.Color(1, 2, 3, 4)).toString());

    /* ZERO */
    assertEqualsColor(new b9.Color(0, 0, 0, 0), b9.Color.ZERO);

    /* FULL */
    assertEqualsColor(new b9.Color(255, 255, 255, 255), b9.Color.FULL);
}
