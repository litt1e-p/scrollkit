<template>
  <refreshable :class="state.cla" :style="internStyle" ref="rl" :probeType="props.probeType" :click="props.click" :direction="props.direction" :scrollbar="props.scrollbar" :startY="props.startY" :freeScroll="props.freeScroll" :observeScroll="props.observeScroll" :observeBeforeScroll="props.observeBeforeScroll" :observeScrollEnd="props.observeScrollEnd" :mouseWheel="props.mouseWheel" :nestedScroll="props.nestedScroll" @scroll="_doScroll" @beforeScrollStart="_doBeforeScrollStart" @scrollEnd="_doScrollEnd">
    <slot></slot>
  </refreshable>
</template>

<script>
export default {
  name: 'scrollkit'
}
</script>

<script setup>

import { Refreshable } from 'refreshable'
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  probeType: {
    type: Number,
    default: 1
  },
  click: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    default: 'vertical' // horizontal
  },
  scrollbar: {
    type: null,
    default: false
  },
  startY: {
    type: Number,
    default: 0
  },
  freeScroll: {
    type: Boolean,
    default: false
  },
  observeScroll: {
    type: Boolean,
    default: false
  },
  observeBeforeScroll: {
    type: Boolean,
    default: false
  },
  observeScrollEnd: {
    type: Boolean,
    default: false
  },
  mouseWheel: {
    type: Boolean,
    default: false
  },
  nestedScroll: {
    type: [Object, Boolean],
    default: false
  }
})

const rl = ref(void 0)

const state = reactive({
  cla: void 0,
  observer: void 0
})

const internStyle = computed(() => {
  return ''
})

const emit = defineEmits(['scroll', 'beforeScrollStart', 'scrollEnd'])

onMounted(() => {
  _initial()
})

onBeforeUnmount(() => {
  _unObserver()
})

const _hash = (px = 'rla__intern', n = 7) => {
  return px + '-' + (Math.random() * 0xFFFFFF << n).toString(16)
}

const _initial = () => {
  _initCla()
  _initRel()
  nextTick(() => _initObserver())
}

const _initCla = () => {
  if (state.cla) {
    return
  }
  state.cla = _hash()
}

const _initRel = () => {
  if (rl.value) {
    return
  }
  rl.value = _hash()
}

const _initObserver = () => {
  const el = document.querySelector(`.${state.cla}`)
  if (!el) {
    return
  }
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
  state.observer = new MutationObserver((mutations, observer) => {
    setNeedsLayout()
  })
  state.observer.observe(el, {
    subtree: true,
    childList: true
  })
}

const _unObserver = () => {
  if (!state.observer) {
    return
  }
  state.observer.disconnect()
  state.observer = null
}

const _doScroll = pos => {
  if (props.observeScroll) {
    emit('scroll', pos)
  }
}

const _doBeforeScrollStart = () => {
  if (props.observeBeforeScroll) {
    emit('beforeScrollStart')
  }
}

const _doScrollEnd = () => {
  if (props.observeScrollEnd) {
    emit('scrollEnd')
  }
}

const setNeedsLayout = () => {
  rl.value && nextTick(() => rl.value.setNeedsLayout())
}

</script>
