import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  BEP20XRP,
  Approval,
  OwnershipTransferred,
  Transfer
} from "../generated/BEP20XRP/BEP20XRP"
import { Supply} from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Supply.load(event.transaction.from.toHex())
  
  let contract = BEP20XRP.bind(Address.fromString('0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE'))
  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new Supply(event.transaction.from.toHex())

  }
  

  // Entity fields can be set based on event parameters
  entity.total = contract.totalSupply()

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract._decimals(...)
  // - contract._name(...)
  // - contract._symbol(...)
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.burn(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.getOwner(...)
  // - contract.increaseAllowance(...)
  // - contract.mint(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.symbol(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {}
