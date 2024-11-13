<template>
  <div class="gallery">
    <div v-for="(post, index) in posts" :key="index" class="thumbnail">
      <img :src="post.image" alt="Post Thumbnail" style="width: 150px;">
      <p>{{ post.title }}</p>
      <div class="post-info">
        <p>👍 {{ post.likes }} | 👎 {{ post.dislikes }} | 💬 {{ post.comments }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        { title: 'Coquita 👌', image: 'https://arteli.vtexassets.com/arquivos/ids/252176-800-auto?v=638635791430130000&width=800&height=auto&aspect=true', likes: 120, dislikes: 10, comments: 15 },
        { title: 'Post 2', image: 'https://via.placeholder.com/150', likes: 90, dislikes: 5, comments: 22 },
        { title: 'Post 3', image: 'https://via.placeholder.com/150', likes: 55, dislikes: 2, comments: 8 },
        { title: 'Post 4', image: 'https://via.placeholder.com/150', likes: 130, dislikes: 7, comments: 18 },
        { title: 'Post 5', image: 'https://via.placeholder.com/150', likes: 78, dislikes: 6, comments: 14 },
        { title: 'Post 6', image: 'https://via.placeholder.com/150', likes: 144, dislikes: 3, comments: 23 },
        { title: 'Post 7', image: 'https://via.placeholder.com/150', likes: 68, dislikes: 4, comments: 12 },
        { title: 'Post 8', image: 'https://via.placeholder.com/150', likes: 89, dislikes: 8, comments: 9 },
        { title: 'Post 9', image: 'https://via.placeholder.com/150', likes: 112, dislikes: 1, comments: 11 },
        { title: 'Post 10', image: 'https://via.placeholder.com/150', likes: 56, dislikes: 0, comments: 5 },
        // Más publicaciones si es necesario
      ]
    };
  }
};
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.thumbnail {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.thumbnail img {
  max-width: 100%;
  height: auto;
}

.post-info {
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}

.post-info p {
  margin: 0;
}
</style>
