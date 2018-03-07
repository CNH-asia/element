<template>
  <transition name="el-zoom-in-top" @after-leave="$emit('dodestroy')">
    <div
      v-show="currentVisible"
      :style="{width: width + 'px'}"
      class="el-time-panel"
      :class="popperClass">
      <div class="el-time-panel__content" :class="{ 'has-seconds': showSeconds }">
        <time-spinner
          ref="spinner"
          @change="handleChange"
          :show-seconds="showSeconds"
          @select-range="setSelectionRange"
          :hours="hours"
          :minutes="minutes"
          :seconds="seconds">
        </time-spinner>
      </div>
      <div class="el-time-panel__footer">
        <button
          type="button"
          class="el-time-panel__btn cancel"
          @click="handleCancel">{{ t('el.datepicker.cancel') }}</button>
        <button
          type="button"
          class="el-time-panel__btn confirm"
          @click="handleConfirm()">{{ t('el.datepicker.confirm') }}</button>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import { limitRange } from '../util';
  import Locale from 'element-ui/src/mixins/locale';

  export default {
    mixins: [Locale],

    components: {
      TimeSpinner: require('../basic/time-spinner')
    },

    props: {
      pickerWidth: {},
      date: {
        default() {
          return new Date();
        }
      },
      visible: Boolean
    },

    watch: {
      visible(val) {
        this.currentDate = this.date;
        this.currentVisible = val;
        this.hours = this.date.getHours();
        this.minutes = this.date.getMinutes();
        this.seconds = this.date.getSeconds();
        if (val) {
          this.oldHours = this.hours;
          this.oldMinutes = this.minutes;
          this.oldSeconds = this.seconds;
        }
      },

      pickerWidth(val) {
        this.width = val;
      },

      value(newVal) {
        let date;
        if (newVal instanceof Date) {
          date = limitRange(newVal, this.selectableRange);
        } else if (!newVal) {
          date = new Date();
        }

        this.handleChange({
          hours: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds()
        });
        this.$nextTick(_ => this.ajustScrollTop());
      },

      selectableRange(val) {
        this.$refs.spinner.selectableRange = val;
      }
    },

    data() {
      return {
        popperClass: '',
        format: 'HH:mm:ss',
        value: '',
        hours: 0,
        minutes: 0,
        seconds: 0,
        oldHours: 0,
        oldMinutes: 0,
        oldSeconds: 0,
        selectableRange: [],
        currentDate: this.$options.defaultValue || this.date || new Date(),
        currentVisible: this.visible || false,
        width: this.pickerWidth || 0
      };
    },

    computed: {
      showSeconds() {
        return (this.format || '').indexOf('ss') !== -1;
      }
    },

    methods: {
      handleClear() {
        this.$emit('pick');
      },

      handleCancel() {
        // this.$emit('pick');
        
        this.currentDate.setHours(this.oldHours);
        this.currentDate.setMinutes(this.oldMinutes);
        this.currentDate.setSeconds(this.oldSeconds);
        this.hours = this.currentDate.getHours();
        this.minutes = this.currentDate.getMinutes();
        this.seconds = this.currentDate.getSeconds();
        var date = new Date(limitRange(this.currentDate, this.selectableRange, 'HH:mm:ss'));
        this.$emit('pick', date);

      },

      handleChange(date) {
        if (date.hours !== undefined) {
          this.currentDate.setHours(date.hours);
          this.hours = this.currentDate.getHours();
        }
        if (date.minutes !== undefined) {
          this.currentDate.setMinutes(date.minutes);
          this.minutes = this.currentDate.getMinutes();
        }
        if (date.seconds !== undefined) {
          this.currentDate.setSeconds(date.seconds);
          this.seconds = this.currentDate.getSeconds();
        }

        this.handleConfirm(true);//选择后输入框显示新值
      },

      setSelectionRange(start, end) {
        this.$emit('select-range', start, end);
      },

      handleConfirm(visible = false, first) {
        if (first) return;
        const date = new Date(limitRange(this.currentDate, this.selectableRange, 'HH:mm:ss'));
        this.$emit('pick', date, visible, first);
      },

      ajustScrollTop() {
        return this.$refs.spinner.ajustScrollTop();
      }
    },

    created() {
      // this.hours = this.currentDate.getHours();
      // this.minutes = this.currentDate.getMinutes();
      // this.seconds = this.currentDate.getSeconds();
      this.hours = this.date.getHours();
      this.minutes = this.date.getMinutes();
      this.seconds = this.date.getSeconds();
    },

    mounted() {
      this.$nextTick(() => this.handleConfirm(true, true));
      this.$emit('mounted');
    }
  };
</script>
