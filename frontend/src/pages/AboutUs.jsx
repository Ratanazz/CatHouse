import React from 'react';
import { Container, Image } from 'react-bootstrap';
import './Css/AboutUsPage.css'; // Import CSS for About Us Page
import whatWeDoIcon from '../assestes/Paw_Print.png'; // Adjust the import path
import ourGoalImage from '../assestes/dog-abt2.png'; // Adjust the import path

function AboutUs() {
  return (
    <Container className="about-us-page">
      <div className="hero-section" id="about-us">
        <h1 className="hero-title">ABOUT <br /> PAWPAW</h1>
      </div>
      <div className="what-we-do-section">
        <Image src={whatWeDoIcon} alt="What We Do Icon" className="what-we-do-icon" fluid />
        <h2 className="section-title">WHAT WE DO</h2>
        <p>Our primary objective is to improve the Welfare of Animals in Cambodia. We use donations from Animal lovers from Cambodia and around the World along with money we generate from our Veterinary practice to fund achieving this challenging goal, focusing on.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem doloremque voluptates ea iusto, eaque, cum, laudantium alias mollitia eius aut cumque architecto cupiditate. Doloribus dicta, obcaecati laudantium nisi tempora vel.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, veniam perferendis commodi fugiat tenetur consectetur praesentium iste sunt sequi porro expedita architecto quae, explicabo animi placeat nam! Magnam, labore neque!</p>
      </div>
      <a href="#donate" className="donate-button-link">
        <img src="https://i.ibb.co/xhbDGJW/Screenshot-2024-05-31-141935.png" alt="Donate" className="donate-button-image" />
      </a>
      <h2 className="section-title">OUR GOAL</h2>
      <p>"Our goal at PAWPAW is to be a beacon of hope for homeless pets by providing them with a second chance at life. We are dedicated to rescuing, rehabilitating, and rehoming animals in need, while also promoting the importance of adoption to our community. Through collaborative efforts with local shelters and compassionate outreach programs, we strive to create a supportive environment where every pet can find love, care, and a forever home. Together, we aim to make a lasting difference in the lives of both animals and adopters."</p>
      <div className="our-goal-section">
        <div className="our-goal-image-container">
          <Image src={ourGoalImage} alt="Our Goal" className="our-goal-image" fluid />
          <h2 className="section-title-on-image">CAN YOU HELP US?</h2>
        </div>
      </div>
      <a href="#get-involved" className="get-involved-button-link">
        <img src="https://i.ibb.co/XJsb5LG/Screenshot-2024-05-31-141946.png" alt="Get Involved" className="get-involved-button-image" />
      </a>
    </Container>
  );
}

export default AboutUs;
