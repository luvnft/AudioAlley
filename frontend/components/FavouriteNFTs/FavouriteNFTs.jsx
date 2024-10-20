import React, { useEffect, useState } from "react";
import { Contract, providers, utils } from "ethers";
import axios from "axios";
import { useAccount, useSigner } from "wagmi";
import Image from "next/image";
import LoadingBox from "../loadingBox";
import Link from 'next/link';
import TextBox from "../loadingBox/textBox";
import {
  NFT_MARKETPLACE_ADDRESS,
  NFT_CONTRACT_ABI,
  NFT_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ABI,
} from "../../constants/index";

export const FavouriteNFTs = () => {
  //wagmi signer
  const { data: signer, isError, isLoading } = useSigner();
  const { connector: activeConnector, isConnected } = useAccount();

  const [nfts, setNfts] = useState([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const [loadingState, setLoadingState] = useState("not-loaded");

  const connectWallet = () => {
    if (typeof window !== "undefined") {
      alert("connect wallet");
    }
  };
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const provider = new providers.JsonRpcProvider(
      "https://rpc.ankr.com/fantom_testnet"
    );

    const nftContract = new Contract(
      NFT_CONTRACT_ADDRESS,
      NFT_CONTRACT_ABI,
      provider
    );

    const contract = new Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      provider
    );
    const data = await contract.getAllListedItems();

    const items = await Promise.all(
      data?.map(async (i) => {
        const tokenUri = await nftContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  const favNft = nfts[0 || 1 || 3 || 7 || 6 || 5];

  const buyNFT = async (price, tokenId) => {
    setIsPurchasing(true);

    const nftMarketPlaceContract = new Contract(
      NFT_MARKETPLACE_ADDRESS,
      NFT_MARKETPLACE_ABI,
      signer
    );

    let convertedPrice = utils.parseUnits(price.toString(), "ether");

    const transaction = await nftMarketPlaceContract.buyItem(
      NFT_CONTRACT_ADDRESS,
      tokenId,
      {
        value: convertedPrice,
      }
    );
    loadNFTs();
    await transaction.wait();
    await router.push("/my-items");
    setIsPurchasing(false);
  };

  const [usdPrice, setUsdPrice] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.coingecko.com/api/v3/simple/price?ids=fantom&vs_currencies=usd",
    };

    axios
      .request(options)
      .then((response) => {
        setUsdPrice(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="second-section">
      <div className="container" id="Explore" data-aos="zoom-in">
        <div className="row">
          <div className="col50 fav"></div>
        </div>
        <div className="rowX nft-m">
          <div>
            <div className="gradient-box col50">
              <div className="meta-nft col50">
                {favNft?.image ? (
                  <img src={favNft?.image} alt="Nft Image" />
                ) : (
                  <LoadingBox />
                )}
              </div>
              <div className="meta-text col50">
                {favNft?.name ? <p>{favNft?.name}</p> : <TextBox />}

                {favNft?.image ? (
                  <p>{Number(favNft?.price).toFixed(3)} FTM</p>
                ) : (
                  <TextBox />
                )}

                {favNft?.image ? (
                  <p className="nft_price_in_usd">
                    <span>
                      {usdPrice && favNft
                        ? Number(usdPrice["fantom"].usd).toFixed(2) *
                          Number(favNft.price).toFixed(2)
                        : null}{" "}
                      USD
                    </span>
                  </p>
                ) : (
                  <TextBox />
                )}

                {!isConnected ? (
                  <button
                    className="btn_fav_song_nft"
                    onClick={connectWallet}
                  >
                    Buy
                  </button>
                ) : (
                  <button
                    className="btn_fav_song_nft"
                    onClick={() =>
                      buyNFT(favNft?.price.toString(), favNft.tokenId)
                    }
                  >
                    Buy
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col50 fav">
            <h1>
              Buy/Sell/Barter Mixtape Songs <br />
              In The ATL5D{" "}
              <Link href="https://t.me/atl5d" underline>
                Telegram
              </Link>{" "}
              channel
            </h1>
            <h2>
               The Wizard of Hahz 
               <Link href="https://tiktok.com/@wizardofhahz" underline>
               <b>@WizardofHahz</b>
               </Link>{" "}
               is the mastermind behind creating the ATL5D Mixtape. At just 23 years old, he made his first million dollars by selling mixtapes out of his truck in Philly. However, after hearing about DJ Drama's arrest for selling mixtapes, he decided to quit the game and relocate to Atlanta. #AMixtapeFact
               Discover how to create a new income stream using $FTM (Fantom testnet) that can be easily converted to $USD.</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
