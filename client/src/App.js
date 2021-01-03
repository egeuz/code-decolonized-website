import React, { useState } from 'react'
import Editor from './components/Editor'
import MenuPrototype from './components/MenuPrototype'
import axios from 'axios'

function App() {
  const [editorOpen, setEditorOpen] = useState(false)
  const [posts, setPosts] = useState("")

  const openEditor = () => { setEditorOpen(true) } 
  const closeEditor = () => { setEditorOpen(false) }

  const fetchPosts = async () => {
    const res = await axios.get('/api/fetch-all-posts')
    setPosts(res.data)
  }

  return (
    <React.Fragment>
      <MenuPrototype
        openEditor={openEditor}
        fetchPosts={fetchPosts}
        posts={posts}
      />
      {
        editorOpen &&
        <Editor
          closeEditor={closeEditor}
          fetchPosts={fetchPosts}
        />
      }
    </React.Fragment>
  )
}

export default App
