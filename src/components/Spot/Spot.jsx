// import React from "react";

// export default function Spot() {
//   return <div>Spot</div>;
// }
import React from "react";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import NavBar from "../NavBar/NavBar";
import moon from "../../Images/moon.jpeg";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function History() {
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(moon),
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    camera.position.z = 5;
    const animate = function () {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    //stars
    for (let i = 0; i < 100; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );
      scene.add(sphere);
    }
  }, []);

  return (
    // class name bigTitle is for the title of the page that are bold and bigger than the rest of the text
    // class name text is for the text that are not bold and smaller than the rest of the text
    <div>
      <NavBar />
      <div className="Spot">
        <h1
          style={{
            color: "white",
            fontSize: "50px",
            textAlign: "center",
            fontFamily: "verdana",
            fontWeight: "bold",
            marginBottom: "5%",
          }}
        >
          How do I Spot the Station?
        </h1>
        <div style={{marginBottom: "10em",}}>
          <h2 style={{fontSize: "2.5em",
            fontWeight: "600",
            marginBottom: "0.5em",}}>Time</h2>
          <p style={{fontSize: "1.3em",
            marginBottom: "0.5em",
            fontWeight: "400",}}>
            is when the sighting opportunity will begin in your local time zone. 
            All sightings will occur within a few hours before or after sunrise or sunset. 
            This is the optimum viewing period as the sun reflects off the space station and contrasts against the darker sky.
          </p>
        </div>
        <div style={{marginBottom: "10em",}}>
          <h2 style={{fontSize: "2.5em",
            fontWeight: "600",
            marginBottom: "0.5em",}}>Visible</h2>
          <p style={{fontSize: "1.3em",
            marginBottom: "0.5em",
            fontWeight: "400",}}>
            is the maximum time period the space station is visible before crossing back below the horizon.
          </p>
        </div>
        <div style={{marginBottom: "10em",}}>
          <h2 style={{fontSize: "2.5em",
            fontWeight: "600",
            marginBottom: "0.5em",}}>Max Height</h2>
          <p style={{fontSize: "1.3em",
            marginBottom: "0.5em",
            fontWeight: "400",}}>
            is measured in degrees (also known as elevation). 
            It represents the height of the space station from the horizon in the night sky. 
            The horizon is at zero degrees, and directly overhead is ninety degrees. 
            If you hold your fist at arm's length and place your fist resting on the horizon, the top will be about 10 degrees.
          </p>
        </div>
        <div style={{marginBottom: "10em",}}>
          <h2 style={{fontSize: "2.5em",
            fontWeight: "600",
            marginBottom: "0.5em",}}>Appears</h2>
          <p style={{fontSize: "1.3em",
            marginBottom: "0.5em",
            fontWeight: "400",}}>
            is the location in the sky where the station will be visible first. 
            This value, like maximum height, also is measured in degrees from the horizon. 
            The letters represent compass directions -- N is north, WNW is west by northwest, and so on.
          </p>
        </div>
        <div style={{marginBottom: "10em",}}>
          <h2 style={{fontSize: "2.5em",
            fontWeight: "600",
            marginBottom: "0.5em",}}>Disappears</h2>
          <p style={{fontSize: "1.3em",
            marginBottom: "0.5em",
            fontWeight: "400",}}>
            represents where in the night sky the International Space Station will leave your field of view.
          </p>
        </div>
        <img src="../../Images/astro_horizon.png"></img>
        <div style={{marginBottom: "10em",}}>
          <p style={{fontSize: "1.3em",
            marginBottom: "0.5em",
            fontWeight: "400",}}>
            Important: The International Space Station orbits with an inclination of 51.6 degrees. 
            This means that, as it orbits, the farthest north and south of the Equator it will ever go is 51.6 degrees latitude. 
            If you live north or south of 51.6 degrees, the ISS will never go directly over your head- this includes places like Alaska. 
            Spot The Station may not properly inform you of all visible space station passes in these locations. 
            Spot The Station's sighting opportunities pages will give you a list of all possible space station sightings for your location.
          </p>
        </div>
        <div style={{marginBottom: "10em",}}>
          <p style={{fontSize: "1.3em",
            marginBottom: "0.5em",
            fontWeight: "400",}}>
            The space station looks like an airplane or a very bright star moving across the sky, except it doesn't have flashing lights or change direction. 
            It will also be moving considerably faster than a typical airplane (airplanes generally fly at about 600 miles (965 km) per hour; the space station flies at 17,500 miles (28,000 km) per hour).
          </p>
        </div>
      </div>
    </div>
  );
}
