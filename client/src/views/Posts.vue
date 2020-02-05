<template>
  <div class="home">
    <ShowPost :posts="posts" />
  </div>
</template>

<script>
// @ is an alias to /src
import ShowPost from '@/components/ShowPost.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'posts',
  components: {
    ShowPost,
  },
  mounted() {
    this.$store.dispatch('post/getPosts');
  },
  computed: {
    ...mapGetters({
      posts: 'post/getAllPosts',
    }),
  },
};
</script>
