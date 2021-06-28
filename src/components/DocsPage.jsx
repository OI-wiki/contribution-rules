import { useEffect, useState } from "react"
import { RuleList } from '../api'
import Docs from './Docs'

export default function DocsPage (props) {
  const [lists, setLists] = useState([])

  useEffect(() => {
    RuleList.getAll().then(data => {
      setLists(data)
    })
  }, [])

  function onCreateList () {
    RuleList.create({
      title: 'untitled'
    }, () => {
      RuleList.getAll().then(data => {
        setLists(data)
      })
    })
  }

  return (
    <div className="main">
      <h1>规范文档</h1>
      <p>根据大家的投票结果生成的文档条例</p>
      <input type="button" value="新建规则条例" onClick={onCreateList} />
      <div className="rulelist-list">
        {lists.map((list, idx) => <Docs key={idx} docs={list} />)}
      </div>
    </div>
  )
}