<template>
  <div class="el-input-number"
    v-clickoutside="handleClickoutside"
    :class="[
      size ? 'el-input-number--' + size : '',
      { 'is-disabled': disabled },
      { 'is-without-controls': !controls}
    ]"
  >
    <span
      v-if="controls"
      class="el-input-number__decrease"
      :class="[{'is-disabled': minDisabled},{'hover':isDec}]"
      v-repeat-click="decrease"
    >
      <i class="el-icon-minus"></i>
    </span>
    <span
      v-if="controls"
      class="el-input-number__increase"
      :class="[{'is-disabled': maxDisabled},{'hover':isInc}]"
      v-repeat-click="increase"
    >
      <i class="el-icon-plus"></i>
    </span>
    <el-input
      :value="currentInputValue"
      @keydown.up.native.prevent="increase"
      @keydown.down.native.prevent="decrease"
      @blur="handleBlur"
      @input="debounceHandleInput"         
      :disabled="disabled"
      :size="size"
      :max="max"
      :min="min"
      ref="input"
      :class="{'focus': isInput}"
    >
        <template slot="prepend" v-if="$slots.prepend">
          <slot name="prepend"></slot>
        </template>
        <template slot="append" v-if="$slots.append">
          <slot name="append"></slot>
        </template> 
    </el-input>
  </div>
</template>
<script>
  import ElInput from 'element-ui/packages/input';
  import { once, on } from 'element-ui/src/utils/dom';
  import debounce from 'throttle-debounce/debounce';
  import Clickoutside from 'element-ui/src/utils/clickoutside';

  export default {
    name: 'ElInputNumber',
    directives: {
      repeatClick: {
        bind(el, binding, vnode) {
          let interval = null;
          let startTime;
          const handler = () => vnode.context[binding.expression].apply();
          const clear = () => {
            if (new Date() - startTime < 100) {
              handler();
            }
            clearInterval(interval);
            interval = null;
          };

          on(el, 'mousedown', () => {
            startTime = new Date();
            once(document, 'mouseup', clear);
            clearInterval(interval);
            interval = setInterval(handler, 100);
          });
        }
      },
      Clickoutside
    },
    components: {
      ElInput
    },
    props: {
      step: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: -Infinity
      },
      value: {
        default: 0
      },
      disabled: Boolean,
      size: String,
      controls: {
        type: Boolean,
        default: true
      },
      debounce: {
        type: Number,
        default: 300
      },
      precision: {
        type: Number,
        validator(val) {
          return val >= 0 && val === parseInt(val, 10);
        }
      }
    },
    data() {
      return {
        currentValue: 0,
        isInc: false,
        isDec: false,
        isInput: false
      };
    },
    watch: {
      value: {
        immediate: true,
        handler(value) {
          let newVal = Number(value);
          if (isNaN(newVal)) return;
          if (newVal >= this.max) newVal = this.max;
          if (newVal <= this.min) newVal = this.min;
          this.currentValue = newVal;
          this.$emit('input', newVal);
        }
      }
    },
    computed: {
      minDisabled() {
        return this._decrease(this.value, this.step) < this.min;
      },
      maxDisabled() {
        return this._increase(this.value, this.step) > this.max;
      },
      numPrecision() {
        const { value, step, getPrecision, precision } = this;
        const stepPrecision = getPrecision(step);
        if (precision !== undefined) {
          if (stepPrecision > precision) {
            console.warn('[Element Warn][InputNumber]precision should not be less than the decimal places of step');
          }
          return precision;
        } else {
          return Math.max(getPrecision(value), stepPrecision);
        }
      },
      currentInputValue() {
        const currentValue = this.currentValue;
        if (typeof currentValue === 'number' && this.precision !== undefined) {
          return currentValue.toFixed(this.precision);
        } else {
          return currentValue;
        }
      }
      // precision() {
      //   const { value, step, getPrecision } = this;
      //   return Math.max(getPrecision(value), getPrecision(step));
      // }
    },
    methods: {
      toPrecision(num, precision) {
        if (precision === undefined) precision = this.numPrecision;
        return parseFloat(parseFloat(Number(num).toFixed(precision)));
      },
      
      getPrecision(value) {
        const valueString = value.toString();
        const dotPosition = valueString.indexOf('.');
        let precision = 0;
        if (dotPosition !== -1) {
          precision = valueString.length - dotPosition - 1;
        }
        return precision;
      },
      _increase(val, step) {
        if (typeof val !== 'number') return this.currentValue;

        const precisionFactor = Math.pow(10, this.numPrecision);

        return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
      },
      _decrease(val, step) {
        if (typeof val !== 'number') return this.currentValue;

        const precisionFactor = Math.pow(10, this.numPrecision);

        return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
      },
      increase() {
        if (this.disabled || this.maxDisabled) return;
        const value = this.value || 0;
        const newVal = this._increase(value, this.step);
        if (newVal > this.max) return;
        this.setCurrentValue(newVal);
        this.isDec = false;
        this.isInc = true;
        this.isInput = true;
      },
      decrease() {
        if (this.disabled || this.minDisabled) return;
        const value = this.value || 0;
        const newVal = this._decrease(value, this.step);
        if (newVal < this.min) return;
        this.setCurrentValue(newVal);
        this.isDec = true;
        this.isInc = false;
        this.isInput = true;
      },
      handleBlur() {
        this.$refs.input.setCurrentValue(this.currentInputValue);
        this.isInc = false;
        this.isDec = false;
        this.isInput = false;
      },
      handleClickoutside() {
        this.isInput = false;
        this.isInc = false;
        this.isDec = false;
      },
      setCurrentValue(newVal) {
        const oldVal = this.currentValue;
        if (typeof newVal === 'number' && this.precision !== undefined) {
          newVal = this.toPrecision(newVal, this.precision);
        }
        if (newVal >= this.max) newVal = this.max;
        if (newVal <= this.min) newVal = this.min;
        if (oldVal === newVal) {
          this.$refs.input.setCurrentValue(this.currentInputValue);
          return;
        }
        this.$emit('input', newVal);
        this.$emit('change', newVal, oldVal);
        this.currentValue = newVal;
      },
      // setCurrentValue(newVal) {
      //   const oldVal = this.currentValue;
      //   if (newVal >= this.max) newVal = this.max;
      //   if (newVal <= this.min) newVal = this.min;
      //   if (oldVal === newVal) {
      //     this.$refs.input.setCurrentValue(this.currentValue);
      //     return;
      //   }
      //   this.$emit('change', newVal, oldVal);
      //   this.$emit('input', newVal);
      //   this.currentValue = newVal;
      // },
      handleInput(value) {
        if (value === '') {
          return;
        }
        const newVal = Number(value);
        if (!isNaN(newVal)) {
          this.setCurrentValue(newVal);
        } else {
          this.$refs.input.setCurrentValue(this.currentValue);
        }
      }
    },
    created() {
      this.debounceHandleInput = debounce(this.debounce, value => {
        this.handleInput(value);
      });
    }
  };
</script>
