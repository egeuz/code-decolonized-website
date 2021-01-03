import React, { useState } from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'
import axios from 'axios'

function Editor({closeEditor, fetchPosts}) {
  const [markdown, setMarkdown] = useState("")
  const [selection, setSelection] = useState({
    start: "",
    end: "",
    cursorPos: "",
    text: ""
  })

  const handleTypeInput = event => {
    setMarkdown(event.target.value)
    handleTextSelection(event)
  }

  const handleTextSelection = event => {
    const start = event.target.selectionStart
    const end = event.target.selectionEnd
    const text = event.target.value.slice(start, end)
    const cursorPos = (start === end) ? start : end
    setSelection({ start, end, cursorPos, text })
  }

  const handleSubmission = async () => {
    const post = {
      markdown: markdown,
      dateCreated: "test",
      dateUpdated: "test"
    }
    const res = await axios.post('/api/submit-new-post', post)
    const message = await res.data
    console.log(message)
    fetchPosts()
    closeEditor()
  }

  return (
    <div id="editor">
      <div id="input-area">
        <div id="toolbar">hey toolbar here</div>
        <textarea
          value={markdown}
          onChange={handleTypeInput}
          onClick={handleTextSelection}
        />
      </div>
      <div id="preview-area">
        <div
          id="preview"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked(markdown))
          }}
        />
      </div>
      <div id="bottom-row">
        <button
          id="submit"
          onClick={handleSubmission}
        >
          Submit Post
      </button>
      </div>
    </div>
  )
}

export default Editor
