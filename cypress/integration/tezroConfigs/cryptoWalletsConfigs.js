// конфиг с лимитами и комиссиями по всем валютам
let ETH
let cryptoWalletsConfigs = [
  ETH = {
    limits: {
        input: "0.00000001",
        output: "0.01",
        internal: "0.00000001",
      },
      commission: {
        input: "0",
        output: "0.01",
        internal: "0",
      },
  },
]
export default cryptoWalletsConfigs = {ETH};
