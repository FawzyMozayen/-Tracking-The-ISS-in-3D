import React from "react";

export default function Spot() {
  return (
    <div
      style={{
        position: "absolute",
        left: "15%",
        right: "15%",
        top: "15%",
        bottom: "15%",
        zIndex: 1,
        marginLeft: 15,
        marginTop: 15,
        padding: "1em",
        width: "60%",
        height:"70%",
        color: "#000",
        background: "rgba(255, 255, 255, 0.7)",
        borderRadius: ".8em",
        fontSize: 12,
        lineHeight: 1.2,
        cursor: "pointer",
      }}
    >
      <div>
        <h1 style={{textAlign: "center",
            marginBottom: "3%",}}>How do I Spot the Station?</h1>
        <div>
          <h3 style={{marginBottom: "1%",}}>Time</h3>
          <p style={{marginBottom: "2%"}}>
            In your local time zone, this is the moment the sighting chance will start. 
            Every sighting will take place within a few hours of dawn or sunset. 
            The sun's reflection from the space station and contrast with the dimmer sky make this the best viewing time.
          </p>
        </div>
        <div>
          <h3 style={{marginBottom: "1%",}}>Visible</h3>
          <p style={{marginBottom: "2%",}}>
            The longest the space station may be seen before dipping back below the horizon.
          </p>
        </div>
        <div>
          <h3 style={{marginBottom: "1%",}}>Max Height</h3>
          <p style={{marginBottom: "2%",}}>
            Determined by degrees (also known as elevation). 
            It depicts how far away from the horizon in the night sky the space station is. 
            90 degrees is straight overhead and 0 degrees is the horizon. 
            The top will be roughly 10 degrees if you hold your fist out at arm's length with your fist resting on the horizon.
          </p>
        </div>
        <div>
          <h3 style={{marginBottom: "1%",}}>Appears</h3>
          <p style={{marginBottom: "2%",}}>
            The vantage point in the sky from which the station will initially be seen. 
            This value is expressed in degrees from the horizon, just like the greatest height. 
            The letters stand for compass directions; for example, N stands for north and WNW for west by northwest.
          </p>
        </div>
        <div>
          <h3 style={{marginBottom: "1%",}}>Disappears</h3>
          <p style={{marginBottom: "2%",}}>
            It shows where the International Space Station will disappear from view in the night sky.
          </p>
        </div>
        {/* <img src="../../Images/astro_horizon.png" /> */}
        <div>
          <p style={{marginBottom: "2%",}}>
            Important: The International Space Station orbits with an
            inclination of 51.6 degrees. This means that, as it orbits, the
            farthest north and south of the Equator it will ever go is 51.6
            degrees latitude. If you live north or south of 51.6 degrees, the
            ISS will never go directly over your head- this includes places like
            Alaska. Spot The Station may not properly inform you of all visible
            space station passes in these locations. Spot The Station's sighting
            opportunities pages will give you a list of all possible space
            station sightings for your location.
          </p>
        </div>
        <div>
          <p style={{marginBottom: "2%",}}>
            The space station looks like an airplane or a very bright star
            moving across the sky, except it doesn't have flashing lights or
            change direction. It will also be moving considerably faster than a
            typical airplane (airplanes generally fly at about 600 miles (965
            km) per hour; the space station flies at 17,500 miles (28,000 km)
            per hour).
          </p>
        </div>
      </div>
    </div>
  );
}
