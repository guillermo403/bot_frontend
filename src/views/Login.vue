<template>
  <div></div>
</template>

<script>

export default {
  name: 'Login',
  components: {
    //
  },
  data: () => ({
    //
  }),
  methods: {
    //
  },
  created() {
    let userId = this.$route.params.userid;
    this.$http
      .post('/auth/user', { id: userId })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        this.$router.push('/Dashboard');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
</script>