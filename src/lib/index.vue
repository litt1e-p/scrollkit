<template>
  <refreshable :class="cla" :style="internStyle" :ref="rl" :probeType="probeType" :click="click" :direction="direction" :scrollbar="scrollbar" :startY="startY" :freeScroll="freeScroll" :observeScroll="observeScroll" :observeBeforeScroll="observeBeforeScroll" :observeScrollEnd="observeScrollEnd" :mouseWheel="mouseWheel" :nestedScroll="nestedScroll" @scroll="_doScroll" @beforeScrollStart="_doBeforeScrollStart" @scrollEnd="_doScrollEnd">
    <slot></slot>
  </refreshable>
</template>

<script>

import { Refreshable } from 'refreshable'

export default {
  name: 'scrollkit',
  components: {
    Refreshable
  },
  props: {
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
  },
  data () {
    return {
      cla: void 0,
      observer: void 0,
      rl: void 0
    }
  },
  computed: {
    internStyle () {
      return ''
      // return this.direction === 'vertical' ? 'position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;' : ''
    }
  },
  mounted () {
    this._initial()
  },
  beforeDestroy () {
    this._unObserver()
  },
  methods: {
    _hash (px = 'rla__intern', n = 7) {
      return px + '-' + (Math.random() * 0xFFFFFF << n).toString(16)
    },
    _initial () {
      this._initCla()
      this._initRel()
      this.$nextTick(() => this._initObserver())
    },
    _initCla () {
      if (this.cla) {
        return
      }
      this.cla = this._hash()
    },
    _initRel () {
      if (this.rl) {
        return
      }
      this.rl = this._hash()
    },
    _initObserver () {
      const el = document.querySelector(`.${this.cla}`)
      if (!el) {
        return
      }
      const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
      this.observer = new MutationObserver((mutations, observer) => {
        this.setNeedsLayout()
      })
      this.observer.observe(el, {
        subtree: true,
        childList: true
      })
    },
    _unObserver () {
      if (!this.observer) {
        return
      }
      this.observer.disconnect()
      this.observer = null
    },
    _doScroll (pos) {
      if (this.observeScroll) {
        this.$emit('scroll', pos)
      }
    },
    _doBeforeScrollStart () {
      if (this.observeBeforeScroll) {
        this.$emit('beforeScrollStart')
      }
    },
    _doScrollEnd () {
      if (this.observeScrollEnd) {
        this.$emit('scrollEnd')
      }
    },
    setNeedsLayout () {
      this.rl && this.$nextTick(() => this.$refs[this.rl].setNeedsLayout())
    }
  }
}

</script>
