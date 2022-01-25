const CROSToken = artifacts.require("CROSToken");
const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const { expectRevert, time } = require("@openzeppelin/test-helpers");
const { assert } = require("chai");

const ONE_MONTH_SECONDS = 2592000;

const toWei = (value, unit = "ether") => {
  return web3.utils.toWei(value, unit);
};

const fromWei = (value, unit = "ether") => {
  return web3.utils.fromWei(value, unit);
};

contract(
  "CROS TOKEN test",
  async ([
    owner,
    marketingDevelopment,
    privateSale,
    publicSale,
    treasury,
    floatLiquidity,
    liquidityMining,
    team,
    advisors,
    ecosystem,
  ]) => {
    beforeEach(async () => {
      this.token = await deployProxy(
        CROSToken,
        [
          toWei("1000000"),
          marketingDevelopment,
          privateSale,
          publicSale,
          treasury,
          floatLiquidity,
          liquidityMining,
          team,
          advisors,
          ecosystem,
        ],
        {
          initializer: "__CROSToken_init",
        }
      );
    });

    it("should not withdraw by other accounts", async () => {
      await expectRevert(
        this.token.withdrawMarketingDevelopmentFunds({ from: owner }),
        "wrong owner"
      );
      await expectRevert(
        this.token.withdrawPrivateSaleFunds({ from: owner }),
        "wrong owner"
      );
      await expectRevert(
        this.token.withdrawPublicSaleFunds({ from: owner }),
        "wrong owner"
      );
      await expectRevert(
        this.token.withdrawTreasuryFunds({ from: owner }),
        "wrong owner"
      );
      await expectRevert(
        this.token.withdrawFloatLiquidityFunds({ from: owner }),
        "wrong owner"
      );
      await expectRevert(
        this.token.withdrawLiquidityMiningFunds({ from: owner }),
        "wrong owner"
      );
      await expectRevert(
        this.token.withdrawTeamFunds({ from: owner }),
        "wrong owner"
      );
      await expectRevert(
        this.token.withdrawAdvisorsFunds({ from: owner }),
        "wrong owner"
      );
      await expectRevert(
        this.token.withdrawEcosystemFunds({ from: owner }),
        "wrong owner"
      );
      assert.equal(fromWei(await this.token.totalSupply()), "0");
    });

    it("should withdraw marketing Development funds", async () => {
      //1500

      await expectRevert(
        this.token.withdrawMarketingDevelopmentFunds({
          from: marketingDevelopment,
        }),
        "you cant withdraw"
      );

      await time.increase(ONE_MONTH_SECONDS * 2 + 1000);

      await expectRevert(
        this.token.withdrawMarketingDevelopmentFunds({
          from: marketingDevelopment,
        }),
        "try next month"
      );
      await time.increase(ONE_MONTH_SECONDS);
      assert.equal(
        fromWei(await this.token.balanceOf(marketingDevelopment)),
        "0"
      );

      await this.token.withdrawMarketingDevelopmentFunds({
        from: marketingDevelopment,
      });
      assert.equal(
        fromWei(await this.token.balanceOf(marketingDevelopment)),
        "6000"
      );
      await expectRevert(
        this.token.withdrawMarketingDevelopmentFunds({
          from: marketingDevelopment,
        }),
        "try next month"
      );

      await time.increase(ONE_MONTH_SECONDS);
      await this.token.withdrawMarketingDevelopmentFunds({
        from: marketingDevelopment,
      });
      assert.equal(
        fromWei(await this.token.balanceOf(marketingDevelopment)),
        "12000"
      );
    });

    it("should withdraw private sale funds", async () => {
      //830
      assert.equal(fromWei(await this.token.balanceOf(privateSale)), "0");

      await this.token.withdrawPrivateSaleFunds({ from: privateSale });
      assert.equal(fromWei(await this.token.balanceOf(privateSale)), "11000");
      await expectRevert(
        this.token.withdrawPrivateSaleFunds({ from: privateSale }),
        "try next month"
      );

      await time.increase(ONE_MONTH_SECONDS);
      await this.token.withdrawPrivateSaleFunds({ from: privateSale });
      assert.equal(fromWei(await this.token.balanceOf(privateSale)), "19250");
    });

    it("should withdraw public sale funds", async () => {
      //170
      assert.equal(fromWei(await this.token.balanceOf(publicSale)), "0");

      await this.token.withdrawPublicSaleFunds({ from: publicSale });
      assert.equal(fromWei(await this.token.balanceOf(publicSale)), "20000");
      await expectRevert(
        this.token.withdrawPublicSaleFunds({ from: publicSale }),
        "already claim"
      );
    });

    it("should withdraw treasury funds", async () => {
      //1000

      await expectRevert(
        this.token.withdrawTreasuryFunds({ from: treasury }),
        "you cant withdraw"
      );

      await time.increase(ONE_MONTH_SECONDS * 2 + 1000);

      await expectRevert(
        this.token.withdrawTreasuryFunds({ from: treasury }),
        "try next month"
      );
      await time.increase(ONE_MONTH_SECONDS);
      assert.equal(fromWei(await this.token.balanceOf(treasury)), "0");

      await this.token.withdrawTreasuryFunds({ from: treasury });
      assert.equal(fromWei(await this.token.balanceOf(treasury)), "4000");
      await expectRevert(
        this.token.withdrawTreasuryFunds({ from: treasury }),
        "try next month"
      );

      await time.increase(ONE_MONTH_SECONDS);
      await this.token.withdrawTreasuryFunds({ from: treasury });
      assert.equal(fromWei(await this.token.balanceOf(treasury)), "8000");
    });

    it("should withdraw float liquidity funds", async () => {
      //200
      assert.equal(fromWei(await this.token.balanceOf(floatLiquidity)), "0");

      await this.token.withdrawFloatLiquidityFunds({ from: floatLiquidity });
      assert.equal(
        fromWei(await this.token.balanceOf(floatLiquidity)),
        "20000"
      );
      await expectRevert(
        this.token.withdrawFloatLiquidityFunds({ from: floatLiquidity }),
        "already claim"
      );
    });

    it("should withdraw liquidity mining funds", async () => {
      //1500

      await expectRevert(
        this.token.withdrawLiquidityMiningFunds({ from: liquidityMining }),
        "you cant withdraw"
      );

      await time.increase(ONE_MONTH_SECONDS * 2 + 1000);

      await expectRevert(
        this.token.withdrawLiquidityMiningFunds({ from: liquidityMining }),
        "try next month"
      );
      await time.increase(ONE_MONTH_SECONDS);
      assert.equal(fromWei(await this.token.balanceOf(liquidityMining)), "0");

      await this.token.withdrawLiquidityMiningFunds({ from: liquidityMining });
      assert.equal(
        fromWei(await this.token.balanceOf(liquidityMining)),
        "6000"
      );
      await expectRevert(
        this.token.withdrawLiquidityMiningFunds({ from: liquidityMining }),
        "try next month"
      );

      await time.increase(ONE_MONTH_SECONDS);
      await this.token.withdrawLiquidityMiningFunds({ from: liquidityMining });
      assert.equal(
        fromWei(await this.token.balanceOf(liquidityMining)),
        "12000"
      );
    });

    it("should withdraw team funds", async () => {
      //1100
      await expectRevert(
        this.token.withdrawTeamFunds({ from: team }),
        "you cant withdraw"
      );
      let timestamp = Number(await time.latest());
      await time.increase(ONE_MONTH_SECONDS * 12 + 1000);

      await expectRevert(
        this.token.withdrawTeamFunds({ from: team }),
        "try next month"
      );
      await time.increase(ONE_MONTH_SECONDS);
      assert.equal(fromWei(await this.token.balanceOf(team)), "0");

      await this.token.withdrawTeamFunds({ from: team });
      assert.equal(fromWei(await this.token.balanceOf(team)), "4200");
      await expectRevert(
        this.token.withdrawTeamFunds({ from: team }),
        "try next month"
      );

      await time.increase(ONE_MONTH_SECONDS);
      await this.token.withdrawTeamFunds({ from: team });
      assert.equal(fromWei(await this.token.balanceOf(team)), "8400");
    });

    it("should withdraw advisors funds", async () => {
      //800
      await expectRevert(
        this.token.withdrawAdvisorsFunds({ from: advisors }),
        "you cant withdraw"
      );
      let timestamp = Number(await time.latest());
      await time.increase(ONE_MONTH_SECONDS * 12 + 1000);

      await expectRevert(
        this.token.withdrawAdvisorsFunds({ from: advisors }),
        "try next month"
      );
      await time.increase(ONE_MONTH_SECONDS);
      assert.equal(fromWei(await this.token.balanceOf(advisors)), "0");

      await this.token.withdrawAdvisorsFunds({ from: advisors });
      assert.equal(fromWei(await this.token.balanceOf(advisors)), "4200");
      await expectRevert(
        this.token.withdrawAdvisorsFunds({ from: advisors }),
        "try next month"
      );

      await time.increase(ONE_MONTH_SECONDS);
      await this.token.withdrawAdvisorsFunds({ from: advisors });
      assert.equal(fromWei(await this.token.balanceOf(advisors)), "8400");
    });

    it("should withdraw ecosystem funds", async () => {
      //2900

      await expectRevert(
        this.token.withdrawEcosystemFunds({ from: ecosystem }),
        "you cant withdraw"
      );

      await time.increase(ONE_MONTH_SECONDS * 2 + 1000);

      await expectRevert(
        this.token.withdrawEcosystemFunds({ from: ecosystem }),
        "try next month"
      );
      await time.increase(ONE_MONTH_SECONDS);
      assert.equal(fromWei(await this.token.balanceOf(ecosystem)), "0");

      await this.token.withdrawEcosystemFunds({ from: ecosystem });
      assert.equal(fromWei(await this.token.balanceOf(ecosystem)), "10400");
      await expectRevert(
        this.token.withdrawEcosystemFunds({ from: ecosystem }),
        "try next month"
      );

      await time.increase(ONE_MONTH_SECONDS);
      await this.token.withdrawEcosystemFunds({ from: ecosystem });
      assert.equal(fromWei(await this.token.balanceOf(ecosystem)), "20800");
    });
  }
);
