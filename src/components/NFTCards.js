import React, { useEffect, useState } from "react";

const NFTCards = ({nftMetadata, nftContractAddress}) => {

    return (
                <div className="Minted-NFt">
                    {nftMetadata.length > 0 &&
                        nftMetadata.map((data, index) => {
                            const imageUrl = data.image.startsWith("ipfs://")
                                ? data.image.replace("ipfs://", "https://ipfs.io/ipfs/")
                                : data.image;

                            return (
                                <div key={index} className="nft-card">
                                    <img src={imageUrl} alt={`NFT ${data.tokenId}`} />
                                    <div className="nft-details">
                                        <h3>{data.name}</h3>
                                        <p>{data.description}</p>
                                        <div className="attributes">
                                            {data.attributes.map((attr, i) => (
                                                <div key={i}>
                                                    <strong>{attr.trait_type}: </strong>
                                                    {attr.value}
                                                </div>
                                            ))}
                                        </div>
                                        <a
                                            className="opensea-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={`https://testnets.opensea.io/assets/sepolia/${nftContractAddress}/${data.tokenId}`}
                                        >
                                            View in OpenSea
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                </div>
    );
};

export default NFTCards;