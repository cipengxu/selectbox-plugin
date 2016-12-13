# README #
实现可选中式卡片列表的jQuery插件，兼容IE7+, Edge, Chrome, Firefox, Safari, Opera等浏览器。

## Common Options ##
|----------------------|-------------------------------------------------------------------|
|        Option        |                          Description                              |
|----------------------|-------------------------------------------------------------------|
| width: 400           | Set the width of select-box, default 400(px).                     |
|----------------------|-------------------------------------------------------------------|
| height: 400          | Set the width of select-box, default 400(px).                     |
|----------------------|-------------------------------------------------------------------|
|                      | Set whether select-box is prerendered, true indicates DOM are     |
| prerendered: true    | previously rendered by backend, false indicates DOM are created by|
|                      | client(JS) according to settings.data.                            |
|----------------------|-------------------------------------------------------------------|
| checkable: true      | Set whether select-box is checkable.                              |
|----------------------|-------------------------------------------------------------------|
| checkMultiple: true  | If checkable is true, checkMultiple enables multiply check of     |
|                      | select-box.                                                       |
|----------------------|-------------------------------------------------------------------|
| checkSignWidth: 20   | Set the width of select-box check-sign icon, default 20(px).      |
|----------------------|-------------------------------------------------------------------|
| checkSignHeight: 20  | Set the height of select-box check-sign icon, default 20(px).     |
|----------------------|-------------------------------------------------------------------|
| debugEnabled: false  | DebugEnabled enables debug log.                                   |
|----------------------|-------------------------------------------------------------------|
| checkSignPosition:   | Set position of select-box check-sign icon, can be value as       |
| "center center"      | "top left", "bottom right", "center center" or "center"(same as   |
|                      | "center center") and so on.                                       |
|----------------------|-------------------------------------------------------------------|
|                      | If prerendered false, this option is required. It is an array of  |
|                      | object                                                            |
|                      | {                                                                 |
|                      |     imageUrl: "avatar.png",                                       |
|                      |     checkSignUrl: "check-sign.png",                               |
| data: Array          |     imageTitle: "Select Box Avatar",                              |
|                      |     title: "Select Box",                                          |
|                      |     disabled: false,                                              |
|                      |     selected: true,                                               |
|                      |     value: "Hello, Select Box"                                    |
|                      | }                                                                 |
|                      | , extra properties will be retained.                              |
|----------------------|-------------------------------------------------------------------|
| onBeforeSelect:      | Callback when invoking click event of each select-box element, it |
| function(e, ui, data)| will be called just before onSelect() function, return false to   |
|                      | prevent invoking onSelect() callback.                             |
|----------------------|-------------------------------------------------------------------|
| onSelect:            | Callback when invoking click event of each select-box element, it |
| function(e, ui, data)| will be called just after onBeforeSelect() function.              |
|----------------------|-------------------------------------------------------------------|
| dataValueConstructor:| If prerendered true, this function specified the way to construct |
| function(ui, i, item)| the value property of each object in settings.data, default using |
|                      | ui.data("value") directly.                                        |
|----------------------|-------------------------------------------------------------------|
|                      | If prerendered false, this function specified the way to destruct |
| dataValueDestructor: | the value property from each object of settings.data, default     |
| function(i, item)    | using item.value. The result value will be used as data-value     |
|                      | attribute of each select-box element.                             |
|----------------------|-------------------------------------------------------------------|
For all other options' documentation, please refer to source code.

## Instance Methods ##
After plugin instantiated to DOM element, you can get the plugin instance by using $(element).data("plugin_selectBox").
The instance contains the following public methods:
|----------------------|-------------------------------------------------------------------|
|        Method        |                          Description                              |
|----------------------|-------------------------------------------------------------------|
| init: function()     | Initialize the plugin.                                            |
|----------------------|-------------------------------------------------------------------|
| uniquePluginId:      | Generate a unique plugin id for select-box container.             |
| function()           |                                                                   |
|----------------------|-------------------------------------------------------------------|
| updateSelectBoxUI:   | Update select-box UI according to settings.                       |
| function(ui)         |                                                                   |
|----------------------|-------------------------------------------------------------------|
| toggleSelect:        | Toggle each select-box UI. If previously selected, toggled to     |
| function(ui)         | unselected and vise versa.                                        |
|----------------------|-------------------------------------------------------------------|
| toggleSelectAll:     | Toggle all select-box UI to select or unselect status according to|
| function(            | selectOrUnSelect.                                                 |
| selectOrUnSelect)    |                                                                   |
|----------------------|-------------------------------------------------------------------|
| getDataAt:           | Get object data from settings.data by index.                      |
| function(index)      |                                                                   |
|----------------------|-------------------------------------------------------------------|
| getPluginInstance:   | Get plugin instance after instantiated.                           |
| function()           |                                                                   |
|----------------------|-------------------------------------------------------------------|
| getOptions:          | Get current user options provided when plugin instantiated.       |
| function()           |                                                                   |
|----------------------|-------------------------------------------------------------------|
| getSettings:         | Get current settings after plugin instantiated. The settings will |
| function()           | be constructed by user options, DOM structure and default options.|
|----------------------|-------------------------------------------------------------------|
|                      | Get current UI state array. This will change when user interacting|
| getUIState:          | with select-box elements. The array will only contains UI-only    |
| function()           | data, which means extra properties in each object of settings.data|
|                      | will be omitted.                                                  |
|----------------------|-------------------------------------------------------------------|
|                      | Get current state array. This will change when user interacting   |
| getState:            | with select-box elements. The array will contains current state   |
| function()           | data, which means extra properties in each object of settings.data|
|                      | will be retained.                                                 |
|----------------------|-------------------------------------------------------------------|


