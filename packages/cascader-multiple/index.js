import CascaderMultiple from './src/main';

/* istanbul ignore next */
CascaderMultiple.install = function(Vue) {
  Vue.component(CascaderMultiple.name, CascaderMultiple);
};

export default CascaderMultiple;
