import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



const ThreeDTitle: React.FC<ThreeDTitleProps> = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const titleMesh = useRef<THREE.Mesh | null>(null);
  
    useEffect(() => {
      let scene: THREE.Scene | null = null;
      let camera: THREE.PerspectiveCamera | null = null;
      let renderer: THREE.WebGLRenderer | null = null;
  
      const initializeThreeJS = async () => {
        const THREE = await import('three');
        const GLTFLoader = await import('three/examples/jsm/loaders/GLTFLoader');
  
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        canvasRef.current!.appendChild(renderer.domElement);
  
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
  
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 1, 1).normalize();
        scene.add(directionalLight);
  
        const loader = new GLTFLoader.GLTFLoader();
        loader.load('/models/home-title-test.glb', (gltf: GLTF) => {
          const title = gltf.scene;
          scene!.add(title);
          titleMesh.current = title as THREE.Mesh; // Store the title mesh for animation
        });
  
        camera.position.z = 5;
  
        const animate = () => {
          requestAnimationFrame(animate);
          if (titleMesh.current) {
            // Animate the position using sine and cosine functions
            const time = Date.now() * 0.001; // Get the current time in seconds
            titleMesh.current.position.x = Math.cos(time) * 2;
            titleMesh.current.position.y = Math.sin(time) * 2;
          }
          renderer!.render(scene!, camera!);
        };
  
        animate();
      };
  
      initializeThreeJS();
  
      return () => {
        if (renderer) renderer!.dispose();
      };
    }, []);
  
    return (
      <div
        className="flex w-full flex-col items-center"
        style={{ background: 'linear-gradient(to bottom right, fuchsia, blue)', height: '100vh' }}
      >
        <div
          ref={canvasRef}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    );
  };
  
  export default ThreeDTitle;
