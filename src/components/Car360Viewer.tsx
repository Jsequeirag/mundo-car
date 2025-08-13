import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface Car360ViewerProps {
  images: string[];
}

export const Car360Viewer: React.FC<Car360ViewerProps> = ({ images }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const textureIndex = useRef(0);
  const requestId = useRef<number>();

  useEffect(() => {
    if (!images || images.length === 0) return;

    const width = mountRef.current?.clientWidth || window.innerWidth;
    const height = mountRef.current?.clientHeight || window.innerHeight / 1.5;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current?.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 1);
    const textureLoader = new THREE.TextureLoader();
    const materials = images.map(
      (src) =>
        new THREE.MeshBasicMaterial({
          map: textureLoader.load(src),
          transparent: true,
        })
    );

    const mesh = new THREE.Mesh(geometry, materials[0]);
    scene.add(mesh);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;

    const animate = () => {
      requestId.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    let interval = setInterval(() => {
      textureIndex.current = (textureIndex.current + 1) % materials.length;
      mesh.material = materials[textureIndex.current];
    }, 100);

    return () => {
      cancelAnimationFrame(requestId.current!);
      clearInterval(interval);
      controls.dispose();
      materials.forEach((m) => m.map?.dispose());
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [images]);

  return (
    <div className="w-full h-[70vh] rounded-lg overflow-hidden border shadow-md">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};
