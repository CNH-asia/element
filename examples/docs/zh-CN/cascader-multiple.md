<script>
  export default {
    data() {
      return {
        disabledOptions: ['iOS/iphone5','windows/ttt/a01', 'Android/OPPO/r7s','Android/OPPO/r9s'],
        allOptions:['iOS/iphone5','windows/ttt/a01', 'Android/OPPO/r7s','Android/OPPO/r9s'],
        // keys: ['system', 'brand', 'type'],
        keys: ['AppID','AppVersion'],
        levelLimit: [1,1,2],
        testOptions: [{"_AppID":"A_I12","AppID":"com.hundsun.niubeidemo","AppVersion":"1.1.1"},{"_AppID":"HATSUNEMIKU","AppID":"com.hundsun.android2","AppVersion":"1.1.2"},{"_AppID":"HASUNEMIKUandroid","AppID":"com.hundsun.android","AppVersion":"1.1.1"},{"_AppID":"A_I12","AppID":"com.hundsun.niubeidemo","AppVersion":"22.33.67"},{"_AppID":"helloH5","AppID":"wlp.wlp.pph","AppVersion":"0d.0.8"},{"_AppID":"A_I12","AppID":"com.hundsun.niubeidemo","AppVersion":"22.33.66"},{"_AppID":"获取地理定位","AppID":"com.hundsun.baidulocation.test","AppVersion":"4.4.4"},{"_AppID":"安卓微信支付测试","AppID":"com.hundsun.lwzl.project","AppVersion":"0.0.2"},{"_AppID":"A_I12","AppID":"com.hundsun.niubeidemo","AppVersion":"22.33.45"},{"_AppID":"LightViewTest","AppID":"com.hundsun.light.lightIn","AppVersion":"1.0.4"},{"_AppID":"A_I12","AppID":"com.hundsun.niubeidemo","AppVersion":"17.2"},{"_AppID":"国联投顾dev重构版","AppID":"com.hundsun.light.investing","AppVersion":"1.0.3"},{"_AppID":"A_I12","AppID":"com.hundsun.niubeidemo","AppVersion":"22.33.44"},{"_AppID":"阿萨","AppID":"com.hundsun.ssds","AppVersion":"1.0.3"},{"_AppID":"0907","AppID":"com.hs.net.hopesspecial","AppVersion":"1.0.3"},{"_AppID":"整包上传测试一下","AppID":"light.com.ls.aaa.vvv.cccc","AppVersion":"0.0.1"},{"_AppID":"Android自测","AppID":"com.hundsun.selftest","AppVersion":"1.1.1"},{"_AppID":"A_I12","AppID":"com.hundsun.niubeidemo","AppVersion":"22.33.33"},{"_AppID":"国联投顾dev重构版","AppID":"com.hundsun.light.investing","AppVersion":"1.0"},{"_AppID":"整包上传测试一下","AppID":"light.com.ls.aaa.vvv.cccc","AppVersion":"0.0.2"},{"_AppID":"调试使用","AppID":"com.hundsun.spotTrading.uat.com","AppVersion":"2.1.2"},{"_AppID":"获取地理定位","AppID":"com.hundsun.baidulocation.test","AppVersion":"11.2.2"},{"_AppID":"阿萨","AppID":"com.hundsun.ssds","AppVersion":"1.0.2"},{"_AppID":"helloH5","AppID":"wlp.wlp.pph","AppVersion":"0.0.8"},{"_AppID":"LightView","AppID":"com.hundsun.light.lightview.appstore","AppVersion":"1.0.4"},{"_AppID":"A_I12","AppID":"com.hundsun.niubeidemo","AppVersion":"3.5.1"}],
        testOptions2: [
          { system: "iOS", type: "iphone5" },
          { system: "ttt", type: "iphone5" },
          { system: "iOS", type: "iphone6" },
          { system: "iOS", type: "iphone6s" },
          { system: "iOS", type: "iphone7" },
          { system: "iOS", type: "iphone7plus" },
          { brand: "OPPO", system: "Android", type: "r7s" },
          { brand: "OPPO", system: "Android", type: "r9s" },
          { brand: "OPPO", system: "Android", type: "r11s" },
          { brand: "ttt", system: "windows", type: "a01" },
          { system: "Android", brand: "HUAWEI", type: "r9s", _brand: "华为" },
          { system: "Android", brand: "HUAWEI", type: "mate 10", _brand: "华为" },
          { system: "Android", brand: "SUMSUNG", type: "S10", _brand: "三星" },
          { system: "Android", brand: "SUMSUNG", type: "NOTE8", _brand: "三星" }
        ],
        options: [
          {
            value: 'iOS',
            label: 'iOS',
            children: [
            {
              value: 'iPhone5s',
              label: 'iPhone5s'
            },{
              value: 'iPhone6',
              label: 'iPhone6'
            }]
          },
          {
            value: 'Android',
            label: 'Android',
            children: [
            {
              value: 'iPhone6',
              label: 'iPhone6',
              children: [
                {
                value: 'r7s',
                label: 'r7s'
              }, {
                value: 'r9s',
                label: 'r9s'
              }, {
                value: 'r11s',
                label: 'r11s'
              }]
            }, {
              value: 'XIAOMI',
              label: 'XIAOMI',
              children: [
              {
                value: 'MIX7',
                label: 'MIX7'
              }, {
                value: 'T2',
                label: 'T2'
              }]
            }]
          }
        ],
        selectedOptions: [],
        selectedOptions1: [],
        selectedOptions2: ['Android/OPPO/r7s','Android/OPPO/r9s'],
      };
    },
    mounted() {
      this.$nextTick(() => {
        const demos = document.querySelectorAll('.source');
        demos[0].style.padding = '0';
        demos[demos.length - 1].style.padding = '0';
      });

    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>

<style>
  .demo-cascader {
    .el-cascader {
      width: 222px;
    }
  }
  .demo-cascader-size {
    .el-cascader {
      vertical-align: top;
      margin-right: 15px;
    }
  }
  .demo-cascader .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px #EFF2F6;
    float: left;
    width: 50%;
    box-sizing: border-box;
    &:last-child {
      border-right: none;
    }
  }
  .demo-cascader .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>

## Cascader Multiple 级联多项选择器

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

### 基础用法

可选任意一级,hover方式触发子菜单。点击某一项，该项的所有不被禁用的子项都被选中。

:::demo 只需为 Cascader 的`options`属性指定选项数组即可渲染出一个级联选择器。本例还展示了`change`事件，它的参数为 Cascader Multiple 的绑定值：一个由各级菜单的值所组成的数组。
```html
<div class="block">
  <el-cascader-multiple
    :clearable=true
    :keys="keys"
    prepend="产品版本"
    filterable
    :test-options="testOptions"
    v-model="selectedOptions"
    @change="handleChange">
  </el-cascader-multiple>
</div>
 

<script>
  export default {
    data() {
      return {
        options: [
          {
            value: 'iOS',
            label: 'iOS',
            children: [{
              value: 'iPhone5s',
              label: 'iPhone5s'
            },{
              value: 'iPhone6',
              label: 'iPhone6'
            }]
          },
          {
            value: 'Android',
            label: 'Android',
            children: [{
              value: 'OPPO',
              label: 'OPPO',
              children: [{
                value: 'r7s',
                label: 'r7s'
              }, {
                value: 'r9s',
                label: 'r9s'
              }, {
                value: 'r11s',
                label: 'r11s'
              }]
            }, {
              value: 'XIAOMI',
              label: 'XIAOMI',
              children: [{
                value: 'MIX7',
                label: 'MIX7'
              }, {
                value: 'T2',
                label: 'T2'
              }]
            }]
          }
        // {
        //   value: 'zujian',
        //   label: '组件',
        //   children: [{
        //     value: 'basic',
        //     label: 'Basic',
        //     children: [{
        //       value: 'layout',
        //       label: 'Layout 布局'
        //     }, {
        //       value: 'color',
        //       label: 'Color 色彩'
        //     }, {
        //       value: 'typography',
        //       label: 'Typography 字体'
        //     }, {
        //       value: 'icon',
        //       label: 'Icon 图标'
        //     }, {
        //       value: 'button',
        //       label: 'Button 按钮'
        //     }]
        //   }, {
        //     value: 'form',
        //     label: 'Form',
        //     children: [{
        //       value: 'radio',
        //       label: 'Radio 单选框'
        //     }, {
        //       value: 'checkbox',
        //       label: 'Checkbox 多选框'
        //     }, {
        //       value: 'input',
        //       label: 'Input 输入框'
        //     }, {
        //       value: 'input-number',
        //       label: 'InputNumber 计数器'
        //     }, {
        //       value: 'select',
        //       label: 'Select 选择器'
        //     }, {
        //       value: 'cascader',
        //       label: 'Cascader 级联选择器'
        //     }, {
        //       value: 'switch',
        //       label: 'Switch 开关'
        //     }, {
        //       value: 'slider',
        //       label: 'Slider 滑块'
        //     }, {
        //       value: 'time-picker',
        //       label: 'TimePicker 时间选择器'
        //     }, {
        //       value: 'date-picker',
        //       label: 'DatePicker 日期选择器'
        //     }, {
        //       value: 'datetime-picker',
        //       label: 'DateTimePicker 日期时间选择器'
        //     }, {
        //       value: 'upload',
        //       label: 'Upload 上传'
        //     }, {
        //       value: 'rate',
        //       label: 'Rate 评分'
        //     }, {
        //       value: 'form',
        //       label: 'Form 表单'
        //     }]
        //   }, {
        //     value: 'data',
        //     label: 'Data',
        //     children: [{
        //       value: 'table',
        //       label: 'Table 表格'
        //     }, {
        //       value: 'tag',
        //       label: 'Tag 标签'
        //     }, {
        //       value: 'progress',
        //       label: 'Progress 进度条'
        //     }, {
        //       value: 'tree',
        //       label: 'Tree 树形控件'
        //     }, {
        //       value: 'pagination',
        //       label: 'Pagination 分页'
        //     }, {
        //       value: 'badge',
        //       label: 'Badge 标记'
        //     }]
        //   }, {
        //     value: 'notice',
        //     label: 'Notice',
        //     children: [{
        //       value: 'alert',
        //       label: 'Alert 警告'
        //     }, {
        //       value: 'loading',
        //       label: 'Loading 加载'
        //     }, {
        //       value: 'message',
        //       label: 'Message 消息提示'
        //     }, {
        //       value: 'message-box',
        //       label: 'MessageBox 弹框'
        //     }, {
        //       value: 'notification',
        //       label: 'Notification 通知'
        //     }]
        //   }, {
        //     value: 'navigation',
        //     label: 'Navigation',
        //     children: [{
        //       value: 'menu',
        //       label: 'NavMenu 导航菜单'
        //     }, {
        //       value: 'tabs',
        //       label: 'Tabs 标签页'
        //     }, {
        //       value: 'breadcrumb',
        //       label: 'Breadcrumb 面包屑'
        //     }, {
        //       value: 'dropdown',
        //       label: 'Dropdown 下拉菜单'
        //     }, {
        //       value: 'steps',
        //       label: 'Steps 步骤条'
        //     }]
        //   }, {
        //     value: 'others',
        //     label: 'Others',
        //     children: [{
        //       value: 'dialog',
        //       label: 'Dialog 对话框'
        //     }, {
        //       value: 'tooltip',
        //       label: 'Tooltip 文字提示'
        //     }, {
        //       value: 'popover',
        //       label: 'Popover 弹出框'
        //     }, {
        //       value: 'card',
        //       label: 'Card 卡片'
        //     }, {
        //       value: 'carousel',
        //       label: 'Carousel 走马灯'
        //     }, {
        //       value: 'collapse',
        //       label: 'Collapse 折叠面板'
        //     }]
        //   }]
        // }, 
        // {
        //   value: 'ziyuan',
        //   label: '资源',
        //   children: [{
        //     value: 'axure',
        //     label: 'Axure Components'
        //   }, {
        //     value: 'sketch',
        //     label: 'Sketch Templates'
        //   }, {
        //     value: 'jiaohu',
        //     label: '组件交互文档'
        //   }]
        // }
        ],
        selectedOptions: []
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>
```
:::

### 禁用选项

通过设置 `disabledOptions` 属性来声明禁用的选项。若该项被禁用，则子项菜单无法打开。当子项全部别禁用时，该项也被禁用。

:::demo 
```html
<div class="block">
    <!-- <el-cascader-multiple
        :clearable=true
        :keys="keys"
        :test-options="testOptions"
        :disabled-options="disabledOptions"
        v-model="selectedOptions1"
        @change="handleChange">
    </el-cascader-multiple> -->
</div>
<script>
  export default {
    data() {
      return {
        optionsWithDisabled: [{
          value: 'zhinan',
          label: '指南',
          disabled: true,
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
      };
    }
  };
</script>
```
:::


### 默认值

:::demo 默认值通过数组的方式指定。
```html
<div class="block">
    <!-- <el-cascader-multiple
        :clearable=true
        :keys="keys"
        :test-options="testOptions"
        v-model="selectedOptions2"
        @change="handleChange">
    </el-cascader-multiple> -->
</div>
<script>
  export default {
    data() {
      return {
        options1: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        selectedOptions3: ['zujian', 'data', 'tag']
      };
    }
  };
</script>
```
:::



### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| test-options | 可选项数据源 | array | — | — |
| keys | 数据源每一层级的键名 | array | — | — |
| disabled-options | 需要禁用的选项列表（格式同testOptions） | array | — | — |

| value | 选中项绑定值   | array | — | — |
| placeholder | 输入框占位文本 | string | — | 请选择 |
| clearable | 是否支持清空选项 | boolean | — | false |


### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change | 当绑定值变化时触发的事件 | 当前值 |
