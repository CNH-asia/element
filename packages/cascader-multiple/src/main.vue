<template>
  <span
    class="el-cascader"
    :class="[
      {
        'is-opened': menuVisible,
        'is-disabled': disabled
      },
      size ? 'el-cascader--' + size : ''
    ]"
    @click="handleClick"
    @mouseenter="inputHover = true"
    @mouseleave="inputHover = false"
    ref="reference"
    v-clickoutside="handleClickoutside"
  >
    <el-input
      ref="input"
      :readonly="!filterable"
      :placeholder="currentLabels.length ? undefined : placeholder"
      v-model="inputValue"
      @change="debouncedInputChange"
      :validate-event="false"
      :size="size"
      :disabled="disabled"
    >
      <template slot="icon">
        <i
          key="1"
          v-if="clearable && inputHover && currentLabels.length"
          class="el-input__icon el-icon-circle-close el-cascader__clearIcon"
          @click="clearValue"
        ></i>
        <i
          key="2"
          v-else
          @click="toggleMenuVisible"
          class="el-input__icon el-icon-caret-bottom"
          :class="{ 'is-reverse': menuVisible }"
        ></i>
      </template>
      <span slot="prepend">{{prepend}}</span>
    </el-input>
    <span class="el-cascader__label" :style="{'padding-left': prependLeft }" v-show="inputValue === ''">
      <template v-if="showAllLevels">
        <!-- 多选 -->
        <template v-for="(group, index) in currentLabels">
          <!-- <template v-for="(label, idx) in group">
            {{ label }}
            <span v-if="idx < group.length - 1" :key="idx"> / </span>            
          </template> -->
          {{ group. toString().replace(/,/g,'/')}}
          <span v-if="index < currentLabels.length - 1" :key="index"> , </span>
        </template>
      </template>
      <template v-else>
        {{ currentLabels[currentLabels.length - 1] }}
      </template>
    </span>
  </span>
</template>

<script>
import Vue from 'vue';
import ElCascaderMenu from './menu';
import ElInput from 'element-ui/packages/input';
import Popper from 'element-ui/src/utils/vue-popper';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import emitter from 'element-ui/src/mixins/emitter';
import Locale from 'element-ui/src/mixins/locale';
import { t } from 'element-ui/src/locale';
import debounce from 'throttle-debounce/debounce';

const popperMixin = {
  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },
    appendToBody: Popper.props.appendToBody,
    offset: Popper.props.offset,
    boundariesPadding: Popper.props.boundariesPadding,
    popperOptions: Popper.props.popperOptions
  },
  methods: Popper.methods,
  data: Popper.data,
  beforeDestroy: Popper.beforeDestroy
};

export default {
  name: 'ElCascaderMultiple',

  directives: { Clickoutside },

  mixins: [popperMixin, emitter, Locale],

  components: {
    ElInput
  },

  props: {
    prepend: String,
    keys: {
      type: Array,
      required: true
    },
    testOptions: {
      type: Array,
      required: true
    },
    levelLimit: {
      type: Array,
      required: false
    },
    disabledOptions: {
      type: Array,
      default() {
        return [];
      }
    },
    props: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label',
          value: 'value',
          disabled: 'disabled'
        };
      }
    },
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    placeholder: {
      type: String,
      default() {
        return t('el.cascader.placeholder');
      }
    },
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: false
    },
    changeOnSelect: Boolean,
    popperClass: String,
    expandTrigger: {
      type: String,
      default: 'click'
    },
    filterable: Boolean,
    size: String,
    showAllLevels: {
      type: Boolean,
      default: true
    },
    debounce: {
      type: Number,
      default: 300
    },
    beforeFilter: {
      type: Function,
      default: () => (() => {})
    }
  },

  data() {
    return {
      currentValue: this.value || [],
      menu: null,
      debouncedInputChange() {},
      menuVisible: false,
      inputHover: false,
      inputValue: '',
      flatOptions: null,
      allarr: [],
      realDisabledOptions: this.disabledOptions || [],
      prependLeft: '8px'
    };
  },

  computed: {
    //分级数组
    level_arrs: function(){
      var arr1 = [];
      var arr2 = [];
      var arr3 = [];
      var val1 = [];
      var val2 = [];
      var val3 = [];
      var arrs = [arr1, arr2, arr3];
      var values = [val1,val2,val3];
      var that = this;        
      var keys = that.keys;
       
      for (var i = 0; i < keys.length; i++) {
        that.testOptions.forEach(function (option) {
          // if (option[keys[i]] && values[i].indexOf(option[keys[i]])==-1 && (i==0||(i>0&&values[i-1].indexOf(option[keys[i-1]])==-1))) {
          // if (option[keys[i]] && values[i].indexOf(option[keys[i]])==-1) {
          if (option[keys[i]]) {
            
            values[i].push(option[keys[i]]);

            var tmp = {};
            tmp.value = option[keys[i]];
            if (option['_' + keys[i]]) {
              tmp.label = option['_' + keys[i]];
            } else {
              tmp.label = tmp.value;
            }
            if(i==0) {
              tmp.pid = 0;
            } else {
              var value = option[keys[i-1]] || option[keys[i - 2]] || option[keys[i - 3]];
              tmp.pid = value;
            }
              arrs[i].push(tmp);
            
          }
          
        })
      }
     
      let realArrs = [];
      arrs.forEach(function(arr) {
        let newArr = [];
        let realArr = [];
        
        for(let t = 0; t < arr.length; t++) {
          let str = "";
          for(var n in arr[t]) {
            str += arr[t][n];
          }
          
          if(newArr.indexOf(str)==-1) {
            newArr.push(str);
            realArr.push(arr[t]);
          }
        }
        realArrs.push(realArr);
      })
      
      return realArrs;
    },
    options() {
      var that = this;
      function fn(data, pid) {
        var result = [], temp;
        for (var i = 0; i < data.length; i++) {
            if (data[i].pid == pid) {
                var obj = { "label": data[i].label, "value": data[i].value, "pid": data[i].pid, "disabled": false, "level": 0 };
                temp = fn(data, data[i].value);
                if (temp.length > 0) {
                    obj.children = temp;
                }
                result.push(obj);
            }
        }
        return result;
      } 
      var temparr = [];
      for(var i = 0; i < that.level_arrs.length; i++) {
        temparr = temparr.concat(that.level_arrs[i]);
      }
      that.allarr = temparr;
      var res = fn(temparr, 0);
      return res;
    },
    labelKey() {
      return this.props.label || 'label';
    },
    valueKey() {
      return this.props.value || 'value';
    },
    childrenKey() {
      return this.props.children || 'children';
    },
    currentLabels() {
      var that = this;
      //计算当前显示的label,currentValue为当前值
      if(!that.showAllLevels) {
          // this.currentValue.forEach(group => {
          //   console.log(group);
          //   labels.push(group.toString());
          //   const targetOption1 = options && options.filter(option => option[this.valueKey] === value)[0];
          //   if (targetOption1) {
          //     labels.push(targetOption1[this.labelKey]);
          //     options = targetOption1[this.childrenKey];
          //   }
          // });
        } else {
          //显示完整路径
          var labels_m = [];
          that.currentValue.forEach(group => {
            var options_m = that.options;
            let label_tmp = [];
            var arrtmp = group.split('/');
            arrtmp.forEach(value => {
              const targetOption2 = options_m && options_m.filter(option => option[that.valueKey] === value)[0];
              if (targetOption2) {
                label_tmp.push(targetOption2[that.labelKey]);
                options_m = targetOption2[that.childrenKey];
              }
            });
            labels_m.push(label_tmp);
          });
        }
        
        return labels_m;
    }
  },

  watch: {
    menuVisible(value) {
      value ? this.showMenu() : this.hideMenu();
    },
    value(value) {
      this.currentValue = value;
      this.menu.value = this.currentValue.slice(0);
    },
    disabledOptions(value) {
      this.realDisabledOptions = value;
      this.menu.disabledOptions = this.realDisabledOptions.slice(0);
    },
    currentValue(value) {
      this.dispatch('ElFormItem', 'el.form.change', [value]);
    },
    options: {
      deep: true,
      handler(value) {
        if (!this.menu) {
          this.initMenu();
        }
        this.flatOptions = this.flattenOptions(this.options);
        this.menu.options = value;
      }
    }
  },

  methods: {
    toggleMenuVisible(e) {
      if(this.filterable) {
        if(this.disabled) return;
        this.menuVisible = !this.menuVisible;
        e.cancelBubble = true;
      }
    },
    initMenu() {
      this.menu = new Vue(ElCascaderMenu).$mount();
      this.menu.options = this.options;
      this.menu.props = this.props;
      this.menu.expandTrigger = this.expandTrigger;
      this.menu.changeOnSelect = this.changeOnSelect;
      this.menu.popperClass = this.popperClass;
      this.menu.disabledOptions = this.realDisabledOptions;
      this.menu.allarr = this.allarr;
      this.menu.level_arrs = this.level_arrs;
      this.menu.levelLimit = this.levelLimit;
      
      this.popperElm = this.menu.$el;
      this.menu.$on('pick', this.handlePick);
      this.menu.$on('menuLeave', this.doDestroy);
    },
    showMenu() {
      if (!this.menu) {
        this.initMenu();
      }

      this.menu.value = this.currentValue.slice(0);
      
      this.menu.visible = true;
      this.menu.options = this.options;
      this.menu.disabledOptions = this.realDisabledOptions.slice(0);
      this.menu.allarr = this.allarr;
      this.menu.level_arrs = this.level_arrs;
      this.menu.levelLimit = this.levelLimit;
      
      this.$nextTick(_ => {
        this.updatePopper();
        this.menu.inputWidth = this.$refs.input.$el.offsetWidth - 2;
      });
    },
    hideMenu() {
      this.inputValue = '';
      this.menu.visible = false;
    },
    handleActiveItemChange(value) {
      //处理函数
      this.$nextTick(_ => {
        this.updatePopper();
      });
      this.$emit('active-item-change', value);
    },
    handlePick(value, close = true) {
      var that = this;
      var arr = [];
      value.forEach(function(val) {
        arr.push(val.toString().replace(/,/g,'/'));
      })
      
      this.currentValue = arr;
      //对value进行处理
      this.$emit('input', arr);
      this.$emit('change', arr);
      if (close) {
        //就是这里，注释了以后就可以正常render了。。。
        //nono和这里没关系。。。是我看错了
        this.menuVisible = false;
      } else {
        this.$nextTick(this.updatePopper);
      }
    },
    handleInputChange(value) {
      if (!this.menuVisible) return;
      const flatOptions = this.flatOptions;

      if (!value) {
        this.menu.options = this.options;
        this.$nextTick(this.updatePopper);
        return;
      }

      let filteredFlatOptions = flatOptions.filter(optionsStack => {
        return optionsStack.some(option => new RegExp(value, 'i').test(option[this.labelKey]));
      });

      if (filteredFlatOptions.length > 0) {
        filteredFlatOptions = filteredFlatOptions.map(optionStack => {
          return {
            __IS__FLAT__OPTIONS: true,
            value: optionStack.map(item => item[this.valueKey]),
            label: this.renderFilteredOptionLabel(value, optionStack)
          };
        });
      } else {
        filteredFlatOptions = [{
          __IS__FLAT__OPTIONS: true,
          label: this.t('el.cascader.noMatch'),
          value: '',
          disabled: true
        }];
      }
      this.menu.options = filteredFlatOptions;
      this.$nextTick(this.updatePopper);
    },
    renderFilteredOptionLabel(inputValue, optionsStack) {
      return optionsStack.map((option, index) => {
        const label = option[this.labelKey];
        const keywordIndex = label.toLowerCase().indexOf(inputValue.toLowerCase());
        const labelPart = label.slice(keywordIndex, inputValue.length + keywordIndex);
        const node = keywordIndex > -1 ? this.highlightKeyword(label, labelPart) : label;
        return index === 0 ? node : [' / ', node];
      });
    },
    highlightKeyword(label, keyword) {
      const h = this._c;
      return label.split(keyword)
        .map((node, index) => index === 0 ? node : [
          h('span', { class: { 'el-cascader-menu__item__keyword': true }}, [this._v(keyword)]),
          node
        ]);
    },
    flattenOptions(options, ancestor = []) {
      let flatOptions = [];
      options.forEach((option) => {
        const optionsStack = ancestor.concat(option);
        if (!option[this.childrenKey]) {
          flatOptions.push(optionsStack);
        } else {
          if (this.changeOnSelect) {
            flatOptions.push(optionsStack);
          }
          flatOptions = flatOptions.concat(this.flattenOptions(option[this.childrenKey], optionsStack));
        }
      });
      return flatOptions;
    },
    clearValue(ev) {
      ev.stopPropagation();
      this.handlePick([], true);
    },
    handleClickoutside() {
      this.menuVisible = false;
    },
    handleClick() {
      if (this.disabled) return;
      if (this.filterable) {
        this.menuVisible = true;
        this.$refs.input.$refs.input.focus();
        return;
      }
      this.menuVisible = !this.menuVisible;
    }
    // sumChildren(obj) {
    //   var that = this;
    //   if (obj.children && obj.children.length > 0) {
    //     for(var i = 0; i < obj.children.length; i ++) {
    //       console.log(obj.children[i]);
    //       that.sumChildren(obj.children[i]);
    //     }
    //   } else {
    //     this.total = this.total + 1;
    //   }
    //   return this.total;

    // }
  },

  created() {
    this.debouncedInputChange = debounce(this.debounce, value => {
      const before = this.beforeFilter(value);

      if (before && before.then) {
        this.menu.options = [{
          __IS__FLAT__OPTIONS: true,
          label: this.t('el.cascader.loading'),
          value: '',
          disabled: true
        }];
        before
          .then(() => {
            this.$nextTick(() => {
              this.handleInputChange(value);
            });
          });
      } else if (before !== false) {
        this.$nextTick(() => {
          this.handleInputChange(value);
        });
      }
    });
  },
  mounted() {
    this.flatOptions = this.flattenOptions(this.options);
    //计算每个结点的子项个数
    var total = 0;
    function sumChildren(obj) {
      var that = this;
      if (obj.children && obj.children.length > 0) {
        for(var i = 0; i < obj.children.length; i ++) {
          sumChildren(obj.children[i]);
        }
      } else {
        total = total + 1;
      }
      return total;
    }

    function traverseNode(node) {
      total = 0;
      if(node.children && node.children.length>0) {
          node.childlen = sumChildren(node);
      } else {
          node.childlen = 0;
      }
    }

    function traverseTree(node) {
      if (!node) {
          return;
      }
      traverseNode(node);
      if (node.children && node.children.length > 0) {
        var i = 0;
        for (i = 0; i < node.children.length; i++) {
          traverseTree(node.children[i]);
        }
      }
    }

    for(var i = 0; i < this.options.length; i++) {
        traverseTree(this.options[i]);
    }

    if(this.prepend) {
      const prependItem = this.$el.querySelector('.el-input-group__prepend'); 
      const prependWidth = prependItem.offsetWidth || prependItem.clientWidth || 44;  
      this.prependLeft = prependWidth + 'px';
    }
  }
};
</script>
