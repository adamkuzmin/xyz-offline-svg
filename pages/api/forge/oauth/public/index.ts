// pages/api/forge/oauth/public.ts

import type { NextApiRequest, NextApiResponse } from "next";
import Axios from "axios";
import querystring from "querystring";
import { APS_CLIENT_ID, APS_CLIENT_SECRET } from "@/components/bim360/config";

import APS from "forge-apis";

let publicAuthClient = new APS.AuthClientTwoLegged(
  APS_CLIENT_ID,
  APS_CLIENT_SECRET,
  ["viewables:read"],
  true
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      if (!publicAuthClient.isAuthorized()) {
        await publicAuthClient.authenticate();
      }

      res.status(200).json(publicAuthClient.getCredentials());
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching Forge token" });
    }
  } else {
    // Handle any non-GET requests
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
