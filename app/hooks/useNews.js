import { useEffect, useState } from "react"
import { format, addDays } from "date-fns";
import useMarketStore from "../stores/marketStore"

const possibleNewsItems = [
    {
        modifier: 40,
        length: 20,
        message: `{STOCK} surges after becoming primary payment method of The Netherlands.`
    },
    {
        modifier: -50,
        length: 10,
        message: `Investors spooked after {STOCK} shows no potential.`
    },
    {
        modifier: -20,
        length: 10,
        message: `{STOCK} plummets after founder accused of fraud.`
    },
    {
        modifier: 10,
        length: 40,
        message: `Good news for {STOCK} lovers, you can now buy iced coffee with {STOCK} nationwide!`
    },
    {
        modifier: 15,
        length: 10,
        message: `Melon Husk tweets about {STOCK}, investors are going wild.`
    },
    {
        modifier: -10,
        length: 5,
        message: `Jonald Bump says {STOCK} is a cover for the FBI.`
    },
    {
        modifier: 5,
        length: 20,
        message: `Small win for {STOCK} after being accepted as payment at all vending machines!`
    },
    {
        modifier: -30,
        length: 10,
        message: `{STOCK} crashes after everyone forgets their wallet password on the same day.`
    },
    {
        modifier: 20,
        length: 20,
        message: `{STOCK} soars as it's now the official currency of the Moon colony!`
    },
    {
        modifier: 40,
        length: 10,
        message: `{STOCK} spikes as grandma accidentally invests her entire savings in crypto.`
    },
    {
        modifier: 5,
        length: 10,
        message: `Deal closed, {STOCK} now accepted at all hydrogen stations, fuel your car with crypto!`
    },
    {
        modifier: 30,
        length: 10,
        message: `{STOCK} skyrockets after rumors of being used in the next Grand Theft Auto game.`
    },
    {
        modifier: -15,
        length: 20,
        message: `{STOCK} plummets after everyone realizes it was just Monopoly money. No.. literally.`
    },
    {
        modifier: -5,
        length: 20,
        message: `{STOCK} slows as aliens demand a refund for their intergalactic transaction.`
    },
    {
        modifier: 15,
        length: 30,
        message: `{STOCK} explodes after being declared the official currency of Atlantis!`
    },
    {
        modifier: 8,
        length: 20,
        message: `{STOCK} becomes the first cryptocurrency accepted by time travelers.`
    },
    {
        modifier: 5,
        length: 10,
        message: `A long wait, but {STOCK} was finally approved as legal tender for human cloning!`
    },
    {
        modifier: -50,
        length: 20,
        message: `{STOCK} plummets as AI overlords declare it obsolete and start mining their own.`
    },
    {
        modifier: 10,
        length: 20,
        message: `{STOCK} spikes after rumors it's being used to bribe interdimensional beings.`
    },
    {
        modifier: 10,
        length: 20,
        message: `{STOCK} gains traction after it's revealed to be the secret currency of the Illuminati.`
    },
    {
        modifier: 50,
        length: 20,
        message: `{STOCK} soars after being accepted as payment for brain-uploading services!`
    },
    {
        modifier: 5,
        length: 20,
        message: `Aliens start trading {STOCK} for interstellar travel passes.`
    },
    {
        modifier: 50,
        length: 30,
        message: `Lord Lewi releases official statment: "{STOCK} is good stuff, I like dogs".`
    }
]

export default function useNews () {
    const setActiveBuff = useMarketStore((state) => state.setActiveBuff)
    const activeBuff = useMarketStore((state) => state.activeBuff)
    const stocks = useMarketStore((state) => state.stocks)
    const tick = useMarketStore((state) => state.tick)

    const updateNews = () => {
        console.log('Tick, update news')

        if (!activeBuff) {
            console.log('ADD FIRST BUFF')
            chooseNewBuff()
            return
        }

        const hasActiveBuffExpired = checkActiveBuffExpiration()

        if (!hasActiveBuffExpired) {
            console.log('BUFF NOT EXPIRED')
            return
        }

        console.log('CHOOSE FIRST BUFF')
        chooseNewBuff()
    }

    useEffect(() => {
        updateNews()
    }, [ tick ])

    const checkActiveBuffExpiration = () => {
        const currentTick = useMarketStore.getState().tick

        console.log('Has expired?', activeBuff.end, currentTick)

        if (currentTick > activeBuff.end) {
            return true
        }

        return false
    }

    const chooseNewBuff = () => {
        const currentTick = useMarketStore.getState().tick
        const stockIndex = Math.floor(stocks.length * Math.random())
        const stock = stocks[stockIndex]

        const newsItemIndex = Math.floor(possibleNewsItems.length * Math.random())
        const newsItem = possibleNewsItems[newsItemIndex]

        setActiveBuff({
            message: newsItem.message.replaceAll('{STOCK}', stock.name),
            date: format(addDays(new Date(), currentTick), 'EEEEEE do MMM yyyy'),
            stockName: stock.name,
            start: currentTick,
            end: currentTick + newsItem.length,
            modifier: newsItem.modifier
        })
    }

    return activeBuff
}