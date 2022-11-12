import React from 'react'
import {
    Container,
    Image,
} from "react-bootstrap";
import './aboutScreen.css'

const AboutScreen = () => {
  return (
      <>
          <Container className='main-container'>
              <Container className='sub-container-1'>
                  <Image className='image1' src={'/images/Banner.png'} alt={'hhhh'} fluid />
              </Container>
              <Container className='sub-container-1'>
                  <Image className='image2' src={'/images/Banner-2.png'} alt={'hhhh'} fluid />
              </Container>
              <Container className='sub-container-1'>
                  <Image className='image2' src={'/images/Handbag.png'} alt={'hhhh'} fluid />
              </Container>
              <Container className='sub-container-1'>
                  <Image className='image2' src={'/images/Started-Banner.png'} alt={'hhhh'} fluid />
              </Container>
              <Container className='sub-container-1'>
                  <Image className='image2' src={'/images/Info-Banner-1.png'} alt={'hhhh'} fluid />
              </Container>
              <Container className='sub-container-1'>
                  <Image className='image2' src={'/images/Journey-Banner.png'} alt={'hhhh'} fluid />
              </Container>
              <Container className='sub-container-1'>
                  <Image className='image2 image-last' src={'/images/Globe-Banner.png'} alt={'hhhh'} fluid />
              </Container>
          </Container>
      </>
      
  )
}

export default AboutScreen