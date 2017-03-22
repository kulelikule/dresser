import Vue from 'vue';
import Dresser from '../../src/main';
import App from './components/App.vue';

import '../css/base.less';

Vue.use(Dresser);

new Vue({
    el: '#app',
    render: h => h(App)
});