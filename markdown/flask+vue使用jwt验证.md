---
title: "Flask+vue使用jwt验证"
author: 孙百乐
date: 2022-05-22T13:00:39+08:00
draft: false
categories: 
- 技能分享
- 笔记
---

## 为什么要使用jwt验证？

jwt（json web token）主要用来解决单点登录（SSO）问题。设想一个场景，你在淘宝登录了你的账号，然后打开天猫（天猫属于淘宝的子网站），那么你需不需要重新登录呢？答案是不用，你会发现天猫。在一个站点登录后，在其它子站点就不需要重复登录，这就是单点登录。

传统的方法用session解决，session保存在服务端，记录用户的登录信息。然而像淘宝这种大型网站往往有多个服务器，服务器之间需要session共享才能实现上述功能。

jwt能较好解决这个问题。用户登录完成后，由服务端签发一个token，包含了用户登录信息，过期时间等等。然后把它加密发给用户，用户下次请求的时候把它放在请求头传给服务端，服务端经过愉快的解密就可以知道用户已经登录啦！

在我的小项目当中，用户登录只需要密码，用session不好处理，所以也采用了jwt验证方法。

## Flask后端代码

```shell
pip install pyjwt
```

```python
import jwt
app.secret_key = b'secret_key'

@app.route("/login", methods=["POST"])
def login():
    if request.method == 'POST':
        print("password",request.json['password'])
        token = jwt.encode({'exp': datetime.now(tz=timezone.utc) + timedelta(seconds=3600), 'password':request.json['password']}, current_app.config['SECRET_KEY'], algorithm="HS256") # 生成token
        print(token)
        return jsonify(err="已生成token", token=token)

# 装饰器函数
def login_required(func):
    @functools.wraps(func) # 修饰内层函数，防止当前装饰器去修改被装饰函数的属性
    def inner(*args, **kwargs):
        print("token",request.headers.get('token'),type(request.headers.get('token')))
        if request.headers.get('token')!='null':
            password = jwt.decode(request.headers.get('token'), current_app.config['SECRET_KEY'], algorithms="HS256")['password']
            # print(password)
            if password == '123':
                return func(*args, **kwargs)
            else:
                return jsonify(err="无效token")
        else:
            return jsonify(err="请输入密码")
    return inner
```

## Vue前端代码

前端需要用到cookies，把token保存在浏览器里

```shell
npm install vue-cookies --save
```

main.js

```js
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
```

app.js

```js
created(){
      // 设置cookies 30天后过期
      this.$cookies.config('30d')

      // window object
      window.$cookies.config('30d')
      
    }
```

保存token到cookies里

```js
request.post('/login',{"password":value}).then(res=>{
            that.$cookies.set("token",res['token'])}
```

在请求头里携带token发送请求

```js
request.post("/submit_edit",  this.form, {headers:{token: this.$cookies.get('token')}})
```

