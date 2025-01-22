import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { NetworkModel } from "@/models/network.model"
import type { PumpTokenModel } from "@/models/pump-token.model"
import { NetworkService } from "@/services/network.service"
import { PumpTokenService } from "@/services/pump-token.service"
import { Search } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import IndexPumpTokenDetails from "./pump-token-details"

const truncateText = (text, limit) => {
  return text.length > limit ? `${text.slice(0, limit)}...` : text
}

const IndexPumpToken = () => {
  const { t } = useTranslation()
  const networkService = new NetworkService()
  const pumpTokenService = new PumpTokenService()

  const [openSearchToken, setOpenSearchTokens] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isPumpTokenDetailsDrawerOpen, setIsPumpTokenDetailsDrawerOpen] = useState(false)
  const [isAddPumpTokenDrawerOpen, setIsAddPumpTokenDrawerOpen] = useState<boolean>(false)
  const [selectedInSearchToken, setSelectedInSearchToken] =
    useState<PumpTokenModel | null>(null)
  const [pumpTokens, setPumpTokens] = useState<PumpTokenModel[]>([])
  const [pumpTokenData, setPumpTokenData] = useState<PumpTokenModel>({
    id: 0,
    description: "",
    marketCap: 0,
    price: 0,
    virtualLiquidity: 0,
    volume24h: 0,
    tokenCreated: new Date(),
    percentage: 0,
    image_url: undefined,
    network: "Xode",
    network_id: 0
  })
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkModel>(null)
  const [assetDetails, setAssetDetails] = useState<any>(null)

  const getNetwork = () => {
    networkService.getNetwork().then((data) => {
      setSelectedNetwork(data)
    })
  }

  const getPumpTokens = () => {
    pumpTokenService.getPumpTokens().then((data) => {
      setPumpTokens(data)

      data.forEach((token) => {
        if (token.network_id) {
          fetchAssetDetails(token.network_id)
        }
      })
    })
  }

  const fetchAssetDetails = async (assetId) => {
    try {
      const details = await pumpTokenService.getAssetDetails(assetId)
      console.log(details)
      setAssetDetails(details)
    } catch (error) {
      console.error("Failed to fetch asset details:", error)
    }
  }

  useEffect(() => {
    getNetwork()
    getPumpTokens()
  }, [])

  const handleTokenClick = (token: PumpTokenModel) => {
    setPumpTokenData(token)
    setIsPumpTokenDetailsDrawerOpen(true)
  }

  const filteredTokens = pumpTokens.filter(
    (token: PumpTokenModel) =>
      (!searchQuery ||
        assetDetails?.name?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedNetwork ? token.network === selectedNetwork.name : true)
  )

  const formatCurrency = (amount) => {
    if (!amount) return "$0.0"
    const num = parseFloat(amount.replace(/,/g, ""))
    if (isNaN(num)) return "$0.0"

    if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}k`
    }
    return `$${num.toFixed(1)}`
  }

  return (
    <>
      <div className="py-4 flex flex-col justify-between h-full">
        <div className="py-4">
          <div className="mb-3">
            <Label className="font-bold text-muted">{t("Search")}</Label>
            <Popover open={openSearchToken} onOpenChange={setOpenSearchTokens}>
              <PopoverTrigger asChild>
                <Button
                  variant="roundedOutline"
                  role="combobox"
                  aria-expanded={openSearchToken}
                  className="w-full justify-between text-input-primary p-3 font-bold hover:bg-accent"
                  size="lg">
                  {assetDetails ? (
                    <>
                      <span className="text-muted">
                        {assetDetails.name} &nbsp;
                        {"("}
                        {assetDetails.symbol}
                        {")"}
                      </span>
                    </>
                  ) : (
                    <span className="text-muted opacity-70">
                      {t("Search for Tokens")}
                    </span>
                  )}
                  <Search />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0"
                align="start"
                style={{ width: "var(--radix-popper-anchor-width)" }}>
                <Command>
                  <CommandInput
                    placeholder={t("Enter Token Name")}
                    value={assetDetails ? `${assetDetails.name}` : searchQuery}
                    onValueChange={(value) => {
                      setSearchQuery(value)
                      if (value === "") {
                        setSelectedInSearchToken(null)
                      }
                    }}
                  />
                  <CommandList>
                    <CommandEmpty>{t("No results found.")}</CommandEmpty>
                    <CommandGroup>
                      {filteredTokens.map((token) => (
                        <CommandItem
                          key={token.id}
                          value={assetDetails?.name || ""} // Guard with optional chaining or fallback to empty string
                          onSelect={() => {
                            setSelectedInSearchToken(token)
                            setOpenSearchTokens(false)
                          }}
                          className="cursor-pointer hover:bg-accent">
                          {assetDetails?.name || t("No Name Available")}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex grid grid-cols-2 sm:grid-cols-2 gap-4">
            {selectedInSearchToken ? (
              <div
                key={selectedInSearchToken.id}
                className="flex flex-col items-start justify-between border-2 border-primary dark:border-border dark:bg-muted/50 rounded-xl h-full"
                onClick={() => handleTokenClick(selectedInSearchToken)}>
                <div className="w-full flex justify-center mb-4">
                  <img
                    src={selectedInSearchToken.image_url}
                    alt={assetDetails.name}
                    className="h-36 w-full object-cover object-center rounded-lg"
                  />
                </div>
                <h3 className="font-bold text-sm pl-2">
                  {assetDetails.name} ({assetDetails.symbol})
                </h3>
                <p className="pl-2 mt-1">
                  Created by:{" "}
                  <span className="text-muted p-4 underline">
                    {assetDetails.owner.slice(0, 4)}...
                    {assetDetails.owner.slice(-4)}
                  </span>
                </p>
                <p className="pl-2 pr-2 opacity-50 leading-snug mt-1 mb-1">
                  {truncateText(selectedInSearchToken.description, 50)}
                </p>
                <p>
                  <span className="opacity-50 pl-2">Market Cap:</span>
                  <span className="font-bold p-4">{selectedInSearchToken.marketCap}</span>
                  <span className="font-bold p-4">
                    {formatCurrency(selectedInSearchToken.marketCap)}
                  </span>{" "}
                </p>
              </div>
            ) : (
              filteredTokens.map((token) => (
                <div
                  key={token.id}
                  className="flex flex-col items-start justify-between border-2 border-primary dark:border-border dark:bg-muted/50 rounded-xl h-full"
                  onClick={() => handleTokenClick(token)}>
                  <div className="w-full flex justify-center mb-4">
                    <img
                      src={token.image_url}
                      alt={assetDetails?.name || "Token Image"}
                      className="h-36 w-full object-cover object-center rounded-lg"
                    />
                  </div>
                  <h3 className="font-bold text-sm pl-2">
                    {assetDetails?.name || "No Name Available"} (
                    {assetDetails?.symbol || "N/A"})
                  </h3>
                  <p className="pl-2 mt-1">
                    Created by:{" "}
                    <span className="text-muted p-4 underline">
                      {assetDetails?.owner
                        ? `${assetDetails.owner.slice(0, 4)}...${assetDetails.owner.slice(-4)}`
                        : "Unknown"}
                    </span>
                  </p>
                  <p className="pl-2 pr-2 opacity-50 leading-snug mt-1 mb-1">
                    {truncateText(token.description, 50)}
                  </p>
                  <p>
                    <span className="opacity-50 pl-2">Market Cap:</span>
                    <span className="font-bold p-4">
                      {formatCurrency(token.marketCap)}
                    </span>
                    <span className="opacity-50">({token.percentage}%)</span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Drawer
        open={isPumpTokenDetailsDrawerOpen}
        onOpenChange={setIsPumpTokenDetailsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="border-b border-border-1/20 pb-4 text-muted">
              {assetDetails
                ? `${assetDetails.name} (${assetDetails.symbol})`
                : "Loading..."}
            </DrawerTitle>
          </DrawerHeader>
          {assetDetails ? (
            <IndexPumpTokenDetails
              selectedPumpTokens={pumpTokenData}
              handleCallbacks={() => {}}
              owner={assetDetails.owner}
            />
          ) : (
            <p>{t("Loading...")}</p>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default IndexPumpToken
