<template>
  <q-page>
    <div class="row justify-between">
      <div>
        <slot name="title"><span class="text-center q-pa-md text-h3 text-bold">{{ title }}</span></slot>
      </div>
      <div>
        <slot name="center"></slot>
      </div>
      <div>
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
