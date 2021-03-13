
export default function Navbar(props) {
  return (
    <div className="navbar">
      <ul>
        <li onClick={() => props.onClick('list')} >规范列表</li>
        <li onClick={() => props.onClick('vote')} >开始投票</li>
        <li onClick={() => props.onClick('home')} >首页</li>
      </ul>
    </div>
  )
}