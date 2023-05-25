/*
 * @Author: Alchemistyui
 * @Date: 2023-05-24
 * @LastEditTime: 2023-05-25
 * @FilePath: /random_select/src/main.js
 * @Description: 
 * 
 * Copyright (c) 2023, All Rights Reserved. 
 */
// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')