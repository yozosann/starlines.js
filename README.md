# starlines
With the mouse to move to produce the connection effect
粒子星空效果，随着鼠标移动会动态产生连线且线的透明度及宽度都会随着改变。示例：[demo](https://yozosann.github.io/demo/demo4.html)

#### 使用方法
###### HTML Template
```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="utf-8" />
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }

        html {
            height: 100%;
        }

        body {
            height: 100%;
        }

        .canvasContainer {
            height: 100%;
            width: 100%;
            overflow: hidden;
            position:relative;
        }

        #CanvasWithStarlines {
            background-color: darkslategray;
        }
    </style>
</head>
<body>
    <div class="canvasContainer">
        <canvas id="CanvasWithStarlines" style="position:absolute;left:0;top:0;display:block;"></canvas>
    </div>
    <script type="text/javascript" src="../javascripts/star-lines.js"></script>
    <script>
        var canvasStarlines = document.getElementById('CanvasWithStarlines');
        var starLines = new starLines(canvasStarlines);
        starLines.draw();
    </script>
</body>
</html>
```

1. click 'clone or download'，下载star-lines.js

2. 引入文件
```html
    <script type="text/javascript" src="../javascripts/star-lines.js"></script>
```

3. 创建一个canvas容器，并创建canvas，并设置你想要的canvas背景色。
```html
<style>
        .canvasContainer {
            overflow: hidden;
            position:relative;
        }
        #CanvasWithStarlines {
            background-color: darkslategray;
        }
</style>
<body>
    <div class="canvasContainer">
        <canvas id="CanvasWithStarlines"></canvas>
    </div>
</body>
```
**为了防止滚动条出现，canvas容器的一定要有overflow和position**，
canvas画布默认等高等宽容器，所以你把容器放在你想设置效果的位置就好，设置容器即可。

4. 创建starlines对象，并传入canvas dom。
 ```javascript
        var canvasStarlines = document.getElementById('CanvasWithStarlines');
        var starLines = new starLines(canvasStarlines);
```

5. 执行starLines的方法
```javascript
	starLines.setAmountCoefficient(0.0002);// 范围0~0.00038，设置画布上圆点的数量，默认0.0002；
	starLines.setColor('white'); //范围为css支持色，设置颜色，默认白色；
    starLines.setR(0.1,3);//设置随机圆点的半径范围，默认0.1~3；
    starLines.setSpeed(1,3);//设置随机圆点的移动速度范围，默认1~3；
    starLines.clear();//清空画布，清空后可以重新设置参数（比如颜色）；
    starLines.draw();//呈现效果/清空后，可以重置参数后，再呈现效果；
```


