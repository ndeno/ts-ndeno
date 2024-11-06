export const getHomePageFeatureFlags = <
  T extends {
    rawConfig: {
      featureFlags: {
        homePage: { [x: string]: boolean };
      };
    };
  }
>(
  config: T,
  override: (
    flags: T['rawConfig']['featureFlags']['homePage']
  ) => T['rawConfig']['featureFlags']['homePage']
) => {
  return override(config.rawConfig.featureFlags.homePage);
};

// an example of using the generic at a different slot within the arguement
// MAKE THE GENERIC ARGUEMENT REPRESENT THE MOST LOW LEVEL THING
export const getHomePageFeatureFlagsButElegant = <HomePageFlags>(
  config: {
    rawConfig: {
      featureFlags: {
        homePage: HomePageFlags;
      };
    };
  },
  override: (flags: HomePageFlags) => HomePageFlags
) => {
  return override(config.rawConfig.featureFlags.homePage);
};

const EXAMPLE = {
  foo: 1,
  rawConfig: {
    featureFlags: {
      homePage: {
        bar: 1,
        baz: 2,
      },
    },
  },
};

const modifiedExample = getHomePageFeatureFlagsButElegant(EXAMPLE, (flags) => ({
  ...flags,
  more: 4,
}));

const getObjectKeys = <T extends string>(obj: Record<T, unknown>) =>
  Object.keys(obj) as Array<T>;

const keys = getObjectKeys({ foo: 2, bar: 3 });
