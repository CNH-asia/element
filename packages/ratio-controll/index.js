import RatioController from './src/main';

/* istanbul ignore next */
RatioController.install = function (Vue) {
    Vue.component(RatioController.name, RatioController);
};

export default RatioController;
