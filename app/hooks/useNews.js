import { useEffect, useState } from "react"
import useStore from "../stores/marketStore"

const possibleNewsItems = [
    {
        modifier: 1,
        length: 20,
        message: `{STOCK} surges after becoming primary payment method of The Netherlands.`
    },
    {
        modifier: -1,
        length: 10,
        message: `Investors spooked after {STOCK} shows no potential.`
    },
    {
        modifier: -2,
        length: 10,
        message: `{STOCK} plummets after founder accused of fraud.`
    },
    {
        modifier: 2,
        length: 40,
        message: `Good news for {STOCK} lovers, you can now buy iced coffee with {STOCK} nationwide!`
    },
    {
        modifier: 5,
        length: 5,
        message: `Elon musk tweets about {STOCK}, investors are going wild.`
    },
    {
        modifier: -5,
        length: 5,
        message: `Donald Trump says {STOCK} is a cover for the FBI.`
    }
]

export default function useNews () {
    const [ currentNewsItem, setCurrentNewsItem ] = useState(false)
    const stocks = useStore((state) => state.stocks)

    // const chooseNewsItem = 

    // useEffect(() => {
    //     chooseNewsItem()
    // }, [])

    return currentNewsItem
}