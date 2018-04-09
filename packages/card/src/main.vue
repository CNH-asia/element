<template>
  <div class="el-card" 
    :type="nativeType"
    :class="
      type ? 'el-card--' + type : ''">
      <div class="el-card__header" v-if="$slots.header">
        <slot name="header"></slot>
      </div>
    
    <div class="el-card__body" >
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElCard',
    props: {
      nativeType: {
        type: String,
        default: 'comp'
      },
      type: {
        type: String,
        default: 'comp'
      }
    }
  };
</script>
