import React from 'react';
import classes from './NounersPage.module.css';
import Section from '../../layout/Section';
import { Col, Row, Image, Button } from 'react-bootstrap';
import banner_image from '../../assets/LilNounClassroomEmpty.png';

const NounersPage = () => {
  return (
    <Section fullWidth={true} className={classes.nounersPage}>
      <Col lg={{ span: 6, offset: 3 }}>

        <Row className={classes.headerRow}>
          <span>Lil Goblins</span>
          <h1>Welcome, Lil Goblin!</h1>
        </Row>
     
        <Row style={{ marginBottom: '0rem' }}>
          <Image src={banner_image} fluid />
        </Row>
        <br />
        <br />
                
        <Row className={classes.pictureCard}>
          <Col lg={8} className={classes.treasuryAmtWrapper}>
            <Row className={classes.headerRow}>
              <span>Next steps</span>
            </Row>
            <Row>
              <Col>
                So you just won a lil goblin.... Cool! Be sure to go over how everything works and head over to our discord server to verify your lil goblin! If you were already a member of the server, you have to leave and re-enter
              </Col>
            </Row>
          </Col>

          <Col className={classes.treasuryInfoText}>
            <div className={classes.verifyButtonWrapper}>
              <a href={`https://discord.com/invite/Attgsp9TTM`}>
            <Button className={classes.generateBtn}>Head to #lil-goblins-server</Button>
          </a>
            </div>
          </Col>
        </Row>
    

        <Col>
          {/* <h2> Getting Started</h2>
          <span className={classes.subheading}>
            Something about whhat this is. funding, community, etc
          </span>
        <br />
        <br /> */}
        </Col>
      </Col>
    </Section>
  );
};

export default NounersPage;
