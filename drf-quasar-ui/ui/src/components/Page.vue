<template>
  <q-page>
    <div class="row justify-between">
      <div class="q-pa-lg">
        <slot name="title"><span class="text-center text-grey-9 text-h3 text-bold">{{ title }}</span></slot>
      </div>
      <div class="q-pa-lg">
        <slot name="center"></slot>
      </div>
      <div class="q-pa-lg">
        <slot name="right"></slot>
      </div>
    </div>
    <slot></slot>
  </q-page>
</template>

<script>
export default {
  name: 'QdPage',
  props: {
    title: String
  }
}
</script>
