import React from "react";
import "./History.css";
// import { useEffect } from "react";
// import * as THREE from "three";
import NavBar from "../NavBar/NavBar";
// import moon from "../../Images/moon.jpeg";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export default function History() {
  // useEffect(() => {
  //   const scene = new THREE.Scene();

  //   const camera = new THREE.PerspectiveCamera( //PerspectiveCamera(fov, aspect, near, far)
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   );

  //   const renderer = new THREE.WebGLRenderer();
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   document.body.appendChild(renderer.domElement);
  //   const geometry = new THREE.SphereGeometry(5, 100, 100); // ( radius, widthSegments, heightSegments )
  //   const material = new THREE.MeshBasicMaterial({
  //     map: new THREE.TextureLoader().load(moon),
  //   });
  //   const sphere = new THREE.Mesh(geometry, material);
  //   scene.add(sphere);
  //   camera.position.z = 5;
  //   camera.position.y = 4;
  //   camera.position.x = -5;
  //   const animate = function () {
  //     requestAnimationFrame(animate);
  //     sphere.rotation.x += -0.005;
  //     renderer.render(scene, camera);
  //   };
  //   animate();

  //   //stars
  //   for (let i = 0; i < 100; i++) {
  //     const geometry = new THREE.SphereGeometry(0.1, 32, 32);
  //     const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  //     const sphere = new THREE.Mesh(geometry, material);
  //     sphere.position.set(
  //       (Math.random() - 0.5) * 100,
  //       (Math.random() - 0.5) * 100,
  //       (Math.random() - 0.5) * 100
  //     );
  //     scene.add(sphere);
  //   }
  // }, []);

  return (
    <div>
      <NavBar />
      <div
        style={{
          position: "absolute",
          width: "100%",
          top: "10%",
        }}
      >
        {
          <VerticalTimeline>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              style={{
                color: "white",
              }}
              date="January 25, 1984"
              iconStyle={{ background: "#0b3d91", color: "#fff" }}
              // icon={<WorkIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                Reagan directs NASA to build the ISS
              </h3>
              <h6 className="vertical-timeline-element-subtitle">
              State of the Union address
              </h6>
              <p>
                "Just as the oceans opened up a new world for clipper ships and
                Yankee traders, space holds enormous potential for commerce
                today". In his State of the Union Address, President Ronald
                Reagan directed NASA to establish an international space station
                over the following ten years.
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              style={{
                color: "white",
              }}
              date="November 20, 1998"
              iconStyle={{ background: "rgb(237,25,39,255)", color: "#fff" }}
              // icon={<WorkIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                First ISS Segment Launches
              </h3>
              <h6 className="vertical-timeline-element-subtitle">
              Baikonur Cosmodrome, Kazakhstan
              </h6>
              <p>
                The Zarya Control Module was launched aboard a Russian Proton
                rocket from the Baikonur Cosmodrome in Kazakhstan as the first
                module of the International Space Station. Zarya (which means
                "sunrise") provided fuel storage, battery power, and rendezvous
                and docking capabilities for the Soyuz and Progress spacecraft.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              style={{
                color: "white",
              }}
              date="December 4, 1998"
              iconStyle={{ background: "#0b3d91", color: "#fff" }}
              // icon={<WorkIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                First U.S.-built component launches
              </h3>
              <h6 className="vertical-timeline-element-subtitle">
                Marshall Space Flight Center in Huntsville, Alabama
              </h6>
              <p>
                The STS-88 mission puts the Unity Node 1 module, the first
                component of the International Space Station developed in the
                United States, into orbit two weeks later. The initial stage in
                assembling the orbiting laboratory was to connect Unity with the
                Zarya module.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              style={{
                color: "white",
              }}
              date="November 2, 2000"
              iconStyle={{ background: "rgb(237,25,39,255)", color: "#fff" }}
              // icon={<WorkIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                First Crew to Reside on Station
              </h3>
              <h6 className="vertical-timeline-element-subtitle">
                Baikonur Cosmodrome, Kazakhstan.
              </h6>
              <p>
                NASA astronaut Bill Shepherd and cosmonauts Yuri Gidzenko and
                Sergei Krikalev become the station's first residents. Expedition
                1 stayed onboard for four months, performing operations that
                brought the ISS "to life" and kicked off what has already been
                more than 20 years of continuous human presence in space.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              style={{
                color: "white",
              }}
              date="February 7, 2001"
              iconStyle={{ background: "#0b3d91", color: "#fff" }}
              // icon={<SchoolIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                U.S. Lab Module Added
              </h3>
              <h6 className="vertical-timeline-element-subtitle">
                Marshall Space Flight Center in Huntsville, Alabama.
              </h6>
              <p>
                Destiny, the US Laboratory module, joins the station. The lab,
                which has boosted onboard living space by 41%, remains the
                primary research laboratory for US payloads.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              style={{
                color: "white",
              }}
              date="December 30, 2005"
              iconStyle={{ background: "rgb(237,25,39,255)", color: "#fff" }}
              // icon={<SchoolIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                U.S. Lab Module Recognized as Newest U.S. National Laboratory
              </h3>
              {/* <h6 className="vertical-timeline-element-subtitle">
                "Unknown location"
              </h6> */}
              <p>
                The US part of the ISS is designated as the nation's newest
                national laboratory by Congress in order to maximize its
                utilization by other US government organizations as well as
                academic and business institutions.
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              style={{
                color: "white",
              }}
              date="February 7, 2008"
              iconStyle={{ background: " #0b3d91", color: "#fff" }}
              // icon={<SchoolIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                European Lab Joins the ISS
              </h3>
              {/* <h4 className="vertical-timeline-element-subtitle">
                "Unknown"
              </h4> */}
              <p>
                The Columbus Laboratory of the European Space Agency is
                integrated inside the station.
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              style={{
                color: "white",
              }}
              date="March 11, 2008"
              iconStyle={{ background: "rgb(237,25,39,255)", color: "#fff" }}
              // icon={<StarIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                Japanese Lab Joins the ISS
              </h3>
              <h6 className="vertical-timeline-element-subtitle">
                Kennedy Space Center, Florida
              </h6>
              <p>
                The first Japanese Kibo laboratory module is integrated into the
                station.
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              style={{
                color: "white",
              }}
              date="November 2, 2010"
              iconStyle={{ background: "#0b3d91", color: "#fff" }}
              // icon={<StarIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                ISS 10-Year Anniversary
              </h3>
              <p>
                The International Space Station marks ten years of uninterrupted
                human habitation. The station had been visited by 202 persons
                since Expedition 1 in the fall of 2000.
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              style={{
                color: "white",
              }}
              date="February 2011"
              iconStyle={{ background: "rgb(237,25,39,255)", color: "#fff" }}
              // icon={<StarIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                NASA Issues Cooperative Agreement
              </h3>
              <p>
                NASA publishes a notification of a cooperation agreement seeking
                a management partner.
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              style={{
                color: "white",
              }}
              date="July 2011"
              iconStyle={{ background: "#0b3d91", color: "#fff" }}
              // icon={<StarIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                NASA Selects the ISS National Lab
              </h3>
              <p>
                NASA has chosen the Center for the Advancement of Science in
                Space to oversee the International Space Station National
                Laboratory.
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              style={{
                color: "white",
              }}
              date="September 30, 2013"
              iconStyle={{ background: "rgb(237,25,39,255)", color: "#fff" }}
              // icon={<StarIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                The First ISS National Lab Research Flight
              </h3>
              <p>
                Protein crystals with nearly flawless three-dimensional
                structures may be generated in space and used to develop novel
                therapeutics. The ISS National Lab's protein crystal growth
                (PCG) flight series began in 2013, allowing researchers to take
                use of the ISS's unique environment.
              </p>
            </VerticalTimelineElement>
          </VerticalTimeline>

          /* <div className="history">


      </div> */
        }
      </div>
    </div>
  );
}
