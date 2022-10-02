/* eslint-disable react-hooks/exhaustive-deps */
import "../Home/Main.css";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useLoading } from "../../lib/loading";
import useApi from "../../hooks/useApi";
import issLocation from "../../api/iss-now";
import calcPosFromLatLonRad from "../../utils/calcPosFromLatLong";

//Textures
import clouds from "../../Images/earthCloud.png";
import Galaxy from "../../Images/galaxy.png";

//Components
import NavBar from "../NavBar/NavBar";

export default function Main() {
  //Groups
  const iss = new THREE.Group();
  const earth = new THREE.Group();

  const mountRef = useRef(null);
  const loading = useLoading();

  const getIssLocationNow = useApi(issLocation.getIssLocationNow);

  const getIssLocation = async () => {
    const issLocation = await getIssLocationNow.request();
    const { latitude, longitude } = issLocation?.data;
    const pos = calcPosFromLatLonRad({
      lat: latitude,
      lon: longitude,
      radius: 1,
    });
    iss.position.set(pos.x, pos.y, pos.z);
  };

  useEffect(() => {
    //Get the iss location when the page loads
    getIssLocation();

    const interval = setInterval(() => {
      getIssLocation();
      followIss();
    }, 2000);

    //Data from the canvas
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    //Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 100);
    scene.add(camera);
    // camera.position.set(3, 3, 4);
    // camera.lookAt(new THREE.Vector3());

    const followIss = () => {
      camera.position.set(iss.position.x + 2, iss.position.y + 2, 10);
      camera.lookAt(iss.position);
    };
    followIss();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const texture = loader.load(Galaxy);
    const skybox = new THREE.Mesh(
      new THREE.SphereGeometry(10, 10, 10), // radius, widthSegments, heightSegments
      new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
      })
    );
    scene.add(skybox);

    //Interval update position

    //OrbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = false;
    orbitControls.enabled = false;
    orbitControls.enablePan = false;
    orbitControls.enableZoom = false;
    orbitControls.enableRotate = false;

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

    //ISS Model
    gltfLoader.load(
      "./models/iss/issDraco.gltf",
      (gltf) => {
        gltf.scene.scale.set(0.014, 0.014, 0.014);
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

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 32, 32),
      new THREE.MeshPhongMaterial({
        transparent: true,
        opacity: 0.02,
      })
    );
    atmosphere.scale.set(40, 40, 40);
    earth.add(atmosphere);

    //Clouds
    const cloudTexture = new THREE.TextureLoader().load(clouds);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.8,
    });
    const cloudGeometry = new THREE.SphereGeometry(0.022, 32, 32);
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudMesh.scale.set(40, 40, 40);
    earth.add(cloudMesh);

    //Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
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
    <div className="Main">
      <NavBar />
      <div
        className="Contenedor3D"
        ref={mountRef}
        style={{
          width: "100%",
          height: "100vh",
        }}
      ></div>
      {!loading.loading && (
        <div
          style={{
            position: "absolute",
            top: "20vh",
            left: "15vw",
            width: "70vw",
            right: "15vw",
            borderRadius: ".8em",
          }}
        >
          <div
            style={{
              padding: "1em",
              width: "15%",
              color: "#000",
              background: "rgba(255, 255, 255, 0.5)",
              borderRadius: ".8em",
              fontSize: 20,
              fontWeight: "bold",
              lineHeight: 1.2,
              userSelect: "none",
              cursor: "pointer",
            }}
          >
            <p
              style={{
                color: "black",
              }}
            >
              About Us
            </p>
          </div>
          <div
            style={{
              padding: "1em",
              width: "70%",
              color: "#000",
              background: "rgba(255, 255, 255, 0.5)",
              borderRadius: ".8em",
              fontSize: 14,
              lineHeight: 1.5,
              userSelect: "none",
              marginTop: "1em",
            }}
          >
            <p
              style={{
                color: "black",
              }}
            >
              Dreem started with the idea of creating an ISS tracker which later evolved into greater more interactive ideas, for example, a history page about the ISS and all its milestones. 
              The user’s location is taken to calculate how far the ISS is from them; the website will also have capabilities that allows users to see the ISS location throughout the day.
            </p>
          </div>
          <div
            style={{
              padding: "1em",
              width: "70%",
              color: "#000",
              background: "rgba(255, 255, 255, 0.5)",
              borderRadius: ".8em",
              fontSize: 14,
              lineHeight: 1.5,
              userSelect: "none",
              marginTop: "1em",
            }}
          >
            <p
              style={{
                color: "black",
              }}
            >
              Dreem utilized ReactJS and Three JS to make all of this happen to introduce a new way of displaying the ISS in 3D with life-like animations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
