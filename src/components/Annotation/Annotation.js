
const Annotation = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        marginLeft: 15,
        marginTop: 15,
        padding: '1em',
        width: 220,
        color: '#000',
        background: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '.5em',
        fontSize: 12,
        lineHeight: 1.2,
      }}
    >
      <h4>The International Space Station (ISS)</h4>

      <br />

      <p>
        Is a modular space station located in low Earth orbit. It maintains an
        orbit with an <strong>average altitude of 400 kilometers</strong> thanks
        to maneuvers performed periodically with the Zvezda engines or visiting
        vehicles.
        <br />
        <br />
        The station travels on <strong>average at 27,500 km/h</strong>, making a
        full circle around the earth in about 93 minutes{' '}
        <strong>completing 15.5 orbits each day</strong>.
      </p>
    </div>
  );
};

export default Annotation;
