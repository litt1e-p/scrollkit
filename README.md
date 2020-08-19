# Scrollkit

a smooth scroll kit component for vue which has excellent performance (59-60fps) in browsers testing

## Installation

```js
npm i scrollkit
```

1. globally
```js
import Scrollkit from 'scrollkit'

Vue.use(Scrollkit)
```

2. partially
```js
import { Scrollkit } from 'scrollkit'

<script>
components: {
  Scrollkit
}
</script>

```

## Usage

1. wrap your html or components directly

```html
<scrollkit>
  // your html
</scrollkit>
```

2. custom-built for your own
```html
 <scrollkit direction="vertical" :scrollbar="false" :bounce="true" :observeScroll="true" :observeBeforeScroll="true" :observeScrollEnd="true" @scroll="" @beforeScrollStart="" @scrollEnd="">
  // your html      
</scrollkit>
```
3. layout calculation

```js
this.$refs.scrollkit.setNeedsLayout()
```
> re-calculation layout does not needed since scrollkit provides the auto detective ability for dom mutation

## Notice

> your `fixed` component or dom element will not effects when wrapped in `<scrollkit>` cause of the dependency of the lib is base on `transform`. therefore, your should place all `fixed` elements out of the wrapper.