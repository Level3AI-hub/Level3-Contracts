import { ethers } from 'hardhat'
import 'dotenv/config'

async function main() {
  const owner =
    process.env.OWNER_ADDRESS || '0x2a0d7311fa7e9ac2890cfd8219b2def0c206e79b'

  const Contract = await ethers.getContractFactory('Level3Course')
  const reverseAddress = '0xc070aAcE207ad5eb2A460D059785ffC9D4D2C536'
  const registry = '0x6aEFc7ac590096c08187a9052030dA59dEd7E996'
  const contract = await Contract.deploy(reverseAddress, owner, registry)
  const course = await contract.getAddress()

  console.log('Level3 Course Contract deployed to address:', course)
  const Factory = await ethers.getContractFactory('CourseFactory')
  const factory = await Factory.deploy(course, owner)
  await factory.waitForDeployment()
  const CourseFactory = await factory.getAddress()

  console.log('CourseFactory deployed to address:', CourseFactory)
  const tx = await contract.setCourseFactory(CourseFactory)
  console.log(`Added Course Factory, ${tx.hash}`)
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
