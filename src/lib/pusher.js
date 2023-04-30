import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1592494",
  key: "eb9b0503af294106e062",
  secret: "68ea150b36e3ed0de7a9",
  cluster: "ap2",
  useTLS: true,
});

export const pusherClient = new PusherClient("eb9b0503af294106e062", {
  cluster: "ap2",
});
