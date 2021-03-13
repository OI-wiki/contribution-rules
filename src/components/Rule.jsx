import { useRef, useState } from 'react'
import { Rule } from "../api";

export function RuleCard (props) {
  const data = props.rule.toJSON()
  const [status, setStatus] = useState(props.voting ? 'voting' : 'default')
  const contentRef = useRef()

  function onSave () {
    const content = contentRef.current.value
    props.rule.set('content', content)
    setStatus('default')
  }

  if (props.votable && status === 'voting') {
    return (
      <div className="rule">
        <div className="content">{data.content}</div>
        <hr />
        <div className="meta">
          <div className="vote">
            <span
              onClick={() => {
                props.rule.vote('agree', '???');
                setStatus('default')
              }}
              className="vote-btn agree-btn"
            ></span>
            <span
              onClick={() => {
                props.rule.vote('disagree', '???');
                setStatus('default')
              }}
              className="vote-btn disagree-btn"
            ></span>
            <span
              onClick={() => {
                props.rule.vote('dontmind', '???');
                setStatus('default')
              }}
              className="vote-btn dontmind-btn"
            ></span>
          </div>
        </div>
        <div className="tags">{data.tag.map(t => <span className="tag" key={t}>{t}</span>)}</div>
      </div>
    )
  }
  if (props.editable && status === 'editing') {
    return (
      <div className="rule">
        <div className="content">
          <textarea
            className="content-input"
            placeholder="键入规范内容（支持 Markdown 以及 LaTex 语法）"
            defaultValue={data.content}
            ref={contentRef}
          />
          <input type="button" value="保存" onClick={onSave} />
        </div>
        <hr />
        <div className="meta">
          <div className="vote">
            <span className="agree">{data.agree.length}</span>
            <span className="disagree">{data.disagree.length}</span>
            <span className="dontmind">{data.dontmind.length}</span>
          </div>
          <div className="author"><em>Created by </em>{data.email}</div>
        </div>
        <div className="tags">{data.tag.map(t => <span className="tag" key={t}>{t}</span>)}</div>
      </div>
    )
  }
  return (
    <div className="rule">
      <div className="content">{data.content}</div>
      <hr />
      <div className="meta">
        <div className="vote">
          <span className="agree">{data.agree.length}</span>
          <span className="disagree">{data.disagree.length}</span>
          <span className="dontmind">{data.dontmind.length}</span>
        </div>
        <div className="author"><em>Created by </em>{data.email}</div>
      </div>
      <div className="tags">{data.tag.map(t => <span className="tag" key={t}>{t}</span>)}</div>
      {props.editable && <div className="edit-btn" title="编辑" onClick={() => setStatus('editing')}></div>}
    </div>
  )
}

export function RuleCreator (props) {
  const contentRef = useRef()
  function onSave () {
    const content = contentRef.current.value || ''
    if (!content) return
    Rule.create({
      content: content,
      email: '???',
      tag: []
    }, props.afterCreate)
  }
  return (
    <div className="rule">
      <div className="content">
        <textarea ref={contentRef} className="content-input" placeholder="键入规范内容（支持 Markdown 以及 LaTex 语法）" />
      </div>
      <input type="button" value="保存" onClick={onSave} />
    </div>
  )
}