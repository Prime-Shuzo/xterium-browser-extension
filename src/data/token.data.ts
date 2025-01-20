import { TokenModel } from "@/models/token.model"
import AZKLogo from "data-base64:/assets/tokens/azk.png"
import IXAVLogo from "data-base64:/assets/tokens/ixav.png"
import IXONLogo from "data-base64:/assets/tokens/ixon.png"
import XAVLogo from "data-base64:/assets/tokens/xav.png"
import XGMLogo from "data-base64:/assets/tokens/xgm.png"
import XONLogo from "data-base64:/assets/tokens/xon.png"
import DefaultLogo from "data-base64:/assets/tokens/default.png"

export const TokenData: TokenModel[] = [
  {
    id: 1,
    image_url: "XONLogo",
    type: "Native",
    network: "Xode",
    network_id: 0,
    symbol: "XON",
    description: "Native XON Token"
  },
  {
    id: 2,
    image_url: "XGMLogo",
    type: "Asset",
    network: "Xode",
    network_id: 1,
    symbol: "XGM",
    description: "XGame Utility Token"
  },
  {
    id: 3,
    image_url: "XAVLogo",
    type: "Asset",
    network: "Xode",
    network_id: 2,
    symbol: "XAV",
    description: "Xaver Utility Token"
  },
  {
    id: 4,
    image_url: "AZKLogo",
    type: "Asset",
    network: "Xode",
    network_id: 3,
    symbol: "AZK",
    description: "Azkal Meme Token"
  },
  {
    id: 5,
    image_url: "IXONLogo",
    type: "Asset",
    network: "Xode",
    network_id: 4,
    symbol: "IXON",
    description: "Private XON Token"
  },
  {
    id: 6,
    image_url: "IXAVLogo",
    type: "Asset",
    network: "Xode",
    network_id: 5,
    symbol: "IXAV",
    description: "Private XAV Token"
  },
  {
    id: 7,
    image_url: "DefaultLogo",
    type: "Asset",
    network: "Xode",
    network_id: 6,
    symbol: "IDON",
    description: "Private DON Token"
  }
]

export class TokenImages {
  getBase64Image(imageName: string) {
    switch (imageName) {
      case "XONLogo": return XONLogo
      case "XGMLogo": return XGMLogo
      case "XAVLogo": return XAVLogo
      case "AZKLogo": return AZKLogo
      case "IXONLogo": return IXONLogo
      case "IXAVLogo": return IXAVLogo
      default: return DefaultLogo
    }
  }
}