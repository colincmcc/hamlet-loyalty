import { TypeComposer, EnumTypeComposer } from 'graphql-compose';


export const RuleTypeTC = EnumTypeComposer.create(`
  enum RuleType {
    RULE_UNSET
    OWNER_HOLDINGS_INFINITE
    ALL_HOLDINGS_INFINITE
    NOT_TRANSFERABLE
    REQUIRE_SOURCE_TYPES
    REQUIRE_TARGET_TYPES
    REQUIRE_SOURCE_QUANTITIES
    REQUIRE_TARGET_QUANTITIES
    EXCHANGE_ONCE
    EXCHANGE_ONCE_PER_ACCOUNT
    EXCHANGE_LIMITED_TO_ACCOUNTS
  }

`);

/**
 * Creates a rule for offers, assets/holdings to adhere to.
 */
const RuleTC = TypeComposer.create(`
type Rule {
  type: RuleType
  value: String
}
`);

export const RuleType = RuleTC.getType();
export const RuleITC = RuleTC.getITC();

export function getRuleResolvers() {
  return {};
}

export function getRuleMutations() {
  return {
  };
}

export default RuleTC;
