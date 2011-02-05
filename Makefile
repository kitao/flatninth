#
# Copyright (c) 2009-2011 Takashi Kitao
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

BASE_DIR    = .

JSLINT_DIR  = $(BASE_DIR)/tool/jslint4java
CLOSURE_DIR = $(BASE_DIR)/tool/closure
JSDOC_DIR   = $(BASE_DIR)/tool/jsdoc-toolkit

SRC_DIR     = $(BASE_DIR)/src
TEST_DIR    = $(BASE_DIR)/test
SAMPLE_DIR  = $(BASE_DIR)/sample
REF_DIR     = $(BASE_DIR)/doc/reference

SRCS        = b9.js \
              Math.js \
              Vector3D.js \
              Matrix3D.js \
              Quaternion.js \
              Color.js \
              LinkedListItem.js \
              LinkedList.js \
              LinkedTree.js \
              Actor.js \
              ActorList.js \
              Texture.js \
              Shader.js \
              Drawable.js \
              PrimitiveBuffer.js \
              Primitive.js \
              SpriteBuffer.js \
              Sprite.js \
              Screen.js \
              Resource.js \
              Input.js \
              Debug.js \
              Preset.js \
              System.js

SRCS       := $(addprefix $(SRC_DIR)/, $(SRCS))
TEST_SRCS   = $(shell find $(TEST_DIR) -name "*.js")
SAMPLE_SRCS = $(shell find $(SAMPLE_DIR) -name "*.js")
TARGET      = $(BASE_DIR)/flatninth.js

ifdef RELEASE
	CLOSURE_OPTS = --compilation_level SIMPLE_OPTIMIZATIONS
else
	CLOSURE_OPTS = --compilation_level WHITESPACE_ONLY --formatting pretty_print
endif

.PHONY: all clean test sample reference

all: $(TARGET)

clean:
	rm -f $(TARGET)
	rm -rf $(REF_DIR)

check:
	java -jar $(JSLINT_DIR)/jslint4java.jar $(SRCS)
	java -jar $(JSLINT_DIR)/jslint4java.jar $(TEST_SRCS)
	java -jar $(JSLINT_DIR)/jslint4java.jar $(SAMPLE_SRCS)

reference:
	java -jar $(JSDOC_DIR)/jsrun.jar $(JSDOC_DIR)/app/run.js -a -r -t=$(JSDOC_DIR)/templates/jsdoc -d=$(REF_DIR) $(SRC_DIR)

$(TARGET): $(SRCS)
	java -jar $(CLOSURE_DIR)/compiler.jar $(CLOSURE_OPTS) $(addprefix --js , $(SRCS)) --js_output_file $(TARGET)
