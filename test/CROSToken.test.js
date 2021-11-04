const CROSToken = artifacts.require("CROSToken");
const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const { expectRevert, time } = require("@openzeppelin/test-helpers");
const { assert } = require("chai");


const toWei = (value, unit = "ether") => {
  return web3.utils.toWei(value, unit);
};

const fromWei = (value, unit = "ether") => {
  return web3.utils.fromWei(value, unit);
};



contract("CROS TOKEN test", async ([owner, marketingDevelopment, privateSale, publicSale, treasury, floatLiquidity, liquidityMining, team, advisors, ecosystem]) => {
  beforeEach(async () => {
    this.token = await deployProxy(CROSToken, [toWei('10000'), marketingDevelopment, privateSale, publicSale, treasury, floatLiquidity, liquidityMining, team, advisors, ecosystem], {
      initializer: "__CROSToken_init",
    });
  })

  it("should not withdraw by other accounts", async() => {
    await expectRevert(this.token.withdrawMarketingDevelopmentFunds(100, {from: owner}), 'wrong owner')
    await expectRevert(this.token.withdrawPrivateSaleFunds(100, {from: owner}), 'wrong owner')
    await expectRevert(this.token.withdrawPublicSaleFunds(100, {from: owner}), 'wrong owner')
    await expectRevert(this.token.withdrawTreasuryFunds(100, {from: owner}), 'wrong owner')
    await expectRevert(this.token.withdrawFloatLiquidityFunds(100, {from: owner}), 'wrong owner')
    await expectRevert(this.token.withdrawLiquidityMiningFunds(100, {from: owner}), 'wrong owner')
    await expectRevert(this.token.withdrawTeamFunds(100, {from: owner}), 'wrong owner')
    await expectRevert(this.token.withdrawAdvisorsFunds(100, {from: owner}), 'wrong owner')
    await expectRevert(this.token.withdrawEcosystemFunds(100, {from: owner}), 'wrong owner')
    assert.equal(fromWei(await this.token.totalSupply()), '0')

  })

  it("should withdraw marketing Development funds", async() => {
    //1500
    await this.token.withdrawMarketingDevelopmentFunds(toWei('700'), {from: marketingDevelopment})
    assert.equal(fromWei(await this.token.balanceOf(marketingDevelopment)), '700')
    assert.equal(fromWei(await this.token.marketingDevelopmentWithdraw()), '700')
    await expectRevert(this.token.withdrawMarketingDevelopmentFunds(toWei('801'), {from: marketingDevelopment}), 'wrong amount')
    await this.token.withdrawMarketingDevelopmentFunds(toWei('800'), {from: marketingDevelopment})
    assert.equal(fromWei(await this.token.marketingDevelopmentWithdraw()), '1500')
    assert.equal(fromWei(await this.token.totalSupply()), '1500')
    await expectRevert(this.token.withdrawMarketingDevelopmentFunds(toWei('1'), {from: marketingDevelopment}), 'wrong amount')

  })

  it("should withdraw private sale funds", async() => {
    //830
    await this.token.withdrawPrivateSaleFunds(toWei('700'), {from: privateSale})
    assert.equal(fromWei(await this.token.balanceOf(privateSale)), '700')
    assert.equal(fromWei(await this.token.privateSaleWithdraw()), '700')
    await expectRevert(this.token.withdrawPrivateSaleFunds(toWei('131'), {from: privateSale}), 'wrong amount')
    await this.token.withdrawPrivateSaleFunds(toWei('130'), {from: privateSale})
    assert.equal(fromWei(await this.token.privateSaleWithdraw()), '830')
    assert.equal(fromWei(await this.token.totalSupply()), '830')
    await expectRevert(this.token.withdrawPrivateSaleFunds(toWei('1'), {from: privateSale}), 'wrong amount')
  })


  it("should withdraw public sale funds", async() => {
    //170
    await this.token.withdrawPublicSaleFunds(toWei('100'), {from: publicSale})
    assert.equal(fromWei(await this.token.balanceOf(publicSale)), '100')
    assert.equal(fromWei(await this.token.publicSaleWithdraw()), '100')
    await expectRevert(this.token.withdrawPublicSaleFunds(toWei('71'), {from: publicSale}), 'wrong amount')
    await this.token.withdrawPublicSaleFunds(toWei('70'), {from: publicSale})
    assert.equal(fromWei(await this.token.totalSupply()), '170')
    assert.equal(fromWei(await this.token.publicSaleWithdraw()), '170')
    await expectRevert(this.token.withdrawPublicSaleFunds(toWei('1'), {from: publicSale}), 'wrong amount')
  })

  it("should withdraw treasury funds", async() => {
    //1000
    await this.token.withdrawTreasuryFunds(toWei('100'), {from: treasury})
    assert.equal(fromWei(await this.token.balanceOf(treasury)), '100')
    assert.equal(fromWei(await this.token.treasuryWithdraw()), '100')
    await expectRevert(this.token.withdrawTreasuryFunds(toWei('901'), {from: treasury}), 'wrong amount')
    await this.token.withdrawTreasuryFunds(toWei('900'), {from: treasury})
    assert.equal(fromWei(await this.token.totalSupply()), '1000')
    assert.equal(fromWei(await this.token.treasuryWithdraw()), '1000')
    await expectRevert(this.token.withdrawTreasuryFunds(toWei('1'), {from: treasury}), 'wrong amount')
  })

  it("should withdraw float liquidity funds", async() => {
    //200
    await this.token.withdrawFloatLiquidityFunds(toWei('100'), {from: floatLiquidity})
    assert.equal(fromWei(await this.token.balanceOf(floatLiquidity)), '100')
    assert.equal(fromWei(await this.token.floatLiquidityWithdraw()), '100')
    await expectRevert(this.token.withdrawFloatLiquidityFunds(toWei('101'), {from: floatLiquidity}), 'wrong amount')
    await this.token.withdrawFloatLiquidityFunds(toWei('100'), {from: floatLiquidity})
    assert.equal(fromWei(await this.token.totalSupply()), '200')
    assert.equal(fromWei(await this.token.floatLiquidityWithdraw()), '200')
    await expectRevert(this.token.withdrawFloatLiquidityFunds(toWei('1'), {from: floatLiquidity}), 'wrong amount')
  })

  it("should withdraw liquidity mining funds", async() => {
    //1500
    await this.token.withdrawLiquidityMiningFunds(toWei('500'), {from: liquidityMining})
    assert.equal(fromWei(await this.token.balanceOf(liquidityMining)), '500')
    assert.equal(fromWei(await this.token.liquidityMiningWithdraw()), '500')
    await expectRevert(this.token.withdrawLiquidityMiningFunds(toWei('1001'), {from: liquidityMining}), 'wrong amount')
    await this.token.withdrawLiquidityMiningFunds(toWei('1000'), {from: liquidityMining})
    assert.equal(fromWei(await this.token.totalSupply()), '1500')
    assert.equal(fromWei(await this.token.liquidityMiningWithdraw()), '1500')
    await expectRevert(this.token.withdrawLiquidityMiningFunds(toWei('1'), {from: liquidityMining}), 'wrong amount')
  })

  it("should withdraw team funds", async() => {
    //1100
    await this.token.withdrawTeamFunds(toWei('500'), {from: team})
    assert.equal(fromWei(await this.token.balanceOf(team)), '500')
    assert.equal(fromWei(await this.token.teamWithdraw()), '500')
    await expectRevert(this.token.withdrawTeamFunds(toWei('601'), {from: team}), 'wrong amount')
    await this.token.withdrawTeamFunds(toWei('600'), {from: team})
    assert.equal(fromWei(await this.token.totalSupply()), '1100')
    assert.equal(fromWei(await this.token.teamWithdraw()), '1100')
    await expectRevert(this.token.withdrawTeamFunds(toWei('1'), {from: team}), 'wrong amount')
  })

  it("should withdraw advisors funds", async() => {
    //800
    await this.token.withdrawAdvisorsFunds(toWei('500'), {from: advisors})
    assert.equal(fromWei(await this.token.balanceOf(advisors)), '500')
    assert.equal(fromWei(await this.token.advisorsWithdraw()), '500')
    await expectRevert(this.token.withdrawAdvisorsFunds(toWei('301'), {from: advisors}), 'wrong amount')
    await this.token.withdrawAdvisorsFunds(toWei('300'), {from: advisors})
    assert.equal(fromWei(await this.token.totalSupply()), '800')
    assert.equal(fromWei(await this.token.advisorsWithdraw()), '800')
    await expectRevert(this.token.withdrawAdvisorsFunds(toWei('1'), {from: advisors}), 'wrong amount')
  })

  it("should withdraw ecosystem funds", async() => {
    //2900
    await this.token.withdrawEcosystemFunds(toWei('1000'), {from: ecosystem})
    assert.equal(fromWei(await this.token.balanceOf(ecosystem)), '1000')
    assert.equal(fromWei(await this.token.ecoSystemFundsWithdraw()), '1000')
    await expectRevert(this.token.withdrawEcosystemFunds(toWei('1901'), {from: ecosystem}), 'wrong amount')
    await this.token.withdrawEcosystemFunds(toWei('1900'), {from: ecosystem})
    assert.equal(fromWei(await this.token.totalSupply()), '2900')
    assert.equal(fromWei(await this.token.ecoSystemFundsWithdraw()), '2900')
    await expectRevert(this.token.withdrawEcosystemFunds(toWei('1'), {from: ecosystem}), 'wrong amount')
  })

  it("should not withdraw amount exceeded", async () => {
    await expectRevert(this.token.withdrawMarketingDevelopmentFunds(toWei('10000'), {from: marketingDevelopment}), 'wrong amount')
    await expectRevert(this.token.withdrawPrivateSaleFunds(toWei('10000'), {from: privateSale}), 'wrong amount')
    await expectRevert(this.token.withdrawPublicSaleFunds(toWei('10000'), {from: publicSale}), 'wrong amount')
    await expectRevert(this.token.withdrawTreasuryFunds(toWei('10000'), {from: treasury}), 'wrong amount')
    await expectRevert(this.token.withdrawFloatLiquidityFunds(toWei('10000'), {from: floatLiquidity}), 'wrong amount')
    await expectRevert(this.token.withdrawLiquidityMiningFunds(toWei('10000'), {from: liquidityMining}), 'wrong amount')
    await expectRevert(this.token.withdrawTeamFunds(toWei('10000'), {from: team}), 'wrong amount')
    await expectRevert(this.token.withdrawAdvisorsFunds(toWei('10000'), {from: advisors}), 'wrong amount')
    await expectRevert(this.token.withdrawEcosystemFunds(toWei('10000'), {from: ecosystem}), 'wrong amount')
  })

})
