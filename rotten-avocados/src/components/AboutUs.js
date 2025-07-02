import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="AboutUS">
      <div className="Who">
        <h2>Who we are:</h2>
        <p>
          We are JAM, a team of three intrested in devloping our programming
          skills for front end and back end. We created this website in order to
          undertsand more about java script, react, as well as, additional
          languages, libraries, and tools needed along the way.
        </p>
      </div>
      <div className="People">
        <h3>Joseph</h3>
        <p>A student at JMU, interested in machine learning.</p>
        <h3>Alex</h3>
        <p>A student at JMU, interested in game development.</p>
        <h3>Micah</h3>
        <p>A student at JMU, interested in software engineering.</p>
      </div>
    </div>
  );
}

export default AboutUs;
