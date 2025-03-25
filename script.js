import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// TODO =========================================================
// TODO                         SETUP
// TODO =========================================================

// ! Canvas
const canvas = document.querySelector('canvas.webgl')

// ! Scene
const scene = new THREE.Scene()

// ! Sizes 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', (event) => {
    // Update Sizes    
    sizes.width = window.innerWidth,
        sizes.height = window.innerHeight

    // Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height)
})

// ! Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = (event.clientX / sizes.width - 0.5)
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

// TODO =========================================================
// TODO                        OBJECTS
// TODO =========================================================

// ! Group
const group = new THREE.Group()
group.position.set(0, 0, 0)
scene.add(group)

// ! Cube
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()
)
group.add(cube2)

// ! Axes Helper
const axesHelper = new THREE.AxesHelper(2)
// ! scene.add(axesHelper)

// TODO =========================================================
// TODO                         CAMERA
// TODO =========================================================

// ! Camera setup
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(1, 1, 2)
scene.add(camera)

// ! Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.update()

// TODO =========================================================
// TODO                      RENDERER
// TODO =========================================================

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// TODO  =========================================================
// TODO                   ANIMATION
// TODO  =========================================================

const tick = () => {
    // ! Update controls
    controls.update()

    // ! Render
    renderer.render(scene, camera)

    // ! Call next frame
    window.requestAnimationFrame(tick)
}

tick()