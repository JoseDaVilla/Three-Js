import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

//* =========================================================
//*                         SETUP
//* =========================================================

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)


//* =========================================================
//*                         TEXTURES
//* =========================================================

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('images/steel.jpg')

//* =========================================================
//*                         LIGHT
//* =========================================================

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight)

//* =========================================================
//*                         FONTS
//* =========================================================

const fontLoader = new FontLoader()
fontLoader.load(
    './fonts/helvetiker_regular.typeface.json',
    (font) => {
        console.log('Font loaded successfully')

        const textGeometry = new TextGeometry('Guaaosss', {
            font: font,
            size: 0.5,
            height: 0.1,
            depth: 0.1,
            curveSegments: 3,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 3
        })

        textGeometry.center()

        const textMaterial = new THREE.MeshMatcapMaterial({ color:'#378FAE',matcap: texture })

        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)
        return text
    },
    undefined,
    (error) => {
        console.error('Error loading font:', error)
    }
)

//* =========================================================
//*                         DONUTS
//* =========================================================

const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
const donutMaterial = new THREE.MeshMatcapMaterial({matcap: texture})

for (let i = 0; i < 200; i++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial)
    const scale = Math.random()
    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10
    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI
    donut.scale.    set(scale,scale,scale)
    scene.add(donut)
}

//* =========================================================
//*                         CAMERA
//* =========================================================

const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height)
camera.position.set(0, 0, 4)
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//* =========================================================
//*                      RENDERER
//* =========================================================

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x111111)

//* =========================================================
//*                      EVENT LISTENERS
//* =========================================================

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//* =========================================================
//*                   ANIMATION
//* =========================================================

const tick = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()