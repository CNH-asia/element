<script>
  export default {
    data() {
      return {
        disabledOptions: ['iOS/iphone5','windows/ttt/a01', 'Android/OPPO/r7s','Android/OPPO/r9s'],
        allOptions:['iOS/iphone5','windows/ttt/a01', 'Android/OPPO/r7s','Android/OPPO/r9s'],
        keys: ['system', 'brand', 'type'],
        levelLimit: [1,1,2],
        testOptions: [
          { system: "Android", brand: "OPPO", type: "r7s" },
          { system: "iOS", type: "iphone5" },
          { system: "iOS", type: "iphone5s" },
          { system: "iOS", type: "iphone6" },
          { system: "iOS", type: "iphone6s" },
          { system: "iOS", type: "iphone7" },
          { system: "iOS", type: "iphone7plus" },
          { brand: "OPPO", system: "Android", type: "r9s" },
          { brand: "OPPO", system: "Android", type: "r11s" },
          { brand: "ttt", system: "windows", type: "a01" },
          { system: "Android", brand: "HUAWEI", type: "P10", _brand: "华为" },
          { system: "Android", brand: "HUAWEI", type: "P8", _brand: "华为" },
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
              value: 'OPPO',
              label: 'OPPO',
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
    <el-cascader-multiple
        :clearable=true
        :keys="keys"
        :test-options="testOptions"
        :disabled-options="disabledOptions"
        v-model="selectedOptions1"
        @change="handleChange">
    </el-cascader-multiple>
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

<!-- ### 仅显示最后一级

可以仅在输入框中显示选中项最后一级的标签，而不是选中项所在的完整路径。

:::demo 属性`show-all-levels`定义了是否显示完整的路径，将其赋值为`false`则仅显示最后一级
```html
<el-cascader
  :options="options"
  :show-all-levels="false"
></el-cascader>
<script>
  export default {
    data() {
      return {
        options: [{
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
        }]
      };
    }
  };
</script> -->
<!-- ``` -->
<!-- ::: -->

### 默认值

:::demo 默认值通过数组的方式指定。
```html
<div class="block">
    <el-cascader-multiple
        :clearable=true
        :keys="keys"
        :test-options="testOptions"
        v-model="selectedOptions2"
        @change="handleChange">
    </el-cascader-multiple>
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
| options | 可选项数据源，键名可通过 `props` 属性配置 | array | — | — |
| props | 配置选项，具体见下表 | object | — | — |
| value | 选中项绑定值   | array | — | — |
| popper-class | 自定义浮层类名   | string | —  | — |
| placeholder | 输入框占位文本 | string | — | 请选择 |
| disabled | 是否禁用 | boolean | — | false |
| clearable | 是否支持清空选项 | boolean | — | false |
| expand-trigger | 次级菜单的展开方式 | string | click / hover | click |
| show-all-levels | 输入框中是否显示选中值的完整路径 | boolean | — | true |
| filterable | 是否可搜索选项 | boolean | — | — |
| debounce | 搜索关键词输入的去抖延迟，毫秒 | number | — | 300 |
| change-on-select | 是否允许选择任意一级的选项 | boolean | — | false |
| size | 尺寸 | string | large / small / mini | — |

### props
| 参数     | 说明              | 类型   | 可选值 | 默认值 |
| -------- | ----------------- | ------ | ------ | ------ |
| value    | 指定选项的值为选项对象的某个属性值 | string | — | — |
| label    | 指定选项标签为选项对象的某个属性值 | string | — | — |
| children | 指定选项的子选项为选项对象的某个属性值 | string | — | — |
| disabled | 指定选项的禁用为选项对象的某个属性值 | string | — | — |
| before-filter | 可选参数, 筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选。 | function(value) | — | — |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change | 当绑定值变化时触发的事件 | 当前值 |
| active-item-change | 当父级选项变化时触发的事件，仅在 `change-on-select` 为 `false` 时可用 | 各父级选项组成的数组 |
