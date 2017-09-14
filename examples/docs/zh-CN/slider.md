<script>
  export default {
    data() {
      return {
        value1: 0,
        value2: 134,
        value3: 36,
        value4: 48,
        value5: 42,
        value6: 0,
        value7: 300,
        value8: 0,
        value9: [4, 8],
        value10: 0,
        max_value: 400,
        warn_value: 10,
        max_warn_value: 100,
        fluidFormVisible: false,
        step: 10,
        contMax: 300,
        conWarnValue: 80,
        step_of_conWarnValue: 10
      };
    },
    watch: {
        max_value: function(val, oldVal) {
            var _this = this;
                window.aaab = _this;
            if (val == 0) {
                _this.$message.error('QPS不能为0!');
                _this.max_value = 100;
            } else {
                _this.warn_value = _this.max_value * 0.8;
                _this.step = _this.max_value / 10;
                _this.max_warn_value = _this.max_value;
            }
        },
        warn_value: function(val) {
            var _this = this;
            if (val == 0) {
                _this.$message.error('QPS不能为0!');
                _this.warn_value = _this.max_value * 0.8;
                _this.$refs.button.setPosition(80);//targetValue * 100 / max
            }
        }
        
    },
    
    methods: {
      formatTooltip(val) {
        return val / 100;
      },
      tabClick() {
        console.log('click');
       },
       changeVal() {
       this.value2 = this.value2 * 0.8;
       }
    }
  }
</script>

<style>
  .demo-box.demo-slider .source {
    padding: 0;
  }

  .demo-box.demo-slider .block {
    padding: 30px 24px;
    overflow: hidden;
    border-bottom: solid 1px #EFF2F6;
    &:last-child {
      border-bottom: none;
    }
  }

  .demo-box.demo-slider .demonstration {
    font-size: 14px;
    color: #8492a6;
    line-height: 44px;
  }

  .demo-box.demo-slider .demonstration + .el-slider {
    float: right;
    width: 70%;
    margin-right: 20px;
  }
</style>

## Slider 滑块

通过拖动滑块在一个固定区间内进行选择

### 基础用法

在拖动滑块时，显示当前值

:::demo 通过设置绑定值自定义滑块的初始值
```html
<template>
    <div class="block"><el-button @click="changeVal">click</el-button></div>
  <div class="block">
    <span class="demonstration">默认</span>
    <el-slider v-model="value1" :step="20"></el-slider>
  </div>
  <div class="block">
    <span class="demonstration">自定义初始值</span>
    <el-slider v-model="value2" :min="100" :max="600"></el-slider>
  </div>
  <div class="block">
    <span class="demonstration">隐藏 Tooltip</span>
    <el-slider v-model="value3" :show-tooltip="false"></el-slider>
  </div>
  <div class="block">
    <span class="demonstration">格式化 Tooltip</span>
    <el-slider v-model="value4" :format-tooltip="formatTooltip"></el-slider>
  </div>
  <div class="block">
    <span class="demonstration">禁用</span>
    <el-slider v-model="value5" disabled></el-slider>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: 0,
        value2: 50,
        value3: 36,
        value4: 48,
        value5: 42
      }
    },
    methods: {
      formatTooltip(val) {
        return val / 100;
      }
    }
  }
</script>
```
:::

### 离散值

选项可以是离散的

:::demo 改变`step`的值可以改变步长，通过设置`show-step`属性可以显示间断点
```html
<template>
  <!--<div class="block">
    <span class="demonstration">不显示间断点</span>
    <el-slider
      v-model="value6"
      :step="100">
    </el-slider>
  </div>-->
  <el-slider v-model="value1"></el-slider>
    <div class="block">
    <el-form>
        <el-form-item>
            <el-slider v-model="max_value" :step="100" :max="1000" :min="100" show-stops>
            </el-slider>
        </el-form-item>

        <el-form-item>
            <p>流量阈值：</p>
            <el-slider v-model="warn_value" ref="button" :step="step" :max="max_warn_value"  disable-min show-stops>
            </el-slider>
        </el-form-item>
        <el-form-item class="tcenter">
            <el-button @click='fluidControl()'>确定</el-button>
        </el-form-item>
    </el-form>
        
  <div class="block">
    <span class="demonstration">显示间断点</span>
    <el-tabs  @tab-click="tabClick">
        <el-tab-pane label="规则" name="rule" class="rule">
            <el-slider
                  v-model="value7"
                  :step="100"
                  :min="100"
                  :max="900"
                  show-stops>
                </el-slider>
        </el-tab-pane>
        <el-tab-pane label="shili" name="shili" class="rule">
                    <el-slider
                          v-model="value7"
                          :step="100"
                          :min="100"
                          :max="900"
                          show-stops>
                        </el-slider>
                </el-tab-pane>
    </el-tabs>
    
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        value6: 0,
        value7: 20
      }
    }
  }
</script>
```
:::

### 带有输入框

通过输入框设置精确数值

:::demo 设置`show-input`属性会在右侧显示一个输入框
```html
<template>
  <div class="block">
    <el-slider
      v-model="value8"
      show-input>
    </el-slider>
  </div>
</template> 

<script>
  export default {
    data() {
      return {
        value8: 0
      }
    }
  }
</script>
```
:::

### 范围选择

支持选择某一数值范围

:::demo 设置`range`即可开启范围选择，此时绑定值是一个数组，其元素分别为最小边界值和最大边界值
```html
<template>
  <!--<div class="block">
    <el-slider
      v-model="value9"
      range
      show-stops
      :max="10">
    </el-slider>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value9: [4, 8]
      }
    }
  }
</script>
```
:::

### 竖向模式

:::demo 设置`vertical`可使 Slider 变成竖向模式，此时必须设置高度`height`属性
```html
<!-- <template>
  <div class="block">
    <el-slider
      v-model="value10"
      vertical
      height="200px">
    </el-slider>
  </div>
</template> -->

<script>
  export default {
    data() {
      return {
        value10: 0
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| min | 最小值 | number | — | 0 |
| max | 最大值 | number | — | 100 |
| disabled | 是否禁用 | boolean | — | false |
| step | 步长 | number | — | 1 |
| show-input | 是否显示输入框，仅在非范围选择时有效 | boolean | — | false |
| show-input-controls | 在显示输入框的情况下，是否显示输入框的控制按钮 | boolean | — | true|
| show-stops | 是否显示间断点 | boolean | — | false |
| show-tooltip | 是否显示 tooltip | boolean | — | true |
| format-tooltip | 格式化 tooltip message | Function(value) | — | — |
| range | 是否为范围选择 | boolean | — | false |
| vertical | 是否竖向模式 | boolean | — | false |
| height | Slider 高度，竖向模式时必填 | String | — | — |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | 改变后的值 |
