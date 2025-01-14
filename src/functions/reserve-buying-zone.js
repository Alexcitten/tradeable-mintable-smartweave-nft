module.exports = async function (state, action) {
  const { target, quantity, owner, id } = SmartWeave.transaction;

  ContractAssert(target === state.minter && quantity == Math.floor(action.input.price * state.royalty), "Invalid burn");
  ContractAssert(state.forSale, 'NFT is not listed for sale');
  ContractAssert(!state.reservationTxId || (SmartWeave.block.height - state.reservationBlockHeight) > 15, "NFT is reserved for buy");
  ContractAssert(action.input.price === state.price, "Wanted price doesn't match listing price");

  state.reservationBlockHeight = SmartWeave.block.height;
  state.reservationTxId = id;
  state.reserver = owner;

  return { state };
}
