/*
 * The MIT License (MIT)
 * Copyright (c) 2016 Cipeng Xu
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * Created by cxu on 11/6/2016.
 * jQuery Select-Box plugin V1.0.0
 */
;
(function ($, window, document, undefined) {
    "use strict";
    var pluginName = "selectBox",
        defaults = {
            width: 400,
            height: 400,
            prerendered: true,
            checkable: true,
            checkMultiple: true,
            //maskOnCheck: true, // TODO:
            //checkOnInit: false, // TODO:
            //updateOnContainerResize: true, // TODO: get responsive width/height when resize event is triggered
            //imageFit: contain|cover|auto, // TODO: make image fit differently
            checkSignWidth: 20,
            checkSignHeight: 20,
            debugEnabled: false,
            boxContainerClass: "sel-box-container",
            boxClass: "sel-box",
            avatarClass: "sel-box-avatar",
            titleClass: "sel-box-title",
            checkSignClass: "sel-box-check-sign",
            checkSignClassTop: "sel-box-check-sign-top",
            checkSignClassBottom: "sel-box-check-sign-bottom",
            checkSignClassLeft: "sel-box-check-sign-left",
            checkSignClassRight: "sel-box-check-sign-right",
            checkSignClassCenter: "sel-box-check-sign-center",
            ghostClass: "sel-box-ghost",
            boxContainerPrerenderedClassOrAttr: "prerendered",
            boxContainerCheckableClassOrAttr: "checkable",
            boxContainerCheckMultipleClassOrAttr: "multiple",
            //boxContainerMaskOnCheckClassOrAttr: "mask-on-check",
            //boxContainerCheckOnInitClassOrAttr: "check-on-init",
            //boxContainerUpdateOnContainerResizeClassOrAttr: "update-on-container-resize",
            boxDisabledClassOrAttr: "disabled",
            boxSelectedClassOrAttr: "selected",
            //boxMaskedClassOrAttr: "masked",
            checkSignPosition: "center center", // can be value as "top left", "bottom right", "center center" or "center"(same as "center center")
            dataIndexName: "index",
            dataImageUrlName: "image-url",
            dataImageTitleName: "image-title",
            dataTitleName: "title",
            dataCheckSignUrlName: "check-sign-url",
            dataValue: "value",
            pluginIdPrefix: "_selBox_gen_id_",
            onBeforeSelect: function (e, ui, data) {
                return this.updateSelectBoxUI(ui);
            },
            onSelect: function (e, ui, data) {
            },
            dataValueConstructor: function (ui, i, item) { // for prerendered: true
                return ui.data(this.settings.dataValue);
            },
            dataValueDestructor: function (i, item) { // for prerendered: false
                return item.value;
            }
            // TODO: add public method to set options respectively
        },
        VERSION = "1.0.0",
        SPACE = " ",
        EMPTY = "",
        PIPE = "|",
        PLUGIN_DATA_PREFIX = "plugin_",
        ID = "id",
        CLASS_PREFIX = ".",
        DATA_PREFIX = "data-",
        ATTR_SRC = "src",
        ATTR_TITLE = "title",
        ATTR_ALT = "alt",
        CSS_WIDTH = "width",
        CSS_HEIGHT = "height",
        CSS_MARGIN_TOP = "margin-top",
        CSS_MARGIN_LEFT = "margin-left",
        TOP = "top",
        BOTTOM = "bottom",
        LEFT = "left",
        RIGHT = "right",
        CENTER = "center",
        CLASS_SOURCE = "CLASS",
        ATTR_SOURCE = "ATTRIBUTE",
        CLASS_OR_ATTR_SUFFIX = "ClassOrAttr",
        BOX_CONTAINER_PREFIX = "boxContainer",
        BOX_PREFIX = "box",
        DATA_KEY_IMAGE_URL = "imageUrl",
        DATA_KEY_CHECK_SIGN_URL = "checkSignUrl",
        DATA_KEY_IMAGE_TITLE = "imageTitle",
        DATA_KEY_TITLE = "title",
        DATA_KEY_VALUE = "value",
        BOX_CONTAINER_OPTION_KEYS = "prerendered|checkable|checkMultiple",
        BOX_OPTION_KEYS = "disabled|selected";

    function Plugin(element, options) {
        this._name = pluginName;
        this._version = VERSION;
        this._defaults = defaults;
        this._browser = this._detectBrowser();
        this.element = element;
        this.$element = $(element);
        this.options = options;
        this.settings = $.extend({}, defaults, options);
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            this._bind(this.settings);
        },
        uniquePluginId: function () {
            if (typeof window._selectBoxPluginIdCounter == "undefined")
                window._selectBoxPluginIdCounter = 0;
            return this.settings.pluginIdPrefix + (++window._selectBoxPluginIdCounter);
        },
        updateSelectBoxUI: function (ui) {
            if (this.settings.checkable && !ui.hasClass(this.settings.boxDisabledClassOrAttr)) {
                if (this.settings.checkMultiple) {
                    this.toggleSelect(ui);
                } else {
                    this.toggleSelectAll(false);
                    this.toggleSelect(ui);
                }
            } else {
                return false;
            }
        },
        toggleSelect: function (ui) {
            if (!ui.hasClass(this.settings.boxDisabledClassOrAttr)) {
                ui.toggleClass(this.settings.boxSelectedClassOrAttr, !ui.hasClass(this.settings.boxSelectedClassOrAttr));
            }
        },
        toggleSelectAll: function (selectOrUnSelect) {
            var self = this;
            self.$element.children(CLASS_PREFIX + self.settings.boxClass + ":not(" + CLASS_PREFIX + self.settings.boxDisabledClassOrAttr + ")").each(function (index, elem) {
                $(this).toggleClass(self.settings.boxSelectedClassOrAttr, selectOrUnSelect);
            });
        },
        getDataAt: function (index) {
            return this.settings.data[index];
        },
        getPluginInstance: function () {
            return $.data(this.element, PLUGIN_DATA_PREFIX + pluginName);
        },
        getOptions: function () {
            if (!this.getPluginInstance())
                return undefined;
            return this.options;
        },
        getSettings: function () {
            if (!this.getPluginInstance())
                return this._defaults;
            return this.settings;
        },
        getUIState: function () {
            if (!this.getPluginInstance())
                return [];
            return $.extend({}, {data: this.options.data}, {data: this._constructDataHandler()}).data;
        },
        getState: function () {
            if (!this.getPluginInstance())
                return [];
            var optionsData = this.options.data;
            var constructedData = this._constructDataHandler();
            if (optionsData === undefined)
                return constructedData;
            if (optionsData && optionsData.length !== constructedData.length)
                $.error("options.data and constructed settings.data of " + pluginName + " plugin do not match the same length.");
            var dataArr = [];
            for (var i = 0; i < optionsData.length; i++) {
                dataArr.push($.extend({}, optionsData[i], constructedData[i]));
            }
            return dataArr;
        },
        _bind: function (settings) {
            if (this.$element.attr(ID) === undefined)
                this.$element.attr(ID, this.uniquePluginId());
            this._bindData(settings);
            this._bindEvents(settings);
        },
        _bindData: function (settings) {
            if (settings.prerendered === true) {
                this.settings = settings = $.extend({}, settings, this._constructSettings());
                this._cloneBoxStyles();
                this._autoFixMargin();
            }
            else if (settings.data) {
                if (!$.isArray(settings.data))
                    $.error("settings.data must be an array.");
                this._render(settings);
                this._autoFixMargin();
            }
            else {
                $.error("settings.data is required in prerender mode of " + pluginName + " plugin.");
            }
        },
        _bindEvents: function (settings) {
            var self = this;
            self.$element.on("click." + pluginName, CLASS_PREFIX + settings.boxClass, function (e) {
                var $this = $(this);
                var before = settings.onBeforeSelect.call(self, e, $(this), self.getDataAt($this.data(self.settings.dataIndexName)));
                if (before !== false) {
                    before = settings.onSelect.call(self, e, $this, self.getDataAt($this.data(self.settings.dataIndexName)));
                }
            });
        },
        _constructSettings: function () {
            var $firstBox = this.$element.children(CLASS_PREFIX + this.settings.boxClass).eq(0);
            var $firstCheckSign = $firstBox.children(CLASS_PREFIX + this.settings.checkSignClass).eq(0);
            var sizeSettings = this._constructSizeHandler($firstBox);
            var positionSettings = this._constructPositionHandler($firstCheckSign);
            var resultClassSettings = {};
            var resultAttrSettings = {};
            var optionKeyArr = BOX_CONTAINER_OPTION_KEYS.split(PIPE);
            for (var i = 0; i < optionKeyArr.length; i++) {
                var optionKey = optionKeyArr[i];
                resultClassSettings[optionKey] = this._constructBoxValueHandler(this.$element, BOX_CONTAINER_PREFIX, optionKey, CLASS_SOURCE);
                resultAttrSettings[optionKey] = this._constructBoxValueHandler(this.$element, BOX_CONTAINER_PREFIX, optionKey, ATTR_SOURCE);
            }
            delete this.options.data;
            return $.extend(sizeSettings, positionSettings, resultClassSettings, resultAttrSettings, {data: this._constructDataHandler()}, this.options);
        },
        _constructSizeHandler: function ($firstBox) {
            var validWidth = $firstBox.width() != 0;
            var validHeight = $firstBox.height() != 0;
            var $checkSign = $firstBox.children(CLASS_PREFIX + this.settings.checkSignClass);
            var validCheckSignWidth = $checkSign.width() != 0;
            var validCheckSignHeight = $checkSign.height() != 0;
            if (this.settings.debugEnabled) {
                if (!validWidth) {
                    console.log("constructed settings.width of " + pluginName + " plugin is not valid and will use default instead.");
                }
                if (!validHeight) {
                    console.log("constructed settings.height of " + pluginName + " plugin is not valid and will use default instead.");
                }
                if (!validCheckSignWidth) {
                    console.log("constructed settings.checkSignWidth of " + pluginName + " plugin is not valid and will use default instead.");
                }
                if (!validCheckSignHeight) {
                    console.log("constructed settings.checkSignHeight of " + pluginName + " plugin is not valid and will use default instead.");
                }
            }
            return {
                width: validWidth ? $firstBox.outerWidth() : this._defaults.width,
                height: validHeight ? $firstBox.outerHeight() : this._defaults.height,
                checkSignWidth: validCheckSignWidth ? $checkSign.outerWidth() : this._defaults.checkSignWidth,
                checkSignHeight: validCheckSignHeight ? $checkSign.outerHeight() : this._defaults.checkSignHeight
            };
        },
        _constructPositionHandler: function ($firstCheckSign) {
            var positionArr = [];
            $firstCheckSign.hasClass(this.settings.checkSignClassTop) && positionArr.push(TOP);
            $firstCheckSign.hasClass(this.settings.checkSignClassBottom) && positionArr.push(BOTTOM);
            $firstCheckSign.hasClass(this.settings.checkSignClassLeft) && positionArr.push(LEFT);
            $firstCheckSign.hasClass(this.settings.checkSignClassRight) && positionArr.push(RIGHT);
            $firstCheckSign.hasClass(this.settings.checkSignClassCenter) && positionArr.push(CENTER);
            var valid = (positionArr.length == 1 && $.inArray(CENTER, positionArr) != -1) ||
                (positionArr.length == 2 && ($.inArray(TOP, positionArr) != -1 || $.inArray(BOTTOM, positionArr) != -1) && ($.inArray(LEFT, positionArr) != -1 || $.inArray(RIGHT, positionArr) != -1));
            if (!valid) {
                if (this.settings.debugEnabled) {
                    console.log("constructed settings.checkSignPosition of " + pluginName + " plugin is not valid and will use default instead.");
                }
                return {checkSignPosition: this._defaults.checkSignPosition};
            }
            return {checkSignPosition: positionArr.join(SPACE)};
        },
        _constructBoxValueHandler: function ($element, keyStuff, optionKey, source) {
            var value;
            var classSource = source.toUpperCase() == CLASS_SOURCE;
            var attrSource = source.toUpperCase() == ATTR_SOURCE;
            if (classSource) {
                keyStuff = keyStuff + this._capitalizeFirst(optionKey) + CLASS_OR_ATTR_SUFFIX;
                value = $element.hasClass(this.settings[keyStuff]);
            }
            if (attrSource) {
                keyStuff = keyStuff + this._capitalizeFirst(optionKey) + CLASS_OR_ATTR_SUFFIX;
                value = $element.data(this.settings[keyStuff]);
            }
            return value;
        },
        _capitalizeFirst: function (str) {
            str = str + EMPTY;
            return str.substring(0, 1).toUpperCase() + str.substring(1);
        },
        _constructDataHandler: function () {
            var dataArr = [];
            var self = this;
            self.$element.children(CLASS_PREFIX + self.settings.boxClass).each(function (index, elem) {
                var $this = $(this);
                var dataItem = {};
                var optionKeyArr = BOX_OPTION_KEYS.split(PIPE);
                var $avatar = $this.children(CLASS_PREFIX + self.settings.avatarClass).eq(0);
                var $title = $this.children(CLASS_PREFIX + self.settings.titleClass).eq(0);
                var $checkSign = $this.children(CLASS_PREFIX + self.settings.checkSignClass).eq(0);
                for (var i = 0; i < optionKeyArr.length; i++) {
                    var optionKey = optionKeyArr[i];
                    dataItem[optionKey] = self._constructBoxValueHandler($this, BOX_PREFIX, optionKey, CLASS_SOURCE);
                }
                dataItem[DATA_KEY_IMAGE_URL] = $avatar.data(self.settings.dataImageUrlName) || $avatar.attr(ATTR_SRC);
                dataItem[DATA_KEY_IMAGE_TITLE] = $avatar.data(self.settings.dataImageTitleName) || $avatar.attr(ATTR_TITLE) || $avatar.attr(ATTR_ALT);
                dataItem[DATA_KEY_TITLE] = $title.data(self.settings.dataTitleName) || $title.text();
                dataItem[DATA_KEY_CHECK_SIGN_URL] = $checkSign.data(self.settings.dataCheckSignUrlName) || $checkSign.attr(ATTR_SRC);
                dataItem[DATA_KEY_VALUE] = self._constructDataValueHandler($this, index, dataItem);
                dataArr.push(dataItem);
            });
            return dataArr;
        },
        _constructDataValueHandler: function ($thisBox, index, dataItem) {
            return (this.settings.prerendered ?
                    this.settings.dataValueConstructor.call(this, $thisBox, index, dataItem) :
                    $thisBox.data(this.settings.dataValue)) || EMPTY;
        },
        _cloneBoxStyles: function () {
            var self = this;
            var templateBoxStyle = self._getTemplateBoxStyle();
            self.$element.children(CLASS_PREFIX + self.settings.boxClass).each(function (index, elem) {
                var $this = $(this);
                self._cloneBoxStyle($this, index, templateBoxStyle);
            });
        },
        _getTemplateBoxStyle: function () {
            return {
                width: this.settings.width,
                height: this.settings.height,
                checkSignWidth: this.settings.checkSignWidth,
                checkSignHeight: this.settings.checkSignHeight,
                checkSignClasses: this._destructPositionHandler(this.settings)
            };
        },
        _destructPositionHandler: function (settings) {
            var checkSignClass = settings.checkSignClass;
            var checkSignPositionArr = settings.checkSignPosition.split(SPACE);
            if (checkSignPositionArr.length > 2)
                $.error("settings.checkSignPosition should not be more than 2 directions of " + pluginName + " plugin.");
            $.each(checkSignPositionArr, function (i, value) {
                value = $.trim(value).toLowerCase();
                checkSignClass += value == TOP ? SPACE + settings.checkSignClassTop : EMPTY;
                checkSignClass += value == BOTTOM ? SPACE + settings.checkSignClassBottom : EMPTY;
                checkSignClass += value == LEFT ? SPACE + settings.checkSignClassLeft : EMPTY;
                checkSignClass += value == RIGHT ? SPACE + settings.checkSignClassRight : EMPTY;
                if (checkSignClass.indexOf(settings.checkSignClassCenter) == -1) {
                    checkSignClass += value == CENTER ? SPACE + settings.checkSignClassCenter : EMPTY;
                }
            });
            return checkSignClass;
        },
        _destructDataValueHandler: function (index, dataItem) {
            return (!this.settings.prerendered ?
                    this.settings.dataValueDestructor.call(this, index, dataItem) :
                    dataItem.value) || EMPTY;
        },
        // To auto-create ghost element required by text-align and vertical-align center-element trick on
        // prerendered true mode in IE 7-
        _autoCreateGhost: function ($thisBox) {
            if (this._browser && this._browser.msie && parseInt(this._browser.version) <= 7) {
                if (this.settings.prerendered) {
                    var $ghost = $thisBox.children(CLASS_PREFIX + this.settings.ghostClass);
                    var $avatar = $thisBox.children(CLASS_PREFIX + this.settings.avatarClass);
                    if (!$ghost.length)
                        $avatar.after('<i class="' + this.settings.ghostClass + '"></i>');
                }
            }
        },
        // Warning: this method may override 'data-index' attribute and 'index' data of box element, and also it will
        // clone some css from first box and its children such as 'width' , 'height' and 'sel-box-check-sign-*' class,
        // but not 'disabled' and 'selected' class
        _cloneBoxStyle: function ($thisBox, index, templateBoxStyle) {
            var fullCheckSignClasses = this.settings.checkSignClassTop + SPACE + this.settings.checkSignClassBottom + SPACE +
                this.settings.checkSignClassLeft + SPACE + this.settings.checkSignClassRight + SPACE + this.settings.checkSignClassCenter;
            $thisBox.attr(DATA_PREFIX + this.settings.dataIndexName, index);
            $thisBox.data(this.settings.dataIndexName, index);
            $thisBox.css(CSS_WIDTH, templateBoxStyle.width);
            $thisBox.css(CSS_HEIGHT, templateBoxStyle.height);
            var $checkSign = $thisBox.children(CLASS_PREFIX + this.settings.checkSignClass);
            $checkSign.removeClass(fullCheckSignClasses).addClass(templateBoxStyle.checkSignClasses);
            $checkSign.css(CSS_WIDTH, templateBoxStyle.checkSignWidth);
            $checkSign.css(CSS_HEIGHT, templateBoxStyle.checkSignHeight);
            this._autoCreateGhost($thisBox);
        },
        _render: function (settings) {
            var boxContainerClass = settings.boxContainerClass;
            var self = this;
            boxContainerClass += settings.checkable ? SPACE + settings.boxContainerCheckableClassOrAttr : EMPTY;
            boxContainerClass += settings.checkMultiple ? SPACE + settings.boxContainerCheckableClassOrAttr : EMPTY;
            self.$element.addClass(boxContainerClass);

            var checkSignClass = self._destructPositionHandler(settings);
            var boxStyle = 'width: ' + settings.width + 'px; height: ' + settings.height + 'px;';
            var checkSignStyle = 'width: ' + settings.checkSignWidth + 'px; height: ' + settings.checkSignHeight + 'px;';
            var htmlArr = [];
            $.each(settings.data, function (i, box) {
                var fragment = EMPTY;
                var boxClass = settings.boxClass;
                var boxValue = self._destructDataValueHandler(i, box);
                boxClass += box.disabled ? SPACE + settings.boxDisabledClassOrAttr : EMPTY;
                boxClass += box.selected ? SPACE + settings.boxSelectedClassOrAttr : EMPTY;
                fragment += '<div class="' + boxClass + '" style="' + boxStyle + '" data-index="' + i + '" data-value="' + boxValue + '">';
                fragment += '<img src="' + box[DATA_KEY_IMAGE_URL] + '" alt="' + (box[DATA_KEY_IMAGE_TITLE] || EMPTY) + '" class="' + settings.avatarClass + '">';
                fragment += '<i class="' + settings.ghostClass + '"></i>';
                fragment += '<h3 class="' + settings.titleClass + '">' + (box[DATA_KEY_TITLE] || EMPTY) + '</h3>';
                fragment += '<img src="' + box[DATA_KEY_CHECK_SIGN_URL] + '" style="' + checkSignStyle + '" class="' + checkSignClass + '">';
                fragment += '</div>';
                htmlArr.push(fragment);
            });
            $(htmlArr.join(EMPTY)).prependTo(self.$element);
        },
        // To fix margin of check sign element in IE 7-
        _autoFixMargin: function () {
            if (this._browser && this._browser.msie && parseInt(this._browser.version) <= 7) {
                if (this.settings.checkSignPosition.indexOf(CENTER) != -1) {
                    var marginTop = -this.settings.checkSignHeight / 2;
                    var marginLeft = -this.settings.checkSignWidth / 2;
                    this.$element.children(CLASS_PREFIX + this.settings.boxClass).children(CLASS_PREFIX + this.settings.checkSignClass).each(function (index, elem) {
                        $(this).css(CSS_MARGIN_TOP, marginTop).css(CSS_MARGIN_LEFT, marginLeft);
                    });
                }
            }
        },
        _uaMatch: function (ua) {
            ua = ua.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                /(msie) ([\w.]+)/.exec(ua) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                [];
            return {
                browser: match[1] || "",
                version: match[2] || "0"
            };
        },
        _detectBrowser: function () {
            if (!jQuery.browser) {
                var matched = this._uaMatch(navigator.userAgent);
                var browser = {};
                if (matched.browser) {
                    browser[matched.browser] = true;
                    browser.version = matched.version;
                }
                // Chrome is Webkit, but Webkit is also Safari.
                if (browser.chrome) {
                    browser.webkit = true;
                } else if (browser.webkit) {
                    browser.safari = true;
                }
                return browser;
            }
            return jQuery.browser;
        }
    });

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, PLUGIN_DATA_PREFIX + pluginName)) {
                $.data(this, PLUGIN_DATA_PREFIX + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
