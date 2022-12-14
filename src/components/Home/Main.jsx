/* eslint-disable react-hooks/exhaustive-deps */
import "./Main.css";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useLoading } from "../../lib/loading";
import useApi from "../../hooks/useApi";
import issLocation from "../../api/iss-now";
import calcPosFromLatLonRad from "../../utils/calcPosFromLatLong";

//Textures
import moon from "../../Images/moon.jpeg";
import clouds from "../../Images/earthCloud.png";
import Galaxy from "../../Images/galaxy.png";

//Components
import NavBar from "../NavBar/NavBar";
import Credit from "../Credit/Credit";
import Spot from "../Spot/Spot";

export default function Main() {
  //Groups
  const iss = new THREE.Group();
  const earth = new THREE.Group();

  const [showSpot, setShowSpot] = useState(false);
  const [oldIssInfo, setOldIssInfo] = useState([]);

  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lon: 0,
  });

  const mountRef = useRef(null);
  const loading = useLoading();

  const [issInfo, setIssInfo] = useState({
    latitude: 0.0,
    longitude: 0.0,
    altitude: 0.0,
    velocity: 0.0,
    daynum: 0,
  });

  const getIssLocationNow = useApi(issLocation.getIssLocationNow);

  const getIssLocation = async () => {
    const issLocation = await getIssLocationNow.request();
    const { altitude, latitude, longitude, velocity, daynum, visibility } =
      issLocation?.data;
    setIssInfo({ altitude, latitude, longitude, velocity, daynum, visibility });
    const pos = calcPosFromLatLonRad({
      lat: latitude,
      lon: longitude,
      radius: 1,
    });
    iss.position.set(pos.x, pos.y, pos.z);
  };

  // placeSphere is the function that places the sphere
  //on the map and updates the position of the sphere as the ISS moves around the globe
  const placeSphere = () => {
    // This function is not working properly yet
    oldIssInfo.forEach((element) => {
      const pos = calcPosFromLatLonRad({
        lat: element.latitude,
        lon: element.longitude,
        radius: 1,
      });
      const geometry = new THREE.SphereGeometry(0.01, 2, 2);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(pos.x, pos.y, pos.z);
      earth.add(sphere);
    });
  };

  const distanceInMeters = (lat1, lon1, lat2, lon2) => {
    // lat1 and lon2 are the user location and lat1 and lon2 are the iss location
    // generally used geo measurement function
    const R = 6371e3; // metres
    const ??1 = (lat1 * Math.PI) / 180; // ??, ?? in radians
    const ??2 = (lat2 * Math.PI) / 180;
    const ???? = ((lat2 - lat1) * Math.PI) / 180;
    const ???? = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(???? / 2) * Math.sin(???? / 2) +
      Math.cos(??1) * Math.cos(??2) * Math.sin(???? / 2) * Math.sin(???? / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d; // d is the distance between the user and the iss in meters
  };

  useEffect(() => {
    //Get the iss location when the page loads
    getIssLocation();

    //Data from the canvas
    const currentRef = mountRef.current;
    const { clientWidth: width, clientHeight: height } = currentRef;

    //Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 100);
    scene.add(camera);
    camera.position.set(3, 3, 4);
    camera.lookAt(new THREE.Vector3());

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2.5;
    controls.maxDistance = 20;
    controls.zoomSpeed = 0.5;

    //Texture
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

    // moon
    const moonTexture = new THREE.TextureLoader().load(moon);
    const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture });
    const moonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    moonMesh.position.set(3.5, 3.5, 3.5);
    scene.add(moonMesh);

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lon: longitude });
    });

    const interval = setInterval(() => {
      console.log(issInfo);
      getIssLocation();

      // placeSphere();
    }, 2000); // get the iss location every 2 seconds
    // const old = setInterval(() => {
    //   // remove the old iss location every 10 seconds
    //   oldIssInfo.pop(); // remove the last element of the array
    // }, 5000); // 30 seconds

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

    //ISS Model
    gltfLoader.load(
      "./models/iss/issDraco.gltf",
      (gltf) => {
        gltf.scene.scale.set(0.01, 0.01, 0.014);
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
        // gltf.scene.scale.set(0.0033, 0.0033, 0.0033);
        gltf.scene.scale.set(0.0199, 0.0199, 0.0199);
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
      opacity: 0.9,
    });
    const cloudGeometry = new THREE.SphereGeometry(0.022, 32, 32);
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudMesh.scale.set(40, 40, 40);
    earth.add(cloudMesh);

    //Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
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
      // clearInterval(old);
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
        <>
          <section
            style={{
              position: "absolute",
              top: "10vh",
              right: 30,
              zIndex: 1,
              padding: "1em",
              width: 200,
              color: "#000",
              background: "rgba(255, 255, 255, 0.3)",
              borderRadius: ".8em",
              fontSize: 12,
              lineHeight: 1.2,
              userSelect: "none",
            }}
          >
            <p
              style={{
                color: "white",
              }}
            >
              <strong>Current Location:</strong>
            </p>
            <span
              style={{
                color: "white",
              }}
            >{`${issInfo.latitude.toFixed(4)}, ${issInfo.longitude.toFixed(
              4
            )}`}</span>
            <br />
            <br />
            <p
              style={{
                color: "white",
              }}
            >
              <strong>Current Altitude:</strong>
            </p>
            <span
              style={{
                color: "white",
              }}
            >{`${issInfo.altitude.toFixed(4)} Km`}</span>
            <br />
            <br />
            <p
              style={{
                color: "white",
              }}
            >
              <strong>Current Velocity:</strong>
            </p>
            <span
              style={{
                color: "white",
              }}
            >{`${issInfo.velocity.toFixed(4)} Km/h`}</span>
            <br />
            <br />
            <p
              style={{
                color: "white",
              }}
            >
              <strong>Distance away from you:</strong>
            </p>
            <span
              style={{
                color: "white",
              }}
            >{`${
              distanceInMeters(
                userLocation.lat,
                userLocation.lon,
                issInfo.latitude,
                issInfo.longitude
              ).toFixed(4) / 1000
            } Km`}</span>
            <br />
            <span
              style={{
                color: "white",
              }}
            >{`${
              distanceInMeters(
                userLocation.lat,
                userLocation.lon,
                issInfo.latitude,
                issInfo.longitude
              ).toFixed(4) / 1609.34
            } Miles`}</span>
            <br />
            <span
              style={{
                color: "white",
              }}
            >{`${
              distanceInMeters(
                userLocation.lat,
                userLocation.lon,
                issInfo.latitude,
                issInfo.longitude
              ).toFixed(4) * 3.28084
              // to convert meters to feet divide by 0.3048 (1 meter = 3.28084 feet)
            } feet`}</span>
            <br />
            <br />
            <p
              style={{
                color: "white",
              }}
            >
              <strong>Days In Space:</strong>
            </p>
            <span
              style={{
                color: "white",
              }}
            >
              {parseInt(issInfo.daynum)}
            </span>
            <br />
            <br />
            <p
              style={{
                color: "white",
              }}
            >
              <strong>Visibility on the ISS:</strong>
            </p>
            <span
              style={{
                color: "white",
              }}
            >
              {issInfo.visibility}
            </span>
          </section>

          <div
            style={{
              position: "absolute",
              bottom: "2%",
              right: 30,
              zIndex: 1,
              padding: "1em",
              width: 200,
              color: "#000",
              background: "rgba(255, 255, 255, 0.3)",
              borderRadius: ".8em",
              fontSize: 12,
              lineHeight: 1.2,
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              setShowSpot(!showSpot);
            }}
          >
            <h4
              style={{
                color: "white",
                textDecoration: "underline",
              }}
            >
              How do I Spot The Station?
            </h4>
          </div>
          {showSpot && <Spot vis={setShowSpot} />}
          <Credit />
        </>
      )}
    </div>
  );
}
