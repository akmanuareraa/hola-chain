const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const holaContractFactory = await hre.ethers.getContractFactory("holaContract")
    const holaContract = await holaContractFactory.deploy()
    await holaContract.deployed()
    console.log("Contract Address: ", holaContract.address, " --- Deployed by: ", owner.address);

    let waveCount
    waveCount = await holaContract.getTotalWaves()

    let waveTxn = await holaContract.wave()
    await waveTxn.wait()

    waveCount = await holaContract.getTotalWaves()

    waveTxn = await holaContract.connect(randomPerson).wave()
    await waveTxn.wait()

    waveCount = await holaContract.getTotalWaves()
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log("Error: ", error)
        process.exit(1)
    }
}

runMain()