import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from './useLocalStorage'
function App(props) {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])
  return (
    <>
      <div className="pane top-pane">
        <div id="hl">
      <Editor 
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        /> 
        </div>
        <div id="cl">
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        </div>
        <div id="jl">
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
        </div>
      </div>
      <div id="p">
      <div className="pane">
       <h1><center> Page Preview</center></h1>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
      </div>
    </>
    
  )
}

export default App;
