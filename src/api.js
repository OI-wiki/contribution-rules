const AV = require('leancloud-storage');

AV.init({
  appId: 'n6PRpu7htXEAcErnC634MjH4-gzGzoHsz',
  appKey: 'lIze7lNADMYaYDATSCW8xVBE',
  serverURL: 'https://n6prpu7h.lc-cn-n1-shared.com'
})

class Rule {
  constructor(rule) {
    this.storage = rule
  }
  static create ({
    content,
    email,
    tag,
  }, afterCreate) {
    const RuleObject = AV.Object.extend('Rule')
    const rule = new RuleObject()
    console.log(content, email, tag)
    rule.set('content', content)
    rule.set('email', email)
    rule.set('tag', tag)
    rule.set('status', 'proposal')
    rule.set('agree', [])
    rule.set('disagree', [])
    rule.set('dontmind', [])
    rule.save().then(data => {
      if(afterCreate) afterCreate(data)
    })
    return new Rule(rule)
  }
  static getAll () {
    const query = new AV.Query('Rule')
    query.descending('createdAt');
    return query.find().then(rules => rules.map(rule => new Rule(rule)))
  }
  vote (flag, email) {
    if (flag !== 'agree' && flag !== 'disagree' && flag !== 'dontmind') {
      throw new Error('invalid vote')
    }

    this.storage.set(flag, this.storage.get(flag).concat(email))
    this.storage.save()
  }
  delete (afterDelete) {
    this.storage.destroy().then(() => {
      if(afterDelete) afterDelete();
    })
  }
  setTag (tags) {
    this.storage.set('tag', tags)
    this.storage.save()
  }
  toJSON () {
    return this.storage.toJSON()
  }
  set(key, val) {
    this.storage.set(key, val)
    this.storage.save()
  }
}


export {
  Rule
}