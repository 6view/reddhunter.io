'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export function HeroBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.offsetWidth, el.offsetHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    renderer.shadowMap.enabled = false
    el.appendChild(renderer.domElement)

    // ── Scene ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#07080a')

    // ── Camera ────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      45,
      el.offsetWidth / el.offsetHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 16)

    // ── Environment (needed for transmission) ────────────────────────────
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    const envTexture = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture
    scene.environment = envTexture
    pmremGenerator.dispose()

    // ── Colors (orange / ember palette adapted from Raycast style) ────────
    const colors = [
      new THREE.Color('#FF4500'), // reddit orange
      new THREE.Color('#FF7835'), // warm orange
      new THREE.Color('#CC3700'), // deep ember
      new THREE.Color('#FF9A5C'), // light amber
    ]

    // ── 16 cylinders in a ring ────────────────────────────────────────────
    const NUM = 16
    const RING_RADIUS = 3.2
    const cylinders: THREE.Mesh[] = []
    const group = new THREE.Group()
    scene.add(group)

    for (let i = 0; i < NUM; i++) {
      const angle = (i / NUM) * Math.PI * 2
      const color = colors[i % colors.length]

      const geo = new THREE.CylinderGeometry(0.08, 0.08, 12, 8, 1, true)

      const mat = new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.0,
        roughness: 0.08,
        transmission: 0.92,      // glass
        thickness: 1.0,
        ior: 1.5,
        transparent: true,
        opacity: 0.85,
        envMapIntensity: 1.4,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        attenuationColor: color,
        attenuationDistance: 2.5,
      })

      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(
        Math.cos(angle) * RING_RADIUS,
        Math.sin(angle) * RING_RADIUS,
        -9
      )
      // Tilt each cylinder to face the ring center
      mesh.lookAt(0, 0, -9)
      mesh.rotateX(Math.PI / 2)

      group.add(mesh)
      cylinders.push(mesh)
    }

    // ── Ambient + point lights ─────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)

    const light1 = new THREE.PointLight('#FF4500', 8, 30)
    light1.position.set(4, 4, 5)
    scene.add(light1)

    const light2 = new THREE.PointLight('#FF7835', 5, 25)
    light2.position.set(-4, -3, 6)
    scene.add(light2)

    const light3 = new THREE.PointLight('#ffffff', 2, 20)
    light3.position.set(0, 0, 10)
    scene.add(light3)

    // ── Fog ───────────────────────────────────────────────────────────────
    scene.fog = new THREE.FogExp2('#07080a', 0.035)

    // ── Mouse interaction ─────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const targetRot = { x: 0, y: 0 }
    const currentRot = { x: 0, y: 0 }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
      targetRot.y =  mouse.x * 0.25
      targetRot.x = -mouse.y * 0.15
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

    // ── Animate ───────────────────────────────────────────────────────────
    let rafId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Smooth mouse follow
      currentRot.x += (targetRot.x - currentRot.x) * 0.04
      currentRot.y += (targetRot.y - currentRot.y) * 0.04

      // Slow auto-rotation of the whole ring
      group.rotation.z = t * 0.06
      group.rotation.x = currentRot.x
      group.rotation.y = currentRot.y

      // Each cylinder breathes slightly
      cylinders.forEach((c, i) => {
        const mat = c.material as THREE.MeshPhysicalMaterial
        mat.opacity = 0.7 + Math.sin(t * 0.8 + i * 0.4) * 0.2
        const s = 1 + Math.sin(t * 0.5 + i * 0.3) * 0.04
        c.scale.set(s, 1, s)
      })

      // Light animation
      light1.position.x = Math.sin(t * 0.4) * 6
      light1.position.y = Math.cos(t * 0.3) * 5
      light2.position.x = Math.cos(t * 0.35) * 5
      light2.position.y = Math.sin(t * 0.45) * 4

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
