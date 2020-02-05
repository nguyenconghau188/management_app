<template>
<!-- eslint-disable max-len -->
  <div class="container">
    <h1>List Post</h1>
    <div>
      <div class="text-center">
        <router-link :to="{ name: 'create' }" class="btn btn-primary">Add Post</router-link>
      </div>
      <table class="table table-striped text-center">
        <thead>
          <tr>
            <th>Index</th>
            <th class="col-md-2">Title</th>
            <th class="col-md-2">Category</th>
            <th class="col-md-6">Content</th>
            <th class="col-md-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in posts" :key="index">
            <td>{{ index+1 }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.category }}</td>
            <td>{{ post.content }}</td>
            <td>
              <router-link :to="{ name: 'edit', params: {id: post._id} }" class="btn btn-sm btn-success col-md-offset-1 col-md-5">Edit</router-link>
              <a href="#" class="btn btn-sm btn-warning col-md-offset-1 col-md-5">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowPost',
  props: {
    posts: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  th {
    text-align: center;
  }
</style>
