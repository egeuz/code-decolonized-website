import React, { useState, useEffect } from 'react'
import axios from 'axios'
import marked from 'marked'
import DOMPurify from 'dompurify'

function MenuPrototype({ openEditor, posts, fetchPosts }) {
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <div id="menu">
      <h1>code decolonized~</h1>
      <div id="posts">
        {
          posts &&
          posts.map(post => {
            return (
              <div
                key={post._id}
                className="post"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(marked(post.markdown))
                }}
              />
            )
          })
        }
      </div>
      <button
        id="new-post"
        onClick={openEditor}
      >
        New Post
      </button>
    </div>
  )
}

export default MenuPrototype
