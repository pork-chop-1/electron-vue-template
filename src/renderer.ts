import { createApp } from 'vue'
import Antd from 'ant-design-vue'

import App from './App.vue'
import { setupStore } from './store'
import {router} from './router'

import 'ant-design-vue/dist/antd.css'
import './assets/style/index.scss'

const app = createApp(App)
app.use(Antd)
app.use(router)
setupStore(app)
app.mount('#root')
