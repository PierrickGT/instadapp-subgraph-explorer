module.exports = {
    env: {
        production: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: [
                'react-hot-loader/babel',
                'styled-components',
                '@babel/plugin-proposal-class-properties',
                [
                    'import',
                    {
                        libraryName: 'antd',
                        libraryDirectory: 'es',
                        style: true
                    }
                ]
            ]
        },
        test: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: [
                [
                    'istanbul',
                    {
                        exclude: ['src/**/*.test.{js,jsx}', 'setupJest.js']
                    }
                ],
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-runtime'
            ]
        }
    }
};
