import * as THREE from 'three'
import { Wireframe } from 'three/examples/jsm/Addons.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

//* =========================================================
//*                         SETUP
//* =========================================================

//* Canvas
const canvas = document.querySelector('canvas.webgl')

//* Scene
const scene = new THREE.Scene()

//* Sizes 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


//* =========================================================
//*                         LIGHT
//* =========================================================

const ambientLight = new THREE.AmbientLight(0xffffff, .5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight('lightblue', 20)
pointLight.position.set(1, 3, 1)
scene.add(pointLight)


//* =========================================================
//*                         TEXTURE
//* =========================================================

const textureLoader = new THREE.TextureLoader()
const bmo = textureLoader.load('/bmo.jpg')
const finn = textureLoader.load('/finn.jpg')
const jake = textureLoader.load('/jake.jpg')
const steel = textureLoader.load('/steel.jpg')

const pointLightHelper = new THREE.PointLightHelper(pointLight, .2)

scene.add(pointLightHelper)

//* =========================================================
//*                         OBJECT
//* =========================================================

const material = new THREE.MeshStandardMaterial()
material.shininess = 1000
material.metalness = .45
material.roughness = .75
// material.matcap = steel
// material.opacity = 0.5|
// material.transparent = true
material.side = THREE.DoubleSide
material.flatShading = true
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(.5, 100, 100), material
)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5), material
)
plane.position.set(2, 1, 0)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.1, 100, 100), material
)
torus.position.set(-2, 0, 0)
scene.add(sphere, plane, torus)
//* =========================================================
//*                         CAMERA
//* =========================================================

//* Camera setup
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 0, 3)
scene.add(camera)

//* Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//* =========================================================
//*                      RENDERER
//* =========================================================

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Mejorar la calidad de las texturas
jake.magFilter = THREE.LinearFilter // o THREE.NearestFilter
jake.minFilter = THREE.LinearMipmapLinearFilter
jake.generateMipmaps = true
jake.anisotropy = renderer.capabilities.getMaxAnisotropy()

// También puedes aplicar lo mismo a las otras texturas
finn.magFilter = THREE.LinearFilter
finn.minFilter = THREE.LinearMipmapLinearFilter
finn.generateMipmaps = true
finn.anisotropy = renderer.capabilities.getMaxAnisotropy()

bmo.magFilter = THREE.LinearFilter
bmo.minFilter = THREE.LinearMipmapLinearFilter
bmo.generateMipmaps = true
bmo.anisotropy = renderer.capabilities.getMaxAnisotropy()

//* =========================================================
//*                      EVENT LISTENERS
//* =========================================================

window.addEventListener('resize', () => {
    //* Update Sizes    
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //* Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //* Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//* =========================================================
//*                   ANIMATION
//* =========================================================

const clock = new THREE.Clock()

const tick = () => {
    //* Update controls
    const elapsedTime = clock.getElapsedTime()
    sphere.rotation.x = elapsedTime * 0.1
    plane.rotation.x = elapsedTime * 0.1
    torus.rotation.x = elapsedTime * 0.1
    sphere.rotation.y = elapsedTime * 0.15
    plane.rotation.y = elapsedTime * 0.15
    torus.rotation.y = elapsedTime * 0.15
    controls.update()

    //* Render
    renderer.render(scene, camera)

    //* Call next frame
    window.requestAnimationFrame(tick)
}

tick()