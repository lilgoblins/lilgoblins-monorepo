import React from 'react';
import classes from './Auction.module.css';
import town0 from '../../assets/goblin/0.png';
import town1 from '../../assets/goblin/1.png';
import town2 from '../../assets/goblin/2.png';
import town3 from '../../assets/goblin/3.png';
import town4 from '../../assets/goblin/4.png';
import town5 from '../../assets/goblin/5.png';
import town6 from '../../assets/goblin/6.png';
import town7 from '../../assets/goblin/7.png';

export default function BG() {
  return (
    <div className={classes.bg}>
      <div className={classes.bgWrapper}>
        <img className={classes.goblinImg} src={town0} alt="" />
        <img className={classes.goblinImg} src={town1} alt="" />
        <img className={classes.goblinImg} src={town2} alt="" />
        {/* <img className={classes.goblinImg} src={town3} alt="" /> */}
        <img className={classes.goblinImg} src={town4} alt="" />
        <img className={classes.goblinImg} src={town5} alt="" />
        <img className={classes.goblinImg} src={town6} alt="" />
        <img className={classes.goblinImg} src={town7} alt="" />
      </div>
    </div>
  );
}
