<template>
  <div class="home">
    <ShowPost :posts="posts" @deletePost="deletePost" :key="componentKey" />
  </div>
</template>

<script>
// @ is an alias to /src
import ShowPost from '@/components/ShowPost.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'posts',
  data() {
    return {
      componentKey: 0,
    };
  },
  components: {
    ShowPost,
  },
  mounted() {
    console.error('on mount');
    this.$store.dispatch('post/getPosts');
  },
  updated() {
    console.error('on updated');
  },
  computed: {
    ...mapGetters({
      posts: 'post/getAllPosts',
    }),
  },
  methods: {
    deletePost(id) {
      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      // console.error(id);
      // $this.$store.dispatch('post/deletePost', id)
      //   .then(() => {
      //     this.$swal(
      //       'Successfully!',
      //       'Your post has been removed!',
      //       'success',
      //     );
      //   });
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it?',
      }).then(() => {
        this.$store.dispatch('post/deletePost', id)
          .then(() => {
            this.forceRerender();
          });
      });
      // this.$router.push({ name: 'posts' });
    },
    forceRerender() {
      this.componentKey += 1;
      this.$store.dispatch('post/getPosts');
    },
  },
};
</script>
