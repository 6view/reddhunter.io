'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// ─── Diamond geometry (brilliant cut) ────────────────────────────────────────
function createDiamondGeometry(segments = 8): THREE.BufferGeometry {
  const vertices: number[] = []
  const indices: number[]  = []

  const tableR   =  0.40   // table (flat top) radius
  const tableY   =  1.00   // table height
  const crownR   =  0.72   // crown widest (girdle)
  const crownY   =  0.55   // crown base Y
  const girdleR  =  0.75   // girdle (slightly wider)
  const girdleT  =  0.38   // girdle top Y
  const girdleB  =  0.28   // girdle bottom Y
  const pavY     = -0.62   // pavilion shoulder Y
  const pavR     =  0.30   // pavilion shoulder radius
  const culetY   = -1.00   // culet (bottom point)

  // Build ring of vertices at each "level"
  const levels = [
    { r: tableR,  y: tableY  },  // 0 — table edge
    { r: crownR,  y: crownY  },  // 1 — crown shoulder
    { r: girdleR, y: girdleT },  // 2 — girdle top
    { r: girdleR, y: girdleB },  // 3 — girdle bottom
    { r: pavR,    y: pavY    },  // 4 — pavilion shoulder
  ]

  const rings: number[] = []

  // Top center (table center)
  const topIdx = 0
  vertices.push(0, tableY, 0)

  // Level rings
  for (const lv of levels) {
    rings.push(vertices.length / 3)
    for (let i = 0; i < segments; i++) {
      const a = (i / segments) * Math.PI * 2
      vertices.push(Math.cos(a) * lv.r, lv.y, Math.sin(a) * lv.r)
    }
  }

  // Bottom point (culet)
  const botIdx = vertices.length / 3
  vertices.push(0, culetY, 0)

  // ── Faces ───────────────────────────────────────────────────────────────
  const S = segments

  // Table (fan from center to table edge ring)
  const r0 = rings[0]
  for (let i = 0; i < S; i++) {
    indices.push(topIdx, r0 + i, r0 + (i + 1) % S)
  }

  // Rings connecting levels
  for (let lv = 0; lv < rings.length - 1; lv++) {
    const rA = rings[lv]
    const rB = rings[lv + 1]
    for (let i = 0; i < S; i++) {
      const a0 = rA + i
      const a1 = rA + (i + 1) % S
      const b0 = rB + i
      const b1 = rB + (i + 1) % S
      indices.push(a0, b0, a1)
      indices.push(a1, b0, b1)
    }
  }

  // Pavilion (fan from shoulder ring to culet)
  const rLast = rings[rings.length - 1]
  for (let i = 0; i < S; i++) {
    indices.push(rLast + i, botIdx, rLast + (i + 1) % S)
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  return geo
}

// ─── Component ────────────────────────────────────────────────────────────────
export function HeroBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // ── Renderer ────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.offsetWidth, el.offsetHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.4
    el.appendChild(renderer.domElement)

    // ── Scene ────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#07080a')

    // ── Camera ───────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(40, el.offsetWidth / el.offsetHeight, 0.1, 100)
    camera.position.set(0, 0.5, 9)

    // ── Environment (for reflections / transmission) ─────────────────────
    const pmrem = new THREE.PMREMGenerator(renderer)
    const env   = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    pmrem.dispose()

    // ── Shared diamond geometry ───────────────────────────────────────────
    const diamondGeo = createDiamondGeometry(16)

    // ── Material factory ─────────────────────────────────────────────────
    function makeMat(color: string, opacity = 0.82): THREE.MeshPhysicalMaterial {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.0,
        roughness: 0.04,
        transmission: 0.95,
        thickness: 2.0,
        ior: 2.42,           // diamond IOR
        transparent: true,
        opacity,
        envMapIntensity: 2.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        attenuationColor: new THREE.Color(color),
        attenuationDistance: 1.8,
      })
    }

    // ── Main diamond ─────────────────────────────────────────────────────
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    const mainMat  = makeMat('#FF4500', 0.88)
    const mainMesh = new THREE.Mesh(diamondGeo, mainMat)
    mainMesh.scale.set(2.2, 2.2, 2.2)
    mainMesh.position.set(0, 0.1, 0)
    mainGroup.add(mainMesh)

    // Wireframe overlay (facets)
    const wireMat = new THREE.MeshBasicMaterial({
      color: '#FF7835',
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    })
    const wireMesh = new THREE.Mesh(diamondGeo, wireMat)
    wireMesh.scale.copy(mainMesh.scale).multiplyScalar(1.001)
    mainGroup.add(wireMesh)

    // ── Floating mini diamonds ────────────────────────────────────────────
    const miniDiamonds: { mesh: THREE.Mesh; speed: number; offset: number; axis: THREE.Vector3 }[] = []

    const miniConfigs = [
      { pos: [-3.8,  1.2, -2], scale: 0.38, color: '#FF7835', opacity: 0.60 },
      { pos: [ 3.5,  1.8, -3], scale: 0.28, color: '#CC3700', opacity: 0.50 },
      { pos: [-2.8, -1.6, -1], scale: 0.22, color: '#FF9A5C', opacity: 0.45 },
      { pos: [ 4.2, -0.8, -2], scale: 0.32, color: '#FF4500', opacity: 0.55 },
      { pos: [ 0.8,  2.8, -4], scale: 0.18, color: '#FF7835', opacity: 0.40 },
      { pos: [-4.5, -0.2, -3], scale: 0.25, color: '#FF4500', opacity: 0.48 },
    ]

    for (const cfg of miniConfigs) {
      const mat  = makeMat(cfg.color, cfg.opacity)
      const mesh = new THREE.Mesh(diamondGeo, mat)
      mesh.scale.setScalar(cfg.scale)
      mesh.position.set(...(cfg.pos as [number, number, number]))
      scene.add(mesh)
      miniDiamonds.push({
        mesh,
        speed: 0.3 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        axis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        ).normalize(),
      })
    }

    // ── Lights ────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    const l1 = new THREE.PointLight('#FF4500', 12, 30)
    l1.position.set(4, 5, 5)
    scene.add(l1)

    const l2 = new THREE.PointLight('#FF7835', 8, 25)
    l2.position.set(-5, -3, 6)
    scene.add(l2)

    const l3 = new THREE.PointLight('#ffffff', 4, 20)
    l3.position.set(0, 6, 8)
    scene.add(l3)

    // ── Fog ───────────────────────────────────────────────────────────────
    scene.fog = new THREE.FogExp2('#07080a', 0.025)

    // ── Mouse tracking ────────────────────────────────────────────────────
    const targetRot  = { x: 0, y: 0 }
    const currentRot = { x: 0, y: 0 }

    const onMouseMove = (e: MouseEvent) => {
      targetRot.y =  ((e.clientX / window.innerWidth)  - 0.5) * 0.6
      targetRot.x = -((e.clientY / window.innerHeight) - 0.5) * 0.4
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(el)

    // ── Animation loop ────────────────────────────────────────────────────
    let rafId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Smooth mouse follow
      currentRot.x += (targetRot.x - currentRot.x) * 0.03
      currentRot.y += (targetRot.y - currentRot.y) * 0.03

      // Main diamond: slow auto-spin + mouse tilt
      mainGroup.rotation.y = t * 0.18 + currentRot.y
      mainGroup.rotation.x = currentRot.x + Math.sin(t * 0.25) * 0.05

      // Gentle float
      mainGroup.position.y = Math.sin(t * 0.5) * 0.12

      // Mini diamonds orbit + spin
      for (const d of miniDiamonds) {
        d.mesh.rotation.x += d.speed * 0.012
        d.mesh.rotation.y += d.speed * 0.009
        d.mesh.position.y += Math.sin(t * d.speed + d.offset) * 0.003
      }

      // Light animation
      l1.position.x = Math.sin(t * 0.4) * 6
      l1.position.y = Math.cos(t * 0.3) * 5
      l2.position.x = Math.cos(t * 0.35) * 5
      l2.position.y = Math.sin(t * 0.4) * 4

      // Main diamond breath
      const breathe = 1 + Math.sin(t * 0.7) * 0.015
      mainMesh.scale.set(2.2 * breathe, 2.2 * breathe, 2.2 * breathe)

      renderer.render(scene, camera)
    }

    animate()

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      ro.disconnect()
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    />
  )
}
