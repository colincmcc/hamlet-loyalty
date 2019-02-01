/*undefined*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    var $util = $protobuf.util;
    
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.Account = (function() {
    
        function Account(p) {
            this.holdings = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        Account.prototype.publicKey = "";
        Account.prototype.label = "";
        Account.prototype.description = "";
        Account.prototype.holdings = $util.emptyArray;
    
        return Account;
    })();
    
    $root.AccountContainer = (function() {
    
        function AccountContainer(p) {
            this.entries = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        AccountContainer.prototype.entries = $util.emptyArray;
    
        return AccountContainer;
    })();
    
    $root.Asset = (function() {
    
        function Asset(p) {
            this.owners = [];
            this.rules = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        Asset.prototype.name = "";
        Asset.prototype.description = "";
        Asset.prototype.owners = $util.emptyArray;
        Asset.prototype.rules = $util.emptyArray;
    
        return Asset;
    })();
    
    $root.AssetContainer = (function() {
    
        function AssetContainer(p) {
            this.entries = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        AssetContainer.prototype.entries = $util.emptyArray;
    
        return AssetContainer;
    })();
    
    $root.Rule = (function() {
    
        function Rule(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        Rule.prototype.type = 0;
        Rule.prototype.value = $util.newBuffer([]);
    
        Rule.RuleType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "RULE_UNSET"] = 0;
            values[valuesById[100] = "OWNER_HOLDINGS_INFINITE"] = 100;
            values[valuesById[101] = "ALL_HOLDINGS_INFINITE"] = 101;
            values[valuesById[102] = "NOT_TRANSFERABLE"] = 102;
            values[valuesById[103] = "REQUIRE_SOURCE_TYPES"] = 103;
            values[valuesById[104] = "REQUIRE_TARGET_TYPES"] = 104;
            values[valuesById[105] = "REQUIRE_SOURCE_QUANTITIES"] = 105;
            values[valuesById[106] = "REQUIRE_TARGET_QUANTITIES"] = 106;
            values[valuesById[200] = "EXCHANGE_ONCE"] = 200;
            values[valuesById[201] = "EXCHANGE_ONCE_PER_ACCOUNT"] = 201;
            values[valuesById[202] = "EXCHANGE_LIMITED_TO_ACCOUNTS"] = 202;
            return values;
        })();
    
        return Rule;
    })();
    
    $root.Holding = (function() {
    
        function Holding(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        Holding.prototype.id = "";
        Holding.prototype.label = "";
        Holding.prototype.description = "";
        Holding.prototype.account = "";
        Holding.prototype.asset = "";
        Holding.prototype.quantity = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        return Holding;
    })();
    
    $root.HoldingContainer = (function() {
    
        function HoldingContainer(p) {
            this.entries = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        HoldingContainer.prototype.entries = $util.emptyArray;
    
        return HoldingContainer;
    })();
    
    $root.Offer = (function() {
    
        function Offer(p) {
            this.owners = [];
            this.rules = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        Offer.prototype.id = "";
        Offer.prototype.label = "";
        Offer.prototype.description = "";
        Offer.prototype.owners = $util.emptyArray;
        Offer.prototype.source = "";
        Offer.prototype.sourceQuantity = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        Offer.prototype.target = "";
        Offer.prototype.targetQuantity = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        Offer.prototype.rules = $util.emptyArray;
        Offer.prototype.status = 0;
        Offer.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        Offer.prototype.role = 0;
    
        Offer.Role = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "OWNER"] = 0;
            values[valuesById[1] = "CUSTODIAN"] = 1;
            values[valuesById[2] = "REPORTER"] = 2;
            return values;
        })();
    
        Offer.Status = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "OPEN"] = 0;
            values[valuesById[1] = "ACCEPTED"] = 1;
            values[valuesById[2] = "REJECTED"] = 2;
            values[valuesById[3] = "CANCELED"] = 3;
            return values;
        })();
    
        return Offer;
    })();
    
    $root.OfferContainer = (function() {
    
        function OfferContainer(p) {
            this.entries = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        OfferContainer.prototype.entries = $util.emptyArray;
    
        return OfferContainer;
    })();
    
    $root.OfferHistory = (function() {
    
        function OfferHistory(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        OfferHistory.prototype.offerId = "";
        OfferHistory.prototype.accountId = "";
    
        return OfferHistory;
    })();
    
    $root.OfferHistoryContainer = (function() {
    
        function OfferHistoryContainer(p) {
            this.entries = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        OfferHistoryContainer.prototype.entries = $util.emptyArray;
    
        return OfferHistoryContainer;
    })();
    
    $root.TransactionPayload = (function() {
    
        function TransactionPayload(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        TransactionPayload.prototype.payloadType = 0;
        TransactionPayload.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        TransactionPayload.prototype.createAccount = null;
        TransactionPayload.prototype.createAsset = null;
        TransactionPayload.prototype.createHolding = null;
        TransactionPayload.prototype.createOffer = null;
        TransactionPayload.prototype.acceptOffer = null;
        TransactionPayload.prototype.closeOffer = null;
        TransactionPayload.prototype.createRecord = null;
        TransactionPayload.prototype.finalizeRecord = null;
        TransactionPayload.prototype.createRecordType = null;
        TransactionPayload.prototype.updateProperties = null;
        TransactionPayload.prototype.createProposal = null;
        TransactionPayload.prototype.answerProposal = null;
        TransactionPayload.prototype.revokeReporter = null;
    
        TransactionPayload.PayloadType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "TYPE_UNSET"] = 0;
            values[valuesById[2] = "CREATE_ACCOUNT"] = 2;
            values[valuesById[3] = "CREATE_ASSET"] = 3;
            values[valuesById[4] = "CREATE_HOLDING"] = 4;
            values[valuesById[5] = "CREATE_OFFER"] = 5;
            values[valuesById[10] = "ACCEPT_OFFER"] = 10;
            values[valuesById[11] = "CLOSE_OFFER"] = 11;
            values[valuesById[21] = "CREATE_RECORD"] = 21;
            values[valuesById[22] = "FINALIZE_RECORD"] = 22;
            values[valuesById[23] = "CREATE_RECORD_TYPE"] = 23;
            values[valuesById[24] = "UPDATE_PROPERTIES"] = 24;
            values[valuesById[25] = "CREATE_PROPOSAL"] = 25;
            values[valuesById[26] = "ANSWER_PROPOSAL"] = 26;
            values[valuesById[27] = "REVOKE_REPORTER"] = 27;
            return values;
        })();
    
        return TransactionPayload;
    })();
    
    $root.CreateAccount = (function() {
    
        function CreateAccount(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        CreateAccount.prototype.label = "";
        CreateAccount.prototype.description = "";
    
        return CreateAccount;
    })();
    
    $root.CreateAsset = (function() {
    
        function CreateAsset(p) {
            this.rules = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        CreateAsset.prototype.name = "";
        CreateAsset.prototype.description = "";
        CreateAsset.prototype.rules = $util.emptyArray;
    
        return CreateAsset;
    })();
    
    $root.CreateHolding = (function() {
    
        function CreateHolding(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        CreateHolding.prototype.id = "";
        CreateHolding.prototype.label = "";
        CreateHolding.prototype.description = "";
        CreateHolding.prototype.asset = "";
        CreateHolding.prototype.quantity = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        return CreateHolding;
    })();
    
    $root.CreateOffer = (function() {
    
        function CreateOffer(p) {
            this.rules = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        CreateOffer.prototype.id = "";
        CreateOffer.prototype.label = "";
        CreateOffer.prototype.description = "";
        CreateOffer.prototype.source = "";
        CreateOffer.prototype.sourceQuantity = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        CreateOffer.prototype.target = "";
        CreateOffer.prototype.targetQuantity = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        CreateOffer.prototype.rules = $util.emptyArray;
    
        return CreateOffer;
    })();
    
    $root.AcceptOffer = (function() {
    
        function AcceptOffer(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        AcceptOffer.prototype.id = "";
        AcceptOffer.prototype.source = "";
        AcceptOffer.prototype.target = "";
        AcceptOffer.prototype.count = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
        return AcceptOffer;
    })();
    
    $root.CloseOffer = (function() {
    
        function CloseOffer(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        CloseOffer.prototype.id = "";
    
        return CloseOffer;
    })();
    
    $root.CreateRecord = (function() {
    
        function CreateRecord(p) {
            this.properties = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        CreateRecord.prototype.recordId = "";
        CreateRecord.prototype.recordType = "";
        CreateRecord.prototype.properties = $util.emptyArray;
    
        return CreateRecord;
    })();
    
    $root.FinalizeRecord = (function() {
    
        function FinalizeRecord(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        FinalizeRecord.prototype.recordId = "";
    
        return FinalizeRecord;
    })();
    
    $root.CreateRecordType = (function() {
    
        function CreateRecordType(p) {
            this.properties = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        CreateRecordType.prototype.name = "";
        CreateRecordType.prototype.properties = $util.emptyArray;
    
        return CreateRecordType;
    })();
    
    $root.UpdateProperties = (function() {
    
        function UpdateProperties(p) {
            this.properties = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        UpdateProperties.prototype.recordId = "";
        UpdateProperties.prototype.properties = $util.emptyArray;
    
        return UpdateProperties;
    })();
    
    $root.CreateProposal = (function() {
    
        function CreateProposal(p) {
            this.properties = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        CreateProposal.prototype.recordId = "";
        CreateProposal.prototype.receivingAgent = "";
        CreateProposal.prototype.role = 0;
        CreateProposal.prototype.properties = $util.emptyArray;
    
        return CreateProposal;
    })();
    
    $root.AnswerProposal = (function() {
    
        function AnswerProposal(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        AnswerProposal.prototype.recordId = "";
        AnswerProposal.prototype.receivingAgent = "";
        AnswerProposal.prototype.role = 0;
        AnswerProposal.prototype.response = 0;
    
        AnswerProposal.Response = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "ACCEPT"] = 0;
            values[valuesById[1] = "REJECT"] = 1;
            values[valuesById[2] = "CANCEL"] = 2;
            return values;
        })();
    
        return AnswerProposal;
    })();
    
    $root.RevokeReporter = (function() {
    
        function RevokeReporter(p) {
            this.properties = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        RevokeReporter.prototype.recordId = "";
        RevokeReporter.prototype.reporterId = "";
        RevokeReporter.prototype.properties = $util.emptyArray;
    
        return RevokeReporter;
    })();
    
    $root.Property = (function() {
    
        function Property(p) {
            this.reporters = [];
            this.enumOptions = [];
            this.structProperties = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        Property.prototype.name = "";
        Property.prototype.recordId = "";
        Property.prototype.dataType = 0;
        Property.prototype.reporters = $util.emptyArray;
        Property.prototype.currentPage = 0;
        Property.prototype.wrapped = false;
        Property.prototype.fixed = false;
        Property.prototype.numberExponent = 0;
        Property.prototype.enumOptions = $util.emptyArray;
        Property.prototype.structProperties = $util.emptyArray;
        Property.prototype.unit = "";
    
        Property.Reporter = (function() {
    
            function Reporter(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }
    
            Reporter.prototype.publicKey = "";
            Reporter.prototype.authorized = false;
            Reporter.prototype.index = 0;
    
            return Reporter;
        })();
    
        return Property;
    })();
    
    $root.PropertyContainer = (function() {
    
        function PropertyContainer(p) {
            this.entries = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        PropertyContainer.prototype.entries = $util.emptyArray;
    
        return PropertyContainer;
    })();
    
    $root.PropertySchema = (function() {
    
        function PropertySchema(p) {
            this.enumOptions = [];
            this.structProperties = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        PropertySchema.prototype.name = "";
        PropertySchema.prototype.dataType = 0;
        PropertySchema.prototype.required = false;
        PropertySchema.prototype.fixed = false;
        PropertySchema.prototype.delayed = false;
        PropertySchema.prototype.numberExponent = 0;
        PropertySchema.prototype.enumOptions = $util.emptyArray;
        PropertySchema.prototype.structProperties = $util.emptyArray;
        PropertySchema.prototype.unit = "";
    
        PropertySchema.DataType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "TYPE_UNSET"] = 0;
            values[valuesById[1] = "BYTES"] = 1;
            values[valuesById[2] = "BOOLEAN"] = 2;
            values[valuesById[3] = "NUMBER"] = 3;
            values[valuesById[4] = "STRING"] = 4;
            values[valuesById[5] = "ENUM"] = 5;
            values[valuesById[6] = "STRUCT"] = 6;
            values[valuesById[7] = "LOCATION"] = 7;
            return values;
        })();
    
        return PropertySchema;
    })();
    
    $root.PropertyValue = (function() {
    
        function PropertyValue(p) {
            this.structValues = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        PropertyValue.prototype.name = "";
        PropertyValue.prototype.dataType = 0;
        PropertyValue.prototype.bytesValue = $util.newBuffer([]);
        PropertyValue.prototype.booleanValue = false;
        PropertyValue.prototype.numberValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        PropertyValue.prototype.stringValue = "";
        PropertyValue.prototype.enumValue = "";
        PropertyValue.prototype.structValues = $util.emptyArray;
        PropertyValue.prototype.locationValue = null;
    
        return PropertyValue;
    })();
    
    $root.PropertyPage = (function() {
    
        function PropertyPage(p) {
            this.reportedValues = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        PropertyPage.prototype.name = "";
        PropertyPage.prototype.recordId = "";
        PropertyPage.prototype.reportedValues = $util.emptyArray;
    
        PropertyPage.ReportedValue = (function() {
    
            function ReportedValue(p) {
                this.structValues = [];
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }
    
            ReportedValue.prototype.reporterIndex = 0;
            ReportedValue.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
            ReportedValue.prototype.bytesValue = $util.newBuffer([]);
            ReportedValue.prototype.booleanValue = false;
            ReportedValue.prototype.numberValue = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
            ReportedValue.prototype.stringValue = "";
            ReportedValue.prototype.enumValue = 0;
            ReportedValue.prototype.structValues = $util.emptyArray;
            ReportedValue.prototype.locationValue = null;
    
            return ReportedValue;
        })();
    
        return PropertyPage;
    })();
    
    $root.PropertyPageContainer = (function() {
    
        function PropertyPageContainer(p) {
            this.entries = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        PropertyPageContainer.prototype.entries = $util.emptyArray;
    
        return PropertyPageContainer;
    })();
    
    $root.Location = (function() {
    
        function Location(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        Location.prototype.latitude = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
        Location.prototype.longitude = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        return Location;
    })();
    
    $root.Proposal = (function() {
    
        function Proposal(p) {
            this.properties = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        Proposal.prototype.recordId = "";
        Proposal.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
        Proposal.prototype.issuingAgent = "";
        Proposal.prototype.receivingAgent = "";
        Proposal.prototype.role = 0;
        Proposal.prototype.properties = $util.emptyArray;
        Proposal.prototype.status = 0;
        Proposal.prototype.terms = "";
    
        Proposal.Role = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "OWNER"] = 0;
            values[valuesById[1] = "CUSTODIAN"] = 1;
            values[valuesById[2] = "REPORTER"] = 2;
            return values;
        })();
    
        Proposal.Status = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "OPEN"] = 0;
            values[valuesById[1] = "ACCEPTED"] = 1;
            values[valuesById[2] = "REJECTED"] = 2;
            values[valuesById[3] = "CANCELED"] = 3;
            return values;
        })();
    
        return Proposal;
    })();
    
    $root.ProposalContainer = (function() {
    
        function ProposalContainer(p) {
            this.entries = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        ProposalContainer.prototype.entries = $util.emptyArray;
    
        return ProposalContainer;
    })();
    
    $root.Record = (function() {
    
        function Record(p) {
            this.owners = [];
            this.custodians = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        Record.prototype.recordId = "";
        Record.prototype.recordType = "";
        Record.prototype.owners = $util.emptyArray;
        Record.prototype.custodians = $util.emptyArray;
        Record.prototype.final = false;
    
        Record.AssociatedAccount = (function() {
    
            function AssociatedAccount(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }
    
            AssociatedAccount.prototype.accountId = "";
            AssociatedAccount.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            return AssociatedAccount;
        })();
    
        return Record;
    })();
    
    $root.RecordContainer = (function() {
    
        function RecordContainer(p) {
            this.entries = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        RecordContainer.prototype.entries = $util.emptyArray;
    
        return RecordContainer;
    })();
    
    $root.RecordType = (function() {
    
        function RecordType(p) {
            this.properties = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        RecordType.prototype.name = "";
        RecordType.prototype.properties = $util.emptyArray;
    
        return RecordType;
    })();
    
    $root.RecordTypeContainer = (function() {
    
        function RecordTypeContainer(p) {
            this.entries = [];
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        RecordTypeContainer.prototype.entries = $util.emptyArray;
    
        return RecordTypeContainer;
    })();

    return $root;
});
