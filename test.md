```
{
  haste: { defaultPlatform: 'ios', platforms: [ 'ios', 'native' ] },
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf|otf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$': 'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo\\src\\preset\\assetFileTransformer.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'  
  ],
  setupFiles: [
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\react-native\\jest\\setup.js',      
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo\\src\\preset\\setup.js'   
  ],
  testEnvironment: 'enzyme',
  displayName: { name: 'iOS', color: 'white' },
  testMatch: [
    '**/__tests__/**/*spec.[jt]s?(x)',
    '**/__tests__/**/*test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '**/__tests__/**/*spec.ios.[jt]s?(x)',
    '**/__tests__/**/*test.ios.[jt]s?(x)',
    '**/?(*.)+(spec|test).ios.[jt]s?(x)',
    '**/__tests__/**/*spec.native.[jt]s?(x)',
    '**/__tests__/**/*test.native.[jt]s?(x)',
    '**/?(*.)+(spec|test).native.[jt]s?(x)'
  ],
  moduleFileExtensions: [
    'ios.expo.ts',    'ios.expo.tsx',
    'ios.expo.js',    'ios.expo.jsx',
    'native.expo.ts', 'native.expo.tsx',
    'native.expo.js', 'native.expo.jsx',
    'expo.ts',        'expo.tsx',
    'expo.js',        'expo.jsx',
    'ios.ts',         'ios.tsx',
    'ios.js',         'ios.jsx',
    'native.ts',      'native.tsx',
    'native.js',      'native.jsx',
    'ts',             'tsx',
    'js',             'jsx',
    'json'
  ],
  snapshotResolver: 'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo\\src\\snapshot\\resolver.ios.js',
  watchPlugins: [
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-watch-typeahead\\filename.js', 
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-watch-typeahead\\testname.js'  
  ],
  snapshotSerializers: [
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo-enzyme\\node_modules\\enzyme-to-json\\serializer.js'
  ],
  testEnvironmentOptions: { enzymeAdapter: 'react16' },
  setupFilesAfterEnv: [
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo-enzyme\\build\\setupEnzyme.native.js'
  ]
}
{
  haste: { defaultPlatform: 'android', platforms: [ 'android', 'native' ] },
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf|otf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$': 'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo\\src\\preset\\assetFileTransformer.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'  
  ],
  setupFiles: [
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\react-native\\jest\\setup.js',      
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo\\src\\preset\\setup.js'   
  ],
  testEnvironment: 'enzyme',
  displayName: { name: 'Android', color: 'blueBright' },
  testMatch: [
    '**/__tests__/**/*spec.[jt]s?(x)',
    '**/__tests__/**/*test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '**/__tests__/**/*spec.android.[jt]s?(x)',
    '**/__tests__/**/*test.android.[jt]s?(x)',
    '**/?(*.)+(spec|test).android.[jt]s?(x)',
    '**/__tests__/**/*spec.native.[jt]s?(x)',
    '**/__tests__/**/*test.native.[jt]s?(x)',
    '**/?(*.)+(spec|test).native.[jt]s?(x)'
  ],
  moduleFileExtensions: [
    'android.expo.ts', 'android.expo.tsx',
    'android.expo.js', 'android.expo.jsx',
    'native.expo.ts',  'native.expo.tsx',
    'native.expo.js',  'native.expo.jsx',
    'expo.ts',         'expo.tsx',
    'expo.js',         'expo.jsx',
    'android.ts',      'android.tsx',
    'android.js',      'android.jsx',
    'native.ts',       'native.tsx',
    'native.js',       'native.jsx',
    'ts',              'tsx',
    'js',              'jsx',
    'json'
  ],
  snapshotResolver: 'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo\\src\\snapshot\\resolver.android.js',
  watchPlugins: [
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-watch-typeahead\\filename.js', 
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-watch-typeahead\\testname.js'  
  ],
  snapshotSerializers: [
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo-enzyme\\node_modules\\enzyme-to-json\\serializer.js'
  ],
  testEnvironmentOptions: { enzymeAdapter: 'react16' },
  setupFilesAfterEnv: [
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo-enzyme\\build\\setupEnzyme.native.js'
  ]
}
{
  haste: { defaultPlatform: 'web', platforms: [ 'web' ] },
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf|otf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$': 'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo\\src\\preset\\assetFileTransformer.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'  
  ],
  setupFiles: [
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\react-native-web\\jest\\setup.js',  
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo-enzyme\\node_modules\\jest-canvas-mock\\lib\\index.js'
  ],
  testEnvironment: 'enzyme',
  moduleNameMapper: {
    '^react-native$': 'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\react-native-web\\dist\\cjs\\index.js'
  },
  displayName: { name: 'Web', color: 'magenta' },
  testMatch: [
    '**/__tests__/**/*spec.[jt]s?(x)',
    '**/__tests__/**/*test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '**/__tests__/**/*spec.web.[jt]s?(x)',
    '**/__tests__/**/*test.web.[jt]s?(x)',
    '**/?(*.)+(spec|test).web.[jt]s?(x)'
  ],
  moduleFileExtensions: [
    'web.expo.ts', 'web.expo.tsx',
    'web.expo.js', 'web.expo.jsx',
    'expo.ts',     'expo.tsx',
    'expo.js',     'expo.jsx',
    'web.ts',      'web.tsx',
    'web.js',      'web.jsx',
    'ts',          'tsx',
    'js',          'jsx',
    'json',        'wasm'
  ],
  snapshotResolver: 'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo\\src\\snapshot\\resolver.web.js',
  watchPlugins: [
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-watch-typeahead\\filename.js', 
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-watch-typeahead\\testname.js'  
  ],
  snapshotSerializers: [
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo-enzyme\\node_modules\\enzyme-to-json\\serializer.js'
  ],
  testEnvironmentOptions: { enzymeAdapter: 'react16' },
  setupFilesAfterEnv: [
    'C:\\Users\\Bigmo\\Revature\\2106RNCN-2-p2-fe\\node_modules\\jest-expo-enzyme\\build\\setupEnzyme.web.js'
  ]
}
```