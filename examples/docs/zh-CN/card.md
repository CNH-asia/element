<script>
  import dateUtil from 'main/utils/date'
  export default {
    data() {
      return {
        currentDate: dateUtil.format(new Date(), 'yyyy-MM-dd HH:mm')
      };
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .item {
    padding: 18px 0;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix {
    @utils-clearfix;
  }

  .box-card {
    width: 480px;
  }
</style>
## Card 卡片
将信息聚合在卡片容器中展示。

### 基础用法


包含标题，内容和操作。
LIGHT组件商店组件推荐卡片

:::demo Card 组件包括`header`和`body`部分，`header`部分需要有显式具名 slot 分发，同时也是可选的。
```html
<el-card type="recommend">
  <div slot="header" class="clearfix">
    <span style="line-height: 36px;">卡片名称</span>
    <el-button style="float: right;" type="primary">操作按钮</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>


<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
```
:::

### 组件/应用卡片

卡片可以只有内容区域。

:::demo
```html
<el-card type="comp">
  <div v-for="o in 2" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
<el-card  type="comp">
  <div class="text item">
    <h1 title="elementui">elemntui000000000000000000000</h1>
    <div class="describe">ID : 8112734868606389红红火火恍恍惚惚</div>
    <div class="describe">2222222222222222哈哈哈哈哈</div>
  </div>
  <div class="hover-hide contentMsg">
    <div class="line"></div>
    <div class="tags">
      <el-tag type=green>未发布</el-tag>
      <el-tag type=grey>H5</el-tag>
    </div>
  </div>
  <div class="hover-show">
    <div class="bottom-menu">
      <span class="bottom-menu-item">
        <el-button type="text">编辑</el-button>
        <img src="https://dashboard.lightyy.com/images/card-edit.svg">
      </span>
      <span class="bottom-menu-item">
        <el-button type="text">删除</el-button>
        <img src="https://dashboard.lightyy.com/images/card-delete.svg">
      </span>       
    </div>
  </div>      
</el-card>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .hover-show {
    display: none;
}
.box-card:hover .hover-hide {
    display: none;
}
.box-card:hover .hover-show {
    display: block;
}

.box-card h1 {
    max-width: 75%;
    margin: 0;
    line-height: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 20px;
    font-weight: normal;
}
.el-card .describe {
    min-height: 14px;
    margin-top: 10px;
    color: #7A7A7A;
    line-height: 14px;
    font-size: 14px;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.hover-hide.contentMsg {
    margin-top: 10px;
}
.contentMsg .tags {
    margin: 10px 0 5px;
}
.bottom-menu {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 45px;
    background-color: #F2F9FD;
    display: flex;
    justify-content: center;
    border-top: 1px solid #C5DDED;
}
.bottom-menu-item {
    flex: 1;
    display: flex;
    justify-content: center;
    line-height: 45px;
    font-size: 14px;
    color: #0785DB;
    letter-spacing: 0;
    position: relative;
}
.bottom-menu-item .el-button--text {
    /*color: #0785DB;*/
    color: red;
}
.bottom-menu-item:after {
    content: '|';
    position: absolute;
    left: 100%;
}
.bottom-menu-item button {
    display: none;
}
.bottom-menu-item:hover img {
    display: none;
}
.bottom-menu-item:hover button {
    display: block;
}
</style>
```
:::

### 带图片

可配置定义更丰富的内容展示。

:::demo 配置`body-style`属性来自定义`body`部分的`style`，我们还使用了布局组件。
```html
<el-row>
  <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img src="~examples/assets/images/hamburger.png" class="image">
      <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| header | 设置 header，也可以通过 `slot#header` 传入 DOM | string| — | — |
| body-style | 设置 body 的样式| object| — | { padding: '20px' } |
