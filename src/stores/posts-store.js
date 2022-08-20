import { defineStore } from "pinia";
import { Loading } from "quasar";
import { api } from "src/boot/axios";


export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    myPosts: [],
    newPost: null,
    fullPost: null
  }),
  getters: {
    postsCount: (state) => state.posts.length,
    myPostsCount: (state) => state.myPosts.length
  },
  actions: {
    async getPostsByPage (page=1) {
      try {
        const {data} = await api.get(`/posts?page=${page}`)
        this.posts = data
      }
      catch (err) {
        console.log(err.response.data)
        throw new Error(err.response.data)
      }
      finally {
        Loading.hide()
      }
    },
    async getPostById (id) {
      try {
        const { data: post } = await api.get(`/posts/${id}`)
        const { data: postComments } = await api.get(`/posts/${id}/comments`)
        const { data: author } = await api.get(`/users/${post.user_id}`)

        this.fullPost = {...post, comments: postComments, author: author}

      } catch (err) {
        console.log(err.response.data)
        throw new Error(err.response.data)
      }
      finally {
        Loading.hide()
      }
    },
    async insertNewComment (comment) {
      try {
        const {data: result} = await api.post(`/posts/${comment.post_id}/comments`, comment)
        if (result) {
          this.fullPost.comments.unshift(result)
        }
      } catch (err) {
        console.log(err.response.data)
        throw new Error(err.response.data)
      }
      finally {
        Loading.hide()
      }
    },
    async createNewPost ({newPost, id}) {
      try {
        const {data: post} = await api.post(`/users/${id}/posts`, newPost)
        if (post) return true
      } catch (err) {
        console.log(err.response.data)
        throw new Error(err.response.data)
      }
      finally {
        Loading.hide()

      }
    },
    async deletePost (id) {
      try {
        const {data} = await api.delete(`/posts/${id}`)
        if (!data) {
          return true
        }
      } catch (err) {
        console.log(err.response.data)
        throw new Error(err.response.data)
      } finally {
        Loading.hide()
      }
    }
  }
})
