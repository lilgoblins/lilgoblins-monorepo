import classes from './AuctionActivityWrapper.module.css';

// eslint-disable-next-line @typescript-eslint/ban-types
const AuctionActivityWrapper: React.FC<{}> = props => {
  return <div className={classes.wrapper} style={{backgroundColor: "rgba(225, 225, 225, 0.85)", padding:"6px", borderRadius: "12px"}}>{props.children}</div>;
};
export default AuctionActivityWrapper;
