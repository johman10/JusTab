<template>
  <a :href="props.url">
    <i :class="props.iconClass"></i>
  </a>
</template>

<script>
  export default {
    props: {
      props: Object
    }
  }
</script>
