import { ImageData as data, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
import { BigNumber, BigNumber as EthersBN } from 'ethers';
import { INounSeed, useBigNounSeed, useNounSeed } from '../../wrappers/nounToken';
import Noun from '../Noun';
import { Link } from 'react-router-dom';
import classes from './StandaloneNoun.module.css';
import { useDispatch } from 'react-redux';
import { setOnDisplayAuctionNounId } from '../../state/slices/onDisplayAuction';
import nounClasses from '../Noun/Noun.module.css';
import { useMemo } from 'react';

interface StandaloneNounProps {
  nounId: EthersBN;
}
interface StandaloneCircularNounProps {
  nounId: EthersBN;
}

interface StandaloneNounWithSeedProps {
  nounId: EthersBN;
  onLoadSeed?: (seed: INounSeed) => void;
  shouldLinkToProfile: boolean;
}

const getNoun = (nounId: string | EthersBN | number, seed: INounSeed) => {
  const id = nounId.toString();
  const name = `Goblin ${id}`;
  const description = `Lil Goblin ${id} is a member of the Lil Goblins DAO`;
  const { parts, background } = getNounData(seed);
  const svg = buildSVG(parts, data.palette, 'none');
  const image = `data:image/svg+xml;base64,${btoa(svg)}`;

  return {
    name,
    svg,
    description,
    image,
    parts,
  };
};

export const useNounData = (nounId: string | EthersBN | number) => {
  const seed = useNounSeed(BigNumber.from(nounId));
  return useMemo(() => seed && getNoun(nounId, seed), [nounId, seed]);
};

const StandaloneNoun: React.FC<StandaloneNounProps> = (props: StandaloneNounProps) => {
  const { nounId } = props;
  const seed = useNounSeed(nounId);
  const noun = seed && getNoun(nounId, seed);

  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  return (
    <Link
      to={'/lilgoblin/' + nounId.toString()}
      className={classes.clickableNoun}
      onClick={onClickHandler}
    >
      <Noun imgPath={noun ? noun.image : ''} alt={noun ? noun.description : 'Lil Goblin'} />
    </Link>
  );
};

export const StandaloneNounCircular: React.FC<StandaloneCircularNounProps> = (
  props: StandaloneCircularNounProps,
) => {
  const { nounId } = props;
  const seed = useNounSeed(nounId);
  const noun = seed && getNoun(nounId, seed);

  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  return (
    <Link
      to={'/lilgoblin/' + nounId.toString()}
      className={classes.clickableNoun}
      onClick={onClickHandler}
    >
      <Noun
        imgPath={noun ? noun.image : ''}
        alt={noun ? noun.description : 'Lil Goblin'}
        wrapperClassName={nounClasses.circularNounWrapper}
        className={nounClasses.circular}
      />
    </Link>
  );
};

export const StandaloneNounRoundedCorners: React.FC<StandaloneNounProps> = (
  props: StandaloneNounProps,
) => {
  const { nounId } = props;
  const seed = useNounSeed(nounId);
  const noun = seed && getNoun(nounId, seed);

  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  return (
    <Link
      to={'/lilgoblin/' + nounId.toString()}
      className={classes.clickableNoun}
      onClick={onClickHandler}
    >
      <Noun
        imgPath={noun ? noun.image : ''}
        alt={noun ? noun.description : 'Lil Goblin'}
        className={nounClasses.rounded}
      />
    </Link>
  );
};

export const StandaloneNounWithSeed: React.FC<StandaloneNounWithSeedProps> = (
  props: StandaloneNounWithSeedProps,
) => {
  const { nounId, onLoadSeed, shouldLinkToProfile } = props;

  const dispatch = useDispatch();
  const seed = useNounSeed(nounId);

  if (!seed || !nounId || !onLoadSeed) return <Noun imgPath="" alt="Lil Goblin" />;

  onLoadSeed(seed);

  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  const { image, description, parts } = getNoun(nounId, seed);

  const noun = <Noun imgPath={image} alt={description} parts={parts} />;
  const nounWithLink = (
    <Link
      to={'/lilgoblin/' + nounId.toString()}
      className={classes.clickableNoun}
      onClick={onClickHandler}
    >
      {noun}
    </Link>
  );
  return shouldLinkToProfile ? nounWithLink : noun;
};

export const StandaloneBigNounCircular: React.FC<StandaloneCircularNounProps> = (
  props: StandaloneCircularNounProps,
) => {
  const { nounId } = props;
  // const seed = useBigNounSeed(nounId);
  // const noun = seed && getBigNoun(nounId, seed);

  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  return (
    <a target="_blank" href={'https://nouns.wtf/noun/' + nounId.toString()}>
      <Noun
        isBigNoun={true}
        imgPath={''}
        alt={'Lil Goblin'}
        wrapperClassName={nounClasses.circularNounWrapper}
        className={nounClasses.circular}
      />
    </a>
  );
};

export default StandaloneNoun;
