import "./AboutUs.css";
import MHeadshot from "./images/MicahHeadshot.JPG";
import AHeadshot from "./images/AlexHeadshot.jpg";
function AboutUs() {
  return (
    <div className="AboutUS">
      <div className="WhoTitle">
        <h2>Who we are:</h2>
      </div>
      <div className="WhoText">
        <p>
          We are JAM, a dedicated team of three developers committed to
          advancing our expertise in both front-end and back-end web
          development. This website was built as part of our ongoing journey to
          strengthen our programming skills and gain hands-on experience with
          modern technologies.
          <p>
            Our primary focus has been on learning and applying JavaScript and
            React, while also exploring a broad range of additional tools,
            libraries, and programming languages essential for full-stack
            development. By building this project from the ground up, we’ve had
            the opportunity to deepen our understanding of responsive design
            principles, user experience best practices, and efficient coding
            techniques.
          </p>
          <p>
            Beyond the technical skills, this project has also allowed us to
            improve our collaboration, project management, and problem-solving
            skills that are just as critical in the development process. We view
            this website not only as a demonstration of what we’ve learned so
            far, but also as a foundation for continued growth as software
            developers.
          </p>
        </p>
      </div>
      <div className="JHeader">
        <h3>Joseph Kabesha</h3>
      </div>
      <div className="JPerson">
        {/* <div className="JImage">
          <img src={JHeadshot} alt={"JHeadshot"} />
        </div> */}
        <div className="JText">
          <p>A student at JMU, interested in machine learning.</p>
        </div>
      </div>
      <div className="AHeader">
        <h3>Alex Nguyen</h3>
      </div>
      <div className="APerson">
        <div className="AImage">
          <img src={AHeadshot} alt={"AHeadshot"} />
        </div>
        <div className="AText">
          <p>
            Hello! Computer science major at James Madison University, I have always had an interest about how things could be created and optimized so well, just with lines of code.
          </p>

          <p> 
            This is the first project I have worked on with a team, using React and Node.js.  
            <br />
            Having to work on front end for the first time was definitely something I enjoyed, seeing how the website was taking life as I was coding it.
            <br />
          </p>

          <p> 
          I cannot wait to see how far we can take this project, since it already gave me the inspiration to make more developing projects.
          </p>
        </div>
      </div>
      <div className="MHeader">
        <h3>Micah Bjorkgren</h3>
      </div>
      <div className="MPerson">
        <div className="MImage">
          <img src={MHeadshot} alt={"MHeadshot"} />
        </div>
        <div className="MText">
          <p>
            A junior computer science major at James Madison University,
            interested in software engineering and game development.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
