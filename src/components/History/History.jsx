import React from "react";
import "./History.css";
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
    // class name smallTitle is for the title of the page that are bold and smaller than the rest of the text
    // class name text is for the text that are not bold and smaller than the rest of the text
    <div>
      <NavBar />
      <div className="history">
        <h1
          style={{
            color: "white",
            fontSize: "50px",
            textAlign: "center",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            marginBottom: "5%",
          }}
        >
          History
        </h1>
        <div className="Section">
          <h1 className="bigTitle">Reagan directs NASA to build the ISS</h1>
          <h1 className="bigTitle">January 25, 1984</h1>
          <p className="text">
            "Just as the oceans opened up a new world for clipper ships and
            Yankee traders, space holds enormous potential for commerce today".
            President Ronald Reagan's State of the Union Address directs NASA to
            build an international space station within the next 10 years.
          </p>
        </div>

        <div className="Section">
          <h1 className="bigTitle">First ISS Segment Launches</h1>
          <h1 className="bigTitle">November 20, 1998</h1>
          <p className="text">
            The first segment of the ISS launches: The Zarya Control Module
            launched aboard a Russian Proton rocket from Baikonur Cosmodrome,
            Kazakhstan. Zarya (translates to "sunrise") supplied fuel storage,
            battery power and rendezvous and docking capability for Soyuz and
            Progress space vehicles.
          </p>
        </div>

        <div className="Section">
          <h1 className="bigTitle">First U.S.-built component launches</h1>
          <h1 className="bigTitle">December 4, 1998</h1>
          <p className="text">
            Unity Node 1 module—the first U.S.-built component of the
            International Space Station— launches into orbit two weeks later
            during the STS-88 mission. Joining Unity with the Zarya module was
            the first step in the assembly of the orbiting laboratory.
          </p>
        </div>

        <div className="Section">
          <h1 className="bigTitle">First Crew to Reside on Station</h1>
          <h1 className="bigTitle">November 2, 2000</h1>
          <p className="text">
            NASA Astronaut Bill Shepherd and cosmonauts Yuri Gidzenko and Sergei
            Krikalev become the first crew to reside onboard the station.
            Expedition 1 spent four months onboard completing tasks necessary to
            bring the ISS "to life" and began what is now more than 20 years of
            continuous human presence in space.
          </p>
        </div>

        <div className="Section">
          <h1 className="bigTitle">U.S. Lab Module Added</h1>
          <h1 className="bigTitle">February 7, 2001</h1>
          <p className="text">
            Destiny, the U.S. Laboratory module, becomes part of the station.
            The lab—that increased onboard living space by 41%—continues to be
            the primary research laboratory for U.S. payloads.
          </p>
        </div>

        <div className="Section">
          <h1 className="bigTitle">
            U.S. Lab Module Recognized as Newest U.S. National Laboratory
          </h1>
          <h1 className="bigTitle">December 30, 2005</h1>
          <p className="text">
            Congress designates the U.S. portion of the ISS as the nation's
            newest national laboratory to maximize its use for other U.S.
            government agencies and for academic and private institutions.
          </p>
        </div>

        <div className="Section">
          <h1 className="bigTitle">European Lab Joins the ISS</h1>
          <h1 className="bigTitle">February 7, 2008</h1>
          <p className="text">
            The European Space Agency’s Columbus Laboratory becomes part of the
            station.
          </p>
        </div>

        <div className="Section">
          <h1 className="bigTitle">Japanese Lab Joins the ISS</h1>
          <h1 className="bigTitle">March 11, 2008</h1>
          <p className="text">
            The first Japanese Kibo laboratory module becomes part of the
            station.
          </p>
        </div>

        <div className="Section">
          <h1 className="bigTitle">ISS 10-Year Anniversary</h1>
          <h1 className="bigTitle">November 2, 2010</h1>
          <p className="text">
            The ISS celebrates its 10-year anniversary of continuous human
            occupation. Since Expedition 1 in the fall of 2000, 202 people had
            visited the station.{" "}
          </p>
        </div>

        <div className="Section">
          <h1 className="bigTitle">NASA Issues Cooperative Agreement</h1>
          <h1 className="bigTitle">February 2011</h1>
          <p className="text">
            NASA issues a cooperative agreement notice for a management partner.
          </p>
        </div>

        <div className="Section">
          <h1 className="bigTitle">NASA Selects the ISS National Lab</h1>
          <h1 className="bigTitle">July 2011</h1>
          <p className="text">
            NASA selects the Center for the Advancement of Science in Space to
            manage the ISS National Lab.
          </p>
        </div>

        <div className="Section">
          <h1 className="bigTitle">
            The First ISS National Lab Research Flight
          </h1>
          <h1 className="bigTitle">September 30, 2013</h1>
          <p className="text">
            Proteins can be grown as crystals in space with nearly perfect
            three-dimensional structures useful for the development of new
            drugs. The ISS National Lab's protein crystal growth (PCG) series of
            flights began in 2013, allowing researchers to utilize the unique
            environment of the ISS.
          </p>
        </div>
      </div>
    </div>
  );
}
