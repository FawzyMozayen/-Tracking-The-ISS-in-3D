import React from "react";

export default function Spot() {
  return (
    <div
      style={{
        position: "absolute",
        left: "25%",
        right: "25%",
        top: "20%",
        bottom: "20%",
        zIndex: 1,
        padding: "2em",
        width: "50%",
        color: "#000",
        background: "rgba(255, 255, 255, 0.7)",
        borderRadius: ".8em",
        fontSize: 12,
        lineHeight: 1.2,
      }}
    >
      <div>
        <h1>How do I Spot the Station?</h1>
        <div>
          <h2>Time</h2>
          <p>
            is when the sighting opportunity will begin in your local time zone.
            All sightings will occur within a few hours before or after sunrise
            or sunset. This is the optimum viewing period as the sun reflects
            off the space station and contrasts against the darker sky.
          </p>
        </div>
        <div>
          <h2>Visible</h2>
          <p>
            is the maximum time period the space station is visible before
            crossing back below the horizon.
          </p>
        </div>
        <div>
          <h2>Max Height</h2>
          <p>
            is measured in degrees (also known as elevation). It represents the
            height of the space station from the horizon in the night sky. The
            horizon is at zero degrees, and directly overhead is ninety degrees.
            If you hold your fist at arm's length and place your fist resting on
            the horizon, the top will be about 10 degrees.
          </p>
        </div>
        <div>
          <h2>Appears</h2>
          <p>
            is the location in the sky where the station will be visible first.
            This value, like maximum height, also is measured in degrees from
            the horizon. The letters represent compass directions -- N is north,
            WNW is west by northwest, and so on.
          </p>
        </div>
        <div>
          <h2>Disappears</h2>
          <p>
            represents where in the night sky the International Space Station
            will leave your field of view.
          </p>
        </div>
        {/* <img src="../../Images/astro_horizon.png" /> */}
        <div>
          <p>
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
          <p>
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
