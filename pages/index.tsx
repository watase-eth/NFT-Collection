import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { MediaRenderer, Web3Button, useActiveClaimCondition, useAddress, useClaimIneligibilityReasons, useContract, useContractMetadata, useTotalCirculatingSupply, useTotalCount } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";
import { ethers } from "ethers";

const Home: NextPage = () => {
  const address = useAddress();

  const {
    contract
  } = useContract(CONTRACT_ADDRESS);

  const {
    data: contractMetadata,
    isLoading: isContractMetadataLoading,
  } = useContractMetadata(contract);

  const {
    data: activeClaimPhase,
    isLoading: isActiveClaimPhaseLoading,
  } = useActiveClaimCondition(contract);
  console.log(activeClaimPhase);

  const {
    data: claimIneligibilityReasons,
    isLoading: isClaimIneligibilityReasonsLoading,
  } = useClaimIneligibilityReasons(
    contract,
    {
      walletAddress: address || "",
      quantity: 1,
    }
  );

  const {
    data: totalSupply,
    isLoading: isTotalSupplyLoading,
  } = useTotalCount(contract);
  const {
    data: totalClaimSupply,
    isLoading: isTotalClaimSupplyLoading,
  } = useTotalCirculatingSupply(contract);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {!isContractMetadataLoading && (
          <div className={styles.heroSection}>
            <div className={styles.collectionImage}>
              <MediaRenderer
                src={contractMetadata.image}
              />
            </div>
            <div>
              <h1>{contractMetadata.name}</h1>
              <p>{contractMetadata.description}</p>
              {!isActiveClaimPhaseLoading ? (
                <div>
                  <p>Claim Phase: {activeClaimPhase?.metadata?.name}</p>
                  <p>Price: {ethers.utils.formatUnits(activeClaimPhase?.price!)}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              {!isTotalClaimSupplyLoading && !isTotalClaimSupplyLoading ? (
                <p>Claimed: {totalClaimSupply?.toNumber()} / {totalSupply?.toNumber()}</p>
              ) : (
                <p>Loading...</p>
              )}
              {address ? (
                !isClaimIneligibilityReasonsLoading ? (
                  claimIneligibilityReasons?.length! > 0 ? (
                    claimIneligibilityReasons?.map((reason, index) => (
                      <p key={index}>{reason}</p>
                    ))
                  ) : (
                    <div>
                      <p>Eligible to claim</p>
                      <Web3Button
                        contractAddress={CONTRACT_ADDRESS}
                        action={(contract) =>  contract.erc721.claim(1)}
                      >Claim NFT</Web3Button>
                    </div>
                  )
                ) : (
                  <p>Loading...</p>
                )
              ) : (
                <p>Connect Wallet to claim</p>
              )}
              <div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
