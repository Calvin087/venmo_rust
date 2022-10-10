use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LookupMap;
use near_sdk::{env, near_bindgen, AccountId, Promise};
// We can use String for AccountId, but we're importing it so use it.


#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Welcome {
    memo: LookupMap<String, Vec<String>>

}

impl Default for Welcome {
    fn default() -> Self {
        Self {
            memo: LookupMap::new(b"m",)
            /* 
                When declaring b before the string, we're
                literally sending bytes to the blockchain.
                memo.to_vec === [109, 101, 109, 111]

                ALSO it seems we can just pass in any byte, m/r/b etc
                but we need 1 argument?
            */
        }
    }
}

#[near_bindgen]
impl Welcome {

    /* 
        Change Methods
    */
    pub fn add_memo(&mut self, memo_text: String, price: String) {
        let account_id = env::signer_account_id();
        // last ID of the person that signed a transaction, initiator of call

        let contains_user = self.memo.contains_key(&account_id.to_string());
        // checks the lookup map for the key "account"
        // checking if the user exists in the lookup map.
        // returns bool

        if contains_user {
            let mut temp_list = match self.memo.get(&account_id.to_string()){
                Some(x) => x, // x is the [] of memos owned by account_id
                None => vec![]
            };

            temp_list.push(memo_text + " | " + &price+" NEAR");
            // requires an owned string on the left for concatenation

            self.memo.insert(&account_id.to_string(), &temp_list);
        } else {
            let initiate_vector = vec![memo_text + " | " + &price+" NEAR"];
            self.memo.insert(&account_id.to_string(), &initiate_vector);
        }

    }

    pub fn transfer_money(&mut self, account_id: AccountId, amount: f64) {
        Promise::new(account_id).transfer(amount as u128);
        // Sending money as a promise.

    }

    /* 
        View methods.
        No need to &mut self
    */
    pub fn get_memos(self, user:String) -> Vec<String> {
        match self.memo.get(&user) {
            Some(x) => x, // vec of memos 
            None => vec![] // empty vec
        }
    }

}
// https://youtu.be/zy5VgigLy-Y?t=978

#[cfg(test)]
mod test{
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::{testing_env, log};
    use std::collections::{HashMap};
    use super::*;

    fn get_context(predecessor_account_id: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder
            .current_account_id(accounts(0))
            .signer_account_id(predecessor_account_id.clone())
            .predecessor_account_id(predecessor_account_id);
        builder
    }

    #[test]
    fn add_fetch_memos(){
        let mut context = get_context(accounts(0));
        testing_env!(context.build());
        let mut contract = Welcome::default();
        contract.add_memo(String::from("Memo goes here"), String::from("300"));
        let fetchMemo = contract.get_memos(accounts(0).to_string());
        log!("{:?}", fetchMemo)
    }
}

// cargo test -- --show-output