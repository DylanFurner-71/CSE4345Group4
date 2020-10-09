import NodeGeocoder from "node-geocoder";
import dotenv from "dotenv";
dotenv.config({ path: "./../config/config.env" });

const options = {
  provider: "locationiq",
  httpAdapter: "https",
  apiKey: "2a2e2bc443e1a6",
  formatter: null,
};

export const geocoder = NodeGeocoder(options);
