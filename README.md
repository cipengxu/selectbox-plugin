# README
### 实现可选中式卡片列表的jQuery插件，兼容IE7+, Edge, Chrome, Firefox, Safari, Opera等浏览器。

## Common Options
|         Option         |                          Description                              |
|:-----------------------|:------------------------------------------------------------------|
| `width: 400`           | Set the width of select-box, default 400(px).                     |
| `height: 400`          | Set the width of select-box, default 400(px).                     |
| `prerendered: true`    | Set whether select-box is prerendered, true indicates DOM is <br/>previously rendered by backend, false indicates DOM is created by <br/>client(JS) according to `settings.data`.|
| `checkable: true`      | Set whether select-box is checkable.                              |
| `checkMultiple: true`  | If checkable is true, checkMultiple enables multiply check of <br/>select-box.|
| `checkSignWidth: 20`   | Set the width of select-box check-sign icon, default 20(px).      |
| `checkSignHeight: 20`  | Set the height of select-box check-sign icon, default 20(px).     |
| `debugEnabled: false`  | Enables debug log.                                                |
| `checkSignPosition`: <br/>`"center center"`| Set position of select-box check-sign icon, can be value as <br/>`"top left"`, `"bottom right"`, `"center center"` or `"center"`(same as <br/>`"center center"`) and so on.|
| `data: Array`          | If prerendered false, this option is required. It is an array of <br/>object<br/>`{`<br/>`imageUrl: "avatar.png",`<br/>`checkSignUrl: "check-sign.png",`<br/>`imageTitle: "Select Box Avatar",`<br/>`title: "Select Box",`<br/>`disabled: false,`<br/>`selected: true,`<br/>`value: "Hello, Select Box"`<br/>`}`<br/>, extra properties will be retained.|
| `onBeforeSelect`: <br/>`function(e, ui, data)`| Callback when invoking click event of each select-box element, it <br/>will be called just before `onSelect()` function, `return false` to <br/>prevent invoking `onSelect()` callback.|
| `onSelect`: <br/>`function(e, ui, data)`| Callback when invoking click event of each select-box element, it <br/>will be called just after `onBeforeSelect()` function.|
| `dataValueConstructor`: <br/>`function(ui, i, item)`| If prerendered true, this function specified the way to construct <br/>the value property of each object in `settings.data`, default using <br/>`ui.data("value")` directly.|
| `dataValueDestructor`: <br/>`function(i, item)`| If prerendered false, this function specified the way to destruct <br/>the value property from each object of `settings.data`, default <br/>using `item.value`. The result value will be used as data-value <br/>attribute of each select-box element.|

#### For all other options' documentation, please refer to source code.

## Instance Methods
#### After plugin instantiated to DOM element, you can get the plugin instance by using $(element).data("plugin_selectBox").
#### The instance contains the following public methods:

|         Method         |                          Description                              |
|:-----------------------|:------------------------------------------------------------------|
| `init: function()`     | Initialize the plugin.                                            |
| `uniquePluginId`: <br/>`function()`| Generate a unique plugin id for select-box container. |
| `updateSelectBoxUI`: <br/>`function(ui)`| Update select-box UI according to settings.      |
| `toggleSelect`: <br/>`function(ui)`| Toggle each select-box UI. If previously selected, toggled to <br/>unselected and vise versa.|
| `toggleSelectAll`: <br/>`function(selectOrUnSelect)`| Toggle all select-box UI to select or unselect status according to<br/>`selectOrUnSelect`.|
| `getDataAt`: <br/>`function(index)`| Get object data from `settings.data` by `index`.      |
| `getPluginInstance`: <br/>`function()`| Get plugin instance after instantiated.            |
| `getOptions`: <br/>`function()`| Get current user options provided when plugin instantiated.|
| `getSettings`: <br/>`function()`| Get current settings after plugin instantiated. The settings will <br/>be constructed by user options, DOM structure and default options.|
| `getUIState`: <br/>`function()`| Get current UI state array. This will change when user interacting <br/>with select-box elements. The array will only contain UI-only <br/>data, which means extra properties in each object of `settings.data` <br/>will be omitted.|
| `getState`: <br/>`function()`| Get current state array. This will change when user interacting <br/>with select-box elements. The array will contain current state <br/>data, which means extra properties in each object of `settings.data` <br/>will be retained.|


