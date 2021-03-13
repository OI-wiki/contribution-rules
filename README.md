# OI Wiki 编辑规范讨论站

这大概是个 readme

## 数据存储接口

### 规则

```typescript
interface Rule {
  content: string
  tag: Array<string>
  agree: Array<string> // 同意的人的邮箱
  disagree: Array<string> // 邮箱
  dontmind: Array<string> // 邮箱
  status: 'enable' | 'disable' | 'proposal'
  email: string // 创建者的邮箱
  createAt: Date
  updateAt: Date
}
```

举个例子：

```json
{
  "content": "例题的代码应该使用 note 折叠。",
  "tag": ["problem", "markdown-extra-syntax", "code-block"],
  "agree": ["sshwy@oi-wiki.org", "test@example.com"],
  "disagree": [],
  "dontmind": [],
  "status": "enable",
  "email": "jy.cat@qq.com"	,
  "createAt": "2021-03-11T09:42:59.012Z",
  "updatedAt": "2021-03-11T09:42:59.012Z"
}
```

### 规则列表

```typescript
interface RuleList {
  title: string
  description: string
  rules: Array<RuleList> | Array<string> // Array<string> 指存储 Rule 的 objectId
}
```

这个可以用于自动生成 markdown 文档。

### 用户

用邮箱区分用户，登录时用邮箱验证码。

```typescript
interface User {
  email: string
  level: number // 权限
}
```

## 功能

- 规则的増删改查
- 用户交互（赞成/不赞成）
- 自动生成文档
- 管理员页面
  - 设置规则的状态
  - 查看（修改）投票情况