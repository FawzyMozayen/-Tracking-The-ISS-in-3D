const HowTo = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "2%",
        right: 0,
        zIndex: 1,
        marginRight: 20,
        marginTop: 15,
        padding: "1em",
        width: 200,
        color: "#000",
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: ".8em",
        fontSize: 12,
        lineHeight: 1.2,
        cursor: "pointer",
      }}
      onClick={() => (window.location.href = "/about")}
    >
      <h4
        style={{
          color: "white",
        }}
      >
        How do I Spot The Station?
      </h4>
    </div>
  );
};

export default HowTo;
