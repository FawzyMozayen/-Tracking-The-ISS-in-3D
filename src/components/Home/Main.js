/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { useLoading } from "../../lib/loading";
import useApi from "../../hooks/useApi";
import issLocation from "../../api/iss-now";
import calcPosFromLatLonRad from "../../utils/calcPosFromLatLong";
import BG from "../../Images/background-1.jpeg";

export default function Main() {
  //Groups
  const iss = new THREE.Group();
  const earth = new THREE.Group();

  const mountRef = useRef(null);
  const loading = useLoading();

  const [issInfo, setIssInfo] = useState({
    latitude: 0.0,
    longitude: 0.0,
    altitude: 0.0,
    velocity: 0.0,
  });
  const getIssLocationNow = useApi(issLocation.getIssLocationNow);

  const getIssLocation = async () => {
    const issLocation = await getIssLocationNow.request();
    const { altitude, latitude, longitude, velocity } = issLocation.data;

    setIssInfo({ altitude, latitude, longitude, velocity });

    const pos = calcPosFromLatLonRad({
      lat: latitude,
      lon: longitude,
      radius: 1,
    });

    iss.position.set(pos.x, pos.y, pos.z);
  };

  useEffect(() => {
    //Data from the canvas
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    //Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 100);
    scene.add(camera);
    camera.position.set(3, 3, 3);
    camera.lookAt(new THREE.Vector3());

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    //  skybox BG image
    // // const loader = new THREE.TextureLoader();
    // // const texture = loader.load(BG);
    // // scene.background = texture;

    /*
  Dear team, 

  this is a temp skybox that we can change later 
  you may say that is looks cool 
  but if you rotate the camera you will see that it is not a skybox
  and someones signature is on the image

  I will leave it here for now, but we should change it later

  have a lovely day 

  Ghannam
  */

    const loader = new THREE.TextureLoader();
    const texture = loader.load(BG);
    const skybox = new THREE.Mesh(
      new THREE.SphereGeometry(80, 100, 100), // radius, widthSegments, heightSegments
      new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
      })
    );
    scene.add(skybox);

    //Interval update position
    const interval = setInterval(() => getIssLocation(), 5000);

    //OrbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;

    //Resize canvas
    const resize = () => {
      renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
      camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);

    //Draco Loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");

    //GLTF Loader
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    // stars
    const starGeometry = new THREE.SphereGeometry(0.1, 24, 24);
    const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    for (let i = 0; i < 300; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z);
      scene.add(star);
    }

    //ISS Model
    gltfLoader.load(
      "./models/iss/issDraco.gltf",
      (gltf) => {
        gltf.scene.scale.set(0.01, 0.01, 0.01);
        iss.add(gltf.scene);
        scene.add(iss);
      },
      () => {
        loading.navigate(true);
      }
    );

    //Earth Model
    gltfLoader.load(
      "./models/earth/earthDraco.gltf",
      (gltf) => {
        gltf.scene.scale.set(0.02, 0.02, 0.02);
        gltf.scene.rotateY(-4.7);
        earth.add(gltf.scene);
        scene.add(earth);
        loading.navigate(false);
      },
      () => {
        loading.navigate(true);
      },
      () => {
        loading.navigate(false);
      }
    );

    //Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(6, 6, 6);
    scene.add(pointLight);

    //Animate the scene
    const animate = () => {
      orbitControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      currentRef.removeChild(renderer.domElement);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div
        className="Contenedor3D"
        ref={mountRef}
        style={{ width: "100%", height: "93vh" }}
      ></div>
      {!loading.loading && (
        <section
          style={{
            position: "absolute",
            top: "7vh",
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1,
            marginRight: 15,
            marginTop: 15,
            padding: "1em",
            width: 148,
            color: "#000",
            background: "rgba(255, 255, 255, 0.7)",
            borderRadius: ".5em",
            fontSize: 12,
            lineHeight: 1.2,
          }}
        >
          <p>
            <strong>Current Location:</strong>
          </p>
          <span>{`${issInfo.latitude.toFixed(4)}, ${issInfo.longitude.toFixed(
            4
          )}`}</span>
          <br />
          <br />
          <p>
            <strong>Current Altitude:</strong>
          </p>
          <span>{`${issInfo.altitude.toFixed(4)} Km`}</span>
          <br />
          <br />
          <p>
            <strong>Current Velocity:</strong>
          </p>
          <span>{`${issInfo.velocity.toFixed(4)} Km/h`}</span>
        </section>
      )}
    </>
  );
}
