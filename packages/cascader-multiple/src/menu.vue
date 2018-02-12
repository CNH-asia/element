<script>
  import { isDef } from 'element-ui/src/utils/shared';
  // import scrollIntoView from 'element-ui/src/utils/scroll-into-view';

  export default {
    name: 'ElCascaderMenu',

    data() {
      return {
        inputWidth: 0,
        options: [],
        props: {},
        visible: false,
        activeValue: [],
        activeValueTmp: [],
        activeValueCut: [],
        value: [],
        expandTrigger: 'click',
        changeOnSelect: false,
        popperClass: '',
        multiple: true,
        total: 0,
        tmparr: [],
        allarr: [],//存放所有单个值
        level_arrs: [],
        levelLimit: [],
        disabledOptions: []//禁用项
      };
    },

    watch: {
      visible(value) {
        if (value) {
          this.activeValue = this.value.concat();
          if(this.activeValue.length==0) {
            this.activeValueTmp = [];
          }
        } 
      },
      value: {
        immediate: true,
        handler(value) {
          //会影响状态的回显
          var that = this;
          var tmp = [];
          value.forEach(function(val) {
            var t = val.split('/');
            tmp.push(t);
          })
          if(!this.disabledOptions || this.disabledOptions.length == 0) {
            this.activeValue = tmp.concat();
          } else {
            //如果禁用项里面有在activeValue的，就直接去掉？
            var new_value = [];
            value.forEach(function(val) {
              if(that.disabledOptions.indexOf(val) == -1) {
                new_value.push(val.split('/'));
              }
            });
            this.activeValue = new_value.concat();
          }
        }
      },
      disabledOptions:{
        immediate: true,
        handler(value) {
          // if(value && value.length > 0) {
          //   value.forEach(function(option) {
          //     console.log(option);

          //   })
          // }
        }
      },
      activeValue: {
        immediate: true,
        handler(value) {
          // console.log(value);
          // var that = this;
          // var activeValue = that.activeValue.concat(); 
          // console.log('cut---------------');
          // console.log(activeValue);
          // var tmp_res = [];//用来存储arrcut的拷贝
          //从倒数第二项开始遍历，最后一项忽略，通过value找到item
          // activeValue.forEach(function(value) {
          //   console.log(value);

          // });

        //   var parent = {value:'',index:''};
        //   tmp.forEach(function(t) {
        //     if(item.value==t[menuIndex]) {
        //       parent.value = t[menuIndex-1];//父元素
        //       parent.index = menuIndex-1;
        //       //用parent,item在options中找到item
        //       var it = that.findParent(parent,item);
        //       if(that.isAllSelect(it)) {
        //         t.splice(menuIndex-1,t.length);
        //         if(tmp_cut.indexOf(t.toString())==-1) {
        //           tmp_cut.push(t);
        //         }
        //       }                                
        //     }
        //   })
        }
      }
    },

    computed: {
      activeOptions: {
        cache: false,
        get() {
          const activeValueTmp = this.activeValueTmp;//用副本触发菜单的变化
          
          // const multiple = this.multiple;

          const configurableProps = ['label', 'value', 'children', 'disabled'];

          const formatOptions = options => {
            options.forEach(option => {
              if (option.__IS__FLAT__OPTIONS) return;
              configurableProps.forEach(prop => {
                const value = option[this.props[prop] || prop];
                if (value) option[prop] = value;
              });
              if (Array.isArray(option.children)) {
                formatOptions(option.children);
              }
            });
          };

          const loadActiveOptions = (options, activeOptions = []) => {
            
            // if(multiple) {
              const level = activeOptions.length;//当前已展开的级数
            
              activeOptions[level] = options;
              //不需要循环，只要计算最后一项即可
              if(activeValueTmp.length>0) {
                let active = activeValueTmp[level];
                if (isDef(active)) {
                  options = options.filter(option => option.value === active)[0];
                  if (options && options.children) {
                    loadActiveOptions(options.children, activeOptions);
                  }
                }
              }
            // } else {

              // const level1 = activeOptions.length;//当前已展开的级数
              // activeOptions[level1] = options;
              // let active1 = activeValue[level1];
              // if (isDef(active1)) {
              //   options = options.filter(option => option.value === active1)[0];
              //   if (options && options.children) {
              //     loadActiveOptions(options.children, activeOptions);
              //   }
              // }
            // }

            return activeOptions;
          };

          formatOptions(this.options);
          return loadActiveOptions(this.options);
        }
      },
     
      // //分级数组
      // level_arrs: function(){
      //   var arr1 = [];
      //   var arr2 = [];
      //   var arr3 = [];
      //   var val1 = [];
      //   var val2 = [];
      //   var val3 = [];
      //   var arrs = [arr1, arr2, arr3];
      //   var values = [val1,val2,val3];
      //   var that = this;        
      //   var keys = that.keys;
       
      //   for (var i = 0; i < keys.length; i++) {
      //       that.testOptions.forEach(function (option) {
      //           if (option[keys[i]] && values[i].indexOf(option[keys[i]])==-1) {
      //               values[i].push(option[keys[i]]);
      //               var tmp = {};
      //               tmp.value = option[keys[i]];
      //               if (option['_' + keys[i]]) {
      //                   tmp.label = option['_' + keys[i]];
      //               } else {
      //                   tmp.label = tmp.value;
      //               }
      //               if(i==0) {
      //                   tmp.pid = 0;
      //               } else {
      //                   var value = option[keys[i-1]] || option[keys[i - 2]] || option[keys[i - 3]];
      //                   tmp.pid = value;
      //               }
      //               arrs[i].push(tmp);
      //           }
      //       })
      //   }
      //   return arrs;

      // },
      // options: function() {
      //   var that = this;
      //   function fn(data, pid) {
      //     var result = [], temp;
      //     for (var i = 0; i < data.length; i++) {
      //         if (data[i].pid == pid) {
      //             var obj = { "label": data[i].label, "value": data[i].value };
      //             temp = fn(data, data[i].value);
      //             if (temp.length > 0) {
      //                 obj.children = temp;
      //             }
      //             result.push(obj);
      //         }
      //     }
      //     return result;
      //   } 
      //   var temparr = [];
      //   for(var i = 0; i < that.level_arrs.length; i++) {
      //     temparr = temparr.concat(that.level_arrs[i]);
      //   }
      //   that.allarr = temparr;
      //   var res = fn(temparr, 0);
      //   return res;
      // }
    },

    methods: {
      findParent(item) {
        var that = this;
        var pid = item.pid;
        var parent = {};
        function traverseTree(node) {
    
          if(node.value == pid) {
            parent =  node;
          }
          if (node.children && node.children.length > 0) {
            var i = 0;
            for (i = 0; i < node.children.length; i++) {
              traverseTree(node.children[i]);
            }
          }
        }

        for(var i = 0; i < that.options.length; i++) {
          traverseTree(that.options[i]);
        }

        return parent;
        
      },
      childSelectedNum(item, menuIndex) {
        var count = 0;
        var that = this;
        if(item.children) {
          item.children.forEach(function(child){
            if(that.isAllSelected(child, menuIndex)) {
              count++;
            }
          });
        } else {
          item.forEach(function(option) {
            if(that.isAllSelected(option, 0)) {
              count++;
            }
          })
        }
        return count;
      },
      //单个元素是否禁用
      isDisabled(item, menuIndex) {
        //没有层级的禁用
        if(!this.levelLimit || this.levelLimit.length==0) {
          var disabled = false;
          var index = [];
          var disOp = this.disabledOptions.concat();
          if(disOp && disOp.length > 0) {
            disOp.forEach(function(group,idx) {
              group = group.split('/');
              if(group[menuIndex]===item.value) {
                index.push(idx);
              } 
            });
            disabled = index.length > 0 ? true : false;
          }
          return {
            disabled: disabled,
            index: index
          }
        } else {//启用层级禁用
          var that = this;
          if(that.isAllSelected(item, menuIndex)) {
            item.disabled = false;
            return false;
          } else {
            var limit = that.levelLimit[menuIndex];
            //其父项的子项被选中的个数是否大于其层级的limit
            var parent = {};
            if(item.pid==0) {
              parent = that.options;
            } else {
              parent = that.findParent(item);
            }
            if(that.childSelectedNum(parent, menuIndex) == limit){
              item.disabled = true;
              return true;
            } else {
              item.disabled = false;
              return false;
            }
          }
        }
      },
      isAllDisabled(item, menuIndex) {
        var that = this;
        if(item.children) {//若子元素全部被禁用，父元素就被禁用
          if(item.childlen == that.isDisabled(item, menuIndex).index.length) {
            item.disabled = true;
            return true;
          } else {
            item.disabled = false;
            return false;
          }
        } else {
          item.disabled = that.isDisabled(item, menuIndex).disabled;
          return that.isDisabled(item, menuIndex).disabled;
        }
      },
      //单个元素是否被选中
      isSelected(item, menuIndex) {
        var that = this;
        var selected = false;
        var index = [];

        if(that.activeValue.length > 0) {
          that.activeValue.forEach(function(group,idx) {
            if(group[menuIndex]===item.value) {
              index.push(idx);
            } 
          });
          selected = index.length > 0 ? true : false;
        }
          
        return {
          selected: selected,
          index: index
        }
      },
      //单个元素是否在hover列中
      isHover(item, menuIndex) {
        if(this.activeValueTmp[menuIndex] == item.value) {
          return true;
        } else {
          return false;
        }
      },
     
      handleMenuLeave() {
        this.$emit('menuLeave');                                                                                                                                                                                       
      },

      //点击最后一级，click确认选择项，传给父组件
      setSelect(item, menuIndex) {
        var arr = [];
        var that = this;
        var tmp = [];
        arr = that.activeValueTmp.concat();
        tmp = that.activeValue.concat();
        var index = [];
        tmp.forEach(function(val,idx) {
          if(val.toString()===arr.toString()) {
            index.push(idx);
          }
        })
        if(index.length>0) {
          tmp.splice(index,1);
        } else {
          tmp.push(arr);
        }
        that.activeValue = tmp;
        // console.log(that.activeValue);
        // console.log('last pick');
        //对数据进行裁剪
        // var tmp_cut = tmp.concat();
        // var tmp_res = [];//用来存储arrcut的拷贝
        // console.log(tmp_cut);
        // var parent = {value:'',index:''};
        // tmp.forEach(function(t) {
        //   if(item.value==t[menuIndex]) {
        //     parent.value = t[menuIndex-1];//父元素
        //     parent.index = menuIndex-1;
        //     //用parent,item在options中找到item
        //     var it = that.findParent(parent,item);
        //     if(that.isAllSelect(it)) {
        //       t.splice(menuIndex-1,t.length);
        //       if(tmp_cut.indexOf(t.toString())==-1) {
        //         tmp_cut.push(t);
        //       }
        //     }                                
        //   }
        // })
        // that.options.forEach(function(option) {
        //   if()
        // })

      
        that.$emit('pick', that.activeValue.slice(), false);
      },
      //判断两个数组是否相等
      isArrayEqual(a, b) {
        if(a.length != b.length) {
          return false;
        } else {
          var equal = 1;
          for(var i = 0; i < a.length; i++) {
            if(a[i] !== b[i]) {
              equal = 0;
              break;
            } else {
              equal = equal * 1;
            }
          }
          return equal == 1 ? true : false;
        }
      },

      //点击非最后一级，将其和所有子项全部选择或取消选择，
      setChildSelect(item, menuIndex) {
        var that = this;
        var activeValue = that.activeValue.concat();
        var array = that.selectAll(item, menuIndex);
        var selected = that.isAllSelected(item, menuIndex);

        array.forEach(function(arr){//新增的数据
          var idx = -1;
          for(var i = 0; i < activeValue.length; i++) {
            if(that.isArrayEqual(activeValue[i], arr)) {
              idx = i;
              break;
            }
          }

          //若此项未选，则把所有的加入；
   
          if(selected) {
            if(idx!==-1) {
            activeValue.splice(idx,1);
            }
          } else {
            if(idx==-1) {
              activeValue.push(arr);
            }
          }
        });
        that.activeValue = activeValue;
        that.$nextTick(function () {
          that.$emit('pick', that.activeValue.slice(), false);//值已经成功传给父组件，但现在无法正常显示
        });
       
        
      },
      //计算子项的个数
      // sumChildren(obj) {
      //   debugger
      //   var that = this;
      //   if (obj.children && obj.children.length > 0) {
      //     for(var i = 0; i < obj.children.length; i ++) {
      //       console.log(obj.children[i]);
      //       that.sumChildren(obj.children[i]);
      //     }
      //       // obj.children.forEach(ele => {
      //       //     this.sumChildren(ele);
      //       // });
      //   } else {
      //       this.total = this.total + 1;
      //   }
      //   return this.total;

      // },

      //子项是否全部被选中（包括最后一级）
      isAllSelected(item, menuIndex) {
        var that = this;

        if(item.children) {
          if(item.childlen == that.isSelected(item, menuIndex).index.length) {
            return true;
          } else {
            return false;
          }
        } else {
          return that.isSelected(item, menuIndex).selected;
        }
      },

      //判断两个值是否在同一级
      isEqualLevel(a,b) {
        var level_a = 0;
        var level_b = 0;
        var that = this;
        that.level_arrs.forEach(function(arr, index) {
            for(var i = 0; i < arr.length; i++) {
                if(arr[i].value==a) {
                    level_a = index;
                }
                if (arr[i].value == b) {
                    level_b = index;
                }
            }
        })
        return level_b == level_a ? true : false;//b在a的下级
      },

      //选择元素及其所有子元素，以及其父项也要加入数组，要判断子项是否被禁用
      selectAll(item, menuIndex) {
        var arr = []; 
        var that = this;  
        that.tmparr = [];

        function circle(item) {
          //判断此时tmparr的最后一个值和当前值是否在同一级。如果是，则再pop一次
          if(that.isEqualLevel(that.tmparr[that.tmparr.length-1], item.value)) {
            that.tmparr.pop();
          }
          if(item.disabled) {
            // arr.pop();
          } else {
            that.tmparr.push(item.value);

          }
          
          if (item.children && item.children.length > 0) {
            if(that.levelLimit && that.levelLimit.length>0) {//层级禁用
              for(var x = 0; x < that.levelLimit[item.level+1]; x++) {
                //要判断可选项的数量有没有达到levelLimit
                if(item.children[x] && !item.children[x].disabled) {
                  circle(item.children[x]);
                }
              }
            } else {//无禁用项
              for(var y = 0; y < item.children.length; y++) {
                if(!item.children[y].disabled) {
                  circle(item.children[y]);
                }
                
              }
            }
           
           
          } else {
            arr.push(that.tmparr.concat());
            that.tmparr.pop();
          }
        } 
        circle(item);//到此为止加入了所有子项

        //加入父项
        //这里要判断该项是否被选中，若被选中，说明他和子项都被选了，此时应取消选择；
        //若未被选中，则把未选择的子项加入到activeValue中
       
        var pids = '';
        var allarr = that.allarr.concat();
        for(var j = 0; j < allarr.length; j++) {
          if(item.value == allarr[j].value) {
            if(allarr[j].pid != 0) {
              pids = allarr[j].pid;
              break;
            }
          }
        }
        if(pids!=='') {
          arr.forEach(function(t) {
            t.unshift(pids);
          })
        }
        
        return arr;
      },
      //hover激活子菜单
      openNext(item, menuIndex) { 
            
        var that = this;
        const len1 = that.activeOptions.length;
        const len2 = that.activeValueTmp.length;
        // var flag = that.isSelected(item, menuIndex);
        
        //当前项已选,将包含他的都删除
        // if(flag.selected) {
          // var tmpArr = [];
          // that.activeValueTmp.forEach(function(group,i) {
          //   if(flag.index.indexOf(i)==-1) {
          //     tmpArr.push(that.activeValueTmp[i]);
          //   }
          // })
          // console.log(tmpArr);
          // console.log(flag.index);
          // that.activeValueTmp = that.activeValue.concat()[flag.index[0]];
          // let _arr = tmp[tmpLength-1];
          // let _arr1 = [];
          // _arr1 = _arr.slice(0,menuIndex);
          // _arr1.push(item.value);
          // tmp.push(_arr1);
          // that.activeValueTmp = tmpArr;
        // } else {
          //当前项未选
          var tmp = that.activeValueTmp;
          
          if(len2==0) {
            //第一次hover，将该项所有子结点都选中
            // this.activeValue[len2]=[item.value]; //------------对象的新属性不会触发模型的变化
            // that.activeValueTmp = [[item.value]];
            // console.log(that.activeValueTmp); 
            // that.activeValueTmp = that.selectAll(item,menuIndex);
            
            that.activeValueTmp = [item.value];

          } else {
            
            // var tmpLength = tmp.length;
            //同级
            // if(tmp[tmpLength-1].length-1 == menuIndex) {
            if(tmp.length-1 == menuIndex) {
              
            //   //前一项未选，则替换
            //   if(that.activeValueTmp !== that.activeValue) {
            //     tmp[tmpLength-1].pop();
            //     tmp[tmpLength-1].push(item.value);
            //   } else {
            //     //前一项已选，则添加
            //     let _arr = tmp[tmpLength-1];
            //     let _arr1 = [];
            //     _arr1 = _arr.slice(0,menuIndex);
            //     _arr1.push(item.value);
            //     tmp.push(_arr1);
            //   }
              tmp.splice(menuIndex, 1, item.value);
            // } else if( tmp[tmpLength-1].length-1 < menuIndex ) {
            } else if( tmp.length-1 < menuIndex ) {
              
              //向下
              // tmp[tmpLength-1].push(item.value);
              tmp.push(item.value);
            } else {
              //向上
              // tmp[tmpLength-1].splice(menuIndex+1,tmp[tmpLength-1].length);
              // tmp[tmpLength-1].pop();
              // tmp[tmpLength-1].push(item.value);
              // tmp[tmpLength-1].splice(menuIndex,tmp[tmpLength-1].length,item.value);
              tmp.splice(menuIndex, tmp.length, item.value);
            }
            that.activeValueTmp = tmp;
          }
        // }
      },
      //激活子菜单
      // activeItem(item, menuIndex) {
      //   //单选
      //   if(!this.multiple) {
      //     // debugger
      //     const len = this.activeOptions.length;
      //     this.activeValue.splice(menuIndex, len, item.value);
      //     this.activeOptions.splice(menuIndex + 1, len, item.children);
       
      //     if (this.changeOnSelect) {
      //       this.$emit('pick', this.activeValue.slice(), false);
      //     } else {
      //       this.$emit('activeItemChange', this.activeValue);
      //     }
      //   } else {       
      //     //多选
      //     const len1 = this.activeOptions.length;
      //     const len2 = this.activeValue.length;

      //     var flag = this.isSelected(item, menuIndex);
      //     //当前项已选,可能存在不只一个条目中(除最后一个外),将包含他的都删除
      //     if(flag.selected) {
      //       var tmpArr = this.activeValue;
      //       flag.index.forEach(function(i) {
      //         //i表示所在的组的索引
       
      //         if(this.activeValue[i][menuIndex]!==item.value) {
      //           tmpArr.push(this.activeValue[i]);
      //         }
      //       })
            
      //       // this.activeValue[flag.index].splice(menuIndex,len1,item.value);
      //     } else {
      //       //当前项未选
      //       if(len2==0) {
      //         // this.activeValue[len2]=[item.value]; //对象的新属性不会触发模型的变化
      //         this.activeValue = [[item.value]];
      //         // this.activeValue = [item.value];
      //         // alert(activeValue);          
      //       } else {
      //         var tmp = this.activeValue;
      //         tmp[len2-1].push(item.value);
      //         this.activeValue = tmp;
      //         // this.activeValue[len2-1].push(item.value);
      //       }
           
      //     }
       
      //     // this.activeOptions.splice(menuIndex + 1, len1, item.children);
        
          

      //     if (this.changeOnSelect) {
      //       this.$emit('pick', this.activeValue.slice(), false);
            
      //     } else {
      //       this.$emit('activeItemChange', this.activeValue);
      //     }
      //   }
        
      // },
      scrollMenu(menu) {
        // scrollIntoView(menu, menu.getElementsByClassName('is-active')[0]);
      },
      handleMenuEnter() {
        this.$nextTick(() => this.$refs.menus.forEach(menu => this.scrollMenu(menu)));
      }
    },

    render(h) {
      const {
        activeValue,
        activeValueTmp,
        activeOptions,
        visible,
        expandTrigger,
        popperClass
      } = this;

      var that = this;

      const menus = this._l(activeOptions, (menu, menuIndex) => {
      
        let isFlat = false;
        const items = this._l(menu, item => {
          const events = {
            on: {}
          };
          item.level = menuIndex;
          if (item.__IS__FLAT__OPTIONS) isFlat = true;
          if (item.disabled !== true) {
            if (item.children) {
              events.on.mouseenter = () => {  
                that.openNext(item, menuIndex);
                that.$nextTick(() => {
                  that.scrollMenu(that.$refs.menus[menuIndex]);
                  that.scrollMenu(that.$refs.menus[menuIndex + 1]);
                });
              };
              events.on.click = () => {
                that.setChildSelect(item, menuIndex);
                that.scrollMenu(that.$refs.menus[menuIndex]);
                that.scrollMenu(that.$refs.menus[menuIndex + 1]);
              };
            } else {
              events.on.mouseenter = () => {
                that.openNext(item, menuIndex);
                that.$nextTick(() => {
                  that.scrollMenu(that.$refs.menus[menuIndex]);
                });
              };
              events.on.click = () => {
                that.setSelect(item, menuIndex);
                that.scrollMenu(that.$refs.menus[menuIndex]);
              };
            }
          }

          return (
            <li
              class={{
                'el-cascader-menu__item': true,
                'el-cascader-menu__item--extensible': item.children,
                'is-active': that.isAllSelected(item, menuIndex),
                'is-hover': that.isHover(item, menuIndex),
                'is-disabled': that.isAllDisabled(item, menuIndex),
                'is-multiple': true
              }}
              {...events}
            >
              {item.label}
            </li>
          );
        });
        let menuStyle = {};
        if (isFlat) {
          menuStyle.minWidth = this.inputWidth + 'px';
        }

        return (
          <ul
            class={{
              'el-cascader-menu': true,
              'el-cascader-menu--flexible': isFlat
            }}
            style={menuStyle}
            refInFor
            ref="menus">
            {items}
          </ul>
        );
      });
      
      return (
        <transition name="el-zoom-in-top" on-before-enter={this.handleMenuEnter} on-after-leave={this.handleMenuLeave}>
          <div
            v-show={visible}
            class={[
              'el-cascader-menus',
              popperClass
            ]}
            ref="wrapper"
          >
            {menus}
          </div>
        </transition>
      );
    }

    
  };
</script>
