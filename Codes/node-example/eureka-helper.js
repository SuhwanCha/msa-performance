const Eureka = require('eureka-js-client').Eureka;
const eurekaHost = 'eureka-server';
const eurekaPort = 8761;
const ipAddr = 'msa-node-app';

exports.registerWithEureka = function (appName, PORT, hostName) {
  console.log(hostName || '127.0.0.1')
  const instanceId = Math.random().toString(36).substr(2, 11);
  const client = new Eureka({
    instance: {
      app: appName,
      hostName: hostName || '127.0.0.1',
      instanceId: Math.random().toString(36).substr(2, 11),
      ipAddr: ipAddr,
      port: {
        '$': PORT,
        '@enabled': 'true',
      },
      statusPageUrl: 'http://localhost:8080/info',
      vipAddress: appName,
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    //retry 10 time for 3 minute 20 seconds.
    eureka: {
      host: eurekaHost,
      port: eurekaPort,
      servicePath: '/eureka/apps/',
      maxRetries: 10,
      requestRetryDelay: 2000,
    },
  })

  client.logger.level('debug')

  client.start(error => {
    console.log(error || "user service registered")
  });



  function exitHandler(options, exitCode) {
    if (options.cleanup) {
    }
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) {
      client.stop();
    }
  }

  client.on('deregistered', () => {
    process.exit();
    console.log('after deregistered');
  })

  client.on('started', () => {
    console.log("eureka host  " + eurekaHost);
  })

  process.on('SIGINT', exitHandler.bind(null, { exit: true }));
};

