// конфиг с лимитами и комиссиями по всем валютам

cryptoWalletsConfigs: [
    EOSORIG = {
        limits: {
            input: '0',
            output: '1',
            internal: '0.0001'
        },
        commission: {
            input: '0',
            output: '0.01',
            internal: '0'
        }
    },
    USD = {
        limits: {
            input: '1',
            output: '0.01',
            internal: '0.01'
        },
        commission: {
            input: '0',
            output: '0.01',
            internal: '0'
        }
    },
    EUR = {
        limits: {
            input: '0.82',
            output: '0.01',
            internal: '0.01'
        },
        commission: {
            input: '0',
            output: '0.01',
            internal: '0'
        }
    },
    CNY = {
        limits: {
            input: '6.54',
            output: '0.01',
            internal: '0.01'
        },
        commission: {
            input: '0',
            output: '0.01',
            internal: '0'
        }
    },
    TRX = {
        limits: {
            input: '0',
            output: '0.05',
            internal: '0.000001'
        },
        commission: {
            input: '0',
            output: '0.01',
            internal: '0'
        }
    },
    USDTTRX = {
        limits: {
            input: '0',
            output: '0.01',
            internal: '0.01'
        },
        commission: {
            input: '0',
            output: '0.01',
            internal: '0'
        }
    },
    USDCTRX = {
        commission: {
            input: '0',
            output: '0.01',
            internal: '0'
        },
        limits: {
            input: '0',
            output: '0.01',
            internal: '0.01'
        }
    },
    USDCETH = {
        commission: {
            input: '0',
            output: '0.01',
            internal: '0'
        },
        limits: {
            input: '0',
            output: '0.01',
            internal: '0.01'
        }
    },
    BTC = {
        limits: {
            input: '0',
            output: '0.000003',
            internal: '0.00000001'
        },
        commission: {
            input: '0',
            output: '0.01',
            internal: '0'
        }
    },
    ETH = {
        limits: {
            input: '0',
            output: '0.0007',
            internal: '0.00000001'
        },
        commission: {
            input: '0',
            output: '0.01',
            internal: '0'
        }
    },
    USDT = {
        limits: {
            input: '0',
            output: '0.01',
            internal: '0.01'
        },
        commission: {
            input: '0',
            output: '0.01',
            internal: '0'
        }
    },
    EURT = {
        limits: {
            input: '0',
            output: '0.01',
            internal: '0.01'
        },
        commission: {
            input: '0',
            output: '0.01',
            internal: '0'
        }
    },
    CNHT = {
        limits: {
            input: '0',
            output: '0.01',
            internal: '0.01'
        },
        commission: {
            input: '0',
            output: '0.01',
            internal: '0'
        }
    },
    XAUT = {
        limits: {
            input: '0',
            output: '0.000001',
            internal: '0.001'
        },
        commission: {
            input: '0',
            output: '0.01',
            internal: '0'
        }
    },
    TCUSD = {
        commission: {
            input: '0',
            output: '0.005',
            internal: '0'
        },
        limits: {
            input: '0',
            output: '0',
            internal: '0.01'
        }
    },
    SHIBETH = {
        commission: {
            input: '0',
            output: '0.005',
            internal: '0'
        },
        limits: {
            input: '0',
            output: '0',
            internal: '0'
        }
    },
    MATCETH = {
        commission: {
            input: '0',
            output: '0.005',
            internal: '0'
        },
        limits: {
            input: '0',
            output: '0',
            internal: '0'
        }
    },
    CROETH = {
        commission: {
            input: '0',
            output: '0.005',
            internal: '0'
        },
        limits: {
            input: '0',
            output: '0',
            internal: '0'
        }
    },
    LINKETH = {
        commission: {
            input: '0',
            output: '0.005',
            internal: '0'
        },
        limits: {
            input: '0',
            output: '0',
            internal: '0'
        }
    },
    WBTCETH = {
        commission: {
            input: '0',
            output: '0.005',
            internal: '0'
        },
        limits: {
            input: '0',
            output: '0',
            internal: '0'
        }
    }
]
export default cryptoWalletsConfigs