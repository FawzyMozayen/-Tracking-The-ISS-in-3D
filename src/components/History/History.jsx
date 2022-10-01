import React from "react";
import "./History.css";
import { useEffect } from "react";
import * as THREE from "three";
import NavBar from "../NavBar/NavBar";
import moon from "../../Images/moon.jpeg";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

export default function History() {
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera( //PerspectiveCamera(fov, aspect, near, far)
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const geometry = new THREE.SphereGeometry(5, 100, 100); // ( radius, widthSegments, heightSegments )
    const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(moon),
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    camera.position.z = 5;
    camera.position.y = 4;
    camera.position.x = -5;
    const animate = function () {
      requestAnimationFrame(animate);
      sphere.rotation.x += -0.005;
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
    <div>
      <NavBar />

      <div
      style={{
        position: "absolute",
        width: "100%",
      }}
      >
      
      {
      
      <VerticalTimeline>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    style={{
      color: "white",
    }}
    date="January 25, 1984"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    // icon={<WorkIcon />}
  >
    <h3 className="vertical-timeline-element-title">Reagan directs NASA to build the ISS</h3>
    <h4 className="vertical-timeline-element-subtitle">"Miami, FL"</h4>
    <p>
    "Just as the oceans opened up a new world for clipper ships and
            Yankee traders, space holds enormous potential for commerce today".
            President Ronald Reagan's State of the Union Address directs NASA to
            build an international space station within the next 10 years."
    </p>
  </VerticalTimelineElement>

  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    style={{
      color: "white",
    }}
    date="November 20, 1998"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    // icon={<WorkIcon />}
  >
    <h3 className="vertical-timeline-element-title">First ISS Segment Launches</h3>
    <h4 className="vertical-timeline-element-subtitle">"San Francisco, CA"</h4>
    <p>
    The first segment of the ISS launches: The Zarya Control
     Module launched aboard a Russian Proton rocket 
     from Baikonur Cosmodrome, Kazakhstan. Zarya 
     (translates to "sunrise") supplied fuel storage,
      battery power and rendezvous and 
      docking capability for Soyuz and Progress space vehicles.
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    style={{
      color: "white",
    }}
    date="December 4, 1998"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    // icon={<WorkIcon />}
  >
    <h3 className="vertical-timeline-element-title">First U.S.-built component launches</h3>
    <h4 className="vertical-timeline-element-subtitle">"Los Angeles, CA"</h4>
    <p>
    Unity Node 1 module—the first U.S.-built component 
    of the International Space Station— launches into 
    orbit two weeks later during the STS-88 mission. 
    Joining Unity with the Zarya module was the first 
    step in the assembly of the orbiting laboratory.
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    style={{
      color: "white",
    }}
    date="November 2, 2000"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    // icon={<WorkIcon />}
  >
    <h3 className="vertical-timeline-element-title">First Crew to Reside on Station</h3>
    <h4 className="vertical-timeline-element-subtitle">"San Francisco, CA"</h4>
    <p>
    NASA Astronaut Bill Shepherd and cosmonauts Yuri 
    Gidzenko and Sergei Krikalev become the first 
    crew to reside onboard the station. Expedition 
    1 spent four months onboard completing tasks 
    necessary to bring the ISS "to  life" and began 
    what is now more than 20 years of continuous human presence in space.
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    style={{
      color: "white",
    }}
    date="February 7, 2001"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    // icon={<SchoolIcon />}
  >
    <h3 className="vertical-timeline-element-title">U.S. Lab Module Added</h3>
    <h4 className="vertical-timeline-element-subtitle">"Online Course"</h4>
    <p>
    Destiny, the U.S. Laboratory module, becomes part of the station. 
    The lab—that increased onboard  living space by 41%—continues 
    to be the primary research laboratory for U.S. payloads.
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    style={{
      color: "white",
    }}
    date="December 30, 2005"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    // icon={<SchoolIcon />}
  >
    <h3 className="vertical-timeline-element-title">U.S. Lab Module Recognized as Newest U.S. National Laboratory</h3>
    <h4 className="vertical-timeline-element-subtitle">"Certification"</h4>
    <p>
    Congress designates the U.S. portion of the ISS as 
    the nation's newest national laboratory to maximize 
    its use for other U.S. government agencies and for 
    academic and private institutions.
    </p>
  </VerticalTimelineElement>

  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    style={{
      color: "white",
    }}
    date="February 7, 2008"
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    // icon={<SchoolIcon />}
  >
    <h3 className="vertical-timeline-element-title">European Lab Joins the ISS</h3>
    <h4 className="vertical-timeline-element-subtitle">"Bachelor Degree"</h4>
    <p>
    The European Space Agency's Columbus Laboratory becomes part of the station.
    </p>
  </VerticalTimelineElement>

  <VerticalTimelineElement
  
  className="vertical-timeline-element--education"
  style={{
    color: "white",
  }}
    date="March 11, 2008"
    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
    // icon={<StarIcon />}
  >
  <h3 className="vertical-timeline-element-title">Japanese Lab Joins the ISS</h3>
    <h4 className="vertical-timeline-element-subtitle">"Bachelor Degree"</h4>
    <p>
    The first Japanese Kibo laboratory module becomes part of the station.
    </p>
  </VerticalTimelineElement>

<VerticalTimelineElement
  
  className="vertical-timeline-element--education"
  style={{
    color: "white",
  }}
    date="November 2, 2010"
    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
    // icon={<StarIcon />}
  >
  <h3 className="vertical-timeline-element-title">ISS 10-Year Anniversary</h3>
    <p>
    The ISS celebrates its 10-year anniversary of continuous human
            occupation. Since Expedition 1 in the fall of 2000, 202 people had
            visited the station.{" "}
    </p>
  </VerticalTimelineElement>

  <VerticalTimelineElement
  
  className="vertical-timeline-element--education"
  style={{
    color: "white",
  }}
    date="February 2011"
    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
    // icon={<StarIcon />}
  >
  <h3 className="vertical-timeline-element-title">NASA Issues Cooperative Agreement</h3>
    <p>
    NASA issues a cooperative agreement notice for a management partner.
    </p>
  </VerticalTimelineElement>

  <VerticalTimelineElement
  
  className="vertical-timeline-element--education"
  style={{
    color: "white",
  }}
    date="July 2011"
    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
    // icon={<StarIcon />}
  >
  <h3 className="vertical-timeline-element-title">NASA Selects the ISS National Lab</h3>
    <p>
    NASA selects the Center for the Advancement of Science in Space to
            manage the ISS National Lab.    </p>
  </VerticalTimelineElement>

  <VerticalTimelineElement
  
  className="vertical-timeline-element--education"
  style={{
    color: "white",
  }}
    date="September 30, 2013"
    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
    // icon={<StarIcon />}
  >
  <h3 className="vertical-timeline-element-title">The First ISS National Lab Research Flight</h3>
    <p>
    Proteins can be grown as crystals in space with nearly perfect
            three-dimensional structures useful for the development of new
            drugs. The ISS National Lab's protein crystal growth (PCG) series of
            flights began in 2013, allowing researchers to utilize the unique
            environment of the ISS.
                </p>
  </VerticalTimelineElement>

</VerticalTimeline>


      
      /* <div className="history">


      </div> */}
      </div>
    </div>
  );
}
