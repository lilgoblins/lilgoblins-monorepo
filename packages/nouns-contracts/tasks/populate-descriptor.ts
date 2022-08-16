import { task, types } from 'hardhat/config';
import ImageData from '../files/image-data.json';
import { chunkArray } from '../utils';

task('populate-descriptor', 'Populates the descriptor with color palettes and Noun parts')
  .addOptionalParam(
    'nftDescriptor',
    'The `NFTDescriptor` contract address',
    '0xB29C9d34f736Ce78EceC7EFB964Feb3508B79dA9',
    types.string,
  )
  .addOptionalParam(
    'nounsDescriptor',
    'The `NounsDescriptor` contract address',
    '0x6994AE600820e78a9AA1E45268efaAC114367D5E',
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
    // console.log("adding bacground")
    // await descriptorContract.addManyBackgrounds(bgcolors);
    // await new Promise(f => setTimeout(f, 5000));

    // console.log("adding palette")
    // await descriptorContract.addManyColorsToPalette(0, palette);
    // await new Promise(f => setTimeout(f, 5000));

    // console.log("adding bodies")
    // await descriptorContract.addManyBodies(bodies.map(({ data }) => data));
    // await new Promise(f => setTimeout(f, 5000));

    // console.log("adding ears")
    // await descriptorContract.addManyEars(ears.map(({ data }) => data));
    // await new Promise(f => setTimeout(f, 5000));
    // const earChunk = chunkArray(ears, 10);
    // for (const chunk of earChunk) {
    //   await descriptorContract.addManyEars(chunk.map(({ data }) => data));
    //   await new Promise(f => setTimeout(f, 5000));
    // }


    console.log("adding heads")
    await descriptorContract.addManyHeads(heads.map(({ data }) => data));
    await new Promise(f => setTimeout(f, 5000));
    // const headChunk = chunkArray(heads, 10);
    // for (const chunk of headChunk) {
    //   await descriptorContract.addManyHeads(chunk.map(({ data }) => data));
    //   await new Promise(f => setTimeout(f, 5000));
    // }

    console.log("adding glasses")
    await descriptorContract.addManyGlasses(glasses.map(({ data }) => data));
    await new Promise(f => setTimeout(f, 5000));

    console.log("adding faces")
    await descriptorContract.addManyFaces(faces.map(({ data }) => data));
    await new Promise(f => setTimeout(f, 5000));

    console.log('Descriptor populated with palettes and parts');
  });
