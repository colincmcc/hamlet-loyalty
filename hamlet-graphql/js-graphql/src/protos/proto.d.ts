import * as $protobuf from "protobufjs";
/** Properties of an Asset. */
export interface IAsset {

    /** Asset name */
    name?: (string|null);

    /** Asset description */
    description?: (string|null);

    /** Asset owners */
    owners?: (string[]|null);

    /** Asset rules */
    rules?: (IRule[]|null);
}

/** Represents an Asset. */
export class Asset implements IAsset {

    /**
     * Constructs a new Asset.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAsset);

    /** Asset name. */
    public name: string;

    /** Asset description. */
    public description: string;

    /** Asset owners. */
    public owners: string[];

    /** Asset rules. */
    public rules: IRule[];

    /**
     * Creates a new Asset instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Asset instance
     */
    public static create(properties?: IAsset): Asset;

    /**
     * Encodes the specified Asset message. Does not implicitly {@link Asset.verify|verify} messages.
     * @param message Asset message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAsset, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Asset message, length delimited. Does not implicitly {@link Asset.verify|verify} messages.
     * @param message Asset message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAsset, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Asset message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Asset
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Asset;

    /**
     * Decodes an Asset message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Asset
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Asset;

    /**
     * Verifies an Asset message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Asset message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Asset
     */
    public static fromObject(object: { [k: string]: any }): Asset;

    /**
     * Creates a plain object from an Asset message. Also converts values to other types if specified.
     * @param message Asset
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Asset, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Asset to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an AssetContainer. */
export interface IAssetContainer {

    /** AssetContainer entries */
    entries?: (IAsset[]|null);
}

/** Represents an AssetContainer. */
export class AssetContainer implements IAssetContainer {

    /**
     * Constructs a new AssetContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAssetContainer);

    /** AssetContainer entries. */
    public entries: IAsset[];

    /**
     * Creates a new AssetContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AssetContainer instance
     */
    public static create(properties?: IAssetContainer): AssetContainer;

    /**
     * Encodes the specified AssetContainer message. Does not implicitly {@link AssetContainer.verify|verify} messages.
     * @param message AssetContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAssetContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AssetContainer message, length delimited. Does not implicitly {@link AssetContainer.verify|verify} messages.
     * @param message AssetContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAssetContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AssetContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AssetContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AssetContainer;

    /**
     * Decodes an AssetContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AssetContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AssetContainer;

    /**
     * Verifies an AssetContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AssetContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AssetContainer
     */
    public static fromObject(object: { [k: string]: any }): AssetContainer;

    /**
     * Creates a plain object from an AssetContainer message. Also converts values to other types if specified.
     * @param message AssetContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AssetContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AssetContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Rule. */
export interface IRule {

    /** Rule type */
    type?: (Rule.RuleType|null);

    /** Rule value */
    value?: (Uint8Array|null);
}

/** Represents a Rule. */
export class Rule implements IRule {

    /**
     * Constructs a new Rule.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRule);

    /** Rule type. */
    public type: Rule.RuleType;

    /** Rule value. */
    public value: Uint8Array;

    /**
     * Creates a new Rule instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Rule instance
     */
    public static create(properties?: IRule): Rule;

    /**
     * Encodes the specified Rule message. Does not implicitly {@link Rule.verify|verify} messages.
     * @param message Rule message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRule, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Rule message, length delimited. Does not implicitly {@link Rule.verify|verify} messages.
     * @param message Rule message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRule, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Rule message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Rule
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Rule;

    /**
     * Decodes a Rule message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Rule
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Rule;

    /**
     * Verifies a Rule message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Rule message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Rule
     */
    public static fromObject(object: { [k: string]: any }): Rule;

    /**
     * Creates a plain object from a Rule message. Also converts values to other types if specified.
     * @param message Rule
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Rule, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Rule to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Rule {

    /** RuleType enum. */
    enum RuleType {
        RULE_UNSET = 0,
        OWNER_HOLDINGS_INFINITE = 100,
        ALL_HOLDINGS_INFINITE = 101,
        NOT_TRANSFERABLE = 102,
        REQUIRE_SOURCE_TYPES = 103,
        REQUIRE_TARGET_TYPES = 104,
        REQUIRE_SOURCE_QUANTITIES = 105,
        REQUIRE_TARGET_QUANTITIES = 106,
        EXCHANGE_ONCE = 200,
        EXCHANGE_ONCE_PER_ACCOUNT = 201,
        EXCHANGE_LIMITED_TO_ACCOUNTS = 202
    }
}

/** Properties of an Account. */
export interface IAccount {

    /** Account publicKey */
    publicKey?: (string|null);

    /** Account label */
    label?: (string|null);

    /** Account description */
    description?: (string|null);

    /** Account holdings */
    holdings?: (string[]|null);
}

/** Represents an Account. */
export class Account implements IAccount {

    /**
     * Constructs a new Account.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAccount);

    /** Account publicKey. */
    public publicKey: string;

    /** Account label. */
    public label: string;

    /** Account description. */
    public description: string;

    /** Account holdings. */
    public holdings: string[];

    /**
     * Creates a new Account instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Account instance
     */
    public static create(properties?: IAccount): Account;

    /**
     * Encodes the specified Account message. Does not implicitly {@link Account.verify|verify} messages.
     * @param message Account message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAccount, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Account message, length delimited. Does not implicitly {@link Account.verify|verify} messages.
     * @param message Account message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAccount, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Account message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Account
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Account;

    /**
     * Decodes an Account message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Account
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Account;

    /**
     * Verifies an Account message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Account message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Account
     */
    public static fromObject(object: { [k: string]: any }): Account;

    /**
     * Creates a plain object from an Account message. Also converts values to other types if specified.
     * @param message Account
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Account, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Account to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an AccountContainer. */
export interface IAccountContainer {

    /** AccountContainer entries */
    entries?: (IAccount[]|null);
}

/** Represents an AccountContainer. */
export class AccountContainer implements IAccountContainer {

    /**
     * Constructs a new AccountContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAccountContainer);

    /** AccountContainer entries. */
    public entries: IAccount[];

    /**
     * Creates a new AccountContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AccountContainer instance
     */
    public static create(properties?: IAccountContainer): AccountContainer;

    /**
     * Encodes the specified AccountContainer message. Does not implicitly {@link AccountContainer.verify|verify} messages.
     * @param message AccountContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAccountContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AccountContainer message, length delimited. Does not implicitly {@link AccountContainer.verify|verify} messages.
     * @param message AccountContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAccountContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AccountContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AccountContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AccountContainer;

    /**
     * Decodes an AccountContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AccountContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AccountContainer;

    /**
     * Verifies an AccountContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AccountContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AccountContainer
     */
    public static fromObject(object: { [k: string]: any }): AccountContainer;

    /**
     * Creates a plain object from an AccountContainer message. Also converts values to other types if specified.
     * @param message AccountContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AccountContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AccountContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Holding. */
export interface IHolding {

    /** Holding id */
    id?: (string|null);

    /** Holding label */
    label?: (string|null);

    /** Holding description */
    description?: (string|null);

    /** Holding account */
    account?: (string|null);

    /** Holding asset */
    asset?: (string|null);

    /** Holding quantity */
    quantity?: (number|Long|null);
}

/** Represents a Holding. */
export class Holding implements IHolding {

    /**
     * Constructs a new Holding.
     * @param [properties] Properties to set
     */
    constructor(properties?: IHolding);

    /** Holding id. */
    public id: string;

    /** Holding label. */
    public label: string;

    /** Holding description. */
    public description: string;

    /** Holding account. */
    public account: string;

    /** Holding asset. */
    public asset: string;

    /** Holding quantity. */
    public quantity: (number|Long);

    /**
     * Creates a new Holding instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Holding instance
     */
    public static create(properties?: IHolding): Holding;

    /**
     * Encodes the specified Holding message. Does not implicitly {@link Holding.verify|verify} messages.
     * @param message Holding message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IHolding, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Holding message, length delimited. Does not implicitly {@link Holding.verify|verify} messages.
     * @param message Holding message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IHolding, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Holding message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Holding
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Holding;

    /**
     * Decodes a Holding message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Holding
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Holding;

    /**
     * Verifies a Holding message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Holding message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Holding
     */
    public static fromObject(object: { [k: string]: any }): Holding;

    /**
     * Creates a plain object from a Holding message. Also converts values to other types if specified.
     * @param message Holding
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Holding, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Holding to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a HoldingContainer. */
export interface IHoldingContainer {

    /** HoldingContainer entries */
    entries?: (IHolding[]|null);
}

/** Represents a HoldingContainer. */
export class HoldingContainer implements IHoldingContainer {

    /**
     * Constructs a new HoldingContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IHoldingContainer);

    /** HoldingContainer entries. */
    public entries: IHolding[];

    /**
     * Creates a new HoldingContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns HoldingContainer instance
     */
    public static create(properties?: IHoldingContainer): HoldingContainer;

    /**
     * Encodes the specified HoldingContainer message. Does not implicitly {@link HoldingContainer.verify|verify} messages.
     * @param message HoldingContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IHoldingContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified HoldingContainer message, length delimited. Does not implicitly {@link HoldingContainer.verify|verify} messages.
     * @param message HoldingContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IHoldingContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a HoldingContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns HoldingContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): HoldingContainer;

    /**
     * Decodes a HoldingContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns HoldingContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): HoldingContainer;

    /**
     * Verifies a HoldingContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a HoldingContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns HoldingContainer
     */
    public static fromObject(object: { [k: string]: any }): HoldingContainer;

    /**
     * Creates a plain object from a HoldingContainer message. Also converts values to other types if specified.
     * @param message HoldingContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: HoldingContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this HoldingContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an OfferHistory. */
export interface IOfferHistory {

    /** OfferHistory offerId */
    offerId?: (string|null);

    /** OfferHistory accountId */
    accountId?: (string|null);
}

/** Represents an OfferHistory. */
export class OfferHistory implements IOfferHistory {

    /**
     * Constructs a new OfferHistory.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOfferHistory);

    /** OfferHistory offerId. */
    public offerId: string;

    /** OfferHistory accountId. */
    public accountId: string;

    /**
     * Creates a new OfferHistory instance using the specified properties.
     * @param [properties] Properties to set
     * @returns OfferHistory instance
     */
    public static create(properties?: IOfferHistory): OfferHistory;

    /**
     * Encodes the specified OfferHistory message. Does not implicitly {@link OfferHistory.verify|verify} messages.
     * @param message OfferHistory message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOfferHistory, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified OfferHistory message, length delimited. Does not implicitly {@link OfferHistory.verify|verify} messages.
     * @param message OfferHistory message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOfferHistory, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an OfferHistory message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns OfferHistory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OfferHistory;

    /**
     * Decodes an OfferHistory message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns OfferHistory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): OfferHistory;

    /**
     * Verifies an OfferHistory message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an OfferHistory message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns OfferHistory
     */
    public static fromObject(object: { [k: string]: any }): OfferHistory;

    /**
     * Creates a plain object from an OfferHistory message. Also converts values to other types if specified.
     * @param message OfferHistory
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: OfferHistory, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this OfferHistory to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an OfferHistoryContainer. */
export interface IOfferHistoryContainer {

    /** OfferHistoryContainer entries */
    entries?: (IOfferHistory[]|null);
}

/** Represents an OfferHistoryContainer. */
export class OfferHistoryContainer implements IOfferHistoryContainer {

    /**
     * Constructs a new OfferHistoryContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOfferHistoryContainer);

    /** OfferHistoryContainer entries. */
    public entries: IOfferHistory[];

    /**
     * Creates a new OfferHistoryContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns OfferHistoryContainer instance
     */
    public static create(properties?: IOfferHistoryContainer): OfferHistoryContainer;

    /**
     * Encodes the specified OfferHistoryContainer message. Does not implicitly {@link OfferHistoryContainer.verify|verify} messages.
     * @param message OfferHistoryContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOfferHistoryContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified OfferHistoryContainer message, length delimited. Does not implicitly {@link OfferHistoryContainer.verify|verify} messages.
     * @param message OfferHistoryContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOfferHistoryContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an OfferHistoryContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns OfferHistoryContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OfferHistoryContainer;

    /**
     * Decodes an OfferHistoryContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns OfferHistoryContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): OfferHistoryContainer;

    /**
     * Verifies an OfferHistoryContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an OfferHistoryContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns OfferHistoryContainer
     */
    public static fromObject(object: { [k: string]: any }): OfferHistoryContainer;

    /**
     * Creates a plain object from an OfferHistoryContainer message. Also converts values to other types if specified.
     * @param message OfferHistoryContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: OfferHistoryContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this OfferHistoryContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an Offer. */
export interface IOffer {

    /** Offer id */
    id?: (string|null);

    /** Offer label */
    label?: (string|null);

    /** Offer description */
    description?: (string|null);

    /** Offer owners */
    owners?: (string[]|null);

    /** Offer source */
    source?: (string|null);

    /** Offer sourceQuantity */
    sourceQuantity?: (number|Long|null);

    /** Offer target */
    target?: (string|null);

    /** Offer targetQuantity */
    targetQuantity?: (number|Long|null);

    /** Offer rules */
    rules?: (IRule[]|null);

    /** Offer status */
    status?: (Offer.Status|null);

    /** Offer timestamp */
    timestamp?: (number|Long|null);

    /** Offer role */
    role?: (Offer.Role|null);
}

/** Represents an Offer. */
export class Offer implements IOffer {

    /**
     * Constructs a new Offer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOffer);

    /** Offer id. */
    public id: string;

    /** Offer label. */
    public label: string;

    /** Offer description. */
    public description: string;

    /** Offer owners. */
    public owners: string[];

    /** Offer source. */
    public source: string;

    /** Offer sourceQuantity. */
    public sourceQuantity: (number|Long);

    /** Offer target. */
    public target: string;

    /** Offer targetQuantity. */
    public targetQuantity: (number|Long);

    /** Offer rules. */
    public rules: IRule[];

    /** Offer status. */
    public status: Offer.Status;

    /** Offer timestamp. */
    public timestamp: (number|Long);

    /** Offer role. */
    public role: Offer.Role;

    /**
     * Creates a new Offer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Offer instance
     */
    public static create(properties?: IOffer): Offer;

    /**
     * Encodes the specified Offer message. Does not implicitly {@link Offer.verify|verify} messages.
     * @param message Offer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOffer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Offer message, length delimited. Does not implicitly {@link Offer.verify|verify} messages.
     * @param message Offer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOffer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Offer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Offer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Offer;

    /**
     * Decodes an Offer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Offer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Offer;

    /**
     * Verifies an Offer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an Offer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Offer
     */
    public static fromObject(object: { [k: string]: any }): Offer;

    /**
     * Creates a plain object from an Offer message. Also converts values to other types if specified.
     * @param message Offer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Offer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Offer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Offer {

    /** Role enum. */
    enum Role {
        OWNER = 0,
        CUSTODIAN = 1,
        REPORTER = 2
    }

    /** Status enum. */
    enum Status {
        OPEN = 0,
        ACCEPTED = 1,
        REJECTED = 2,
        CANCELED = 3
    }
}

/** Properties of an OfferContainer. */
export interface IOfferContainer {

    /** OfferContainer entries */
    entries?: (IOffer[]|null);
}

/** Represents an OfferContainer. */
export class OfferContainer implements IOfferContainer {

    /**
     * Constructs a new OfferContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOfferContainer);

    /** OfferContainer entries. */
    public entries: IOffer[];

    /**
     * Creates a new OfferContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns OfferContainer instance
     */
    public static create(properties?: IOfferContainer): OfferContainer;

    /**
     * Encodes the specified OfferContainer message. Does not implicitly {@link OfferContainer.verify|verify} messages.
     * @param message OfferContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOfferContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified OfferContainer message, length delimited. Does not implicitly {@link OfferContainer.verify|verify} messages.
     * @param message OfferContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOfferContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an OfferContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns OfferContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OfferContainer;

    /**
     * Decodes an OfferContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns OfferContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): OfferContainer;

    /**
     * Verifies an OfferContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an OfferContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns OfferContainer
     */
    public static fromObject(object: { [k: string]: any }): OfferContainer;

    /**
     * Creates a plain object from an OfferContainer message. Also converts values to other types if specified.
     * @param message OfferContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: OfferContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this OfferContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a TransactionPayload. */
export interface ITransactionPayload {

    /** TransactionPayload payloadType */
    payloadType?: (TransactionPayload.PayloadType|null);

    /** TransactionPayload timestamp */
    timestamp?: (number|Long|null);

    /** TransactionPayload createAccount */
    createAccount?: (ICreateAccount|null);

    /** TransactionPayload createAsset */
    createAsset?: (ICreateAsset|null);

    /** TransactionPayload createHolding */
    createHolding?: (ICreateHolding|null);

    /** TransactionPayload createOffer */
    createOffer?: (ICreateOffer|null);

    /** TransactionPayload acceptOffer */
    acceptOffer?: (IAcceptOffer|null);

    /** TransactionPayload closeOffer */
    closeOffer?: (ICloseOffer|null);

    /** TransactionPayload createRecord */
    createRecord?: (ICreateRecord|null);

    /** TransactionPayload finalizeRecord */
    finalizeRecord?: (IFinalizeRecord|null);

    /** TransactionPayload createRecordType */
    createRecordType?: (ICreateRecordType|null);

    /** TransactionPayload updateProperties */
    updateProperties?: (IUpdateProperties|null);

    /** TransactionPayload createProposal */
    createProposal?: (ICreateProposal|null);

    /** TransactionPayload answerProposal */
    answerProposal?: (IAnswerProposal|null);

    /** TransactionPayload revokeReporter */
    revokeReporter?: (IRevokeReporter|null);
}

/** Represents a TransactionPayload. */
export class TransactionPayload implements ITransactionPayload {

    /**
     * Constructs a new TransactionPayload.
     * @param [properties] Properties to set
     */
    constructor(properties?: ITransactionPayload);

    /** TransactionPayload payloadType. */
    public payloadType: TransactionPayload.PayloadType;

    /** TransactionPayload timestamp. */
    public timestamp: (number|Long);

    /** TransactionPayload createAccount. */
    public createAccount?: (ICreateAccount|null);

    /** TransactionPayload createAsset. */
    public createAsset?: (ICreateAsset|null);

    /** TransactionPayload createHolding. */
    public createHolding?: (ICreateHolding|null);

    /** TransactionPayload createOffer. */
    public createOffer?: (ICreateOffer|null);

    /** TransactionPayload acceptOffer. */
    public acceptOffer?: (IAcceptOffer|null);

    /** TransactionPayload closeOffer. */
    public closeOffer?: (ICloseOffer|null);

    /** TransactionPayload createRecord. */
    public createRecord?: (ICreateRecord|null);

    /** TransactionPayload finalizeRecord. */
    public finalizeRecord?: (IFinalizeRecord|null);

    /** TransactionPayload createRecordType. */
    public createRecordType?: (ICreateRecordType|null);

    /** TransactionPayload updateProperties. */
    public updateProperties?: (IUpdateProperties|null);

    /** TransactionPayload createProposal. */
    public createProposal?: (ICreateProposal|null);

    /** TransactionPayload answerProposal. */
    public answerProposal?: (IAnswerProposal|null);

    /** TransactionPayload revokeReporter. */
    public revokeReporter?: (IRevokeReporter|null);

    /**
     * Creates a new TransactionPayload instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TransactionPayload instance
     */
    public static create(properties?: ITransactionPayload): TransactionPayload;

    /**
     * Encodes the specified TransactionPayload message. Does not implicitly {@link TransactionPayload.verify|verify} messages.
     * @param message TransactionPayload message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ITransactionPayload, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified TransactionPayload message, length delimited. Does not implicitly {@link TransactionPayload.verify|verify} messages.
     * @param message TransactionPayload message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ITransactionPayload, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a TransactionPayload message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns TransactionPayload
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): TransactionPayload;

    /**
     * Decodes a TransactionPayload message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns TransactionPayload
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): TransactionPayload;

    /**
     * Verifies a TransactionPayload message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a TransactionPayload message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns TransactionPayload
     */
    public static fromObject(object: { [k: string]: any }): TransactionPayload;

    /**
     * Creates a plain object from a TransactionPayload message. Also converts values to other types if specified.
     * @param message TransactionPayload
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: TransactionPayload, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this TransactionPayload to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace TransactionPayload {

    /** PayloadType enum. */
    enum PayloadType {
        TYPE_UNSET = 0,
        CREATE_ACCOUNT = 2,
        CREATE_ASSET = 3,
        CREATE_HOLDING = 4,
        CREATE_OFFER = 5,
        ACCEPT_OFFER = 10,
        CLOSE_OFFER = 11,
        CREATE_RECORD = 21,
        FINALIZE_RECORD = 22,
        CREATE_RECORD_TYPE = 23,
        UPDATE_PROPERTIES = 24,
        CREATE_PROPOSAL = 25,
        ANSWER_PROPOSAL = 26,
        REVOKE_REPORTER = 27
    }
}

/** Properties of a CreateAccount. */
export interface ICreateAccount {

    /** CreateAccount label */
    label?: (string|null);

    /** CreateAccount description */
    description?: (string|null);
}

/** Represents a CreateAccount. */
export class CreateAccount implements ICreateAccount {

    /**
     * Constructs a new CreateAccount.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICreateAccount);

    /** CreateAccount label. */
    public label: string;

    /** CreateAccount description. */
    public description: string;

    /**
     * Creates a new CreateAccount instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CreateAccount instance
     */
    public static create(properties?: ICreateAccount): CreateAccount;

    /**
     * Encodes the specified CreateAccount message. Does not implicitly {@link CreateAccount.verify|verify} messages.
     * @param message CreateAccount message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICreateAccount, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CreateAccount message, length delimited. Does not implicitly {@link CreateAccount.verify|verify} messages.
     * @param message CreateAccount message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICreateAccount, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CreateAccount message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CreateAccount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CreateAccount;

    /**
     * Decodes a CreateAccount message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CreateAccount
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CreateAccount;

    /**
     * Verifies a CreateAccount message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CreateAccount message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CreateAccount
     */
    public static fromObject(object: { [k: string]: any }): CreateAccount;

    /**
     * Creates a plain object from a CreateAccount message. Also converts values to other types if specified.
     * @param message CreateAccount
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CreateAccount, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CreateAccount to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CreateAsset. */
export interface ICreateAsset {

    /** CreateAsset name */
    name?: (string|null);

    /** CreateAsset description */
    description?: (string|null);

    /** CreateAsset rules */
    rules?: (IRule[]|null);
}

/** Represents a CreateAsset. */
export class CreateAsset implements ICreateAsset {

    /**
     * Constructs a new CreateAsset.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICreateAsset);

    /** CreateAsset name. */
    public name: string;

    /** CreateAsset description. */
    public description: string;

    /** CreateAsset rules. */
    public rules: IRule[];

    /**
     * Creates a new CreateAsset instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CreateAsset instance
     */
    public static create(properties?: ICreateAsset): CreateAsset;

    /**
     * Encodes the specified CreateAsset message. Does not implicitly {@link CreateAsset.verify|verify} messages.
     * @param message CreateAsset message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICreateAsset, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CreateAsset message, length delimited. Does not implicitly {@link CreateAsset.verify|verify} messages.
     * @param message CreateAsset message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICreateAsset, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CreateAsset message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CreateAsset
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CreateAsset;

    /**
     * Decodes a CreateAsset message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CreateAsset
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CreateAsset;

    /**
     * Verifies a CreateAsset message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CreateAsset message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CreateAsset
     */
    public static fromObject(object: { [k: string]: any }): CreateAsset;

    /**
     * Creates a plain object from a CreateAsset message. Also converts values to other types if specified.
     * @param message CreateAsset
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CreateAsset, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CreateAsset to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CreateHolding. */
export interface ICreateHolding {

    /** CreateHolding id */
    id?: (string|null);

    /** CreateHolding label */
    label?: (string|null);

    /** CreateHolding description */
    description?: (string|null);

    /** CreateHolding asset */
    asset?: (string|null);

    /** CreateHolding quantity */
    quantity?: (number|Long|null);
}

/** Represents a CreateHolding. */
export class CreateHolding implements ICreateHolding {

    /**
     * Constructs a new CreateHolding.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICreateHolding);

    /** CreateHolding id. */
    public id: string;

    /** CreateHolding label. */
    public label: string;

    /** CreateHolding description. */
    public description: string;

    /** CreateHolding asset. */
    public asset: string;

    /** CreateHolding quantity. */
    public quantity: (number|Long);

    /**
     * Creates a new CreateHolding instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CreateHolding instance
     */
    public static create(properties?: ICreateHolding): CreateHolding;

    /**
     * Encodes the specified CreateHolding message. Does not implicitly {@link CreateHolding.verify|verify} messages.
     * @param message CreateHolding message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICreateHolding, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CreateHolding message, length delimited. Does not implicitly {@link CreateHolding.verify|verify} messages.
     * @param message CreateHolding message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICreateHolding, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CreateHolding message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CreateHolding
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CreateHolding;

    /**
     * Decodes a CreateHolding message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CreateHolding
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CreateHolding;

    /**
     * Verifies a CreateHolding message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CreateHolding message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CreateHolding
     */
    public static fromObject(object: { [k: string]: any }): CreateHolding;

    /**
     * Creates a plain object from a CreateHolding message. Also converts values to other types if specified.
     * @param message CreateHolding
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CreateHolding, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CreateHolding to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CreateOffer. */
export interface ICreateOffer {

    /** CreateOffer id */
    id?: (string|null);

    /** CreateOffer label */
    label?: (string|null);

    /** CreateOffer description */
    description?: (string|null);

    /** CreateOffer source */
    source?: (string|null);

    /** CreateOffer sourceQuantity */
    sourceQuantity?: (number|Long|null);

    /** CreateOffer target */
    target?: (string|null);

    /** CreateOffer targetQuantity */
    targetQuantity?: (number|Long|null);

    /** CreateOffer rules */
    rules?: (IRule[]|null);
}

/** Represents a CreateOffer. */
export class CreateOffer implements ICreateOffer {

    /**
     * Constructs a new CreateOffer.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICreateOffer);

    /** CreateOffer id. */
    public id: string;

    /** CreateOffer label. */
    public label: string;

    /** CreateOffer description. */
    public description: string;

    /** CreateOffer source. */
    public source: string;

    /** CreateOffer sourceQuantity. */
    public sourceQuantity: (number|Long);

    /** CreateOffer target. */
    public target: string;

    /** CreateOffer targetQuantity. */
    public targetQuantity: (number|Long);

    /** CreateOffer rules. */
    public rules: IRule[];

    /**
     * Creates a new CreateOffer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CreateOffer instance
     */
    public static create(properties?: ICreateOffer): CreateOffer;

    /**
     * Encodes the specified CreateOffer message. Does not implicitly {@link CreateOffer.verify|verify} messages.
     * @param message CreateOffer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICreateOffer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CreateOffer message, length delimited. Does not implicitly {@link CreateOffer.verify|verify} messages.
     * @param message CreateOffer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICreateOffer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CreateOffer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CreateOffer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CreateOffer;

    /**
     * Decodes a CreateOffer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CreateOffer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CreateOffer;

    /**
     * Verifies a CreateOffer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CreateOffer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CreateOffer
     */
    public static fromObject(object: { [k: string]: any }): CreateOffer;

    /**
     * Creates a plain object from a CreateOffer message. Also converts values to other types if specified.
     * @param message CreateOffer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CreateOffer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CreateOffer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an AcceptOffer. */
export interface IAcceptOffer {

    /** AcceptOffer id */
    id?: (string|null);

    /** AcceptOffer source */
    source?: (string|null);

    /** AcceptOffer target */
    target?: (string|null);

    /** AcceptOffer count */
    count?: (number|Long|null);
}

/** Represents an AcceptOffer. */
export class AcceptOffer implements IAcceptOffer {

    /**
     * Constructs a new AcceptOffer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAcceptOffer);

    /** AcceptOffer id. */
    public id: string;

    /** AcceptOffer source. */
    public source: string;

    /** AcceptOffer target. */
    public target: string;

    /** AcceptOffer count. */
    public count: (number|Long);

    /**
     * Creates a new AcceptOffer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AcceptOffer instance
     */
    public static create(properties?: IAcceptOffer): AcceptOffer;

    /**
     * Encodes the specified AcceptOffer message. Does not implicitly {@link AcceptOffer.verify|verify} messages.
     * @param message AcceptOffer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAcceptOffer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AcceptOffer message, length delimited. Does not implicitly {@link AcceptOffer.verify|verify} messages.
     * @param message AcceptOffer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAcceptOffer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AcceptOffer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AcceptOffer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AcceptOffer;

    /**
     * Decodes an AcceptOffer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AcceptOffer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AcceptOffer;

    /**
     * Verifies an AcceptOffer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AcceptOffer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AcceptOffer
     */
    public static fromObject(object: { [k: string]: any }): AcceptOffer;

    /**
     * Creates a plain object from an AcceptOffer message. Also converts values to other types if specified.
     * @param message AcceptOffer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AcceptOffer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AcceptOffer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CloseOffer. */
export interface ICloseOffer {

    /** CloseOffer id */
    id?: (string|null);
}

/** Represents a CloseOffer. */
export class CloseOffer implements ICloseOffer {

    /**
     * Constructs a new CloseOffer.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICloseOffer);

    /** CloseOffer id. */
    public id: string;

    /**
     * Creates a new CloseOffer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CloseOffer instance
     */
    public static create(properties?: ICloseOffer): CloseOffer;

    /**
     * Encodes the specified CloseOffer message. Does not implicitly {@link CloseOffer.verify|verify} messages.
     * @param message CloseOffer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICloseOffer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CloseOffer message, length delimited. Does not implicitly {@link CloseOffer.verify|verify} messages.
     * @param message CloseOffer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICloseOffer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CloseOffer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CloseOffer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CloseOffer;

    /**
     * Decodes a CloseOffer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CloseOffer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CloseOffer;

    /**
     * Verifies a CloseOffer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CloseOffer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CloseOffer
     */
    public static fromObject(object: { [k: string]: any }): CloseOffer;

    /**
     * Creates a plain object from a CloseOffer message. Also converts values to other types if specified.
     * @param message CloseOffer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CloseOffer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CloseOffer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CreateRecord. */
export interface ICreateRecord {

    /** CreateRecord recordId */
    recordId?: (string|null);

    /** CreateRecord recordType */
    recordType?: (string|null);

    /** CreateRecord properties */
    properties?: (IPropertyValue[]|null);
}

/** Represents a CreateRecord. */
export class CreateRecord implements ICreateRecord {

    /**
     * Constructs a new CreateRecord.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICreateRecord);

    /** CreateRecord recordId. */
    public recordId: string;

    /** CreateRecord recordType. */
    public recordType: string;

    /** CreateRecord properties. */
    public properties: IPropertyValue[];

    /**
     * Creates a new CreateRecord instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CreateRecord instance
     */
    public static create(properties?: ICreateRecord): CreateRecord;

    /**
     * Encodes the specified CreateRecord message. Does not implicitly {@link CreateRecord.verify|verify} messages.
     * @param message CreateRecord message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICreateRecord, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CreateRecord message, length delimited. Does not implicitly {@link CreateRecord.verify|verify} messages.
     * @param message CreateRecord message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICreateRecord, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CreateRecord message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CreateRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CreateRecord;

    /**
     * Decodes a CreateRecord message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CreateRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CreateRecord;

    /**
     * Verifies a CreateRecord message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CreateRecord message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CreateRecord
     */
    public static fromObject(object: { [k: string]: any }): CreateRecord;

    /**
     * Creates a plain object from a CreateRecord message. Also converts values to other types if specified.
     * @param message CreateRecord
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CreateRecord, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CreateRecord to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a FinalizeRecord. */
export interface IFinalizeRecord {

    /** FinalizeRecord recordId */
    recordId?: (string|null);
}

/** Represents a FinalizeRecord. */
export class FinalizeRecord implements IFinalizeRecord {

    /**
     * Constructs a new FinalizeRecord.
     * @param [properties] Properties to set
     */
    constructor(properties?: IFinalizeRecord);

    /** FinalizeRecord recordId. */
    public recordId: string;

    /**
     * Creates a new FinalizeRecord instance using the specified properties.
     * @param [properties] Properties to set
     * @returns FinalizeRecord instance
     */
    public static create(properties?: IFinalizeRecord): FinalizeRecord;

    /**
     * Encodes the specified FinalizeRecord message. Does not implicitly {@link FinalizeRecord.verify|verify} messages.
     * @param message FinalizeRecord message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IFinalizeRecord, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified FinalizeRecord message, length delimited. Does not implicitly {@link FinalizeRecord.verify|verify} messages.
     * @param message FinalizeRecord message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IFinalizeRecord, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a FinalizeRecord message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns FinalizeRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): FinalizeRecord;

    /**
     * Decodes a FinalizeRecord message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns FinalizeRecord
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): FinalizeRecord;

    /**
     * Verifies a FinalizeRecord message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a FinalizeRecord message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns FinalizeRecord
     */
    public static fromObject(object: { [k: string]: any }): FinalizeRecord;

    /**
     * Creates a plain object from a FinalizeRecord message. Also converts values to other types if specified.
     * @param message FinalizeRecord
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: FinalizeRecord, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this FinalizeRecord to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CreateRecordType. */
export interface ICreateRecordType {

    /** CreateRecordType name */
    name?: (string|null);

    /** CreateRecordType properties */
    properties?: (IPropertySchema[]|null);
}

/** Represents a CreateRecordType. */
export class CreateRecordType implements ICreateRecordType {

    /**
     * Constructs a new CreateRecordType.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICreateRecordType);

    /** CreateRecordType name. */
    public name: string;

    /** CreateRecordType properties. */
    public properties: IPropertySchema[];

    /**
     * Creates a new CreateRecordType instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CreateRecordType instance
     */
    public static create(properties?: ICreateRecordType): CreateRecordType;

    /**
     * Encodes the specified CreateRecordType message. Does not implicitly {@link CreateRecordType.verify|verify} messages.
     * @param message CreateRecordType message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICreateRecordType, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CreateRecordType message, length delimited. Does not implicitly {@link CreateRecordType.verify|verify} messages.
     * @param message CreateRecordType message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICreateRecordType, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CreateRecordType message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CreateRecordType
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CreateRecordType;

    /**
     * Decodes a CreateRecordType message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CreateRecordType
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CreateRecordType;

    /**
     * Verifies a CreateRecordType message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CreateRecordType message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CreateRecordType
     */
    public static fromObject(object: { [k: string]: any }): CreateRecordType;

    /**
     * Creates a plain object from a CreateRecordType message. Also converts values to other types if specified.
     * @param message CreateRecordType
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CreateRecordType, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CreateRecordType to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an UpdateProperties. */
export interface IUpdateProperties {

    /** UpdateProperties recordId */
    recordId?: (string|null);

    /** UpdateProperties properties */
    properties?: (IPropertyValue[]|null);
}

/** Represents an UpdateProperties. */
export class UpdateProperties implements IUpdateProperties {

    /**
     * Constructs a new UpdateProperties.
     * @param [properties] Properties to set
     */
    constructor(properties?: IUpdateProperties);

    /** UpdateProperties recordId. */
    public recordId: string;

    /** UpdateProperties properties. */
    public properties: IPropertyValue[];

    /**
     * Creates a new UpdateProperties instance using the specified properties.
     * @param [properties] Properties to set
     * @returns UpdateProperties instance
     */
    public static create(properties?: IUpdateProperties): UpdateProperties;

    /**
     * Encodes the specified UpdateProperties message. Does not implicitly {@link UpdateProperties.verify|verify} messages.
     * @param message UpdateProperties message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IUpdateProperties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified UpdateProperties message, length delimited. Does not implicitly {@link UpdateProperties.verify|verify} messages.
     * @param message UpdateProperties message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IUpdateProperties, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an UpdateProperties message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns UpdateProperties
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): UpdateProperties;

    /**
     * Decodes an UpdateProperties message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns UpdateProperties
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): UpdateProperties;

    /**
     * Verifies an UpdateProperties message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an UpdateProperties message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns UpdateProperties
     */
    public static fromObject(object: { [k: string]: any }): UpdateProperties;

    /**
     * Creates a plain object from an UpdateProperties message. Also converts values to other types if specified.
     * @param message UpdateProperties
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: UpdateProperties, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this UpdateProperties to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a CreateProposal. */
export interface ICreateProposal {

    /** CreateProposal recordId */
    recordId?: (string|null);

    /** CreateProposal receivingAgent */
    receivingAgent?: (string|null);

    /** CreateProposal role */
    role?: (Proposal.Role|null);

    /** CreateProposal properties */
    properties?: (string[]|null);
}

/** Represents a CreateProposal. */
export class CreateProposal implements ICreateProposal {

    /**
     * Constructs a new CreateProposal.
     * @param [properties] Properties to set
     */
    constructor(properties?: ICreateProposal);

    /** CreateProposal recordId. */
    public recordId: string;

    /** CreateProposal receivingAgent. */
    public receivingAgent: string;

    /** CreateProposal role. */
    public role: Proposal.Role;

    /** CreateProposal properties. */
    public properties: string[];

    /**
     * Creates a new CreateProposal instance using the specified properties.
     * @param [properties] Properties to set
     * @returns CreateProposal instance
     */
    public static create(properties?: ICreateProposal): CreateProposal;

    /**
     * Encodes the specified CreateProposal message. Does not implicitly {@link CreateProposal.verify|verify} messages.
     * @param message CreateProposal message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ICreateProposal, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified CreateProposal message, length delimited. Does not implicitly {@link CreateProposal.verify|verify} messages.
     * @param message CreateProposal message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ICreateProposal, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a CreateProposal message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns CreateProposal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): CreateProposal;

    /**
     * Decodes a CreateProposal message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns CreateProposal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): CreateProposal;

    /**
     * Verifies a CreateProposal message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a CreateProposal message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns CreateProposal
     */
    public static fromObject(object: { [k: string]: any }): CreateProposal;

    /**
     * Creates a plain object from a CreateProposal message. Also converts values to other types if specified.
     * @param message CreateProposal
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: CreateProposal, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this CreateProposal to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an AnswerProposal. */
export interface IAnswerProposal {

    /** AnswerProposal recordId */
    recordId?: (string|null);

    /** AnswerProposal receivingAgent */
    receivingAgent?: (string|null);

    /** AnswerProposal role */
    role?: (Proposal.Role|null);

    /** AnswerProposal response */
    response?: (AnswerProposal.Response|null);
}

/** Represents an AnswerProposal. */
export class AnswerProposal implements IAnswerProposal {

    /**
     * Constructs a new AnswerProposal.
     * @param [properties] Properties to set
     */
    constructor(properties?: IAnswerProposal);

    /** AnswerProposal recordId. */
    public recordId: string;

    /** AnswerProposal receivingAgent. */
    public receivingAgent: string;

    /** AnswerProposal role. */
    public role: Proposal.Role;

    /** AnswerProposal response. */
    public response: AnswerProposal.Response;

    /**
     * Creates a new AnswerProposal instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AnswerProposal instance
     */
    public static create(properties?: IAnswerProposal): AnswerProposal;

    /**
     * Encodes the specified AnswerProposal message. Does not implicitly {@link AnswerProposal.verify|verify} messages.
     * @param message AnswerProposal message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IAnswerProposal, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified AnswerProposal message, length delimited. Does not implicitly {@link AnswerProposal.verify|verify} messages.
     * @param message AnswerProposal message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IAnswerProposal, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an AnswerProposal message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AnswerProposal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): AnswerProposal;

    /**
     * Decodes an AnswerProposal message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AnswerProposal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): AnswerProposal;

    /**
     * Verifies an AnswerProposal message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an AnswerProposal message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AnswerProposal
     */
    public static fromObject(object: { [k: string]: any }): AnswerProposal;

    /**
     * Creates a plain object from an AnswerProposal message. Also converts values to other types if specified.
     * @param message AnswerProposal
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: AnswerProposal, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this AnswerProposal to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace AnswerProposal {

    /** Response enum. */
    enum Response {
        ACCEPT = 0,
        REJECT = 1,
        CANCEL = 2
    }
}

/** Properties of a RevokeReporter. */
export interface IRevokeReporter {

    /** RevokeReporter recordId */
    recordId?: (string|null);

    /** RevokeReporter reporterId */
    reporterId?: (string|null);

    /** RevokeReporter properties */
    properties?: (string[]|null);
}

/** Represents a RevokeReporter. */
export class RevokeReporter implements IRevokeReporter {

    /**
     * Constructs a new RevokeReporter.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRevokeReporter);

    /** RevokeReporter recordId. */
    public recordId: string;

    /** RevokeReporter reporterId. */
    public reporterId: string;

    /** RevokeReporter properties. */
    public properties: string[];

    /**
     * Creates a new RevokeReporter instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RevokeReporter instance
     */
    public static create(properties?: IRevokeReporter): RevokeReporter;

    /**
     * Encodes the specified RevokeReporter message. Does not implicitly {@link RevokeReporter.verify|verify} messages.
     * @param message RevokeReporter message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRevokeReporter, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RevokeReporter message, length delimited. Does not implicitly {@link RevokeReporter.verify|verify} messages.
     * @param message RevokeReporter message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRevokeReporter, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RevokeReporter message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RevokeReporter
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RevokeReporter;

    /**
     * Decodes a RevokeReporter message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RevokeReporter
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RevokeReporter;

    /**
     * Verifies a RevokeReporter message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RevokeReporter message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RevokeReporter
     */
    public static fromObject(object: { [k: string]: any }): RevokeReporter;

    /**
     * Creates a plain object from a RevokeReporter message. Also converts values to other types if specified.
     * @param message RevokeReporter
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RevokeReporter, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RevokeReporter to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Property. */
export interface IProperty {

    /** Property name */
    name?: (string|null);

    /** Property recordId */
    recordId?: (string|null);

    /** Property dataType */
    dataType?: (PropertySchema.DataType|null);

    /** Property reporters */
    reporters?: (Property.IReporter[]|null);

    /** Property currentPage */
    currentPage?: (number|null);

    /** Property wrapped */
    wrapped?: (boolean|null);

    /** Property fixed */
    fixed?: (boolean|null);

    /** Property numberExponent */
    numberExponent?: (number|null);

    /** Property enumOptions */
    enumOptions?: (string[]|null);

    /** Property structProperties */
    structProperties?: (IPropertySchema[]|null);

    /** Property unit */
    unit?: (string|null);
}

/** Represents a Property. */
export class Property implements IProperty {

    /**
     * Constructs a new Property.
     * @param [properties] Properties to set
     */
    constructor(properties?: IProperty);

    /** Property name. */
    public name: string;

    /** Property recordId. */
    public recordId: string;

    /** Property dataType. */
    public dataType: PropertySchema.DataType;

    /** Property reporters. */
    public reporters: Property.IReporter[];

    /** Property currentPage. */
    public currentPage: number;

    /** Property wrapped. */
    public wrapped: boolean;

    /** Property fixed. */
    public fixed: boolean;

    /** Property numberExponent. */
    public numberExponent: number;

    /** Property enumOptions. */
    public enumOptions: string[];

    /** Property structProperties. */
    public structProperties: IPropertySchema[];

    /** Property unit. */
    public unit: string;

    /**
     * Creates a new Property instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Property instance
     */
    public static create(properties?: IProperty): Property;

    /**
     * Encodes the specified Property message. Does not implicitly {@link Property.verify|verify} messages.
     * @param message Property message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IProperty, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Property message, length delimited. Does not implicitly {@link Property.verify|verify} messages.
     * @param message Property message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IProperty, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Property message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Property
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Property;

    /**
     * Decodes a Property message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Property
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Property;

    /**
     * Verifies a Property message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Property message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Property
     */
    public static fromObject(object: { [k: string]: any }): Property;

    /**
     * Creates a plain object from a Property message. Also converts values to other types if specified.
     * @param message Property
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Property, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Property to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Property {

    /** Properties of a Reporter. */
    interface IReporter {

        /** Reporter publicKey */
        publicKey?: (string|null);

        /** Reporter authorized */
        authorized?: (boolean|null);

        /** Reporter index */
        index?: (number|null);
    }

    /** Represents a Reporter. */
    class Reporter implements IReporter {

        /**
         * Constructs a new Reporter.
         * @param [properties] Properties to set
         */
        constructor(properties?: Property.IReporter);

        /** Reporter publicKey. */
        public publicKey: string;

        /** Reporter authorized. */
        public authorized: boolean;

        /** Reporter index. */
        public index: number;

        /**
         * Creates a new Reporter instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Reporter instance
         */
        public static create(properties?: Property.IReporter): Property.Reporter;

        /**
         * Encodes the specified Reporter message. Does not implicitly {@link Property.Reporter.verify|verify} messages.
         * @param message Reporter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Property.IReporter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Reporter message, length delimited. Does not implicitly {@link Property.Reporter.verify|verify} messages.
         * @param message Reporter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Property.IReporter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Reporter message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Reporter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Property.Reporter;

        /**
         * Decodes a Reporter message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Reporter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Property.Reporter;

        /**
         * Verifies a Reporter message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Reporter message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Reporter
         */
        public static fromObject(object: { [k: string]: any }): Property.Reporter;

        /**
         * Creates a plain object from a Reporter message. Also converts values to other types if specified.
         * @param message Reporter
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Property.Reporter, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Reporter to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Properties of a PropertyContainer. */
export interface IPropertyContainer {

    /** PropertyContainer entries */
    entries?: (IProperty[]|null);
}

/** Represents a PropertyContainer. */
export class PropertyContainer implements IPropertyContainer {

    /**
     * Constructs a new PropertyContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPropertyContainer);

    /** PropertyContainer entries. */
    public entries: IProperty[];

    /**
     * Creates a new PropertyContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PropertyContainer instance
     */
    public static create(properties?: IPropertyContainer): PropertyContainer;

    /**
     * Encodes the specified PropertyContainer message. Does not implicitly {@link PropertyContainer.verify|verify} messages.
     * @param message PropertyContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPropertyContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PropertyContainer message, length delimited. Does not implicitly {@link PropertyContainer.verify|verify} messages.
     * @param message PropertyContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPropertyContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PropertyContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PropertyContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PropertyContainer;

    /**
     * Decodes a PropertyContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PropertyContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PropertyContainer;

    /**
     * Verifies a PropertyContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PropertyContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PropertyContainer
     */
    public static fromObject(object: { [k: string]: any }): PropertyContainer;

    /**
     * Creates a plain object from a PropertyContainer message. Also converts values to other types if specified.
     * @param message PropertyContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PropertyContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PropertyContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PropertySchema. */
export interface IPropertySchema {

    /** PropertySchema name */
    name?: (string|null);

    /** PropertySchema dataType */
    dataType?: (PropertySchema.DataType|null);

    /** PropertySchema required */
    required?: (boolean|null);

    /** PropertySchema fixed */
    fixed?: (boolean|null);

    /** PropertySchema delayed */
    delayed?: (boolean|null);

    /** PropertySchema numberExponent */
    numberExponent?: (number|null);

    /** PropertySchema enumOptions */
    enumOptions?: (string[]|null);

    /** PropertySchema structProperties */
    structProperties?: (IPropertySchema[]|null);

    /** PropertySchema unit */
    unit?: (string|null);
}

/** Represents a PropertySchema. */
export class PropertySchema implements IPropertySchema {

    /**
     * Constructs a new PropertySchema.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPropertySchema);

    /** PropertySchema name. */
    public name: string;

    /** PropertySchema dataType. */
    public dataType: PropertySchema.DataType;

    /** PropertySchema required. */
    public required: boolean;

    /** PropertySchema fixed. */
    public fixed: boolean;

    /** PropertySchema delayed. */
    public delayed: boolean;

    /** PropertySchema numberExponent. */
    public numberExponent: number;

    /** PropertySchema enumOptions. */
    public enumOptions: string[];

    /** PropertySchema structProperties. */
    public structProperties: IPropertySchema[];

    /** PropertySchema unit. */
    public unit: string;

    /**
     * Creates a new PropertySchema instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PropertySchema instance
     */
    public static create(properties?: IPropertySchema): PropertySchema;

    /**
     * Encodes the specified PropertySchema message. Does not implicitly {@link PropertySchema.verify|verify} messages.
     * @param message PropertySchema message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPropertySchema, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PropertySchema message, length delimited. Does not implicitly {@link PropertySchema.verify|verify} messages.
     * @param message PropertySchema message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPropertySchema, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PropertySchema message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PropertySchema
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PropertySchema;

    /**
     * Decodes a PropertySchema message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PropertySchema
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PropertySchema;

    /**
     * Verifies a PropertySchema message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PropertySchema message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PropertySchema
     */
    public static fromObject(object: { [k: string]: any }): PropertySchema;

    /**
     * Creates a plain object from a PropertySchema message. Also converts values to other types if specified.
     * @param message PropertySchema
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PropertySchema, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PropertySchema to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace PropertySchema {

    /** DataType enum. */
    enum DataType {
        TYPE_UNSET = 0,
        BYTES = 1,
        BOOLEAN = 2,
        NUMBER = 3,
        STRING = 4,
        ENUM = 5,
        STRUCT = 6,
        LOCATION = 7
    }
}

/** Properties of a PropertyValue. */
export interface IPropertyValue {

    /** PropertyValue name */
    name?: (string|null);

    /** PropertyValue dataType */
    dataType?: (PropertySchema.DataType|null);

    /** PropertyValue bytesValue */
    bytesValue?: (Uint8Array|null);

    /** PropertyValue booleanValue */
    booleanValue?: (boolean|null);

    /** PropertyValue numberValue */
    numberValue?: (number|Long|null);

    /** PropertyValue stringValue */
    stringValue?: (string|null);

    /** PropertyValue enumValue */
    enumValue?: (string|null);

    /** PropertyValue structValues */
    structValues?: (IPropertyValue[]|null);

    /** PropertyValue locationValue */
    locationValue?: (ILocation|null);
}

/** Represents a PropertyValue. */
export class PropertyValue implements IPropertyValue {

    /**
     * Constructs a new PropertyValue.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPropertyValue);

    /** PropertyValue name. */
    public name: string;

    /** PropertyValue dataType. */
    public dataType: PropertySchema.DataType;

    /** PropertyValue bytesValue. */
    public bytesValue: Uint8Array;

    /** PropertyValue booleanValue. */
    public booleanValue: boolean;

    /** PropertyValue numberValue. */
    public numberValue: (number|Long);

    /** PropertyValue stringValue. */
    public stringValue: string;

    /** PropertyValue enumValue. */
    public enumValue: string;

    /** PropertyValue structValues. */
    public structValues: IPropertyValue[];

    /** PropertyValue locationValue. */
    public locationValue?: (ILocation|null);

    /**
     * Creates a new PropertyValue instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PropertyValue instance
     */
    public static create(properties?: IPropertyValue): PropertyValue;

    /**
     * Encodes the specified PropertyValue message. Does not implicitly {@link PropertyValue.verify|verify} messages.
     * @param message PropertyValue message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPropertyValue, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PropertyValue message, length delimited. Does not implicitly {@link PropertyValue.verify|verify} messages.
     * @param message PropertyValue message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPropertyValue, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PropertyValue message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PropertyValue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PropertyValue;

    /**
     * Decodes a PropertyValue message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PropertyValue
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PropertyValue;

    /**
     * Verifies a PropertyValue message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PropertyValue message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PropertyValue
     */
    public static fromObject(object: { [k: string]: any }): PropertyValue;

    /**
     * Creates a plain object from a PropertyValue message. Also converts values to other types if specified.
     * @param message PropertyValue
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PropertyValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PropertyValue to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PropertyPage. */
export interface IPropertyPage {

    /** PropertyPage name */
    name?: (string|null);

    /** PropertyPage recordId */
    recordId?: (string|null);

    /** PropertyPage reportedValues */
    reportedValues?: (PropertyPage.IReportedValue[]|null);
}

/** Represents a PropertyPage. */
export class PropertyPage implements IPropertyPage {

    /**
     * Constructs a new PropertyPage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPropertyPage);

    /** PropertyPage name. */
    public name: string;

    /** PropertyPage recordId. */
    public recordId: string;

    /** PropertyPage reportedValues. */
    public reportedValues: PropertyPage.IReportedValue[];

    /**
     * Creates a new PropertyPage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PropertyPage instance
     */
    public static create(properties?: IPropertyPage): PropertyPage;

    /**
     * Encodes the specified PropertyPage message. Does not implicitly {@link PropertyPage.verify|verify} messages.
     * @param message PropertyPage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPropertyPage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PropertyPage message, length delimited. Does not implicitly {@link PropertyPage.verify|verify} messages.
     * @param message PropertyPage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPropertyPage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PropertyPage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PropertyPage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PropertyPage;

    /**
     * Decodes a PropertyPage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PropertyPage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PropertyPage;

    /**
     * Verifies a PropertyPage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PropertyPage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PropertyPage
     */
    public static fromObject(object: { [k: string]: any }): PropertyPage;

    /**
     * Creates a plain object from a PropertyPage message. Also converts values to other types if specified.
     * @param message PropertyPage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PropertyPage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PropertyPage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace PropertyPage {

    /** Properties of a ReportedValue. */
    interface IReportedValue {

        /** ReportedValue reporterIndex */
        reporterIndex?: (number|null);

        /** ReportedValue timestamp */
        timestamp?: (number|Long|null);

        /** ReportedValue bytesValue */
        bytesValue?: (Uint8Array|null);

        /** ReportedValue booleanValue */
        booleanValue?: (boolean|null);

        /** ReportedValue numberValue */
        numberValue?: (number|Long|null);

        /** ReportedValue stringValue */
        stringValue?: (string|null);

        /** ReportedValue enumValue */
        enumValue?: (number|null);

        /** ReportedValue structValues */
        structValues?: (IPropertyValue[]|null);

        /** ReportedValue locationValue */
        locationValue?: (ILocation|null);
    }

    /** Represents a ReportedValue. */
    class ReportedValue implements IReportedValue {

        /**
         * Constructs a new ReportedValue.
         * @param [properties] Properties to set
         */
        constructor(properties?: PropertyPage.IReportedValue);

        /** ReportedValue reporterIndex. */
        public reporterIndex: number;

        /** ReportedValue timestamp. */
        public timestamp: (number|Long);

        /** ReportedValue bytesValue. */
        public bytesValue: Uint8Array;

        /** ReportedValue booleanValue. */
        public booleanValue: boolean;

        /** ReportedValue numberValue. */
        public numberValue: (number|Long);

        /** ReportedValue stringValue. */
        public stringValue: string;

        /** ReportedValue enumValue. */
        public enumValue: number;

        /** ReportedValue structValues. */
        public structValues: IPropertyValue[];

        /** ReportedValue locationValue. */
        public locationValue?: (ILocation|null);

        /**
         * Creates a new ReportedValue instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReportedValue instance
         */
        public static create(properties?: PropertyPage.IReportedValue): PropertyPage.ReportedValue;

        /**
         * Encodes the specified ReportedValue message. Does not implicitly {@link PropertyPage.ReportedValue.verify|verify} messages.
         * @param message ReportedValue message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: PropertyPage.IReportedValue, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReportedValue message, length delimited. Does not implicitly {@link PropertyPage.ReportedValue.verify|verify} messages.
         * @param message ReportedValue message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: PropertyPage.IReportedValue, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReportedValue message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReportedValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PropertyPage.ReportedValue;

        /**
         * Decodes a ReportedValue message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReportedValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PropertyPage.ReportedValue;

        /**
         * Verifies a ReportedValue message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReportedValue message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReportedValue
         */
        public static fromObject(object: { [k: string]: any }): PropertyPage.ReportedValue;

        /**
         * Creates a plain object from a ReportedValue message. Also converts values to other types if specified.
         * @param message ReportedValue
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: PropertyPage.ReportedValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReportedValue to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Properties of a PropertyPageContainer. */
export interface IPropertyPageContainer {

    /** PropertyPageContainer entries */
    entries?: (IPropertyPage[]|null);
}

/** Represents a PropertyPageContainer. */
export class PropertyPageContainer implements IPropertyPageContainer {

    /**
     * Constructs a new PropertyPageContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IPropertyPageContainer);

    /** PropertyPageContainer entries. */
    public entries: IPropertyPage[];

    /**
     * Creates a new PropertyPageContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PropertyPageContainer instance
     */
    public static create(properties?: IPropertyPageContainer): PropertyPageContainer;

    /**
     * Encodes the specified PropertyPageContainer message. Does not implicitly {@link PropertyPageContainer.verify|verify} messages.
     * @param message PropertyPageContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IPropertyPageContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified PropertyPageContainer message, length delimited. Does not implicitly {@link PropertyPageContainer.verify|verify} messages.
     * @param message PropertyPageContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IPropertyPageContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PropertyPageContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PropertyPageContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): PropertyPageContainer;

    /**
     * Decodes a PropertyPageContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PropertyPageContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): PropertyPageContainer;

    /**
     * Verifies a PropertyPageContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a PropertyPageContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PropertyPageContainer
     */
    public static fromObject(object: { [k: string]: any }): PropertyPageContainer;

    /**
     * Creates a plain object from a PropertyPageContainer message. Also converts values to other types if specified.
     * @param message PropertyPageContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: PropertyPageContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PropertyPageContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Location. */
export interface ILocation {

    /** Location latitude */
    latitude?: (number|Long|null);

    /** Location longitude */
    longitude?: (number|Long|null);
}

/** Represents a Location. */
export class Location implements ILocation {

    /**
     * Constructs a new Location.
     * @param [properties] Properties to set
     */
    constructor(properties?: ILocation);

    /** Location latitude. */
    public latitude: (number|Long);

    /** Location longitude. */
    public longitude: (number|Long);

    /**
     * Creates a new Location instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Location instance
     */
    public static create(properties?: ILocation): Location;

    /**
     * Encodes the specified Location message. Does not implicitly {@link Location.verify|verify} messages.
     * @param message Location message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Location message, length delimited. Does not implicitly {@link Location.verify|verify} messages.
     * @param message Location message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Location message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Location
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Location;

    /**
     * Decodes a Location message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Location
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Location;

    /**
     * Verifies a Location message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Location message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Location
     */
    public static fromObject(object: { [k: string]: any }): Location;

    /**
     * Creates a plain object from a Location message. Also converts values to other types if specified.
     * @param message Location
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Location to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Record. */
export interface IRecord {

    /** Record recordId */
    recordId?: (string|null);

    /** Record recordType */
    recordType?: (string|null);

    /** Record owners */
    owners?: (Record.IAssociatedAccount[]|null);

    /** Record custodians */
    custodians?: (Record.IAssociatedAccount[]|null);

    /** Record final */
    final?: (boolean|null);
}

/** Represents a Record. */
export class Record implements IRecord {

    /**
     * Constructs a new Record.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRecord);

    /** Record recordId. */
    public recordId: string;

    /** Record recordType. */
    public recordType: string;

    /** Record owners. */
    public owners: Record.IAssociatedAccount[];

    /** Record custodians. */
    public custodians: Record.IAssociatedAccount[];

    /** Record final. */
    public final: boolean;

    /**
     * Creates a new Record instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Record instance
     */
    public static create(properties?: IRecord): Record;

    /**
     * Encodes the specified Record message. Does not implicitly {@link Record.verify|verify} messages.
     * @param message Record message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRecord, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Record message, length delimited. Does not implicitly {@link Record.verify|verify} messages.
     * @param message Record message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRecord, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Record message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Record
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Record;

    /**
     * Decodes a Record message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Record
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Record;

    /**
     * Verifies a Record message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Record message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Record
     */
    public static fromObject(object: { [k: string]: any }): Record;

    /**
     * Creates a plain object from a Record message. Also converts values to other types if specified.
     * @param message Record
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Record, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Record to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Record {

    /** Properties of an AssociatedAccount. */
    interface IAssociatedAccount {

        /** AssociatedAccount accountId */
        accountId?: (string|null);

        /** AssociatedAccount timestamp */
        timestamp?: (number|Long|null);
    }

    /** Represents an AssociatedAccount. */
    class AssociatedAccount implements IAssociatedAccount {

        /**
         * Constructs a new AssociatedAccount.
         * @param [properties] Properties to set
         */
        constructor(properties?: Record.IAssociatedAccount);

        /** AssociatedAccount accountId. */
        public accountId: string;

        /** AssociatedAccount timestamp. */
        public timestamp: (number|Long);

        /**
         * Creates a new AssociatedAccount instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AssociatedAccount instance
         */
        public static create(properties?: Record.IAssociatedAccount): Record.AssociatedAccount;

        /**
         * Encodes the specified AssociatedAccount message. Does not implicitly {@link Record.AssociatedAccount.verify|verify} messages.
         * @param message AssociatedAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Record.IAssociatedAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AssociatedAccount message, length delimited. Does not implicitly {@link Record.AssociatedAccount.verify|verify} messages.
         * @param message AssociatedAccount message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Record.IAssociatedAccount, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AssociatedAccount message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AssociatedAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Record.AssociatedAccount;

        /**
         * Decodes an AssociatedAccount message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AssociatedAccount
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Record.AssociatedAccount;

        /**
         * Verifies an AssociatedAccount message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AssociatedAccount message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AssociatedAccount
         */
        public static fromObject(object: { [k: string]: any }): Record.AssociatedAccount;

        /**
         * Creates a plain object from an AssociatedAccount message. Also converts values to other types if specified.
         * @param message AssociatedAccount
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Record.AssociatedAccount, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AssociatedAccount to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Properties of a RecordContainer. */
export interface IRecordContainer {

    /** RecordContainer entries */
    entries?: (IRecord[]|null);
}

/** Represents a RecordContainer. */
export class RecordContainer implements IRecordContainer {

    /**
     * Constructs a new RecordContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRecordContainer);

    /** RecordContainer entries. */
    public entries: IRecord[];

    /**
     * Creates a new RecordContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RecordContainer instance
     */
    public static create(properties?: IRecordContainer): RecordContainer;

    /**
     * Encodes the specified RecordContainer message. Does not implicitly {@link RecordContainer.verify|verify} messages.
     * @param message RecordContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRecordContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RecordContainer message, length delimited. Does not implicitly {@link RecordContainer.verify|verify} messages.
     * @param message RecordContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRecordContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RecordContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RecordContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RecordContainer;

    /**
     * Decodes a RecordContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RecordContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RecordContainer;

    /**
     * Verifies a RecordContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RecordContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RecordContainer
     */
    public static fromObject(object: { [k: string]: any }): RecordContainer;

    /**
     * Creates a plain object from a RecordContainer message. Also converts values to other types if specified.
     * @param message RecordContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RecordContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RecordContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a RecordType. */
export interface IRecordType {

    /** RecordType name */
    name?: (string|null);

    /** RecordType properties */
    properties?: (IPropertySchema[]|null);
}

/** Represents a RecordType. */
export class RecordType implements IRecordType {

    /**
     * Constructs a new RecordType.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRecordType);

    /** RecordType name. */
    public name: string;

    /** RecordType properties. */
    public properties: IPropertySchema[];

    /**
     * Creates a new RecordType instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RecordType instance
     */
    public static create(properties?: IRecordType): RecordType;

    /**
     * Encodes the specified RecordType message. Does not implicitly {@link RecordType.verify|verify} messages.
     * @param message RecordType message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRecordType, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RecordType message, length delimited. Does not implicitly {@link RecordType.verify|verify} messages.
     * @param message RecordType message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRecordType, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RecordType message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RecordType
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RecordType;

    /**
     * Decodes a RecordType message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RecordType
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RecordType;

    /**
     * Verifies a RecordType message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RecordType message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RecordType
     */
    public static fromObject(object: { [k: string]: any }): RecordType;

    /**
     * Creates a plain object from a RecordType message. Also converts values to other types if specified.
     * @param message RecordType
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RecordType, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RecordType to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a RecordTypeContainer. */
export interface IRecordTypeContainer {

    /** RecordTypeContainer entries */
    entries?: (IRecordType[]|null);
}

/** Represents a RecordTypeContainer. */
export class RecordTypeContainer implements IRecordTypeContainer {

    /**
     * Constructs a new RecordTypeContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IRecordTypeContainer);

    /** RecordTypeContainer entries. */
    public entries: IRecordType[];

    /**
     * Creates a new RecordTypeContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RecordTypeContainer instance
     */
    public static create(properties?: IRecordTypeContainer): RecordTypeContainer;

    /**
     * Encodes the specified RecordTypeContainer message. Does not implicitly {@link RecordTypeContainer.verify|verify} messages.
     * @param message RecordTypeContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IRecordTypeContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified RecordTypeContainer message, length delimited. Does not implicitly {@link RecordTypeContainer.verify|verify} messages.
     * @param message RecordTypeContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IRecordTypeContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a RecordTypeContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RecordTypeContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): RecordTypeContainer;

    /**
     * Decodes a RecordTypeContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RecordTypeContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): RecordTypeContainer;

    /**
     * Verifies a RecordTypeContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a RecordTypeContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RecordTypeContainer
     */
    public static fromObject(object: { [k: string]: any }): RecordTypeContainer;

    /**
     * Creates a plain object from a RecordTypeContainer message. Also converts values to other types if specified.
     * @param message RecordTypeContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: RecordTypeContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this RecordTypeContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a Proposal. */
export interface IProposal {

    /** Proposal recordId */
    recordId?: (string|null);

    /** Proposal timestamp */
    timestamp?: (number|Long|null);

    /** Proposal issuingAgent */
    issuingAgent?: (string|null);

    /** Proposal receivingAgent */
    receivingAgent?: (string|null);

    /** Proposal role */
    role?: (Proposal.Role|null);

    /** Proposal properties */
    properties?: (string[]|null);

    /** Proposal status */
    status?: (Proposal.Status|null);

    /** Proposal terms */
    terms?: (string|null);
}

/** Represents a Proposal. */
export class Proposal implements IProposal {

    /**
     * Constructs a new Proposal.
     * @param [properties] Properties to set
     */
    constructor(properties?: IProposal);

    /** Proposal recordId. */
    public recordId: string;

    /** Proposal timestamp. */
    public timestamp: (number|Long);

    /** Proposal issuingAgent. */
    public issuingAgent: string;

    /** Proposal receivingAgent. */
    public receivingAgent: string;

    /** Proposal role. */
    public role: Proposal.Role;

    /** Proposal properties. */
    public properties: string[];

    /** Proposal status. */
    public status: Proposal.Status;

    /** Proposal terms. */
    public terms: string;

    /**
     * Creates a new Proposal instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Proposal instance
     */
    public static create(properties?: IProposal): Proposal;

    /**
     * Encodes the specified Proposal message. Does not implicitly {@link Proposal.verify|verify} messages.
     * @param message Proposal message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IProposal, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Proposal message, length delimited. Does not implicitly {@link Proposal.verify|verify} messages.
     * @param message Proposal message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IProposal, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Proposal message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Proposal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Proposal;

    /**
     * Decodes a Proposal message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Proposal
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Proposal;

    /**
     * Verifies a Proposal message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Proposal message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Proposal
     */
    public static fromObject(object: { [k: string]: any }): Proposal;

    /**
     * Creates a plain object from a Proposal message. Also converts values to other types if specified.
     * @param message Proposal
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Proposal, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Proposal to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Proposal {

    /** Role enum. */
    enum Role {
        OWNER = 0,
        CUSTODIAN = 1,
        REPORTER = 2
    }

    /** Status enum. */
    enum Status {
        OPEN = 0,
        ACCEPTED = 1,
        REJECTED = 2,
        CANCELED = 3
    }
}

/** Properties of a ProposalContainer. */
export interface IProposalContainer {

    /** ProposalContainer entries */
    entries?: (IProposal[]|null);
}

/** Represents a ProposalContainer. */
export class ProposalContainer implements IProposalContainer {

    /**
     * Constructs a new ProposalContainer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IProposalContainer);

    /** ProposalContainer entries. */
    public entries: IProposal[];

    /**
     * Creates a new ProposalContainer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ProposalContainer instance
     */
    public static create(properties?: IProposalContainer): ProposalContainer;

    /**
     * Encodes the specified ProposalContainer message. Does not implicitly {@link ProposalContainer.verify|verify} messages.
     * @param message ProposalContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IProposalContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ProposalContainer message, length delimited. Does not implicitly {@link ProposalContainer.verify|verify} messages.
     * @param message ProposalContainer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IProposalContainer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ProposalContainer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ProposalContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ProposalContainer;

    /**
     * Decodes a ProposalContainer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ProposalContainer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ProposalContainer;

    /**
     * Verifies a ProposalContainer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ProposalContainer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ProposalContainer
     */
    public static fromObject(object: { [k: string]: any }): ProposalContainer;

    /**
     * Creates a plain object from a ProposalContainer message. Also converts values to other types if specified.
     * @param message ProposalContainer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ProposalContainer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ProposalContainer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
