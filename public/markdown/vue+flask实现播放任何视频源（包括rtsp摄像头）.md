---
title: "Vue+flask实现播放任何视频源（包括rtsp摄像头）"
author: 孙百乐
date: 2023-04-22T10:40:50+08:00
draft: false
categories: 
- 技能分享
---

## 背景

最近跟几位同学做一个物联网竞赛，需要在web端直播摄像头内容。做视频直播是非常复杂的，但我们的要求很低，只要能在局域网内实现直播摄像头就可以了。安全性、性能、带宽什么的统统不考虑。

由于我们买的摄像头（海康）只能推rtsp流，没有任何一个web播放器能够支持这种格式，所以rtsp需要转码之后才能推流，比如转成rtmp或webRTC等其它流，这样就能在网页上播放了。GitHub上能找到很多转码推流的代码，但又因为海康还对这个协议做了魔改（主要是加密），所以这些代码也不支持！

最后我看到一个很nice的方法：在后端（flask）使用cv库读取视频流，不断截取每一帧的图片，发送给前端。前端只需要用一个`<img>`标签就能渲染这个直播视频啦。

## 代码

Flask

```flask
# camera = cv2.VideoCapture(0) # 笔记本自带摄像头，支持macbook
camera = cv2.VideoCapture(os.path.join(app.config['UPLOAD_FOLDER'], 'zdws.mp4')) # 本地视频
@app.route('/api/video_feed')
def video_feed():
    def generate():
        while True:
            # time.sleep(0.0)
            ret, frame = camera.read()
            if not ret:
                break
            _, jpeg = cv2.imencode('.jpg', frame)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')
    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')
```

Vue

```vue
<!-- 摄像头画面展示区域 -->
        <img
          style="width: 100%"
          src="api/video_feed"
        />
```

## 总结

这个方法能够以最低的成本解决问题，但是每次都传整张图片，对网络质量的，所以它只适用于网络质量较高的局域网。

视频本身就是由一帧一帧的图像组成的，但是我们传送数据时不可能原封不动地传送每一帧，因为它太大了。我们需要对视频进行压缩，去除帧与帧之间的冗余信息之后再发送到客户端，之后进行解压和渲染。压缩和解压是需要时间的，所以我们观看网络直播时肯定会有一定的延时。4G时代的网速依然是不够的，期待下一代网络技术的更新。
