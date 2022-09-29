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
import moon from "../../Images/moon.jpeg";
import NavBar from "../NavBar/NavBar";
import Credit from "../Credit/Credit";
// import axios from "axios";

export default function Main() {
  //Groups
  const iss = new THREE.Group();
  const earth = new THREE.Group();

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

  const distanceInMeters = (lat1, lon1, lat2, lon2) => {
    // lat1 and lon2 are the user location and lat1 and lon2 are the iss location
    // generally used geo measurement function
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
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
    camera.position.set(3, 3, 3);
    camera.lookAt(new THREE.Vector3());

    //TODO: Check this again and fix it if it's not working
    camera.lookAt(iss.position);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    currentRef.appendChild(renderer.domElement);


    // moon
    const moonTexture = new THREE.TextureLoader().load(moon);
    const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture });
    const moonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    moonMesh.position.set(4, 4, 4);
    scene.add(moonMesh);

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lon: longitude });
    });

    //Interval update position
    const interval = setInterval(() => getIssLocation(), 2000);

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


    //Stars
    const starGeometry = new THREE.SphereGeometry(0.05, 0.5, 0.5);
    const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    for (let i = 0; i < 300; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(130));
      star.position.set(x, y, z);
      scene.add(star);
    }

    //ISS Model
    gltfLoader.load(
      "./models/iss/issDraco.gltf",
      (gltf) => {
        gltf.scene.scale.set(0.015, 0.015, 0.015);
        iss.add(gltf.scene);
        scene.add(iss);
      },
      () => {
        loading.navigate(true);
      }
    );

    //Earth Model
    gltfLoader.load(
      "./models/earth/Earth.gltf",
      (gltf) => {
        gltf.scene.scale.set(0.0033, 0.0033, 0.0033);
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

    //disbale scroll threejs
    const disableScroll = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("scroll", disableScroll);


    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 32, 32),
      new THREE.MeshPhongMaterial({
        transparent: true,
        opacity: 0.08,
      })
    );
    atmosphere.scale.set(40, 40, 40);
    earth.add(atmosphere);

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
          width: '100%',
          height: '100vh',
        }}
      ></div>
      {!loading.loading && (
        <section
          style={{
            position: "absolute",
            top: "10vh",
            right: 10,
            zIndex: 1,
            padding: "1em",
            width: 200,
            color: "#000",
            background: "rgba(255, 255, 255, 0.3)",
            borderRadius: ".8em",
            fontSize: 12,
            lineHeight: 1.2,
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
          >{`${distanceInMeters(
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
          >{`${distanceInMeters(
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
          >{`${distanceInMeters(
            userLocation.lat,
            userLocation.lon,
            issInfo.latitude,
            issInfo.longitude
          ).toFixed(4) * 3.28084
            // to convert meters to feet divide by 0.3048 (1 meter = 3.28084 feet)
            } feet`}</span>
        </section>
      )}
      <Credit />
    </div>
  );
}
