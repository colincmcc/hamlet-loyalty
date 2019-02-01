import composeWithJson from 'graphql-compose-json'


const restApiResponse = {
  Id: "48",
  MenuItemProductDetail: {
    KegSize: 1984,
    KegType: "brunch",
    OuncesConsumed: 2225.5,
    PosReportedPercentFull: -0.12172379032258064,
    EstimatedOzLeft: -241.5,
    AvailableInBottles: false,
    BeverageType: "Beer",
    Beverage: {
      BeverageName: "IPA",
      Brewery: {
        BreweryName: "Hop Farm",
        FullBreweryName: "Hop Farm",
        BreweryUrl: "null",
        Certifications: "null",
        ProducerName: "Hop Farm",
        SimplifiedProducerName: "hop farm",
        CultureAwareBreweryName: "Hop Farm",
        CultureAwareLocation: "Pittsburgh, PA",
        Id: "546d5a57b3b6f60264e24293",
        FullProducerName: "null",
        Location: "Pittsburgh, PA",
        ProducersUrl: "null",
        LogoImageUrl: "https://s3.amazonaws.com/digitalpourproducerlogos/546d5a57b3b6f60264e24293.png",
        TwitterName: "@HopFarmBeer"
      },
      Cidery: {
        CideryName: "Hop Farm",
        FullBreweryName: "Hop Farm",
        CideryUrl: "null",
        Certifications: "null",
        ProducerName: "Hop Farm",
        SimplifiedProducerName: "hop farm",
        CultureAwareBreweryName: "Hop Farm",
        CultureAwareLocation: "Pittsburgh, PA",
        Id: "546d5a57b3b6f60264e24293",
        FullProducerName: "null",
        Location: "Pittsburgh, PA",
        ProducersUrl: "null",
        LogoImageUrl: "https://s3.amazonaws.com/digitalpourproducerlogos/546d5a57b3b6f60264e24293.png",
        TwitterName: "@HopFarmBeer"
      },
      Meadery: {
        MeaderyName: "Hop Farm",
        FullBreweryName: "Hop Farm",
        MeaderyUrl: "null",
        Certifications: "null",
        ProducerName: "Hop Farm",
        SimplifiedProducerName: "hop farm",
        CultureAwareBreweryName: "Hop Farm",
        CultureAwareLocation: "Pittsburgh, PA",
        Id: "546d5a57b3b6f60264e24293",
        FullProducerName: "null",
        Location: "Pittsburgh, PA",
        ProducersUrl: "null",
        LogoImageUrl: "https://s3.amazonaws.com/digitalpourproducerlogos/546d5a57b3b6f60264e24293.png",
        TwitterName: "@HopFarmBeer"
      },
      CoffeeProducer: {
        CoffeeProducerName: "Hop Farm",
        CoffeeProducerUrl: "null",
        Certifications: "null",
        ProducerName: "Hop Farm",
        SimplifiedProducerName: "hop farm",
        CultureAwareLocation: "Pittsburgh, PA",
        Id: "546d5a57b3b6f60264e24293",
        FullProducerName: "null",
        Location: "Pittsburgh, PA",
        ProducersUrl: "null",
        LogoImageUrl: "https://s3.amazonaws.com/digitalpourproducerlogos/546d5a57b3b6f60264e24293.png",
        TwitterName: "@HopFarmBeer"
      },
      BeerName: "IPA",
      BeerStyle: {
        Id: "4ff4ce739294c31fec22a35e",
        StyleName: "IPA",
        Color: 15583010
      },
      StyleVariationPrefix: "Ipa",
      StyleVariation: "Nitro",
      BarrelAging: "Rum",
      HopsUsed: "Columbus, Cascade, and El Dorado",
      Abv: 6.5,
      Ibu: 97,
      OriginalGravity: 80.5,
      FinalGravity: 80.5,
      pH: 6.5,
      HasAward: false,
      RateBeerUrl: "https://s3.amazonaws.com/digitalpourproducerlogos/546d5a57b3b6f60264e24293.png",
      BeerAdvocateUrl: "https://s3.amazonaws.com/digitalpourproducerlogos/546d5a57b3b6f60264e24293.png",
      UntappdUrl: "https://s3.amazonaws.com/digitalpourproducerlogos/546d5a57b3b6f60264e24293.png",
      CultureAwareBeerName: "NITRO Velvet Yeti",
      ResolvedLogoImageUrl: "https://s3.amazonaws.com/digitalpourproducerlogos/501233829294c3198c3fd2e2.png",
      FullStyleName: "Stout ",
      ExpandedStyleName: "Stout ",
      StyleColor: 3283202,
      Id: "58b72de55e002c088cf1760a",
    },
    Year: 2018,
    Attributes: [
      "Creamy"
    ],
    HasVintage: false,
    Prices: [
      {
          Id: "S",
          Size: 1.5,
          Price: 0,
          DisplayName: "1.5oz",
          DisplaySize: 1.5,
          PosModifier: "SMP-",
          Glassware: "Taster",
          DisplayOnMenu: false
      },
    ],
    EventPrices: [
      {
        Id: "S",
        Size: 1.5,
        Price: 0,
        DisplayName: "1.5oz",
        DisplaySize: 1.5,
        PosModifier: "SMP-",
        Glassware: "Taster",
        DisplayOnMenu: false
      },
    ],
    EventPricesActive: false,
    EventId: "Taster",
    EventName: "Taster",
    BeverageNameWithVintage: "NITRO Velvet Yeti",
  },
  Active: true,
}

export const TapListTC = composeWithJson('TapList', restApiResponse)


export const TapListGraphQLType = TapListTC.getType()
