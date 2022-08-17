import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
import classes from './Documentation.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Link from '../Link';

const Documentation = () => {
  const playgroundLink = <Link text="Playground" url="/playground" leavesPage={false} />;
  const nounsDao = <Link text="Nouns DAO" url="https://nouns.wtf" leavesPage={true} />;
  const publicDomainLink = (
    <Link
      text="public domain"
      url="https://creativecommons.org/publicdomain/zero/1.0/"
      leavesPage={true}
    />
  );
  const compoundGovLink = (
    <Link text="Compound Governance" url="https://compound.finance/governance" leavesPage={true} />
  );
  return (
    <Section fullWidth={false}>
      <Col lg={{ span: 10, offset: 1 }}>
        <div className={classes.headerWrapper}>
          <h1>WTF?</h1>
          <p className={classes.aboutText}>
            Lil Goblins are just like Nouns, but Lil!
            <br />
            <br />
            An expansion DAO based on {nounsDao}, Lil Goblins DAO works to create a new layer within
            the Nouns ecosystem; Nouns as kids. By expanding the ecosystem, Lil Goblins DAO aims at
            exposing more people to Nouns.
          </p>
          <p className={classes.aboutText} style={{ paddingBottom: '4rem' }}>
            Learn more below, or start creating Lil Goblins off-chain using the {playgroundLink}.
          </p>
        </div>
        <Accordion flush>
          <Accordion.Item eventKey="0" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>Summary</Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>Lil Goblins artwork is in the {publicDomainLink}.</li>
                <li>One Lil Goblin is born and trustlessly auctioned every hour, forever.</li>
                <li>Second and third place bidders are given Lil Goblin Poops.</li>
                <li>10 Lil Goblin Poops can be converted into 1 Lil Goblin.</li>
                <li>
                  100% of Lil Goblin auction proceeds are trustlessly sent to the Lil Goblins treasury.
                </li>
                <li>Settlement of one auction kicks off the next.</li>
                <li>All Lil Goblins are members of Lil Goblins DAO.</li>
                <li>Lil Goblins DAO is backed by Nouns and Lil Nouns via Small Grants.</li>
                <li>Lil Goblins DAO uses Nouns DAO’s fork of  {compoundGovLink}.</li>
                <li>One Lil Goblin is equal to one vote.</li>
                <li>The treasury is controlled exclusively by Lil Goblins via governance.</li>
                <li>Artwork is generative and stored directly on-chain (not IPFS).</li>
                <li>
                  No explicit rules exist for attribute scarcity; all Lil Goblins are equally rare.
                </li>
                <li>
                  Lil Goblin Kings receive rewards in the form of Lil Goblins (10% of supply for first 5
                  years).
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              An Hour Auctions
            </Accordion.Header>
            <Accordion.Body>
              <p className={classes.aboutText}>
                The Lil Goblins Auction Contract will act as a self-sufficient Lil Goblin generation and
                distribution mechanism, auctioning one Lil Goblin every hour, forever. 100% of
                auction proceeds (ETH) are automatically deposited in the Lil Goblins DAO treasury,
                where they are governed by Lil Goblin owners.
              </p>

              <p className={classes.aboutText}>
                Each time an auction is settled, the settlement transaction will also cause a new
                Lil Goblin to be minted and a new hour auction to begin.{' '}
              </p>
              <p>
                While settlement is most heavily incentivized for the winning bidder, it can be
                triggered by anyone, allowing the system to trustlessly auction Lil Goblins as long as
                Ethereum is operational and there are interested bidders.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              Bidding and Settling Auctions
            </Accordion.Header>
            <Accordion.Body>
              <p className={classes.aboutText}>
                <h3>Bids</h3>
                Once an auction starts, everyone has an hour to bid. Anyone can bid an amount
                at/above 0.01 eth. The Amount bid is returned to bidder if they lose the auction
                (minus gas spent on bid transaction).
                <br />
                <br />
                Bids at the very last minute increase the auction time by 1 and a half minutes.
                Sometimes, multiple bids are sent at the same time. This may result in bids coming
                in and winning an auction at the very last minute/seconds (irrespective of time
                increase).
                <br />
                <p className={classes.aboutText}>
                  <h3>Bid Refunds</h3>
                  Unsuccessful bids are refunded in full. The timing of refunds may be offset by 1
                  bidder. This means that a refund is processed for an unsuccessful bid, when a
                  higher bid is submitted.
                </p>
              </p>

              <p className={classes.aboutText}>
                <h3>Settlement</h3>
                When an auction ends, a gas-only transaction is required to mint the current Lil
                Noun to the winners wallet and start the next auction. Anyone can settle an auction.
                As gas price fluctuates, the cost of settlement also fluctuates.
                <br />
                <br />
                Settlement gas price of every 9th Lil Goblin is higher. This is due to the transaction
                also triggering 1 free Lil Goblin mint to The Lil Goblinders.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>Lil Goblins DAO</Accordion.Header>
            <Accordion.Body>
              Lil Goblins DAO utilizes Nouns DAO's fork of {compoundGovLink} and is the main governing
              body of the Lil Goblins ecosystem. The Lil Goblins DAO treasury receives 100% of ETH
              proceeds from daily Lil Goblin auctions. Each Lil Goblin is an irrevocable member of Lil
              Nouns DAO and entitled to one vote in all governance matters. Lil Goblin votes are
              non-transferable (if you sell your Lil Goblin the vote goes with it) but delegatable,
              which means you can assign your vote to someone else as long as you own your Lil Goblin.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              Governance ‘Slow Start’
            </Accordion.Header>
            <Accordion.Body>
              <p>
                In addition to the precautions taken by Compound Governance, Lil Goblin Kings have given
                themselves a special veto right to ensure that no malicious proposals can be passed
                while the Lil Goblin supply is low. This veto right will only be used if an obviously
                harmful governance proposal has been passed, and is intended as a last resort.
              </p>
              <p>
                Lil Goblin Kings will proveably revoke this veto right when they deem it safe to do so.
                This decision will be based on a healthy Lil Goblin distribution and a community that
                is engaged in the governance process.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>Lil Goblin Traits</Accordion.Header>
            <Accordion.Body>
              <p>
                Lil Goblins are generated randomly based Ethereum block hashes. There are no 'if'
                statements or other rules governing Lil Goblin trait scarcity, which makes all Lil
                Goblins equally rare. As of this writing, Lil Goblins are made up of:
              </p>
              <ul>
                <li>backgrounds (2) </li>
                <li>bodies (30)</li>
                <li>ears (137) </li>
                <li>heads (234) </li>
                <li>glasses (21)</li>
                <li>faces (137) </li>
              </ul>
              You can experiment with off-chain Lil Goblin generation at the {playgroundLink}.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              On-Chain Artwork
            </Accordion.Header>
            <Accordion.Body>
              <p>
                Lil Goblins are stored directly on Ethereum and do not utilize pointers to other
                networks such as IPFS. This is possible because Lil Goblin parts are compressed and
                stored on-chain using a custom run-length encoding (RLE), which is a form of
                lossless compression.
              </p>

              <p>
                The compressed parts are efficiently converted into a single base64 encoded SVG
                image on-chain. To accomplish this, each part is decoded into an intermediate format
                before being converted into a series of SVG rects using batched, on-chain string
                concatenation. Once the entire SVG has been generated, it is base64 encoded.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="8" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              Lil Goblin King's Reward
            </Accordion.Header>
            <Accordion.Body>
              <p>
                'Lil Goblin Kings' are the group of builders that initiated Lil Goblins. Here are the Lil
                Goblin Kings:
              </p>
              <ul>
                <li>
                  <Link text="@0xhappyhydra" url="https://twitter.com/0xhappyhydra" leavesPage={true} />
                </li>
                <li>
                  <Link
                    text="@0xggoma"
                    url="https://twitter.com/0xggoma"
                    leavesPage={true}
                  />
                </li>
                <li>
                  <Link text="@Mory_c_" url="https://twitter.com/Mory_c_" leavesPage={true} />
                </li>
                <li>
                  <Link text="@bug4what" url="https://twitter.com/bug4what" leavesPage={true} />
                </li>
              </ul>
              <p>
                Because 100% of Lil Goblin auction proceeds are sent to Lil Goblins DAO, Lil Goblin Kings
                have chosen to compensate themselves with Lil Goblins. Every 10th Lil Goblin for the
                first 5 years of the project (Lil Goblin ids #0, #10, #20, #30 and so on) will be
                automatically sent to the Lil Goblin King's multisig to be vested and shared among the
                founding members of the project.
              </p>
              <p>
                Lil Goblin Kings distributions don't interfere with the cadence of 1 hour auctions.
                Lil Goblins are sent directly to the Lil Goblin King's Multisig, and auctions continue on
                schedule with the next available Lil Goblin ID.
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Section>
  );
};
export default Documentation;
