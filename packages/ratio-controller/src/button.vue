<template>
<div style="display:inline-block;vertical-align: middle;">
  <div class="el-ratio-controller__bar" :style="barStyle">
    <div class="el-ratio-controller__bar-text" :class="{'bar-text-red':percent==0}">{{percent}}%</div>
    <div class="el-ratio-controller__bar-tip">{{ index+1 }}</div>
    <div v-if="desc&&desc!==''" class="el-ratio-controller__bar-desc">{{ desc }}</div>
  </div>
  <div
    v-if="index!==limits.length-1"
    class="el-ratio-controller__button-wrapper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="onButtonDown"
    :class="{ 'hover': hovering, 'dragging': dragging }"
    :style="wrapperStyle"
    ref="button">
    <!-- <el-tooltip placement="top" ref="tooltip" :disabled="!showTooltip">
      <span slot="content">{{ formatValue }}</span>
      <div class="el-ratio-controller__button" :class="{ 'hover': hovering, 'dragging': dragging, 'nodrag': index==limits.length-1 }">
        <span class="el-ratio-controller__label">{{label}}</span>
      </div>
    </el-tooltip> -->
    <!-- <div class="el-ratio-controller__desc">
      <div class="desc-title">{{name}}</div>
      <div v-if="desc&&desc!==''" class="desc-text">({{desc}})</div>
    </div> -->
  </div>
  
</div>
  
</template>

<script>
  import ElTooltip from 'element-ui/packages/tooltip';

  export default {
    name: 'ElRatioControllerButton',

    components: {
      ElTooltip
    },

    props: {
      value: {
        type: Number,
        default: 0
      },
      name: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      percent: {
        type: Number,
        default: 0
      },
      barWidth: {
        type: Number,
        default: 0
      },
      btnPos: {
        type: Number,
        default: 0
      },
      isZero:{
        type: Boolean,
        default: false
      },
      noDrag:{
        type: Boolean,
        default: false
      },
      label:{
        type: Number,
        default: ''
      },
      limits: {
        type: Array,
        default: []
      },
      index: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        hovering: false,
        dragging: false,
        startX: 0,
        currentX: 0,
        startY: 0,
        currentY: 0,
        startPosition: 0,
        newPosition: null,
        oldValue: this.value
      };
    },

    computed: {
      disabled() {
        return this.$parent.disabled;
      },

      max() {
        return this.$parent.max;
      },

      min() {
        return this.$parent.min;
      },

      step() {
        return this.$parent.step;
      },

      showTooltip() {
        return this.$parent.showTooltip;
      },

      precision() {
        return this.$parent.precision;
      },

      currentPosition() {
        return `${ 100 * this.btnPos/this.$parent.sliderSize }%`;
      },

      enableFormat() {
        return this.$parent.formatTooltip instanceof Function;
      },

      formatValue() {
        return this.enableFormat && this.$parent.formatTooltip(this.value) || this.value;
      },

      wrapperStyle() {
        return { left: this.currentPosition };
      },

      barStyle() {
        var parentWidth = this.$parent.sliderSize;
        var barBgColor = this.isZero ? 'transparent':'#d2d9e3';
        var barWidth = this.isZero ? '48px' : this.barWidth+'px';
        return { width: barWidth, backgroundColor: barBgColor};
      }

    },

    watch: {
      dragging(val) {
        this.$parent.dragging = val;
      }
    },

    methods: {
      displayTooltip() {
        this.$refs.tooltip && (this.$refs.tooltip.showPopper = true);
      },

      hideTooltip() {
        this.$refs.tooltip && (this.$refs.tooltip.showPopper = false);
      },

      handleMouseEnter() {
        this.hovering = true;
        this.displayTooltip();
      },

      handleMouseLeave() {
        this.hovering = false;
        this.hideTooltip();
      },

      onButtonDown(event) {
        if (this.disabled) return;
        this.onDragStart(event);
        event.preventDefault();
        window.addEventListener('mousemove', this.onDragging);
        window.addEventListener('mouseup', this.onDragEnd);
        window.addEventListener('contextmenu', this.onDragEnd);
      },

      onDragStart(event) {
        if(this.noDrag) return;
        this.dragging = true;
        this.startX = event.clientX;
        this.startPosition = parseFloat(this.currentPosition);
      },

      onDragging(event) {
        const that = this;
        function checkRange(index,type){
          if(type === "left"){
            if(index>0){
              if(that.limits[index-1].isZero){
                return checkRange(index-1,type)
              }else{
                return that.limits[index-1].pos
              }
            }else{
              return 0;
            }
          }

          if(type === "right"){
            if(index+2<that.limits.length){
              if(that.limits[index+2].isZero){
                return checkRange(index+1,type)
              }else{
                return that.limits[index+1].pos
              }
            }else{
              return 100;
            }
          }
        }

        if(this.index>0) {
          var leftPos = checkRange(this.index,"left");
        }
        var rightPos = checkRange(this.index,"right");


        if (this.dragging) {
          this.displayTooltip();
          let diff = 0;

          // if(this.index>0) {
          //   var leftPos = this.limits[this.index-1].pos;
          // }
          // var rightPos = this.limits[this.index+1].pos;
          var scale = 48*100/this.$parent.sliderSize;

          this.currentX = event.clientX;
          
          if((this.isZero && this.currentX < this.startX) || (this.limits[this.index+1].isZero && this.currentX > this.startX )) {
            return;
          }

          diff = (this.currentX - this.startX) / (this.$parent.sliderSize || this.$parent.$el.offsetWidth) * 100;
          this.newPosition = this.startPosition + diff;

          if(this.index>0 && this.newPosition < leftPos) {
            console.log('1111111');
            this.newPosition = leftPos;
            this.setPosition(this.newPosition);
          } 
          else if(this.newPosition > rightPos) {
            console.log('2222222222');
            this.newPosition = rightPos-scale;
            this.setPosition(this.newPosition);
          // else if(!this.limits[this.index+1].isZero && this.newPosition > rightPos) {
          //   console.log('2222222222');
          //   this.newPosition = rightPos-scale;
          //   this.setPosition(this.newPosition);
            
          } else {
            console.log('333333333333');
            // this.currentX = event.clientX;
            // diff = (this.currentX - this.startX) / (this.$parent.sliderSize || this.$parent.$el.offsetWidth) * 100;
            // this.newPosition = this.startPosition + diff;
            this.setPosition(this.newPosition);
            
          }
        }
      },

      onDragEnd(event) {
        if (this.dragging) {

          /*
           * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
           * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
           */
          setTimeout(() => {
            this.dragging = false;
            this.hideTooltip();
            this.setPosition(this.newPosition);
          }, 0);

          window.removeEventListener('mousemove', this.onDragging);
          window.removeEventListener('mouseup', this.onDragEnd);
          window.removeEventListener('contextmenu', this.onDragEnd);
        }
      },

      setPosition(newPosition) {
        if(newPosition === null) return;
        // if(this.index>0) {
        //   var leftPos = this.limits[this.index-1].pos;
        // }
        // var thisPos = this.limits[this.index].pos;
        // var rightPos = this.limits[this.index+1].pos;
        // var isZero = this.limits[this.index].isZero;
        // var scale = 48*100/this.$parent.sliderSize;
        // console.log(isZero, leftPos, thisPos, newPosition);
        
        //向左
        // if(this.index!==0 && newPosition < thisPos) {
        //   console.log('left-----------');
        //   //为0
        //   // newPosition = 50;
        //   if(isZero) {
        //     console.log(1);
        //     this.$nextTick(function() {
        //       newPosition = this.limits[this.index].pos;
        //     })
            
        //   } else {
        //     if(newPosition < leftPos){
        //       this.$nextTick(function() {
        //         newPosition = this.limits[this.index-1].pos;
        //     })
        //       // newPosition = leftPos;
        //     }
        //   }
          
        // } else if(newPosition > thisPos){//向右
        //   if(this.limits[this.index+1].isZero) {
        //     newPosition = thisPos;
        //   }
        //   if(newPosition > rightPos) {
        //     newPosition = rightPos;
        //   }
        // }

        //防止滑出轨道
        
        if(newPosition < 0) {
          newPosition = 0;
        } else if (newPosition > 100) {
          newPosition = 100;
        }  

        // else if(this.index!==0 && newPosition < leftPos) {
        //   console.log(2);
        //   newPosition = leftPos;
        // } 
        // else if(newPosition > thisPos && this.limits[this.index+1].isZero) {
        //   console.log(3);
        //   newPosition = thisPos;
        // } else if(newPosition > rightPos && !this.limits[this.index+1].isZero){

        // }
        // else if(newPosition > rightPos){
        //   console.log(4);
        //   newPosition = rightPos;
        // } 
        

        // ------------------
        // if(this.index!==0 && newPosition < leftPos) {
        //   console.log(1);
        //   newPosition = leftPos;
        // } else if(this.index!==0 && newPosition > leftPos && newPosition < (leftPos + scale) && this.isZero) {
        //   console.log(2);
        //   newPosition = leftPos + scale;
        // } else if(newPosition > rightPos) {
        //   console.log(3);
        //   newPosition = rightPos;
        // } else if(newPosition < rightPos && newPosition > (rightPos-scale) && this.limits[this.index+1].isZero) {
        //   console.log(4);
        //   newPosition = rightPos - scale;
        // } else if(newPosition < 0) {
        //   console.log(5);
        //   newPosition = 0;
        // } else if (newPosition > 100) {
        //   console.log(6);
        //   newPosition = 100;
        // }  

        console.log(newPosition,'-------------');
        const lengthPerStep = 100 / ((this.max - this.min) / this.step);
        const steps = Math.round(newPosition / lengthPerStep);
        let value = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min;
        value = parseFloat(value.toFixed(this.precision));
        this.$emit('input', value);
        console.log('=================',value);
        this.$refs.tooltip && this.$refs.tooltip.updatePopper();
        if (!this.dragging && this.value !== this.oldValue) {
          this.oldValue = this.value;
        }
      }
    }
  };
</script>
