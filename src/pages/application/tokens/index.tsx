import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@/components/ui/table"
import { Pencil } from "lucide-react"
import Image from "next/image" 
import IndexAddToken from "./addToken"
import { Button } from "@/components/ui/button"
import { token_data } from "@/data/token.data"

const IndexTokens = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState({
    image_url: "",
    type: "",
    network: "",
    network_id: "",
    symbol: "",
    description: "",
  })
  const handleCellClick = (
    image_url: string,
    type: "Native" | "Asset",
    network: string,
    network_id: number,
    symbol: string,
    description: string,
  ) => {
    setSelectedToken({
      image_url,
      type,
      network,
      network_id: network_id.toString(),
      symbol,
      description,
    })
    setDrawerOpen(true)
  }

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen)
  }

  return (
    <div className="py-4 flex flex-col justify-between h-full">
      <div className="py-4">
        <Card className="mb-3 card-bg-image">
          <CardHeader>
            <CardTitle>
              <b className="text-white">NATIVE TOKEN</b>
            </CardTitle>
          </CardHeader>
          <Table>
          <TableBody>
              {token_data
                .filter((token) => token.type === "Native")
                .map((token) => (
                  <TableRow key={token.symbol}>
                    <TableCell className="w-[50px] justify-center">
                      <Image
                        src={token.image_url}
                        alt={`${token.description} Logo`}
                        className="ml-1"
                        width={40}
                        height={40}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="mb-[2px]">
                        <span className="text-lg font-bold text-white">
                          {token.symbol}
                        </span>
                      </div>
                      <Badge>{token.description}</Badge>
                    </TableCell>
                    <TableCell className="w-[50px] justify-end pr-2">
                      <Pencil size="20" color="white" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
        <Card className="mb-3">
          <CardHeader>
            <CardTitle>
              <b>ASSETS</b>
            </CardTitle>
          </CardHeader>
          <Table>
          <TableBody>
              {token_data
                .filter((token) => token.type === "Asset")
                .map((token) => (
                  <TableRow
                    key={token.symbol}
                    className="cursor-pointer hover-bg-custom"
                  >
                    <TableCell className="w-[50px] justify-center">
                      <Image
                        src={token.image_url}
                        alt={`${token.description} Logo`}
                        className="ml-1"
                        width={40}
                        height={40}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="mb-[2px]">
                        <span className="text-lg font-bold">
                          {token.symbol}
                        </span>
                      </div>
                      <Badge>{token.description}</Badge>
                    </TableCell>
                    <TableCell className="w-[50px] justify-end pr-2">
                      <Pencil size="20" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
      </div>
      <Button onClick={toggleDrawer} variant="violet" className="my-auto">
        ADD NEW TOKEN
      </Button>

      <IndexAddToken 
        isDrawerOpen={isDrawerOpen} 
        toggleDrawer={toggleDrawer} 
      />
    </div>
  )
}

export default IndexTokens
