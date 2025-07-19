#[starknet::contract]
mod BondingCurveToken {
    // use core::num::traits::To;
    // use core::ops::Add;
    use openzeppelin_access::ownable::OwnableComponent;
    use openzeppelin_token::erc20::{DefaultConfig, ERC20Component};
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use starknet::{ContractAddress, get_caller_address};

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    // Storage
    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        k: u256,
    }


    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        TokensMinted: TokensMinted,
    }

    #[derive(Drop, starknet::Event)]
    struct TokensMinted {
        to: ContractAddress,
        amount: u256,
        price: u256,
    }

    impl ERC20HooksImpl of ERC20Component::ERC20HooksTrait<ContractState> {}

    #[abi(embed_v0)]
    impl ERC20MixinImpl = ERC20Component::ERC20MixinImpl<ContractState>;
    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;


    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress, k: u256) {
        self.erc20.initializer("BondingCurveToken", "BCT");
        self.ownable.initializer(owner);
        self.k.write(k);
    }


    #[external(v0)]
    fn mint_from_curve(ref self: ContractState, to: ContractAddress, amount: u256) {
        self.ownable.assert_only_owner();

        let current_supply = self.erc20.total_supply();

        let new_supply = current_supply + amount;

        let k = self.k.read();

        let price = k * new_supply * new_supply;

        self.erc20.mint(to, amount);

        self.emit(Event::TokensMinted(TokensMinted { to, amount, price }));
    }
}
