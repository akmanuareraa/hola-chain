const main = async () => {
    const [deployer] = await hre.ethers.getSigners()
    const accBalance = await deployer.getBalance()

    console.log("Deployment Account: ",deployer.address, ' -- Balance: ', accBalance.toString())

    const holaContractFactory = await hre.ethers.getContractFactory("holaContract")
    const holaContract = await holaContractFactory.deploy()
    await holaContract.deployed()

    console.log('Contract Deployed: ', holaContract.address)
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain()