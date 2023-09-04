const Rand = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
})

const ToCurrency = (n: number, noUnit = false) => {
    if (noUnit) return Intl.NumberFormat().format(n)
    return Rand.format(n)
}

export default ToCurrency


