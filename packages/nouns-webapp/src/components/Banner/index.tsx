import classes from './Banner.module.css';
import Section from '../../layout/Section';
import Image from 'react-bootstrap/Image';
// import bannerImage from '../../assets/LilNounClassroom.png';
import banner2 from '../../assets/goblin/family.png';

const Banner = () => {
  return (
    <Section fullWidth={false} className={classes.bannerSection}>
      <div className={classes.wrapper}>
        <h1 style={{ textAlign: 'center' }}>
          1 FREE LIL GOBLIN,
          <br />
          EVERY 60 MINUTES,
          <br />
          FOREVER FUCKERS.
        </h1>
      </div>
      <div style={{ textAlign: 'center', padding: '2rem', paddingBottom: '8rem' }}>
        {/* <Image src={bannerImage} alt={'Banner Image'} fluid /> */}
        <Image src={banner2} alt={'Family'} fluid />
      </div>
    </Section>
  );
};

export default Banner;
