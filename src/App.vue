<script setup lang="ts">
import {RouterView} from 'vue-router'
import * as THREE from 'three'
import {onMounted} from 'vue'
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
let renderer: THREE.WebGLRenderer
let stars: Array<any> = []
// let controls: OrbitControls
onMounted(() => {
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg') as HTMLCanvasElement
  })
  // controls = new OrbitControls(camera, renderer.domElement)

  setRendererSettings(renderer)

  renderer.render(scene, camera)
  Array(250)
    .fill('')
    .forEach(() => {
      stars.push(addStar())
    })
  const spaceTexture = new THREE.TextureLoader().load('src/assets/twis-hero.jpeg')

  scene.background = spaceTexture

  setLighting()

  animate()
})

function setRendererSettings(renderer: THREE.WebGLRenderer) {
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.position.setZ(30)
}

let tempAnimationValue = true
function animate() {
  requestAnimationFrame(animate)
  stars.forEach((star) => {
    if (tempAnimationValue) {
      star.scale.x += 0.25 / 16
      star.scale.y += 0.25 / 16
      star.scale.z += 0.25 / 16
      if (star.scale.x >= 2) {
        tempAnimationValue = false
        star.scale.x = 2
        star.scale.y = 2
        star.scale.z = 2
      }
      return
    }
    star.scale.x -= 0.25 / 16
    star.scale.y -= 0.25 / 16
    star.scale.z -= 0.25 / 16
    if (star.scale.x <= 1) {
      tempAnimationValue = true
      star.scale.x = 1
      star.scale.y = 1
      star.scale.z = 1
    }
  })

  // controls.update()

  renderer.render(scene, camera)
}

function setLighting() {
  const pointLight = new THREE.PointLight(0xffffff)
  const ambientLight = new THREE.AmbientLight(0xffffff)
  pointLight.position.set(5, 5, 5)
  scene.add(pointLight, ambientLight)
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 20, 20)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3)
    .fill('')
    .map(() => THREE.MathUtils.randFloatSpread(250))

  star.position.set(x, y, z)
  scene.add(star)
  return star
}
</script>

<template>
  <canvas id="bg"></canvas>
  <RouterView />
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
canvas {
  @apply fixed top-0 left-0;
}
</style>
