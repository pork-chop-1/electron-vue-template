<template>
  <div>
    <a-modal 
      v-model:visible="_visible" 
      title="Basic Modal" 
      width="100%" 
      wrap-class-name="full-modal" 
      :footer="null"
      :getContainer="getContainer"
      :maskStyle="{
        position: 'absolute'
      }">
      <div class="login-methods">
        <div class="qr-login">
          扫描登录
        </div>
      </div>
      <div class="login-form-wrapper">
        <div class="qr-form">
          <div class="qr-wrapper">
            <img :src="qrImg" alt="加载中...">
          </div>
          <div class="qr-status">
            {{qrStatus.msg}}
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRef, watch, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { QRLogin } from '@/api/Login/index'
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['update:visible'])
const visible = toRef(props, 'visible')
const _visible = ref(visible.value)
// 设置弹窗挂载节点
const getContainer = () => 
  document.getElementById('router')
const loginMethod = ref('QR')
watch(visible, async (v) => {
  _visible.value  = v
  if(v) {
    if(loginMethod.value === 'QR') {
      await refreshQRImg()
      checkingStatus.value = true
    } else {
      checkingStatus.value = false
    }
  } else {
    checkingStatus.value = false
  }
})
watch(_visible, (v) => {
  // v-watch refresh
  emit('update:visible', v)
})

// QR relative
const qrStatus = ref({
  msg: '',
  code: 0
})

const key = ref('')
const qrImg = ref('')
const refreshQRImg = async () => {
  const res = await QRLogin.getQRKey()
  const QRImg = await QRLogin.createQR(res.data.unikey)
  key.value = res.data.unikey
  qrImg.value = QRImg.data.qrimg
}

const checkingStatus = ref(false)

const checkQRStatus = async () => {
  const res = await QRLogin.checkQR(key.value)
  qrStatus.value.msg = res.message
  qrStatus.value.code = res.code
  if(res.code === 800) {
    // outdate
  } else if(res.code === 802) {
    // scanning
  }  else if(res.code === 803) {
    // success
    window.storeAPI.set('api', res.cookie)
    _visible.value = false
    message.success('登录成功')
  } 
  
  if(checkingStatus.value) {
    setTimeout(checkQRStatus, 1000)
  }
}
watch(checkingStatus, (v) => {
  if(v) {
    checkQRStatus()
  }
})

onMounted(async () => {
})

</script>
<style>
</style>