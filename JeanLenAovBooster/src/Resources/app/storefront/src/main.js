import JlQuantityIncentivePlugin from './plugin/jl-quantity-incentive.plugin';

const PluginManager = window.PluginManager;

PluginManager.register('JlQuantityIncentive', JlQuantityIncentivePlugin, '[data-jl-quantity-incentive]');
