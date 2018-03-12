<script>
  export default {
    data() {
      return {
        ratios:[{
          percent: 10,
          desc: '默认版本'
        }
        , {
          percent: 20
        }
        , {
          percent: 20
        }
        , {
          percent: 50,
        }
        , {
          percent: 0
        }],
        value_multi: [10,20,20,50,0],
        dialogVisible: false,
        value1: 0,
        value2: 134,
        value3: 36,
        value4: 48,
        value5: 42,
        value6: 0,
        value7: 300,
        value8: 0,
        value9: [4, 8],
        value10: 200,
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
    methods: {
      formatTooltip(val) {
        return val / 100;
      },
      tabClick() {
        console.log('click');
       },
       print(val) {
         console.log(val);
       },
       changeVal() {
        this.value_multi = [0,90,0,0,10];
        // this.ratios = [{
        //   percent: 10,
        //   desc: '默认版本'
        // }
        // , {
        //   percent: 60
        // }
        // , {
        //   percent: 20
        // }
        // , {
        //   percent: 10
        // }, {
        //   percent: 0
        // }
        // ];
      }
    },
    watch: {
      "value_multi":{
        deep: true,
        handler: function(val) {
          console.log(val);
        }
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

## Ratio Controller 比例调节器

通过拖动滑块在一个固定区间内进行比例设置

### 基础用法



:::demo 通过设置绑定值自定义滑块的初始值
```html
<template>
    <div class="block"><el-button @click="dialogVisible=!dialogVisible">click</el-button></div>
  <div class="block">
    <el-ratio-controller :ratios="ratios" v-model="value_multi"></el-ratio-controller>
  </div>
  <el-dialog
    :visible.sync="dialogVisible">
      <el-ratio-controller :ratios="ratios" v-model="value_multi" ></el-ratio-controller>
      <div slot="footer">
        <el-button @click="changeVal">click</el-button>
      </div>
    </el-dialog>

 
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
