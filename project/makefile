#
# Copyright (c) 2009-2010 Takashi Kitao
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

BASE_DIR    = ..

JSLINT_DIR  = $(BASE_DIR)/tool/jslint4java
CLOSURE_DIR = $(BASE_DIR)/tool/closure
JSDOC_DIR   = $(BASE_DIR)/tool/jsdoc-toolkit

SRC_DIR     = $(BASE_DIR)/source
TEST_DIR    = $(BASE_DIR)/test
REF_DIR     = $(BASE_DIR)/doc/reference

SRCS1       = b9.js Math.js Vector2D.js Matrix2D.js Color.js Margin.js List.js ListItem.js Tree.js
SRCS2       = Task.js TaskRoot.js View.js ViewRoot.js Element.js ElementRoot.js Sprite.js Primitive.js
SRCS3       = System.js

SRCS       := $(addprefix $(SRC_DIR)/, $(SRCS1) $(SRCS2) $(SRCS3))
TEST_SRCS   = $(shell find $(TEST_DIR) -name "*.js")
TARGET      = $(BASE_DIR)/flatninth.js

.PHONY: all clean test reference

all: $(TARGET)

clean:
	rm -f $(TARGET)
	rm -rf $(REF_DIR)

test:
	java -jar $(JSLINT_DIR)/jslint4java.jar $(TEST_SRCS)

reference:
	java -jar $(JSDOC_DIR)/jsrun.jar $(JSDOC_DIR)/app/run.js -a -r -t=$(JSDOC_DIR)/templates/jsdoc -d=$(REF_DIR) $(SRC_DIR)

$(TARGET): $(SRCS)
	java -jar $(JSLINT_DIR)/jslint4java.jar $(SRCS)
	java -jar $(CLOSURE_DIR)/compiler.jar $(addprefix --js , $(SRCS)) --js_output_file $(TARGET)
