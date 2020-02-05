<template>
<!-- eslint-disable max-len -->
  <div class="container">
    <h1 v-if="!id">Create Post</h1>
    <h1 v-else>Edit Post ({{ post.title }})</h1>
    <div class="form-horizontal post-form">
      <div class="form-group">
        <label class="control-label col-md-2">TITLE</label>
        <div class="col-md-10">
          <input class="form-control" type="text" name="title" placeholder="TITLE" v-model="post.title">
        </div>
      </div><br/>
      <div class="form-group">
        <label class="control-label col-md-2">CATEGORY</label>
        <div class="col-md-10">
          <input class="form-control" type="text" name="category" placeholder="CATEGORY" v-model="post.category">
        </div>
      </div><br/>
      <div class="form-group">
        <label class="control-label col-md-2">CONTENT</label>
        <div class="col-md-10">
          <textarea class="form-control" rows="10" name="content" cols="10  " placeholder="CONTENT" v-model="post.content"></textarea>
        </div>
      </div><br/>
      <div>
        <button class="app_post_btn btn btn-primary" @click="createPost" v-if="!id">Create</button>
        <button class="app_post_btn btn btn-primary" @click="updatePost(post._id, post)" v-else>Update</button>
        <button class="app_post_btn btn btn-primary" @click="back">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionPost',
  props: {
    id: String,
    post: Object,
  },
  methods: {
    updatePost(id, post) {
      this.$emit('updatePost', id, post);
    },
    createPost() {
      this.$emit('createPost', this.$props.post);
    },
    back() {
      this.$emit('back');
    },
  },
};
</script>

<style scope>
  .post-form {
    width: 60%;
    margin-left: 20%;
  }
  button {
    margin: 2px;
  }
</style>
