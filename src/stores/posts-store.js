import { defineStore } from "pinia";

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    myPosts: [],
    newPost: null
  }),
  getters: {
    postsCount: (state) => state.posts.length,
    myPostsCount: (state) => state.myPosts.length
  },
  actions: {

  }
})
