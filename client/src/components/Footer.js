
import React from "react";
import { Container, Row } from "react-bootstrap";
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

const Footer = () => {
  return (
    <Container className="footer">
      <h6 style={{
        color: "white",
        textAlign: "center",        
      }}>
        Created by Chris Miller
      </h6>
      <Container>
        <Row className='footer'>     
            <h6>Contact Us:</h6>
            <a href="mailto:chrismillerdev2021@gmail.com">
              <EmailIcon  className="EmailIcon"/>
            </a>
            <br/>         
            <h6>Social Media:</h6>
            <a href="https://www.linkedin.com/in/chris-miller-0450a1aa/" target="_blank">   
              <LinkedInIcon  className="LinkedInIcon"/>
            </a>
          <a href="https://github.com/ChrisMiller83" target="_blank">
              <GitHubIcon className="GitHubIcon" />
            </a>
            
          
        </Row>
      </Container>
    </Container>
  );
};
export default Footer;