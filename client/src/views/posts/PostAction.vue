<template>
<!-- eslint-disable max-len -->
  <div class="post">
    <ActionPost :id="id" :post="obj" @updatePost="updatePost" @createPost="createPost" @back="back" />
  </div>
</template>

<script>

import ActionPost from '@/components/ActionPost.vue';

export default {
  name: 'post-action',
  components: {
    ActionPost,
  },
  data() {
    return {
      obj: {
        title: '',
        category: '',
        content: '',
      },
      id: '',
    };
  },
  created() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.$store.dispatch('post/getPost', this.$route.params.id)
        .then(
          (res) => {
            Object.assign(this.obj, res);
          },
        );
    }
  },
  methods: {
    updatePost(id, post) {
      const obj = { id, post };
      this.$store.dispatch('post/updatePost', obj)
        .then(() => {
          this.$swal(
            'Great!',
            'Your post has been updated!',
            'success',
          );
          this.$router.push({ name: 'posts' });
        });
    },
    createPost(post) {
      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      this.$store.dispatch('post/createPost', post)
        .then(() => {
          this.$swal(
            'Completed!',
            'Your post has been created!',
            'success',
          );
          this.$router.push({ name: 'posts' });
        });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
