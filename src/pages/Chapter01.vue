<template>
  <div id="webgl-output" ref="webglOutputRef"></div>
</template>

<script setup>
import {onMounted, ref} from "vue"
import * as Three from 'three'
import Stats from "stats-js/build/stats.js"
import * as dat from 'dat.gui'
// import { TrackballControls } from 'three/examples/js/controls/TrackballControls.js'
import { initTrackballControls } from "../utils/utils.js"

// 性能查看面板
const stats = new Stats()
stats.showPanel( 0 )
const webglOutputRef = ref(null)
// 创建场景
const scene = new Three.Scene()
// 创建摄像机
const camera = new Three.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)
// 创建渲染器
const renderer = new Three.WebGLRenderer()
// 设置颜色及其透明度
// 将场景的背景颜色设置成黑色
renderer.setClearColor(new Three.Color(0x000000))
// .setSize ( width : Integer, height : Integer, updateStyle : Boolean ) : undefined
// 将输出canvas的大小调整为(width, height)并考虑设备像素比，
// 且将视口从(0, 0)开始调整到适合大小
// 将updateStyle设置为false以阻止对canvas的样式做任何改变。
// 设置场景大小，将整个页面窗口指定为渲染区域
renderer.setSize(window.innerWidth, window.innerHeight)
// 默认情况不开启阴影渲染因为很耗费资源
// 开启阴影渲染
renderer.shadowMap.enabled = true
// 创建坐标轴对象，并设置轴线粗细为20
const axes = new Three.AxesHelper(20)
// 场景加入坐标轴
scene.add(axes)

// 创建平面
const planeGeometry = new Three.PlaneGeometry(60, 20)
// 创建基本材质用来设置平面的外观
const planeMaterial = new Three.MeshLambertMaterial({
  color: '#FFFFFF'
})
// 将大小和材质组合进Mesh对象并赋值给平面对象
const plane = new Three.Mesh(planeGeometry, planeMaterial)
// 指定 plane 接收阴影
plane.receiveShadow = true
// 设置平面的位置
// 围绕 X 轴旋转90度
plane.rotation.x = -0.5 * Math.PI
plane.position.set(15, 0, 0)
// 将平面添加到场景中
scene.add(plane)

// 创建一个立方体
const cubeGeometry = new Three.BoxGeometry(4, 4, 4)
const cubeMaterial = new Three.MeshLambertMaterial({
  color: '#FF0000'
})
const cube = new Three.Mesh(cubeGeometry, cubeMaterial)
// 指定 cube 投射阴影
cube.castShadow = true
cube.position.set(-4, 3, 0)
scene.add(cube)

// 创建一个球体
const sphereGeometry = new Three.SphereGeometry(4, 20, 20)
const sphereMaterial = new Three.MeshLambertMaterial({
  color: '#7777FF'
})
const sphere = new Three.Mesh(sphereGeometry, sphereMaterial)
// 指定 sphere 投射阴影
sphere.castShadow = true
sphere.position.set(20, 4, 2)
scene.add(sphere)

// 创建一个点光源
const spotLight = new Three.SpotLight('#FFFFFF')
// 从设置的位置照射场景
spotLight.position.set(-40, 40, -15)
// 启用Three.js 阴影功能
spotLight.castShadow = true
// 设置参数以控制阴影的精细程度
spotLight.shadow.mapSize = new Three.Vector2(1024, 1024)
spotLight.shadow.camera.far = 130
spotLight.shadow.camera.near = 40
scene.add(spotLight)

// 设置摄像机的位置
camera.position.set(-30, 40, 30)
// 摄像机指向场景的中心
camera.lookAt(scene.position)


// 定一个对象，对象属性是希望通过gui改变的值
const controls = new function () {
  this.rotationSpeed = 0.02 // 旋转速度
  this.bouncingSpeed = 0.03 // 弹跳速度
}
// 方便改变js变量的UI界面
const gui = new dat.GUI()
// 设置取值范围
gui.add(controls, 'rotationSpeed', 0, 0.5)
gui.add(controls, 'bouncingSpeed', 0, 0.5)

let step = 0
onMounted(() => {
  document.body.appendChild(stats.dom)
  // 渲染场景到canvas
  webglOutputRef.value.appendChild(renderer.domElement)
  const trackballControls = initTrackballControls(camera, renderer)
  const clock = new Three.Clock()
  // 一帧绘制
  function renderScene() {
    stats.begin()
    trackballControls.update(clock.getDelta())
    // 红色立方体动画
    cube.rotation.x += controls.rotationSpeed
    cube.rotation.y += controls.rotationSpeed
    cube.rotation.z += controls.rotationSpeed

    // 蓝色球体跳动
    step += controls.bouncingSpeed
    sphere.position.x = 20 + (10 * (Math.cos(step)))
    sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)))

    renderer.render(scene, camera)
    stats.end()
    requestAnimationFrame(renderScene)
  }
  renderScene(trackballControls)
})
</script>

<style scoped lang="scss">

</style>