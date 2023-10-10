export interface AirportInfo {
  meta: {
    count: number;
    links: {
      self: string;
    };
  };
  type: string;
  subType: string;
  name: string;
  detailedName: string;
  id: string;
  self: {
    href: string;
    methods: string[];
  };
  timeZoneOffset: string;
  iataCode: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
    stateCode: string;
    regionCode: string;
  };
  analytics: {
    travelers: {
      score: number;
    };
  };
}
