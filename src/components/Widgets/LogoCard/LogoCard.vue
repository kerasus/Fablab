<template>
  <q-responsive :ratio="1">
    <q-card>
      <q-img src="/img/Logo.png" />
    </q-card>
  </q-responsive>
</template>

<script>
export default {
  name: 'LogoCard'
}
</script>

<style scoped lang="scss">
.q-card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 32px;
  img {
    border-radius: 0;
  }
}
</style>
