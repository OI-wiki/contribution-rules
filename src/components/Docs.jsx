export default function Docs (props) {
  const data = props.docs.toJSON()
  return (
    <div className="docs">
      <div className="docs-title">{data.title}</div>
      <div className="docs-description">{data.description}</div>
      <div className="docs-content"></div>
    </div>
  )
}