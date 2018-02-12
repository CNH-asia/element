<template>
  <div class="el-ratio-controller">
    <div class="el-ratio-controller__runway"
      :class="{'disabled': disabled }"
      ref="slider">
      <!-- <div
        class="el-slider-multi__bar"
        :style="barStyle">
      </div> -->
      <ratio-controller-button
        v-for="(button,index) in ratios"
        :key="index"
        :label="index+1"
        :percent="value[index]"
        :name="button.name"
        :desc="button.desc"
        :bar-width="barWidths[index]"
        :btn-pos="btnPos[index]"
        :is-zero="currentValue[index]===currentValue[index-1]"
        :no-drag="index==ratios.length-1"
        :limits="limits"
        :index="index"
        v-model="currentValue[index]"
        :ref="`button${index+1}`">
      </ratio-controller-button>
     
    </div>
  </div>
</template>

<script type="text/babel">
  import ElInputNumber from 'element-ui/packages/input-number';
  import RatioControllerButton from './button.vue';
  import Emitter from 'element-ui/src/mixins/emitter';

  export default {
    name: 'ElRatioController',

    mixins: [Emitter],

    props: {
      vertical: {
        type: Boolean,
        default: false
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      value: {
        type: Array,
        default: []
      },
      showInput: {
        type: Boolean,
        default: false
      },
      showInputControls: {
        type: Boolean,
        default: true
      },
      showStops: {
        type: Boolean,
        default: false
      },
      clientStops:{
        type: Array
      },
      showTooltip: {
        type: Boolean,
        default: false
      },
      formatTooltip: Function,
      disabled: {
        type: Boolean,
        default: false
      },
      range: {
        type: Boolean,
        default: false
      },
      height: {
        type: String
      },
      ratios:{
        type: Array
      }, 
      disableMin: {
        type: Boolean,
        default: false
      }
    },

    components: {
      ElInputNumber,
      RatioControllerButton
    },

    data() {
      return {
        // firstValue: null,
        // secondValue: null,
        oldValue: [],
        dragging: false,
        sliderSize: 1,
        tipPos: null,//默认等距刻度
        clientPos: null,//自定义刻度
        isActived: false,
        stepWidth: 0,
        currentValue: [],
        isZero: false
      };
    },

    watch: {
      currentValue(val, oldVal) {
        var tmp1 = [];
        for(var i = 0; i < val.length; i++) {
          if(i==0) {
            tmp1.push(val[i])
          } else {
            tmp1.push(val[i]-val[i-1]);
          }
        }
        this.$emit('input',tmp1);
        // this.setValues();
      },
      value(val, oldVal) {
        this.setValues();
        var sum1 = 0;
        var that = this;
        var tmp = [];
        val.forEach(function(v,index) {
          index = index + 1;
          let button = 'button' + index;
          sum1 = sum1 + v;
          tmp.push(sum1);
          // that.$refs[button][0].setPosition((sum1-that.min)*100/(that.max-that.min));
        });
        // that.currentValue = tmp.slice();
        // that.oldValue = val.slice();
        
        // this.$refs.button1[0].setPosition((val-this.min)*100/(this.max-this.min));

        // if (val.every((item, index) => item === oldVal[index])) {
        //   return;
        // } else {
        //   this.setValues();
        //   // return val;
        // }
        // console.log('------------',this.currentValue);
        

      },

      dragging(val) {
        if (!val) {
          this.setValues();
        }
      },

      min() {
        this.setValues();
      },

      max() {
          let stopCount = (this.max - this.min) / this.step;
          let stepWidth = 100 * this.step / (this.max - this.min);
          this.stepWidth = stepWidth;

          let result = [0];
          for (let i = 1; i < stopCount; i++) {
              result.push(i * stepWidth);
          }
          result.push(100);
          this.tipPos = [];
          for(let j = 0; j <= stopCount; j++) {
              this.tipPos.push(this.min + j * this.step);
          }
          //todo
        // this.$refs.button1[0].setPosition((this.value-this.min)*100/(this.max-this.min));
        // this.setValues();
      }
    },

    methods: {
      valueChanged() {
        return !this.value.every((item, index) => item === this.oldValue[index]);
      },
      setValues() {
        const val = this.value;
        if (val[1] < this.min) {
          this.$emit('input', [this.min, this.min]);
        } else if (val[0] > this.max) {
          this.$emit('input', [this.max, this.max]);
        } else if (val[0] < this.min) {
          this.$emit('input', [this.min, val[1]]);
        } else if (val[1] > this.max) {
          this.$emit('input', [val[0], this.max]);
        } else {
          if (this.valueChanged()) {
            this.$emit('change', val);
            this.dispatch('ElFormItem', 'el.form.change', val);
            this.oldValue = val.slice();
          }
        }

      },

      // setPosition(percent) {
      //   alert('1111');
      //   console.log('percent:',percent);
      //   const targetValue = this.min + percent * (this.max - this.min) / 100;

      //   let button;
      //   if (Math.abs(this.minValue - targetValue) < Math.abs(this.maxValue - targetValue)) {
      //     button = this.firstValue < this.secondValue ? 'button1' : 'button2';
      //   } else {
      //     button = this.firstValue > this.secondValue ? 'button1' : 'button2';
      //   }
      //   // this.$refs[button].setPosition(percent);
      //   this.$refs.button1[0].setPosition(percent);
        
      // },

      resetSize() {
        if (this.$refs.slider) {
          this.sliderSize = this.$refs.slider['clientWidth'];
          
        }
      },
      handleChange(val) {
        // console.log(val);
      }
    },

    computed: {

      minValue() {
        return Math.min(this.firstValue, this.secondValue);
      },

      maxValue() {
        return Math.max(this.firstValue, this.secondValue);
      },

      //值为0的button个数
      zeroCount() {
        var count = 0;
        for(var i = 0; i < this.currentValue.length; i++) {
          if(this.currentValue[i]===this.currentValue[i+1] || this.currentValue[i]==this.min) {
            count++;
          }
        }
        return count;
      },

      //button的bar长度
      barWidths() {
        var widths = [];
        var that = this;
        var cval = that.currentValue.slice();
        for(var i = 0; i < cval.length; i++) {
          if(i==0) {
            widths.push(cval[0]);
          } else {
            let minus = cval[i]-cval[i-1];
            widths.push(minus);
          }
        }
        var runwayWidth = that.sliderSize;
        if(that.zeroCount>0) {
          var zeroC = that.zeroCount;
          if(that.currentValue[0]==0) {
            zeroC--;
          }
          runwayWidth = that.sliderSize - 48*zeroC;
        }
        widths.forEach(function(width,index) {
          widths.splice(index,1,runwayWidth*width/100);
        })
        return widths;
      },

      //button的位置
      btnPos() {
        var arr = [];
        var sum = 0;
        if(this.barWidths.length>0) {
          this.barWidths.forEach(function(width,index) {
            if(width==0&&index!==0) {
              width = 48;
            }
            sum = sum + width;
            arr.push(sum);
          })
        }
        return arr;
      },

      //button拖动时的限制
      limits() {
        var array = [];
        var that = this;
        this.btnPos.forEach(function(val, index) {
          
          let item = {
            pos: val/that.sliderSize*100,
            isZero: that.value[index]===0
          }
          console.log(item.pos);
          array.push(item);
        })

        return array;
      },

      precision() {
        let precisions = [this.min, this.max, this.step].map(item => {
          let decimal = ('' + item).split('.')[1];
          return decimal ? decimal.length : 0;
        });
        return Math.max.apply(null, precisions);
      }
    },
    mounted() {
      var that = this;
      if(!this.value || this.value.length !== this.ratios.length) {
        var sum0 = 0;
        that.ratios.forEach(function(btn,index) {
          sum0 = sum0 + btn.percent;
          that.currentValue.push(sum0);
          that.value.push(btn.percent);
        }) 
      } else {
        var sum = 0;
        that.value.forEach(function(val,index) {
          // index = index + 1;
          // let button = 'button'+ index;
          sum = sum + val;
          that.currentValue.push(sum);
        });
      }
      that.oldValue = that.value.slice();
     

      this.resetSize();
      window.addEventListener('resize', this.resetSize);
      this.$on('btnDrag', this.handleChange);
      
    },

    beforeDestroy() {
      window.removeEventListener('resize', this.resetSize);
    }
  };
</script>
