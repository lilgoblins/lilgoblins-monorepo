import { task, types } from 'hardhat/config';
import ImageData from '../files/image-data.json';
import { chunkArray } from '../utils';

task('populate-descriptor', 'Populates the descriptor with color palettes and Noun parts')
  .addOptionalParam(
    'nftDescriptor',
    'The `NFTDescriptor` contract address',
    '0x0fd3Fb251E1112e46efD8c0da199E6245FaE1F77',
    types.string,
  )
  .addOptionalParam(
    'nounsDescriptor',
    'The `NounsDescriptor` contract address',
    '0x1197Ec597045403bBae28B72488eB952C71705F3',
    types.string,
  )
  .setAction(async ({ nftDescriptor, nounsDescriptor }, { ethers }) => {
    const descriptorFactory = await ethers.getContractFactory('NounsDescriptor', {
      libraries: {
        NFTDescriptor: nftDescriptor,
      },
    });
    const descriptorContract = descriptorFactory.attach(nounsDescriptor);

    const { bgcolors, palette, images } = ImageData;
    const { bodies, ears, heads, glasses, faces } = images;

    // Chunk head and accessory population due to high gas usage
    console.log("adding bacground")
    await descriptorContract.addManyBackgrounds(bgcolors);
    await new Promise(f => setTimeout(f, 10000));

    console.log("adding palette")
    await descriptorContract.addManyColorsToPalette(0, palette);
    await new Promise(f => setTimeout(f, 10000));

    console.log("adding bodies")
    await descriptorContract.addManyBodies(bodies.map(({ data }) => data));
    await new Promise(f => setTimeout(f, 10000));

    console.log("adding ears")
    await descriptorContract.addManyEars(ears.map(({ data }) => data));
    await new Promise(f => setTimeout(f, 10000));

    console.log("adding heads")
    await descriptorContract.addManyHeads(heads.map(({ data }) => data));
    await new Promise(f => setTimeout(f, 10000));

    console.log("adding glasses")
    await descriptorContract.addManyGlasses(glasses.map(({ data }) => data));
    await new Promise(f => setTimeout(f, 10000));

    console.log("adding faces")
    await descriptorContract.addManyFaces(faces.map(({ data }) => data));
    await new Promise(f => setTimeout(f, 10000));

    console.log('Descriptor populated with palettes and parts');
  });
