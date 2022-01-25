// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract CROSToken is Initializable, OwnableUpgradeable, ERC20Upgradeable {
  uint256 private constant _NOMINATOR = 10000;
  uint256 public supply;

  address public marketingDevelopment;
  address public privateSale;
  address public publicSale;
  address public treasury;
  address public floatLiquidity;
  address public liquidityMining;
  address public team;
  address public advisors;
  address public ecoSystemFunds;

  // track Withdraw
  uint256 public marketingDevelopmentWithdraw;
  uint256 public privateSaleWithdraw;
  uint256 public publicSaleWithdraw;
  uint256 public treasuryWithdraw;
  uint256 public floatLiquidityWithdraw;
  uint256 public liquidityMiningWithdraw;
  uint256 public teamWithdraw;
  uint256 public advisorsWithdraw;
  uint256 public ecoSystemFundsWithdraw;

  // percentages
  uint256 private constant MARKETING_DEVELOPMENT_PERCENTAGE = 1500;
  uint256 private constant PRIVATE_SALE_PERCENTAGE = 1100;
  uint256 private constant PUBLIC_SALE_PERCENTAGE = 200;
  uint256 private constant TREASURY_PERCENTAGE = 1000;
  uint256 private constant FLOAT_LIQUIDITY_PERCENTAGE = 200;
  uint256 private constant LIQUIDITY_MINING_PERCENTAGE = 1500;
  uint256 private constant TEAM_PERCENTAGE = 1500;
  uint256 private constant ADVISORS_PERCENTAGE = 400;
  uint256 private constant ECOSYSTEM_FUNDS_PERCENTAGE = 2600;

  uint256 private constant TEAM_ADVISOR_PERCENTAGE_RELEASE = 280;
  uint256 private constant MARKETING_PERCENTAGE_RELEASE = 400;
  uint256 private constant PRIVATE_SALE_PERCENTAGE_RELEASE = 750;
  uint256 private constant TREASURY_PERCENTAGE_RELEASE = 400;
  uint256 private constant ECOSYSTEM_FUNDS_PERCENTAGE_RELEASE = 400;
  uint256 private constant LIQUIDITY_MINING_PERCENTAGE_RELEASE = 400;

  uint256 public teamClaim;
  uint256 public advisorsClaim;
  uint256 public marketingDevelopmentClaim;
  uint256 public privateSaleClaim;
  uint256 public treasuryClaim;
  uint256 public liquidityMiningClaim;
  uint256 public ecoSystemFundsClaim;

  bool public publicSaleClaim;
  bool public floatLiquidityClaim; ///
  uint256 public tge;
  event Withdraw(uint256 month, uint256 timestamp, uint256 initialLocks);

  function __CROSToken_init(
    uint256 _supply,
    address _marketingDevelopment,
    address _privateSale,
    address _publicSale,
    address _treasury,
    address _floatLiquidity,
    address _liquidityMining,
    address _team,
    address _advisors,
    address _ecoSystemFunds
  ) public initializer {
    __Ownable_init();
    __ERC20_init("CROS", "CROS");
    supply = _supply;
    marketingDevelopment = _marketingDevelopment;
    privateSale = _privateSale;
    publicSale = _publicSale;
    treasury = _treasury;
    floatLiquidity = _floatLiquidity;
    liquidityMining = _liquidityMining;
    team = _team;
    advisors = _advisors;
    ecoSystemFunds = _ecoSystemFunds;
    tge = block.timestamp;
  }

  /**
   * @dev withdraw markenting funds
   */
  function withdrawMarketingDevelopmentFunds() external {
    require(msg.sender == marketingDevelopment, "wrong owner");
    uint256 initialLocks = tge + (60 days);
    require(block.timestamp > initialLocks, "you cant withdraw");
    uint256 totalMonths = (block.timestamp - initialLocks) / 30 days;
    require(totalMonths > marketingDevelopmentClaim, "try next month");

    uint256 total = (supply * MARKETING_DEVELOPMENT_PERCENTAGE) / _NOMINATOR;

    uint256 amountToWithdraw = (total * MARKETING_PERCENTAGE_RELEASE) / _NOMINATOR;
    uint256 amountAlreadyWithdraw = amountToWithdraw * totalMonths;

    require(marketingDevelopmentWithdraw < total, "you already withdraw");
    if (amountAlreadyWithdraw + amountToWithdraw > total) {
      amountToWithdraw = amountAlreadyWithdraw + amountToWithdraw - total;
    }

    _mint(marketingDevelopment, amountToWithdraw);

    marketingDevelopmentWithdraw = marketingDevelopmentWithdraw + amountToWithdraw;
    marketingDevelopmentClaim = totalMonths;

    emit Withdraw(totalMonths, block.timestamp, initialLocks);
  }

  /**
   * @dev withdraw private sale funds
   */
  function withdrawPrivateSaleFunds() external {
    require(msg.sender == privateSale, "wrong owner");
    uint256 initialLocks = tge;

    require(block.timestamp >= initialLocks, "you cant withdraw");
    uint256 totalMonths = (block.timestamp - initialLocks) / 30 days;

    uint256 total = (supply * PRIVATE_SALE_PERCENTAGE) / _NOMINATOR;

    uint256 amountToWithdraw = (total * PRIVATE_SALE_PERCENTAGE_RELEASE) / _NOMINATOR;
    if (privateSaleWithdraw == 0) {
      amountToWithdraw = (total * 1000) / _NOMINATOR;
    } else {
      require(totalMonths > privateSaleClaim, "try next month");
    }
    uint256 amountAlreadyWithdraw = amountToWithdraw * totalMonths;

    require(privateSaleWithdraw < total, "you already withdraw");
    if (amountAlreadyWithdraw + amountToWithdraw > total) {
      amountToWithdraw = amountAlreadyWithdraw + amountToWithdraw - total;
    }

    _mint(privateSale, amountToWithdraw);

    privateSaleWithdraw = privateSaleWithdraw + amountToWithdraw;
    privateSaleClaim = totalMonths;

    emit Withdraw(totalMonths, block.timestamp, initialLocks);
  }

  /**
   * @dev withdraw public sale funds
   */
  function withdrawPublicSaleFunds() external {
    require(msg.sender == publicSale, "wrong owner");

    uint256 total = (supply * PUBLIC_SALE_PERCENTAGE) / _NOMINATOR;
    require(publicSaleClaim == false, "already claim");

    _mint(publicSale, total);
    publicSaleClaim = true;
  }

  /**
   * @dev withdraw treasury funds
   */
  function withdrawTreasuryFunds() external {
    require(msg.sender == treasury, "wrong owner");
    uint256 initialLocks = tge + (60 days);
    require(block.timestamp > initialLocks, "you cant withdraw");
    uint256 totalMonths = (block.timestamp - initialLocks) / 30 days;
    require(totalMonths > treasuryClaim, "try next month");

    uint256 total = (supply * TREASURY_PERCENTAGE) / _NOMINATOR;

    uint256 amountToWithdraw = (total * TREASURY_PERCENTAGE_RELEASE) / _NOMINATOR;
    uint256 amountAlreadyWithdraw = amountToWithdraw * totalMonths;

    require(treasuryWithdraw < total, "you already withdraw");
    if (amountAlreadyWithdraw + amountToWithdraw > total) {
      amountToWithdraw = amountAlreadyWithdraw + amountToWithdraw - total;
    }

    _mint(treasury, amountToWithdraw);

    treasuryWithdraw = treasuryWithdraw + amountToWithdraw;
    treasuryClaim = totalMonths;

    emit Withdraw(totalMonths, block.timestamp, initialLocks);
  }

  /**
   * @dev withdraw float liquidity funds
   */
  function withdrawFloatLiquidityFunds() external {
    require(msg.sender == floatLiquidity, "wrong owner");

    uint256 total = (supply * FLOAT_LIQUIDITY_PERCENTAGE) / _NOMINATOR;
    require(floatLiquidityClaim == false, "already claim");

    _mint(floatLiquidity, total);
    floatLiquidityClaim = true;
  }

  /**
   * @dev withdraw liquidity mining funds
   */
  function withdrawLiquidityMiningFunds() external {
    require(msg.sender == liquidityMining, "wrong owner");
    uint256 initialLocks = tge + (60 days);
    require(block.timestamp > initialLocks, "you cant withdraw");
    uint256 totalMonths = (block.timestamp - initialLocks) / 30 days;
    require(totalMonths > liquidityMiningClaim, "try next month");

    uint256 total = (supply * LIQUIDITY_MINING_PERCENTAGE) / _NOMINATOR;

    uint256 amountToWithdraw = (total * LIQUIDITY_MINING_PERCENTAGE_RELEASE) / _NOMINATOR;
    uint256 amountAlreadyWithdraw = amountToWithdraw * totalMonths;

    require(liquidityMiningWithdraw < total, "you already withdraw");
    if (amountAlreadyWithdraw + amountToWithdraw > total) {
      amountToWithdraw = amountAlreadyWithdraw + amountToWithdraw - total;
    }

    _mint(liquidityMining, amountToWithdraw);

    liquidityMiningWithdraw = liquidityMiningWithdraw + amountToWithdraw;
    liquidityMiningClaim = totalMonths;

    emit Withdraw(totalMonths, block.timestamp, initialLocks);
  }

  /**
   * @dev withdraw team funds
   */
  function withdrawTeamFunds() external {
    require(msg.sender == team, "wrong owner");
    uint256 initialLocks = tge + (360 days);
    require(block.timestamp > initialLocks, "you cant withdraw");
    uint256 totalMonths = (block.timestamp - initialLocks) / 30 days;
    require(totalMonths > teamClaim, "try next month");

    uint256 total = (supply * TEAM_PERCENTAGE) / _NOMINATOR;

    uint256 amountToWithdraw = (total * TEAM_ADVISOR_PERCENTAGE_RELEASE) / _NOMINATOR;
    uint256 amountAlreadyWithdraw = amountToWithdraw * totalMonths;

    require(teamWithdraw < total, "you already withdraw");
    if (amountAlreadyWithdraw + amountToWithdraw > total) {
      amountToWithdraw = amountAlreadyWithdraw + amountToWithdraw - total;
    }

    _mint(team, amountToWithdraw);

    teamWithdraw = teamWithdraw + amountToWithdraw;
    teamClaim = totalMonths;

    emit Withdraw(totalMonths, block.timestamp, initialLocks);
  }

  /**
   * @dev withdraw advisors funds
   */
  function withdrawAdvisorsFunds() external {
    require(msg.sender == advisors, "wrong owner");
    uint256 initialLocks = tge + (360 days);
    require(block.timestamp > initialLocks, "you cant withdraw");
    uint256 totalMonths = (block.timestamp - initialLocks) / 30 days;
    require(totalMonths > advisorsClaim, "try next month");

    uint256 total = (supply * TEAM_PERCENTAGE) / _NOMINATOR;

    uint256 amountToWithdraw = (total * TEAM_ADVISOR_PERCENTAGE_RELEASE) / _NOMINATOR;
    uint256 amountAlreadyWithdraw = amountToWithdraw * totalMonths;

    require(advisorsWithdraw < total, "you already withdraw");
    if (amountAlreadyWithdraw + amountToWithdraw > total) {
      amountToWithdraw = amountAlreadyWithdraw + amountToWithdraw - total;
    }

    _mint(advisors, amountToWithdraw);

    advisorsWithdraw = advisorsWithdraw + amountToWithdraw;
    advisorsClaim = totalMonths;

    emit Withdraw(totalMonths, block.timestamp, initialLocks);
  }

  /**
   * @dev withdraw ecosystem funds
   */
  function withdrawEcosystemFunds() external {
    require(msg.sender == ecoSystemFunds, "wrong owner");

    uint256 initialLocks = tge + (60 days);
    require(block.timestamp > initialLocks, "you cant withdraw");
    uint256 totalMonths = (block.timestamp - initialLocks) / 30 days;
    require(totalMonths > ecoSystemFundsClaim, "try next month");

    uint256 total = (supply * ECOSYSTEM_FUNDS_PERCENTAGE) / _NOMINATOR;

    uint256 amountToWithdraw = (total * ECOSYSTEM_FUNDS_PERCENTAGE_RELEASE) / _NOMINATOR;
    uint256 amountAlreadyWithdraw = amountToWithdraw * totalMonths;

    require(ecoSystemFundsWithdraw < total, "you already withdraw");
    if (amountAlreadyWithdraw + amountToWithdraw > total) {
      amountToWithdraw = amountAlreadyWithdraw + amountToWithdraw - total;
    }

    _mint(ecoSystemFunds, amountToWithdraw);

    ecoSystemFundsWithdraw = ecoSystemFundsWithdraw + amountToWithdraw;
    ecoSystemFundsClaim = totalMonths;

    emit Withdraw(totalMonths, block.timestamp, initialLocks);
  }
}
